import { Blog, getBlogs } from "app/api/microcms/route";
// import { Blog, getBlogs, Tag } from "app/libs/client";
import { Tag } from "app/api/github/route";

import { sanitizeHtml, truncateString } from "app/utils/sanitizeHtml";
import Link from "next/link";
import React from "react";
import ButtonReturn from "../ButtonReturn/ButtonReturn";
import { getBlogsRepo } from "app/api/github/route";
import { title } from "process";

interface ShowblogsProps {
  currentPage: number;
  pagenationOffset: number;
}

interface MicrocmsPost {
  source: "microcms";
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  updatedAt: string;
}

interface GithubPost {
  source: "github";
  id: string;
  title: string;
  content: string;
  date?: string;
}

const Showblogs: React.FC<ShowblogsProps> = async ({
  currentPage,
  pagenationOffset,
}) => {
  const limit = 100; //デフォルト値と同じとする
  const offset = 0;
  // const offset = 5 * (currentPage - 1);
  console.log("currentPage", currentPage);
  console.log("offsetA", offset);

  const { data, tags } = await getBlogs(limit, offset);
  console.log("dataC", data);
  const repoData = await getBlogsRepo();
  // console.log("repoData", repoData);
  // console.log("repoData.date", repoData[0].date);

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
      tag: mdData.topics ? mdData.topics.map((tag) => ({ tag: tag })) : [],
    })),
  ];

  // publishedAtの順で並べ替え
  allBlogs.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  console.log("allBlogs", allBlogs.length);
  // console.log("publishedAt", blogs[6].publishedAt);

  // const pagenationOffset = 4;
  const blogs = allBlogs.slice(
    (currentPage - 1) * pagenationOffset,
    currentPage * pagenationOffset
  );
  // const blogs = allBlogs.slice(offset, offset + 5);
  console.log("blogs", JSON.stringify(blogs, null, 2));

  // const blogs: Blog[] = data.contents;
  //   const totalPages = Math.ceil(data.totalCount / data.limit);
  //   const currentPage = 1;

  return (
    <>
      {/* 各投稿記事の表示 */}
      {blogs.map((blog: Blog) => {
        // 各ブログのタグを取得
        const blogTags =
          blog.tag ??
          // (tagName: Tag) => blogs.find((tag) => tag.tag === tagName.tag)
          // tags.contents.find((tag) => tag.tag === tagName.tag)
          [];

        console.log("blogTags", blogTags);

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
        // console.log("blog.body", blog.body);

        return (
          <>
            <Link href={`/blogs/${blog.source}/${blog.id}`} key={blog.id}>
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
                    <div className="">
                      {blogTags.map(
                        (tag: Tag | undefined) =>
                          tag && (
                            <span
                              key={tag.id}
                              className="p-[2px] mr-2 text-sm rounded-xl text-white bg-blue-500"
                            >
                              &nbsp;📁&nbsp;{tag?.tag || ""}&nbsp;&nbsp;
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
                          __html: sanitizeHtml(truncateString(blog.body, 140)),
                        }}
                      />
                      {/* {removeHtmlTags(blog.body.slice(0, 200))}; */}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <ButtonReturn />
          </>
        );
      })}
    </>
  );
};

export default Showblogs;
