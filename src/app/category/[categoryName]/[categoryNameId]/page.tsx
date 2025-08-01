// export const runtime = "edge";

import "./page.css";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Categoryblogs from "app/compornents/Categoryblogs/Categoryblogs";
import { Blog } from "app/api/microcms/utils";
import { fetchAllGithubArticles } from "app/lib/github/posts";
import Search from "app/compornents/Search/Search";
import CategoryPagination from "app/compornents/CategoryPagination/CategoryPagination";
import { pagenationOffsetNum } from "app/utils/constants";
import Maplist from "app/compornents/Maplist/Maplist";

// SSGを強制
export const dynamic = "force-static";

// 更新間隔（秒）
export const revalidate = 60; // 仮設定、最終は3600とする

const BlogsCategoryName = async ({
  params,
}: {
  params: { categoryName: string; categoryNameId: number };
}): Promise<JSX.Element> => {
  const categoryName = decodeURI(params.categoryName);
  console.log("categoryName", categoryName);

  const categoryNameId: number = Number(params.categoryNameId); //categoryNameIdがstringで渡されている場合を考慮
  const currentPage = categoryNameId;
  console.log("currentPageA", currentPage);

  const limit = 5; //デフォルト値と同じとする
  const offset = limit * (currentPage - 1);

  // const { data } = await getBlogs(limit, offset);
  // const totalPages = Math.ceil(data.totalCount / data.limit);

  console.log("pageId", params.categoryNameId);
  console.log("offset", offset);

  const API_URL = process.env.API_URL;

  const getBlogs = async () => {
    const response = await fetch(`${API_URL}/api/microcms`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    // console.log("dataP-2", data);
    return data;
  };
  const { data } = await getBlogs();
  console.log("categoryNameData", JSON.stringify(data, null, 2));

  // fetchedDataとして渡す前にデータの存在確認
  if (!data) {
    console.error("Data is undefined");
    return <div>データの読み込みに失敗しました</div>;
  }

  // SSG用のデータ取得
  const allPostsData = await fetchAllGithubArticles();

  // 一致するブログ記事をフィルタリング
  const matchingBlogs = allPostsData.filter((blog: any) =>
    blog.topics?.some((tag: any) => tag === categoryName)
  );
  console.log("matchingBlogs", JSON.stringify(matchingBlogs, null, 2));

  const pagenationOffset = pagenationOffsetNum; // 1ページあたりの表示件数
  const totalPages = Math.ceil(matchingBlogs.length / pagenationOffset);

  const allBlogs: Blog[] = [
    ...data.contents,
    // ...(repoData
    //   ? repoData.map((mdData: GithubPost) => ({
    //       source: mdData.source,
    //       id: mdData.id,
    //       title: mdData.title,
    //       body: mdData.content,
    //       publishedAt: mdData.date || "",
    //       updatedAt: mdData.date || "",
    //     }))
    //   : []),
  ];

  // const blog = await getDetail(blogId);

  // タグデータを取得
  // const tags = await client.get<TagData>({
  //   endpoint: `tags`,
  // });
  // console.log("tags", tags);

  // const getTagId = tags.contents.filter((tagId) =>
  //   blog.tag?.some((blogTag) => blogTag.tag === tagId.tag)
  // );
  // console.log("getTagId", getTagId);

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
  const uniqueTag = [{ id: "0", tag: categoryName }];

  return (
    <body>
      {/* <CustomHead /> */}
      <Header />
      <div className="top-container">
        <div className="mt-44">
          <Maplist getTagId={uniqueTag} />
          {/* <Maplist getTagId={getTagId} /> */}
        </div>

        <div id="container" className="flex w-11/12 h-auto m-auto">
          <div
            id="main"
            className="grid grid-cols-2 sm:grid-cols-2 gap-y-8 w-full m-auto"
          >
            {/* Blog List */}
            {/* <h1 className="inline text-3xl font-bold pb-12"></h1> */}

            {/* 各投稿記事の表示 */}
            <Categoryblogs
              currentPage={currentPage}
              categoryName={categoryName}
              categoryNameId={categoryNameId}
              fetchedData={allPostsData}
              // fetchedData={data}
            />
          </div>

          {/* プロフィール欄の表示 */}
          <div className="flex flex-col ml-2">
            <Search />
            <Profile />
          </div>
        </div>
        {/* ページ番号の記載 */}
        <div className="mt-10 ml-12">
          <CategoryPagination
            totalPages={totalPages}
            initialPage={currentPage}
            categoryName={categoryName}
          />
        </div>
        {/* <Pagination totalPages={totalPages} initialPage={currentPage} /> */}
      </div>
      <Footer fetchedData={uniqueTags} />
    </body>
  );
};

export default BlogsCategoryName;
