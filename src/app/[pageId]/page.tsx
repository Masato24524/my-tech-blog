// export const runtime = "edge";

import "./page.css";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import Pagination from "app/compornents/Pagination/Pagination";
import Showblogs from "app/compornents/Showblogs/Showblogs";
import { GithubPost, MicrocmsPost } from "app/types/type";
import { pagenationOffsetNum } from "app/utils/constants";
import { fetchAllGithubArticles } from "app/lib/github/posts";
import Sidebar from "app/compornents/Sidebar/Sidebar";
import { Header_U } from "app/compornents/Header_U/Header_U";

// SSGを強制
export const dynamic = "force-static";

// 更新間隔（秒）
export const revalidate = 60; // 仮設定、最終は3600とする

// SSGでカテゴリーページを生成する
export async function generateStaticParams() {
  try {
    const allPostsData = await fetchAllGithubArticles();

    const pagenationOffset = pagenationOffsetNum; // 1ページあたりの表示件数
    const totalPages = Math.ceil(allPostsData.length / pagenationOffset);

    const blogsPageIdList = [];
    for (let i = 2; i <= totalPages; i++) {
      blogsPageIdList.push({ pageId: i.toString() });
    }
    console.log("blogsPageIdList", blogsPageIdList);

    return blogsPageIdList;
  } catch (error) {
    console.error("generateStaticParams ERROR:", error);

    // エラー時は空配列を返す
    return [];
  }
}

// ページコンポーネント
export default async function BlogsPageId({
  params,
}: {
  params: { pageId: string };
}): Promise<JSX.Element> {
  const currentPage = parseInt(params.pageId) || 1;
  console.log("currentPage", currentPage);

  const limit = 100; //デフォルト値と同じとする
  const offset = 0;
  // const offset = 5 * (currentPage - 1);

  const API_URL = process.env.API_URL;

  // const getBlogs = async () => {
  //   const response = await fetch(`${API_URL}/api/microcms`);
  //   const data = await response.json();
  //   return data;
  // };
  // const { data } = await getBlogs();
  // const { data } = await getBlogs(limit, offset);

  const allPostsData = await fetchAllGithubArticles();
  // const repoData = await getBlogsRepo();

  //md_datasから記事をマージ
  // const allBlogs: Blog[] = [
  //   ...data.contents,
  //   ...repoData.map((mdData: GithubPost) => ({
  //     source: mdData.source,
  //     id: mdData.id,
  //     title: mdData.title,
  //     body: mdData.content,
  //     publishedAt: mdData.date || "",
  //     updatedAt: mdData.date || "",
  //   })),
  // ];

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

  const pagenationOffset = pagenationOffsetNum;
  const totalPages = Math.ceil(allPostsData.length / pagenationOffset);
  // const totalPages = Math.ceil(allBlogs.length / pagenationOffset);

  console.log("pageId", params.pageId);
  console.log("offset", offset);

  return (
    <body>
      {/* <CustomHead /> */}
      <div className="flex">
        <Header />
        <Header_U />
      </div>
      <div
        id="container"
        className="flex w-11/12 h-auto mt-20 md:mt-20 mx-auto"
      >
        <div id="main" className="grid grid-cols-2 gap-y-8 w-full mx-auto mb-8">
          {/* Blog List */}
          {/* <h1 className="inline text-3xl font-bold pb-12"></h1> */}
          {/* 各投稿記事の表示 */}
          <Showblogs
            currentPage={currentPage}
            pagenationOffset={pagenationOffset}
            // fetchedData={data}
            fetchedRepoData={allPostsData}
            // fetchedRepoData={repoData}
          />
        </div>
        <Sidebar />
      </div>
      <div className="mt-10 ml-10">
        {/* ページ番号の記載 */}
        <Pagination
          totalPages={totalPages}
          initialPage={currentPage}
          pagenationOffset={pagenationOffset}
        />
      </div>
      <Footer fetchedData={uniqueTags} />
      {/* <Footer fetchedData={data} /> */}
    </body>
  );
}
