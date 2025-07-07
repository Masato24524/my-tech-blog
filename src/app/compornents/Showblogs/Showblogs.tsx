import { Blog, getBlogs } from "app/api/microcms/utils";
// import { Blog, getBlogs, Tag } from "app/libs/client";
import { Tag } from "app/api/github/route";

import SafeHtml from "app/utils/sanitizeHtml";
import Link from "next/link";
import React from "react";
import ButtonReturn from "../ButtonReturn/ButtonReturn";
import { AccessTime } from "@mui/icons-material";
import { Folder } from "@mui/icons-material";
// import { getBlogsRepo } from "app/api/github/route";

import { GithubPost, md_datas, MicrocmsPost } from "../../types/type";

interface ShowblogsProps {
  currentPage: number;
  pagenationOffset: number;
  fetchedData: MicrocmsPost;
  fetchedRepoData: md_datas[];
  // fetchedRepoData: GithubPost[];
}

interface CombinedBlogs {
  source: "microcms" | "github";
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  updatedAt: string;
}

const Showblogs: React.FC<ShowblogsProps> = async ({
  currentPage,
  pagenationOffset,
  fetchedData,
  fetchedRepoData,
}) => {
  const limit = 100; //デフォルト値と同じとする
  const offset = 0;
  // const offset = 5 * (currentPage - 1);
  console.log("currentPage", currentPage);
  console.log("offsetA", offset);
  // console.log("fetchedData", fetchedData);

  // const getBlogs = async () => {
  //   const response = await fetch("http://localhost:3000/api/microcms");
  //   const data = await response.json();
  //   return data;
  // };
  const data: any = fetchedData;
  // const { data } = await getBlogs();

  // const { data, tags } = await getBlogs(limit, offset);
  // console.log("dataS", data);
  const API_URL = process.env.API_URL;

  // const getBlogsRepo = async () => {
  //   const response = await fetch(`${API_URL}/api/github`);
  //   if (!response.ok) {
  //     throw new Error(`Error: ${response.status}`);
  //   }
  //   const repoData = await response.json();
  //   return repoData;
  // };

  const repoData = fetchedRepoData;

  // const repoData = await getBlogsRepo();
  // console.log("repoData", repoData);
  // console.log("repoData.date", repoData[0].date);

  //md_datasから記事をマージ
  let allBlogs: Blog[] = [];

  if (repoData) {
    allBlogs = [
      // ...data.contents, // microCMSは一時的に除外
      ...repoData.map((mdData: any) => ({
        source: mdData.source,
        id: mdData.id,
        title: mdData.title,
        body: mdData.content,
        publishedAt: mdData.date || "",
        updatedAt: mdData.date || "",
        tag: mdData.topics
          ? mdData.topics.map((tag: any) => ({ tag: tag }))
          : [],
      })),
    ];
  } else {
    allBlogs = [...data.contents];
  }

  // publishedAtの順で並べ替え
  allBlogs.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  // console.log("allBlogs", allBlogs.length);
  // console.log("publishedAt", blogs[6].publishedAt);

  // const pagenationOffset = 4;
  const blogs = allBlogs.slice(
    (currentPage - 1) * pagenationOffset,
    currentPage * pagenationOffset
  );
  // const blogs = allBlogs.slice(offset, offset + 5);
  // console.log("blogs", JSON.stringify(blogs, null, 2));

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
        // console.log("blog.body", blog.body);

        return (
          <>
            <Link href={`/blogs/${blog.source}/${blog.id}`} key={blog.id}>
              <div className="w-auto h-full m-2 mt-0 mb-4 p-4 pb-1 text-gray-950 bg-white rounded-lg shadow-md hover:bg-blue-100">
                {/* 記事のタイトル */}
                <h2 className="min-h-16 pb-2 text-xl font-bold">
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
                      {blogTags.map(
                        (tag: Tag | undefined) =>
                          tag && (
                            <span
                              key={tag.id}
                              className="p-[2px] pb-[4px] mr-2 mb-1 align-middle text-sm rounded-xl text-white bg-blue-500"
                              className="p-[2px] pb-[4px] mr-2 mb-1 align-middle text-sm rounded-xl text-white bg-blue-500"
                            >
                              &nbsp;
                              <Folder sx={{ fontSize: 18 }} />
                              &nbsp;{tag?.tag || ""}&nbsp;&nbsp;
                              &nbsp;
                              <Folder sx={{ fontSize: 18 }} />
                              &nbsp;{tag?.tag || ""}&nbsp;&nbsp;
                            </span>
                          )
                      )}
                    </div>

                    {/* 日付の生成 */}
                    <p className="text-xs mb-2 align-middle text-gray-600">
                      &nbsp;
                      <AccessTime sx={{ fontSize: 14 }} />
                      {publishedDate}
                    <p className="text-xs mb-2 align-middle text-gray-600">
                      &nbsp;
                      <AccessTime sx={{ fontSize: 14 }} />
                      {publishedDate}
                      {/* updatedAtがpublishedAtより新しい場合のみ表示 */}
                      {updatedDate > publishedDate && (
                        <>
                          {" "}
                          &nbsp;↻
                          {updatedDate}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                {/* 記事内容のプレビュー */}
                <SafeHtml blogBody={blog.body} />
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
