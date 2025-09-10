import SafeHtml from "app/utils/sanitizeHtml";
import Link from "next/link";
import React from "react";
import ButtonReturn from "../ButtonReturn/ButtonReturn";
import { GithubPost, md_datas, MicrocmsPost, Tag } from "app/types/type";
import { pagenationOffsetNum } from "app/utils/constants";
import { AccessTime, Folder, Update } from "@mui/icons-material";

type CategoryblogsProps = {
  currentPage: number;
  categoryName: string;
  categoryNameId?: number;
  fetchedData: md_datas[];
  // fetchedData: MicrocmsPost;
};

const Categoryblogs: React.FC<CategoryblogsProps> = async ({
  currentPage,
  categoryName,
  fetchedData,
}) => {
  const limit = 100; //全ての記事を取得する　※100記事以上になったら要修正
  const offset = 0;

  // const { data } = await getBlogs(limit, offset);
  const blogs: any = fetchedData;
  // const blogs: Blog[] = await getBlogs();

  // console.log("tags", tags);
  // console.log("blogsC", JSON.stringify(blogs, null, 2));
  //   const totalPages = Math.ceil(data.totalCount / data.limit);
  //   const currentPage = 1;

  // プロップスから渡されたcategoryNameと一致するタグを取得
  const foundTag = blogs
    // const foundTag = blogs.contents
    .map(
      (blog: any) =>
        blog.topics.find((tag: any) => tag === decodeURI(categoryName))
      // blog.tag.find((tag: any) => tag.tag === decodeURI(categoryName))
    )
    .filter(Boolean);
  console.log("foundTag", foundTag);

  // 一致するタグがあれば、idとtagをセット。なければ空の配列。
  const getTagId: Tag[] =
    foundTag.length > 0
      ? foundTag.map((tag: any) => ({ id: tag.id, tag: tag }))
      : [];
  console.log("getTagId", getTagId);

  // const uniqueTag = Array.from(
  //   new Map(getTagId.map((tag) => [tag.tag, tag])).values()
  // );

  //md_datasから記事をマージ
  let allBlogs: any = [];
  const repoData: any = fetchedData;

  if (repoData) {
    allBlogs = [
      // ...data.contents, // microCMSは一時的に除外
      ...repoData.map((mdData: any) => ({
        source: mdData.source,
        id: mdData.id,
        title: mdData.title,
        body: mdData.content,
        publishedAt: mdData.date || "",
        updatedAt: mdData.update || "",
        tag: mdData.topics ?? [],
        // tag: mdData.topics ? mdData.topics.map((tag: any) => ({ tag })) : [],
      })),
    ];
  } else {
    allBlogs = [...blogs.contents];
  }

  // publishedAtの順で並べ替え(updatedAtを持つ場合はそれを使用する)
  allBlogs.sort((a: any, b: any) => {
    const dateA = new Date(a.updatedAt || a.publishedAt).getTime();
    const dateB = new Date(b.updatedAt || b.publishedAt).getTime();
    return dateB - dateA;
  });

  // console.log("allBlogs", JSON.stringify(allBlogs, null, 2));

  const uniqueTag = [{ id: "0", tag: categoryName }];
  console.log("uniqueTag", uniqueTag);

  console.log("categoryName", categoryName);

  // 一致するブログ記事をフィルタリング
  const matchingBlogs = allBlogs.filter(
    (blog: any) =>
      // const matchingBlogs = blogs.contents.filter((blog: Blog) =>
      blog.tag?.some((tag: any) => tag === categoryName)
    // blog.tag?.some((tag: any) => tag.tag === decodeURI(categoryName))
  );
  // console.log("matchingBlogs", JSON.stringify(matchingBlogs, null, 2));

  // フィルタリング後の記事数に基づいてtotalPagesを計算
  const totalMatchingBlogs = matchingBlogs.length;
  const postsPerPage = pagenationOffsetNum; //1ページに表示する記事数
  const totalPages = Math.ceil(totalMatchingBlogs / postsPerPage);
  console.log("totalMatchingBlogs", totalMatchingBlogs);

  let i = -1; //カウンタ変数を初期化

  return (
    <>
      {/* 各投稿記事の表示 */}
      {matchingBlogs.map((blog: any) => {
        // 各ブログのタグを取得
        // const blogTags =
        //   blog.tag?.map((tagId: Tag) =>
        //     tags.contents.find((tag) => tag.id === tagId.id)
        //   ) ?? [];
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
        const updatedDate = blog.updatedAt
          ? new Date(blog.updatedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : null;

        i++; /* カウンタをインクリメント */
        // currentPageとpostsPerPageに応じて記事を表示
        if (
          i >= postsPerPage * (currentPage - 1) &&
          i <= postsPerPage * (currentPage - 1) + (postsPerPage - 1)
        ) {
          return (
            <Link
              href={`/blogs/${blog.source}/${blog.id}`}
              key={blog.id}
              className="w-auto"
            >
              <div className="h-full m-2 mt-0 mb-8 p-4 pb-1 text-gray-950 bg-white rounded-lg shadow-md hover:bg-blue-100">
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
                      {blog.tag.map(
                        // {blogTags.map(
                        (tag: any) =>
                          tag && (
                            <span
                              key={tag.id}
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
                </div>
                {/* 記事内容のプレビュー */}
                <div className="break-all">
                  <SafeHtml blogBody={blog.body} />
                </div>
              </div>
            </Link>
          );
        }
      })}

      <ButtonReturn />
    </>
  );
};

export default Categoryblogs;
