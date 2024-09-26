// app/blogs/[blogId]/page.tsx
import { Footer } from "app/compornents/Footer/Footer";
import { Header } from "app/compornents/Header/Header";
import { getDetail, TagData, client, Tag } from "app/libs/client";
import Link from "next/link";
import React from "react";

import "./page.css";
import X_ShareButton from "app/compornents/X_ShareButton/X_ShareButton";
import { Metadata } from "next";
import Maplist from "app/compornents/Maplist/Maplist";

// 静的パスを生成する関数
// export async function generateStaticParams() {
//   const { contents } = await getBlogs();

//   return contents.map((blog: { id: string; }) => ({
//     blogId: blog.id,
//   }));
// }

//詳細ページのメタデータを生成する関数
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  const idPhoto: number = Math.floor(Math.random() * 1000);
  const blog = await getDetail(params.blogId);
  console.log("fetched blog:", blog); //デバッグ用ログ

  const title = blog.meta?.title || "デフォルトタイトル"; //metaデータがない場合
  const description = blog.meta?.description || "デフォルトデスクリプション"; //metaデータがない場合

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "article",
      images: `https://picsum.photos/seed/${idPhoto}/1200/800.jpg`,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: `https://picsum.photos/seed/${idPhoto}/1200/800.jpg`,
    },
  };
}

// サーバーコンポーネントとしての詳細ページ
export default async function StaticDetailPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const blog = await getDetail(blogId);

  // タグデータを取得
  const tags = await client.get<TagData>({
    endpoint: `tags`,
  });
  console.log("tags", tags);

  const getTagId = tags.contents.filter((tagId) =>
    blog.tag?.some((blogTag) => blogTag.tag === tagId.tag)
  );
  console.log("getTagId", getTagId);

  return (
    <div id="content" className="w-full pr-20 bg-gray-100">
      <Header />
      <Maplist getTagId={getTagId} />
      <div
        id="blog-container"
        className="w-full mt-4 m-10 p-8 pt-10 leading-10 bg-white text-gray-950 shadow-md"
      >
        {/* 記事のタイトル */}
        <h1 className="text-lg font-bold">{blog.title}</h1>

        {/* 日付の生成 */}
        <p>
          {new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="flex h-8 w-full m-auto items-center">
          {/* Xのシェアポスト用のボタンを配置 */}
          <X_ShareButton />

          {/* タグの表示 */}
          <div>
            {getTagId.map((tagId: Tag) => (
              <span
                key={tagId.id}
                className="ml-2 p-[2px] text-sm rounded-xl text-white bg-blue-500"
              >
                &nbsp;📁&nbsp;{tagId.tag}&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* <br></br> */}

        {/* 記事本文 */}
        <div
          id="blog-doc"
          className="inline-block mb-10 pt-4"
          dangerouslySetInnerHTML={{
            __html: blog.body,
          }}
        />
        <br></br>
        <Link href={"/"} className="return-top bg-gray-300">
          記事一覧に戻る
        </Link>
      </div>
      <Footer />
    </div>
  );
}
