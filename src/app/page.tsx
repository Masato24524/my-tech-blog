import "./page.css";
// import { Blog, getBlogs } from "app/api/microcms/utils";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Pagination from "./compornents/Pagination/Pagination";
import Showblogs from "./compornents/Showblogs/Showblogs";
import { GithubPost, MicrocmsPost } from "./types/type";
// import { getBlogsRepo } from "./api/github/route";

import { pagenationOffsetNum } from "./utils/constants";
import { generateStaticParams } from "./lib/github/posts";
// import getPostsData from "./lib/github/posts";
import Search from "./compornents/Search/Search";

// SSGを強制
export const dynamic = "force-static";

// 更新間隔（秒）
export const revalidate = 60; // 仮設定、最終は3600とする

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

  // SSGの記事を取得
  // リポジトリ内にあるファイル情報を全て取得。
  const allPostsData = await generateStaticParams();
  // const allPostsData = await getPostsData();
  // console.log("allPostsData", JSON.stringify(allPostsData, null, 2));

  //md_datasから記事をマージ
  // const allBlogs: Blog[] = [
  //   ...data.contents,
  //   ...(repoData
  //     ? repoData.map((mdData: GithubPost) => ({
  //         source: mdData.source,
  //         id: mdData.id,
  //         title: mdData.title,
  //         body: mdData.content,
  //         publishedAt: mdData.date || "",
  //         updatedAt: mdData.date || "",
  //       }))
  //     : []),
  // ];

  // console.log("allBlogs", allBlogs.length);
  // console.log("allBlogs:", JSON.stringify(allBlogs, null, 2));

  //Tagデータのマージ
  const allTags: string[] = [
    // ...data.contents.flatMap((item: any) =>
    //   item.tag.map((item: any) => item.tag)
    // ),
    ...(allPostsData
      ? allPostsData.flatMap((mdData: any) => {
          return Array.isArray(mdData.topics) ? mdData.topics : [mdData.topics];
        })
      : []),
  ];

  const uniqueTags = Array.from(new Set(allTags));

  console.log("allTags:", JSON.stringify(allTags, null, 2));
  console.log("uniqueTags:", JSON.stringify(uniqueTags, null, 2));

  const pagenationOffset = pagenationOffsetNum; // 1ページあたりの表示件数

  const totalPages = Math.ceil(allPostsData.length / pagenationOffset);
  // const totalPages = Math.ceil(allBlogs.length / pagenationOffset);
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
            fetchedRepoData={allPostsData}
            // fetchedRepoData={repoData}
          />

          {/* ページ番号の記載 */}
          <Pagination
            totalPages={totalPages}
            initialPage={currentPage}
            pagenationOffset={pagenationOffset}
          />
        </div>
        <div id="sidebar" className="flex flex-col w-1/3 ml-8">
          {/* 検索欄の表示 */}
          <Search />
          {/* プロフィール欄の表示 */}
          <Profile />
        </div>
      </div>
      <Footer fetchedData={uniqueTags} />
    </body>
  );
};

export default BlogsPage;
