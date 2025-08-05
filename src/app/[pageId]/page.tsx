export const runtime = "edge";

import "./page.css";
import { Blog, getBlogs } from "app/api/microcms/utils";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Pagination from "app/compornents/Pagination/Pagination";
import Showblogs from "app/compornents/Showblogs/Showblogs";
import { GithubPost, MicrocmsPost } from "app/types/type";
import { pagenationOffsetNum } from "app/utils/constants";
import { fetchAllGithubArticles } from "app/lib/github/posts";
import Search from "app/compornents/Search/Search";
import Promotion from "app/compornents/Promotion/Promotion";
// import { getBlogsRepo } from "app/api/github/route";

const BlogsPageId = async ({
  params,
}: {
  params: { pageId: string };
}): Promise<JSX.Element> => {
  const currentPage = parseInt(params.pageId) || 1;
  console.log("currentPage", currentPage);

  const limit = 100; //デフォルト値と同じとする
  const offset = 0;
  // const offset = 5 * (currentPage - 1);

  const API_URL = process.env.API_URL;

  const getBlogs = async () => {
    const response = await fetch(`${API_URL}/api/microcms`);
    const data = await response.json();
    return data;
  };
  const { data } = await getBlogs();
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
      <Header />

      <div
        id="container"
        className="flex w-11/12 h-auto mt-24 md:mt-60 mx-auto"
      >
        <div id="main" className="grid grid-cols-2 gap-y-8 w-full mx-auto mb-8">
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

          <div className="mt-10">
            {/* ページ番号の記載 */}
            <Pagination
              totalPages={totalPages}
              initialPage={currentPage}
              pagenationOffset={pagenationOffset}
            />
          </div>
        </div>
        <div id="sidebar" className="flex flex-col w-full md:w-1/3 ml-8">
          {/* 検索欄の表示 */}
          <Search />
          {/* プロフィール欄の表示 */}
          <Profile />
          <Promotion />
        </div>
      </div>
      <Footer fetchedData={uniqueTags} />
      {/* <Footer fetchedData={data} /> */}
    </body>
  );
};

export default BlogsPageId;
