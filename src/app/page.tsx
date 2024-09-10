import "./page.css";
import Link from "next/link";
import { getBlogs } from "app/libs/client";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import Pagination from "./compornents/Pagination/Pagination";
import { JSDOM } from "jsdom";

const ITEMS_PER_PAGE = 10;

type Blog = {
  id: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  body: string;
};

// HTMLタグを安全に表示する関数
const sanitizeHtml = (htmlString: string): string => {
  const { window } = new JSDOM();
  const { DOMParser } = window;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  return doc.body.innerHTML;
};

// 文字列を指定の文字数でカットする関数
const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
};

const BlogsPage = async (): Promise<JSX.Element> => {
  const data = await getBlogs();
  const blogs: Blog[] = data.contents;
  const totalPages = Math.ceil(data.totalCount / data.limit);
  const currentPage = 1;

  // const blog = await getDetail(blogId);

  return (
    <body>
      {/* <CustomHead /> */}
      <Header />

      <div id="container" className="flex w-4/5 h-auto mt-60 mx-auto">
        <div id="main" className="w-full mx-auto ml-4">
          {/* Blog List */}
          <h1 className="inline text-3xl font-bold pb-12"></h1>
          {/* 各投稿記事の表示 */}
          {blogs.map((blog: Blog) => {
            // const maxInnerHtml = (body: string, length: number) => {
            //   return body.length > length ? `${body.substring(0, length)}...`: body;
            //   // return body.slice(0, maxLength) + '...';
            // };

            const idPhoto: number = Math.floor(Math.random() * 1000);
            const timestamp: number = new Date().getTime();
            const publishedDate = new Date(blog.publishedAt).toLocaleDateString(
              "ja-JP",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
            const updatedDate = new Date(blog.updatedAt).toLocaleDateString(
              "ja-JP",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <Link href={`/blogs/${blog.id}`} key={blog.id}>
                <div className="m-2 mt-0 mb-8 p-4 pb-1 text-gray-950 bg-white rounded-lg shadow-md hover:bg-blue-100">
                  <div className="flex ml-2 mb-2">
                    <img
                      className="max-w-sm w-1/2 min-w-[150px] h-1/4 mr-4"
                      src={`https://picsum.photos/seed/${idPhoto}/1200/800.jpg?${timestamp}`}
                      alt="No image"
                    />
                    <div className="w-1/2">
                      {/* 記事のタイトル */}
                      <h2 className="pb-2 text-xl font-bold">{blog.title}</h2>
                      {/* 日付の生成 */}
                      <p className="text-xs mb-4 text-gray-600">
                        &nbsp;🕒{publishedDate}
                        {/* updatedAtがpublishedAtより新しい場合のみ表示 */}
                        {updatedDate > publishedDate && (
                          <>
                            {" "}
                            &nbsp;↻
                            {updatedDate}
                          </>
                        )}
                      </p>
                      {/* 記事内容のプレビュー */}
                      <div className="text-sm leading-relaxed mb-1">
                        {/* 危険なHTMLを安全に表示  */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(
                              truncateString(blog.body, 140)
                            ),
                          }}
                        />
                        {/* {removeHtmlTags(blog.body.slice(0, 200))}; */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {/* ページ番号の記載 */}
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
        {/* プロフィール欄の表示 */}
        <Profile />
      </div>
      <Footer />
    </body>
  );
};

// ページ番号を生成
// export const BlogPagination = async (context: any) => {
//   const currentPage = parseInt(context.query.page as string, 10) || 1;
//   const { contents, totalCount } = await getBlogs(ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE);

//   return {
//     props: {
//       blogs: contents,
//       totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
//       currentPage,
//     },
//   };
// };

export default BlogsPage;
