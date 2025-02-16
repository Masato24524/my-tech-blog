import "./page.css";
import { Blog, getBlogs } from "app/api/microcms/utils";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Pagination from "./compornents/Pagination/Pagination";
import Showblogs from "./compornents/Showblogs/Showblogs";
import { GithubPost, MicrocmsPost } from "./types/type";
// import { getBlogsRepo } from "./api/github/route";

const BlogsPage = async (): Promise<JSX.Element> => {
  const limit = 100;
  const offset = 0;

  const API_URL = process.env.API_URL;
  console.log("API_URL:", process.env.API_URL); // 確認用

  const getBlogs = async () => {
    try {
      // process.env.VERCEL_URLを使用して本番環境のURLを構築
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/microcms`, {
        next: {
          revalidate: 60,
        },
      });
      console.log("responseToppage", response);
      // レスポンスの詳細をログ出力
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers));

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("dataP-2", data);

      return data;
    } catch (error: any) {
      console.error("Fetching error:", {
        message: error.message,
        stack: error.stack,
        vercelUrl: process.env.VERCEL_URL,
      });
      throw error;
    }
  };
  const { data } = await getBlogs();
  console.log("dataP", JSON.stringify(data, null, 2));
  // const { data } = await getBlogs(limit, offset);

  const getBlogsRepo = async () => {
    try {
      const response = await fetch(`${API_URL}/api/github`, {
        next: {
          revalidate: 60,
        },
      });
      // next: {
      //   revalidate: 0;
      // }

      // レスポンスのステータスをチェック
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const repoData = await response.json();
      return repoData;
    } catch (error) {
      console.error("Fetching error:", error);
      return null;
    }
  };
  const repoData = await getBlogsRepo();
  // console.log("repoData", repoData);

  //md_datasから記事をマージ
  const allBlogs: Blog[] = [
    ...data.contents,
    ...(repoData
      ? repoData.map((mdData: GithubPost) => ({
          source: mdData.source,
          id: mdData.id,
          title: mdData.title,
          body: mdData.content,
          publishedAt: mdData.date || "",
          updatedAt: mdData.date || "",
        }))
      : []),
  ];

  console.log("allBlogs", allBlogs.length);

  const pagenationOffset = 4;

  const totalPages = Math.ceil(allBlogs.length / pagenationOffset);
  console.log("totalPages", totalPages);
  const currentPage = 1;

  return (
    <body>
      {/* <CustomHead /> */}
      <Header />

      <div id="container" className="flex w-4/5 h-auto mt-60 mx-auto">
        <div id="main" className="w-full mx-auto ml-4">
          {/* Blog List */}
          <h1 className="inline text-3xl font-bold pb-12"></h1>

          {/* 各投稿記事の表示 */}
          <Showblogs
            currentPage={currentPage}
            pagenationOffset={pagenationOffset}
            fetchedData={data}
            fetchedRepoData={repoData}
          />

          {/* ページ番号の記載 */}
          <Pagination
            totalPages={totalPages}
            initialPage={currentPage}
            pagenationOffset={pagenationOffset}
          />
        </div>
        {/* プロフィール欄の表示 */}
        <Profile />
      </div>
      <Footer fetchedData={data} />
    </body>
  );
};

export default BlogsPage;
