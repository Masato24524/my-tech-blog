import "./page.css";
import { Blog, getBlogs } from "app/api/microcms/route";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Pagination from "./compornents/Pagination/Pagination";
import Showblogs from "./compornents/Showblogs/Showblogs";
import { getBlogsRepo } from "./api/github/route";

const BlogsPage = async (): Promise<JSX.Element> => {
  const limit = 100;
  const offset = 0;

  const { data } = await getBlogs(limit, offset);
  const repoData = await getBlogsRepo();
  //md_datasから記事をマージ
  const allBlogs: Blog[] = [
    ...data.contents,
    ...repoData.map((mdData) => ({
      source: mdData.source,
      id: mdData.id,
      title: mdData.title,
      body: mdData.content,
      publishedAt: mdData.date || "",
      updatedAt: mdData.date || "",
    })),
  ];

  console.log("allBlogs", allBlogs.length);

  const pagenationOffset = 4;

  const totalPages = Math.ceil(allBlogs.length / pagenationOffset);
  console.log("totalPages", totalPages);
  const currentPage = 1;

  return (
    <body>
      {/* <CustomHead /> */}
      <Header />

      <div id="container" className="flex w-4/5 h-auto mt-60 mx-auto">
        <div id="main" className="w-full mx-auto ml-4">
          {/* Blog List */}
          <h1 className="inline text-3xl font-bold pb-12"></h1>

          {/* 各投稿記事の表示 */}
          <Showblogs
            currentPage={currentPage}
            pagenationOffset={pagenationOffset}
          />

          {/* ページ番号の記載 */}
          <Pagination
            totalPages={totalPages}
            initialPage={currentPage}
            pagenationOffset={pagenationOffset}
          />
        </div>
        {/* プロフィール欄の表示 */}
        <Profile />
      </div>
      <Footer />
    </body>
  );
};

export default BlogsPage;
