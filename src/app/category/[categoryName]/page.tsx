// export const runtime = "edge";

import "./page.css";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Categoryblogs from "app/compornents/Categoryblogs/Categoryblogs";
import { fetchAllGithubArticles } from "app/lib/github/posts";
import CategoryPagination from "app/compornents/CategoryPagination/CategoryPagination";
import { pagenationOffsetNum } from "app/utils/constants";
import Search from "app/compornents/Search/Search";
import Maplist from "app/compornents/Maplist/Maplist";
import Promotion from "app/compornents/Promotion/Promotion";
import Sidebar from "app/compornents/Sidebar/Sidebar";

// SSGを強制
export const dynamic = "force-static";

// 更新間隔（秒）
export const revalidate = 60; // 仮設定、最終は3600とする

// uniqueTopicsの抽出
const makeUniqueTopics = async (): Promise<any> => {
  const allPostsData = await fetchAllGithubArticles();
  // 全記事から、topics(配列状態)を抽出して並べる
  const topicsData = allPostsData.map((article) => {
    return { topics: article.topics };
  });
  // 配列を解除する
  const allTopics = topicsData.flatMap((item) => item.topics);
  // 重複を除去
  const uniqueTopics = Array.from(new Set(allTopics));
  return uniqueTopics;
};

// SSGでカテゴリーページを生成する
export async function generateStaticParams() {
  const getCategoryBlogs = async () => {
    try {
      const uniqueTopics = await makeUniqueTopics();

      // SSG用の形式に変換
      const categoryNameList = uniqueTopics.map((topic: string) => ({
        categoryName: topic,
      }));

      return categoryNameList;
    } catch (error) {
      console.error("Github fetch failed", error);
      return [];
    }
  };

  const categoryNameList = await getCategoryBlogs();
  console.log("categoryNameList", categoryNameList);

  return categoryNameList;
  // console.log("allPostsData_category", allPostsData);
}

// ページコンポーネント
export default async function categoryPage({
  params,
}: {
  params: { categoryName: string };
}) {
  try {
    const allPostsData = await fetchAllGithubArticles();
    // 一致するブログ記事をフィルタリング
    const matchingBlogs = allPostsData.filter((blog: any) =>
      blog.topics?.some((tag: any) => tag === params.categoryName)
    );
    // console.log("matchingBlogs", JSON.stringify(matchingBlogs, null, 2));

    const pagenationOffset = pagenationOffsetNum; // 1ページあたりの表示件数

    const totalPages = Math.ceil(allPostsData.length / pagenationOffset);
    // const totalPages = Math.ceil(matchingBlogs.length / pagenationOffset);
    // console.log("totalPages", totalPages);

    // タグデータを取得（microCMS）
    // const tags = await client.get<TagData>({
    //   endpoint: `tags`,
    // });
    // console.log("tags", tags);

    // Maplistのみで使用する場合
    const getTagId = [{ id: "0", tag: params.categoryName }];

    // const getTagId = tags.contents.filter((tagId) =>
    //   blog.tag?.some((blogTag) => blogTag.tag === tagId.tag)
    // );
    // console.log("getTagId", getTagId);

    //Tagデータのマージ
    // const allTags: string[] = [
    //   ...(allPostsData
    //     ? allPostsData.flatMap((mdData: any) => {
    //         return Array.isArray(mdData.topics)
    //           ? mdData.topics
    //           : [mdData.topics];
    //       })
    //     : []),
    // ];
    // const uniqueTags = Array.from(new Set(allTags));
    // console.log("uniqueTags", uniqueTags);
    // const uniqueTag = [{ id: "0", tag: categoryName }];

    // ユニークタグ
    const uniqueTags = await makeUniqueTopics();
    console.log("uniqueTags", uniqueTags);

    const currentPage = 1;
    console.log("currentPage", currentPage);

    const limit = 5; //デフォルト値と同じとする
    const offset = limit * (currentPage - 1);
    console.log("offset", offset);

    return (
      <body>
        {/* <CustomHead /> */}
        <Header />
        <div className="top-container">
          {/* パンくずリストの表示 */}
          <div className="mt-24 md:mt-44">
            {/* <Maplist getTagId={uniqueTag} /> */}
            <Maplist getTagId={getTagId} />
          </div>

          <div id="container" className="flex w-11/12 h-auto mx-auto">
            <div
              id="main"
              className="grid grid-cols-2 sm:grid-cols-2 gap-y-8 w-full mx-auto"
            >
              {/* Blog List */}
              {/* <h1 className="inline text-3xl font-bold pb-12"></h1> */}
              {/* 各投稿記事の表示 */}
              <Categoryblogs
                currentPage={currentPage}
                categoryName={params.categoryName}
                fetchedData={allPostsData}
                // fetchedData={data}
              />
              <div className="mt-10">
                <CategoryPagination
                  totalPages={totalPages}
                  initialPage={currentPage}
                  categoryName={params.categoryName}
                />
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
        <Footer fetchedData={uniqueTags} />
      </body>
    );
  } catch (error) {
    return (
      <div>
        <h1>エラーが発生しました</h1>
        <p>categoryName: {params.categoryName}</p>
        <p>Error: {String(error)}</p>
      </div>
    );
  }
}
