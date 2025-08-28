export const runtime = "edge";

import "./page.css";
// import { Blog, getBlogs } from "app/api/microcms/utils";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import Pagination from "../compornents/Pagination/Pagination";
import { GithubPost, MicrocmsPost } from "../types/type";
// import { getBlogsRepo } from "./api/github/route";

import { pagenationOffsetNum } from "../utils/constants";

import { fetchAllGithubArticles } from "../lib/github/posts";
// import getPostsData from "./lib/github/posts";
import Sidebar from "../compornents/Sidebar/Sidebar";
import SearchReasults from "app/compornents/SearchResults/SearchReasults";

// SSGを強制
// export const dynamic = "force-static";

// 更新間隔（秒）
// export const revalidate = 60;
// 仮設定、最終は3600とする

// app/searchのページはSSRで行う
export const dynamic = "force-dynamic";

const BlogsPage = async (): Promise<JSX.Element> => {
  const limit = 100;
  const offset = 0;

  const API_URL = process.env.API_URL;
  console.log("API_URL:", process.env.API_URL); // 確認用

  // === デバッグ開始 ===
  console.log("=== PAGE.TSX DEBUG START ===");

  try {
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
          throw new Error(
            `Fetching Error on top pages.tsx: ${response.status}`
          );
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
    const allPostsData = await fetchAllGithubArticles();
    // const allPostsData = await getPostsData();
    // console.log("allPostsData", JSON.stringify(allPostsData, null, 2));

    //Tagデータのマージ
    const allTags: string[] = [];

    try {
      if (allPostsData && Array.isArray(allPostsData)) {
        const tags = allPostsData.flatMap((mdData: any) => {
          if (mdData && mdData.topics) {
            return Array.isArray(mdData.topics)
              ? mdData.topics
              : [mdData.topics];
          }
          return [];
        });
        allTags.push(...tags);
      }
    } catch (error) {
      console.error("Error processing allTagas:", error);
    }

    const uniqueTags = Array.from(new Set(allTags));

    console.log("allTags:", JSON.stringify(allTags, null, 2));
    console.log("uniqueTags:", JSON.stringify(uniqueTags, null, 2));

    const pagenationOffset = pagenationOffsetNum; // 1ページあたりの表示件数

    const totalPages = Math.ceil(allPostsData.length / pagenationOffset);
    // const totalPages = Math.ceil(allBlogs.length / pagenationOffset);
    // console.log("totalPages", totalPages);
    const currentPage = 1;

    const filterdPosts = { title: "test", content: "testContent" };

    return (
      <body>
        {/* <CustomHead /> */}
        <Header />
        <div
          id="container"
          className="flex w-11/12 h-auto mt-24 md:mt-60 mx-auto"
        >
          <div id="contents" className="block w-full">
            <div
              id="main"
              className="grid grid-cols-2 gap-y-8 w-full mx-auto ml-4"
            >
              {/* Blog List */}
              {/* <h1 className="inline text-3xl font-bold pb-12"></h1> */}

              {/* 検索結果の表示 */}
              <SearchReasults allPostsData={allPostsData} />
            </div>
          </div>
          <Sidebar />
        </div>
        <div className="mt-10 ml-10">
          {/* ページ番号の記載 */}
          {/* <Pagination
            totalPages={totalPages}
            initialPage={currentPage}
            pagenationOffset={pagenationOffset}
          /> */}
        </div>
        <Footer fetchedData={uniqueTags} />
      </body>
    );
  } catch (error) {
    console.error("PAGE.TSX ERROR:", error);
    // エラー時は最小限のページを返す
    return (
      <body>
        <Header />
        <div>エラーが発生しました</div>
        <Footer fetchedData={[]} />
      </body>
    );
  }
};

export default BlogsPage;
