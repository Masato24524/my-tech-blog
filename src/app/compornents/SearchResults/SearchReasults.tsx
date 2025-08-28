"use client";

// import Script from "next/script";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AccessTime, Folder, Update } from "@mui/icons-material";
import SafeHtml from "app/utils/sanitizeHtml";

const SearchReasults = ({ allPostsData }: any) => {
  // URLパラメータから検索クエリを取得
  const urlParams = useSearchParams();
  const query = urlParams.get("q");

  // 検索クエリパラメータと一致する記事を抽出
  // ※filteredPostsの形式は、microCMSの記事も含む場合はShowblogs.tsxなどと合わせること
  const filteredPosts: any = query
    ? allPostsData.filter((post: any) => {
        const title = post.title?.toLowerCase() || "";
        const content = post.content?.toLowerCase() || "";
        const searchQuery = query.toLowerCase();

        return title.includes(searchQuery) || content.includes(searchQuery);
      })
    : null;

  // publishedAtの順で並べ替え(updatedAtを持つ場合はそれを使用する)
  filteredPosts.sort((a: any, b: any) => {
    const dateA = new Date(a.updatedAt || a.date).getTime();
    const dateB = new Date(b.updatedAt || b.date).getTime();
    return dateB - dateA;
  });

  // console.log("filteredPosts", filteredPosts);

  return (
    <>
      {filteredPosts ? (
        filteredPosts.map((blog: any) => {
          const idPhoto: number = Math.floor(Math.random() * 1000);
          const timestamp: number = new Date().getTime();
          const publishedDate = new Date(blog.date).toLocaleDateString(
            "ja-JP",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );
          const updatedDate = blog.updatedAt
            ? new Date(blog.updatedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null;

          return (
            <Link href={`/blogs/${blog.source}/${blog.id}`} key={blog.id}>
              <div className="w-auto h-full m-2 mt-0 mb-8 p-4 pb-1 text-gray-950 bg-white rounded-lg shadow-md hover:bg-blue-100">
                {/* 記事のタイトル */}
                <h2 className="min-h-16 pb-2 text-xl font-bold break-all">
                  {blog.title}
                </h2>
                <div className="flex mb-2">
                  <img
                    className="max-w-sm w-1/2 min-w-[150px] h-1/4 mr-4"
                    src={`https://picsum.photos/seed/${idPhoto}/1200/800.jpg?${timestamp}`}
                    alt="No image"
                  />
                  <div className="w-1/2">
                    {/* タグの表示 */}
                    <div className="flex flex-wrap">
                      {blog.topics.map(
                        // {blogTags.map(
                        (tag: any) =>
                          tag && (
                            <span
                              key={blog.id}
                              className="p-[2px] pb-[4px] mr-2 mb-1 align-middle text-sm rounded-xl text-white bg-blue-500"
                            >
                              &nbsp;
                              <Folder sx={{ fontSize: 18 }} />
                              &nbsp;{tag}&nbsp;&nbsp;
                            </span>
                          )
                      )}
                    </div>

                    {/* 日付の生成 */}
                    <p className="text-xs mb-2 align-middle text-gray-600">
                      &nbsp;
                      <AccessTime sx={{ fontSize: 14 }} />
                      {publishedDate}
                      <br />
                      {/* updatedAtがpublishedAtより新しい場合のみ表示 */}
                      {updatedDate && updatedDate > publishedDate && (
                        <>
                          {" "}
                          &nbsp;
                          <Update sx={{ fontSize: 14 }} />
                          {updatedDate}
                        </>
                      )}
                    </p>
                  </div>

                  {/* <div id="main" className="w-auto h-full"> */}
                  {/* <div id="search-results-js" className="w-full shadow-md">
                  JSによる検索結果
                </div> */}
                  {/* <div className="">
                  {filterdPosts.title}/{filterdPosts.content}
                </div> */}
                  {/* JavaScript実行 */}
                  {/* <Script src="/js/javascript-search.js" strategy="afterInteractive" /> */}
                  {/* </div> */}
                </div>

                {/* 記事内容のプレビュー */}
                <div className="break-all">
                  <SafeHtml blogBody={blog.content} />
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p>検索結果に該当する記事が見つかりません</p>
      )}
    </>
  );
};

export default SearchReasults;
