import "./page.css";
import Link from "next/link";
import { getBlogs } from "app/libs/client";
import { Header } from "app/compornents/Header/Header";
import { Footer } from "app/compornents/Footer/Footer";
import { Profile } from "app/compornents/profile/Profile";
import { JSDOM } from "jsdom";
import { Blog } from "../../libs/client";
import { Tag } from "../../libs/client";
import Pagination from "app/compornents/Pagination/Pagination";

// const PER_PAGE = limit;

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

const BlogsPageId = async ({
  params,
}: {
  params: { pageId: string };
}): Promise<JSX.Element> => {
  const currentPage = parseInt(params.pageId) || 1;

  const limit = 5; //デフォルト値と同じとする
  const offset = limit * (currentPage - 1);

  const { data, tags } = await getBlogs(limit, offset);
  const blogs: Blog[] = data.contents;
  const totalPages = Math.ceil(data.totalCount / data.limit);

  console.log("pageId", params.pageId);
  console.log("offset", offset);

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

            // 各ブログのタグを取得
            const blogTags =
              blog.tag?.map((tagId: Tag) =>
                tags.contents.find((tag) => tag.id === tagId.id)
              ) ?? [];

            // console.log("blogTags", blogTags);

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

                      {/* タグの表示 */}
                      <div>
                        {blogTags.map(
                          (tag: Tag | undefined) =>
                            tag && (
                              <span
                                key={tag.id}
                                className="p-[2px] text-sm rounded-xl text-white bg-blue-500"
                              >
                                &nbsp;📁&nbsp;{tag.tag}&nbsp;&nbsp;
                              </span>
                            )
                        )}
                      </div>

                      {/* 日付の生成 */}
                      <p className="text-xs mb-2 text-gray-600">
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
                      <div className="text-sm leading-relaxed mt-2 mb-1">
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
          <Pagination totalPages={totalPages} initialPage={currentPage} />
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

export default BlogsPageId;
