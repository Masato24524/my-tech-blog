export const runtime = "edge";

import "./page.css";
import { Blog, getBlogs } from "app/api/microcms/utils";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Pagination from "./compornents/Pagination/Pagination";
import Showblogs from "./compornents/Showblogs/Showblogs";
import { GithubPost, MicrocmsPost } from "./types/type";
// import { getBlogsRepo } from "./api/github/route";

import { pagenationOffsetNum } from "./utils/constants";
import page from "./pages/contact/page";

// export const dynamic = "force-dynamic";

const BlogsPage = async (): Promise<JSX.Element> => {
  const limit = 100;
  const offset = 0;

  const API_URL = process.env.API_URL;
  console.log("API_URL:", process.env.API_URL); // 確認用

  const getBlogs = async () => {
    try {
      // process.env.VERCEL_URLを使用して本番環境のURLを構築
      const baseUrl = process.env.API_URL;
      console.log("baseUrl", baseUrl);
      const vercelUrl = process.env.VERCEL_URL;
      const response =
        process.env.NODE_ENV === "development"
          ? await fetch(`http://localhost:3000/api/microcms`, {
              next: {
                revalidate: 60,
              },
            })
          : await fetch(`${API_URL}/api/microcms`, {
              // cache: "no-store",
              next: {
                revalidate: 60,
              },
            });
      // console.log("responseToppage", response.json());
      // レスポンスの詳細をログ出力
      // console.log("Response status:", response.status);
      // console.log("Response headers:", Object.fromEntries(response.headers));

      if (!response.ok) {
        throw new Error(`Fetching Error on top pages.tsx: ${response.status}`);
      }
      const data = await response.json();
      // console.log("dataP-2", data);

      return data;
    } catch (error: any) {
      console.error("Fetching error on top pages.tsx:", {
        message: error.message,
        stack: error.stack,
        apiUrl: process.env.API_URL,
        vercelUrl: process.env.VERCEL_URL,
      });
      throw error;
    }
  };
  const { data } = await getBlogs();
  // console.log("dataP", JSON.stringify(data, null, 2));
  // const { data } = await getBlogs(limit, offset);

  const getBlogsRepo = async () => {
    try {
      const response = await fetch(`${API_URL}/api/github`, {
        cache: "no-store",
        // next: {
        //   revalidate: 60,
        // },
      });
      // next: {
      //   revalidate: 0;
      // }

      // レスポンスのステータスをチェック
      if (!response.ok) {
        throw new Error(`Fetching Error Zenn articles: ${response.status}`);
      }
      const repoData = await response.json();
      return repoData;
    } catch (error) {
      console.error("Fetching error Zenn articles:", error);
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

  // console.log("allBlogs", allBlogs.length);
  // console.log("allBlogs:", JSON.stringify(allBlogs, null, 2));

  //Tagデータのマージ
  const allTags: string[] = [
    ...data.contents.flatMap((item: any) =>
      item.tag.map((item: any) => item.tag)
    ),
    ...(repoData
      ? repoData.flatMap((mdData: GithubPost) => {
          return Array.isArray(mdData.topics) ? mdData.topics : [mdData.topics];
        })
      : []),
  ];

  const uniqueTags = Array.from(new Set(allTags));

  // console.log("allTags:", JSON.stringify(allTags, null, 2));
  // console.log("uniqueTags:", JSON.stringify(uniqueTags, null, 2));

  const pagenationOffset = pagenationOffsetNum; // 1ページあたりの表示件数

  const totalPages = Math.ceil(allBlogs.length / pagenationOffset);
  // console.log("totalPages", totalPages);
  const currentPage = 1;

  return (
    <body>
      {/* <CustomHead /> */}
      <Header />
      <div id="container" className="flex w-11/12 h-auto mt-60 mx-auto">
        <div id="main" className="grid grid-cols-2 gap-y-8 w-full mx-auto ml-4">
          {/* Blog List */}
          {/* <h1 className="inline text-3xl font-bold pb-12"></h1> */}

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
      <Footer fetchedData={uniqueTags} />
    </body>
  );
};

export default BlogsPage;
