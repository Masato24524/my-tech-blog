export const runtime = "edge";

import "./page.css";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Categoryblogs from "app/compornents/Categoryblogs/Categoryblogs";

const BlogsCategoryName = async ({
  params,
}: {
  params: { categoryName: string };
}): Promise<JSX.Element> => {
  const currentPage = 1;
  const categoryName = params.categoryName;

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
  console.log("blogsCategoryName", data);

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
            fetchedData={data}
          />
        </div>
        {/* プロフィール欄の表示 */}
        <div className="mt-8 ml-2">
          <Profile />
        </div>
      </div>
      <Footer fetchedData={data} />
    </body>
  );
};

export default BlogsCategoryName;
