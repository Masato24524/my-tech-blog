// export const runtime = "edge";

import "./page.css";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Categoryblogs from "app/compornents/Categoryblogs/Categoryblogs";
import { generateStaticParams } from "app/lib/github/posts";
import CategoryPagination from "app/compornents/CategoryPagination/CategoryPagination";
import { pagenationOffsetNum } from "app/utils/constants";
import Search from "app/compornents/Search/Search";
import Maplist from "app/compornents/Maplist/Maplist";

// SSGを強制
export const dynamic = "force-static";

// 更新間隔（秒）
export const revalidate = 60; // 仮設定、最終は3600とする

const BlogsCategoryName = async ({
  params,
}: {
  params: { categoryName: string };
}): Promise<JSX.Element> => {
  const currentPage = 1;
  const categoryName = params.categoryName;
  console.log("categoryName_Parent", categoryName);

  console.log("currentPage", currentPage);

  const limit = 5; //デフォルト値と同じとする
  const offset = limit * (currentPage - 1);

  console.log("pageId", params.categoryName);
  console.log("offset", offset);

  const API_URL = process.env.API_URL;
  console.log("API_URL:", process.env.API_URL); // 確認用

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
  // const blog = await getDetail(blogId);
  // console.log("blogsCategoryName", data);

  const allPostsData = await generateStaticParams();
  // console.log("allPostsData_category", allPostsData);

  const pagenationOffset = pagenationOffsetNum; // 1ページあたりの表示件数
  const totalPages = Math.ceil(allPostsData.length / pagenationOffset);

  // タグデータを取得
  // const tags = await client.get<TagData>({
  //   endpoint: `tags`,
  // });
  // console.log("tags", tags);

  // const getTagId = tags.contents.filter((tagId) =>
  //   blog.tag?.some((blogTag) => blogTag.tag === tagId.tag)
  // );
  // console.log("getTagId", getTagId);

  const uniqueTag = [{ id: "0", tag: categoryName }];

  return (
    <body>
      {/* <CustomHead /> */}
      <Header />
      <div className="top-container">
        {/* パンくずリストの表示 */}
        <div className="mt-44">
          <Maplist getTagId={uniqueTag} />
          {/* <Maplist getTagId={getTagId} /> */}
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
              categoryName={categoryName}
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
        <div className="mt-10 ml-12">
          <CategoryPagination
            totalPages={totalPages}
            initialPage={currentPage}
            categoryName={categoryName}
          />
        </div>
      </div>
      <Footer fetchedData={data} />
    </body>
  );
};

export default BlogsCategoryName;
