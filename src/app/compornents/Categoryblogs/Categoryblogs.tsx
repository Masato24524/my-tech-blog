import { Blog, getBlogs, Tag } from "app/api/microcms/utils";
import SafeHtml, { sanitizeHtml, truncateString } from "app/utils/sanitizeHtml";
import Link from "next/link";
import React from "react";
import Maplist from "../Maplist/Maplist";
import { CategoryPagination } from "../CategoryPagination/CategoryPagination";
import ButtonReturn from "../ButtonReturn/ButtonReturn";
import { MicrocmsPost } from "app/types/type";

type CategoryblogsProps = {
  currentPage: number;
  categoryName: string;
  categoryNameId?: number;
  fetchedData: MicrocmsPost;
};

const Categoryblogs: React.FC<CategoryblogsProps> = async ({
  currentPage,
  categoryName,
  categoryNameId,
  fetchedData,
}) => {
  const limit = 100; //全ての記事を取得する　※100記事以上になったら要修正
  const offset = 0;

  // const { data } = await getBlogs(limit, offset);
  const blogs: any = fetchedData;
  // const blogs: Blog[] = await getBlogs();

  // console.log("tags", tags);
  console.log("blogsC", JSON.stringify(blogs, null, 2));
  //   const totalPages = Math.ceil(data.totalCount / data.limit);
  //   const currentPage = 1;

  // プロップスから渡されたcategoryNameと一致するタグを取得
  const foundTag = blogs.contents
    .map((blog: any) =>
      blog.tag.find((tag: any) => tag.tag === decodeURI(categoryName))
    )
    .filter(Boolean);
  console.log("foundTag", foundTag);

  // 一致するタグがあれば、idとtagをセット。なければ空の配列。
  const getTagId: Tag[] =
    foundTag.length > 0
      ? foundTag.map((tag: any) => ({ id: tag.id, tag: tag.tag }))
      : [];
  console.log("getTagId", getTagId);
  const uniqueTag = Array.from(
    new Map(getTagId.map((tag) => [tag.tag, tag])).values()
  );
  console.log("uniqueTag", uniqueTag);

  // 一致するブログ記事をフィルタリング
  const matchingBlogs = blogs.contents.filter((blog: Blog) =>
    blog.tag?.some((tag) => tag.tag === decodeURI(categoryName))
  );
  // console.log("matchingBlogs", JSON.stringify(matchingBlogs, null, 2));

  // フィルタリング後の記事数に基づいてtotalPagesを計算
  const totalMatchingBlogs = matchingBlogs.length;
  const postsPerPage = 4; //1ページに表示する記事数
  const totalPages = Math.ceil(totalMatchingBlogs / postsPerPage);
  console.log("totalMatchingBlogs", totalMatchingBlogs);

  let i = -1; //カウンタ変数を初期化

  return (
    <>
      {/* パンくずリストの表示 */}
      <Maplist getTagId={uniqueTag} />
      {/* 各投稿記事の表示 */}
      {matchingBlogs.map((blog: Blog) => {
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
        const updatedDate = new Date(blog.updatedAt).toLocaleDateString(
          "ja-JP",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        i++; /* カウンタをインクリメント */
        // currentPageとpostsPerPageに応じて記事を表示
        if (
          i >= postsPerPage * (currentPage - 1) &&
          i <= postsPerPage * (currentPage - 1) + (postsPerPage - 1)
        ) {
          return (
            <div key={blog.id}>
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
                      {/* <div>
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
                      </div> */}

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
                        {/* <div
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(
                              truncateString(blog.body, 140)
                            ),
                          }}
                        /> */}
                        <SafeHtml blogBody={blog.body} />

                        {/* {removeHtmlTags(blog.body.slice(0, 200))}; */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      })}
      <CategoryPagination
        totalPages={totalPages}
        initialPage={currentPage}
        categoryName={categoryName}
      />
      <ButtonReturn />
    </>
  );
};

export default Categoryblogs;
