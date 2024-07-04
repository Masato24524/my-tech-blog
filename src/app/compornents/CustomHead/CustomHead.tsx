import { getBlogs } from "app/libs/client";
import Head from "next/head";

type Blog = {
    id: string;
    title: string;
    publishedAt: string;
    body: string;
  };

export const CustomHead = async () => {
    const data = await getBlogs();
    const blogs: Blog[] = data.contents;
    return (
      <Head>
        <title> {`Masato's tech Blog`} </title>
        <meta name="description" content="本ブログは未経験からフロントエンドエンジニアを目指している、自身のポートフォリオも兼ねています。ブログページをNext.js/Vercel＋microCMSで構成しました。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="ページの種類" />
        {/* ページのURL */}
        <meta property="og:url" content="https://my-tech-blog-five.vercel.app/blogs/zer5nq5eci" />
        <meta property="og:image" content="https://picsum.photos/seed/303/1200/800.jpg" />
        {/* <meta property="og:title" content={blogs.title} /> */}
        <meta property="og:description" content="デスクリプション" />
        <meta property="og:locale" content="ja_JP" />
      </Head>
    );
  };