// export const runtime = "edge";

// app/blogs/[blogId]/page.tsx
import { Footer } from "app/compornents/Footer/Footer";
import { Header } from "app/compornents/Header/Header";
// import { getBlogsRepo } from "app/api/github/route";
import Link from "next/link";
import React from "react";

import "./page.css";
import X_ShareButton from "app/compornents/X_ShareButton/X_ShareButton";
import { Metadata } from "next";
import Maplist from "app/compornents/Maplist/Maplist";
import ButtonReturn from "app/compornents/ButtonReturn/ButtonReturn";

import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

// export const dynamic = "force-dynamic";

// 静的パスを生成する関数
// export async function generateStaticParams() {
//   const { contents } = await getBlogs();

//   return contents.map((blog: { id: string; }) => ({
//     blogId: blog.id,
//   }));
// }

//詳細ページのメタデータを生成する関数
// export async function generateMetadata({
//   params,
// }: {
//   params: { blogId: string };
// }): Promise<Metadata> {
//   const idPhoto: number = Math.floor(Math.random() * 1000);
//   const blog = await getDetail(params.blogId);
//   console.log("fetched blog:", blog); //デバッグ用ログ

//   const title = blog.meta?.title || "デフォルトタイトル"; //metaデータがない場合
//   const description = blog.meta?.description || "デフォルトデスクリプション"; //metaデータがない場合

//   return {
//     title: title,
//     description: description,
//     openGraph: {
//       title: title,
//       description: description,
//       type: "article",
//       images: `https://picsum.photos/seed/${idPhoto}/1200/800.jpg`,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: title,
//       description: description,
//       images: `https://picsum.photos/seed/${idPhoto}/1200/800.jpg`,
//     },
//   };
// }

// サーバーコンポーネントとしての詳細ページ
export default async function StaticDetailPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const API_URL = process.env.API_URL;

  const getBlogsRepo = async () => {
    const res = await fetch(
      `https://api.github.com/repos/Masato24524/Zenn-contents/contents/articles/${blogId}.md`,
      {
        next: { revalidate: false },
      }
    );

    const response = await fetch(`${API_URL}/api/github`, {
      // cache: "no-store",
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const repoDatas = await res.json();
    // const repoDatas = await response.json();

    return repoDatas;
  };
  const md_data = await getBlogsRepo();
  // const repoDatas = await getBlogsRepo();
  // console.log("repoDatas", repoDatas);

  // 取得したデータ(md_data)のうち、contentプロパティをbase64形式からutf-8の文字列に変換する
  const buffer = Buffer.from(md_data.content, "base64");
  const fileContents = buffer.toString("utf-8");

  // mdファイルの構文を解析してメタ情報(data:{title, topics, date等)とcontentをオブジェクトに格納する
  const matterResult: any = matter(fileContents);

  const blog = matterResult;
  // const blog = repoDatas.find((repoData: any) => repoData.id === blogId); // 全ブログからfetchする場合
  console.log("blogDB", blog);

  // タグデータを取得
  // const tags = await client.get<TagData>({
  //   endpoint: `tags`,
  // });
  // console.log("tags", tags);

  // const getTagId = tags.contents.filter((tagId) =>
  //   blog.tag?.some((blogTag) => blogTag.tag === tagId.tag)
  // );
  // console.log("getTagId", getTagId);

  // imageタグをhttpのパスに変換する関数
  const GITHUB_BASE_URL =
    "https://raw.githubusercontent.com/Masato24524/Zenn-contents/main";

  const convertImagePaths = (htmlContent: string) => {
    return htmlContent.replace(
      // return htmlContent.replace(
      /<img src="\/images\/([^"]+)"/g,
      `<img src="${GITHUB_BASE_URL}/images/$1"`
    );
  };

  const blogContent = convertImagePaths(blog.content);
  // const blogContent = convertImagePaths(blog.content);
  console.log("blogContent", JSON.stringify(blogContent, null, 2));

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
          <h1 className="text-lg font-bold">{blog.data.title}</h1>

          {/* 日付の生成 */}
          <p>
            {new Date(blog.data.date).toLocaleDateString("ja-JP", {
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

          <ReactMarkdown>{blogContent}</ReactMarkdown>
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
}
