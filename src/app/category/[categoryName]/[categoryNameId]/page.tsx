import "./page.css";
import { client, getBlogs, getDetail, TagData } from "app/libs/client";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Pagination from "app/compornents/Pagination/Pagination";
import Categoryblogs from "app/compornents/Categoryblogs/Categoryblogs";
import Maplist from "app/compornents/Maplist/Maplist";

const BlogsCategoryName = async ({
  params,
}: {
  params: { categoryName: string; categoryNameId: number };
}): Promise<JSX.Element> => {
  const categoryName = decodeURI(params.categoryName);
  console.log("categoryName", categoryName);

  const categoryNameId = params.categoryNameId;
  const currentPage = categoryNameId;
  console.log("currentPage", currentPage);

  const limit = 5; //デフォルト値と同じとする
  const offset = limit * (currentPage - 1);

  // const { data } = await getBlogs(limit, offset);
  // const totalPages = Math.ceil(data.totalCount / data.limit);

  console.log("pageId", params.categoryNameId);
  console.log("offset", offset);

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

  return (
    <body>
      {/* <CustomHead /> */}
      <Header />
      {/* <Maplist getTagId={getTagId} /> */}
      <div id="container" className="flex w-4/5 h-auto m-auto mt-44">
        <div id="main" className="w-full m-auto ml-4">
          {/* Blog List */}
          <h1 className="inline text-3xl font-bold pb-12"></h1>

          {/* 各投稿記事の表示 */}
          <Categoryblogs
            currentPage={currentPage}
            categoryName={categoryName}
            categoryNameId={categoryNameId}
          />

          {/* ページ番号の記載 */}
          {/* <Pagination totalPages={totalPages} initialPage={currentPage} /> */}
        </div>
        {/* プロフィール欄の表示 */}
        <div className="mt-8 ml-2">
          <Profile />
        </div>
      </div>
      <Footer />
    </body>
  );
};

export default BlogsCategoryName;
