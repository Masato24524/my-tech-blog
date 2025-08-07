// export const runtime = "edge";

// app/blogs/[blogId]/page.tsx
import { Metadata } from "next";
import { Footer } from "app/compornents/Footer/Footer";
import { Header } from "app/compornents/Header/Header";
// import { getBlogsRepo } from "app/api/github/route";
import Link from "next/link";
import React from "react";

import "./page.css";
import X_ShareButton from "app/compornents/X_ShareButton/X_ShareButton";
import Maplist from "app/compornents/Maplist/Maplist";
import ButtonReturn from "app/compornents/ButtonReturn/ButtonReturn";

import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { fetchAllGithubArticles, getArticleById } from "app/lib/github/posts";

// export const dynamic = "force-dynamic";

// SSGを強制
export const dynamic = "force-static";

// 更新間隔（秒）
export const revalidate = 60; // 仮設定、最終は3600とする

// 静的パスを生成する関数
// export async function generateStaticParams() {
//   const { contents } = await getBlogs();

//   return contents.map((blog: { id: string; }) => ({
//     blogId: blog.id,
//   }));
// }

interface Props {
  params: { blogId: string };
}

// 動的メタデータ生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogDatas = await fetchAllGithubArticles();
  console.log("blogData", blogDatas);

  const currentArticle = blogDatas.find(
    (article) => article.id === params.blogId
  );
  console.log("currentArticle", currentArticle);

  return {
    title: currentArticle?.title || "Masato's tech Blog",
    description: `${currentArticle?.title || "Masato's tech Blog"}の詳細記事`,
  };
}

// SSGで詳細ページを生成する
export async function generateStaticParams({
  // export default async function StaticDetailPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  // const API_URL = process.env.API_URL;

  // map関数でid一覧を取得している
  const getBlogsRepo = async () => {
    try {
      const articles = await fetchAllGithubArticles();
      // console.log("articles of blogs", articles);

      return articles.map((article) => ({
        blogId: article.id,
      }));

      // return repoDatas;
    } catch (error) {
      console.error("Github fetch failed", error);
      return [];
    }
  };

  // 記事のID一覧
  const md_data = await getBlogsRepo();
  console.log("md_data of blogs github:", md_data);

  // 記事のID一覧をリターンとして返すと、各ページのファイルをNext.jsで作成してくれる
  return md_data;

  // タグデータを取得
  // const tags = await client.get<TagData>({
  //   endpoint: `tags`,
  // });
  // console.log("tags", tags);

  // const getTagId = tags.contents.filter((tagId) =>
  //   blog.tag?.some((blogTag) => blogTag.tag === tagId.tag)
  // );
  // console.log("getTagId", getTagId);

  // const blogContent = convertImagePaths(blog.content);
  // console.log("blogContent", JSON.stringify(blogContent, null, 2));
}

// ページコンポーネント
export default async function BlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  try {
    // params.blogIdを使って該当記事を取得
    const blog = await getArticleById(params.blogId);
    console.log("blogId", blog);

    if (!blog) {
      return (
        <div>
          <h1>記事が見つかりません</h1>
          <p>ID: {params.blogId}</p>
        </div>
      );
    }

    return (
      <div id="content" className="w-full pr-20 bg-gray-100">
        <Header />

        <div className="mt-44">
          {/* <Maplist getTagId={getTagId} /> */}
          <div
            id="blog-container"
            className="w-full mt-4 m-10 p-8 pt-10 leading-10 bg-white text-gray-950 shadow-md"
          >
            {/* 記事のタイトル */}
            <h1 className="text-lg font-bold">{blog.title}</h1>

            {/* 日付の生成 */}
            <p>
              {new Date(blog.date ?? "").toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="flex h-8 w-full m-auto items-center">
              {/* Xのシェアポスト用のボタンを配置 */}
              <X_ShareButton />

              {/* タグの表示 */}
              {/* <div>
              {getTagId.map((tagId: Tag) => (
                <span
                  key={tagId.id}
                  className="ml-2 p-[2px] text-sm rounded-xl text-white bg-blue-500"
                >
                  <Link href={`/category/${tagId.tag}`}>
                    &nbsp;📁&nbsp;{tagId.tag}&nbsp;&nbsp;
                  </Link>
                </span>
              ))}
            </div> */}
            </div>

            {/* <br></br> */}

            {/* 記事本文 */}
            {/* Node.js環境の記事表示 */}
            {/* <div id="blog-doc" className="inline-block mb-10 pt-4"> */}
            {/* {parse(blogContent)} */}
            {/* </div> */}

            <ReactMarkdown>{blog.content}</ReactMarkdown>
            {/* <ReactMarkdown>{blogContent}</ReactMarkdown> */}
            {/* パースをuse clientで実行 */}
            {/* <ParseHtml blogContent={blogContent} /> */}
            <br></br>
            <Link href={"/"} className="return-top bg-gray-300">
              記事一覧に戻る
            </Link>
          </div>
        </div>

        <Footer fetchedData={undefined} />
        <ButtonReturn />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>エラーが発生しました</h1>
        <p>ID: {params.blogId}</p>
        <p>Error: {String(error)}</p>
      </div>
    );
  }
}
