import "./page.css";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Categoryblogs from "app/compornents/Categoryblogs/Categoryblogs";
import { Blog } from "app/api/microcms/utils";

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
            fetchedData={data}
          />

          {/* ページ番号の記載 */}
          {/* <Pagination totalPages={totalPages} initialPage={currentPage} /> */}
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
