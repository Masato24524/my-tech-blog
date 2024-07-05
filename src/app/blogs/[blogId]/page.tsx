// app/blogs/[blogId]/page.tsx
import { Footer } from 'app/compornents/Footer/Footer';
import { Header } from 'app/compornents/Header/Header';
import { getDetail, getBlogs } from 'app/libs/client';
import Link from 'next/link';
import React from 'react';

import './page.css';
import X_ShareButton from 'app/compornents/X_ShareButton/X_ShareButton';
import { Metadata } from 'next';

// 静的パスを生成する関数
export async function generateStaticParams() {
  const { contents } = await getBlogs();

  return contents.map((blog: { id: string; }) => ({
    blogId: blog.id,
  }));
}

//詳細ページのメタデータを生成する関数
export async function generateMetadata({ params }: { params: { blogId: string };}): Promise<Metadata> {
  const idPhoto: number = Math.floor(Math.random()*1000);
  const blog = await getDetail(params.blogId);
  console.log('fetched blog:', blog); //デバッグ用ログ

  const title = blog.meta?.title || 'デフォルトタイトル'; //metaデータがない場合
  const description = blog.meta?.description || 'デフォルトデスクリプション'; //metaデータがない場合

  // if (!blog || !blog.meta) {
  //   console.error('Blog or meta data is undefined', { blog });
  //   throw new Error('Meta data is undefined')
  // }
  // const { title, description } = blog.meta;
  // if (!title || !description) {
  //   console.error('Title or description is undefined', { title, description });
  //   throw new Error('Meta data is undefined')
  // }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      images: `https://picsum.photos/seed/${idPhoto}/1200/800.jpg`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: `https://picsum.photos/seed/${idPhoto}/1200/800.jpg`,
    },
  };
};

// サーバーコンポーネントとしての詳細ページ
export default async function StaticDetailPage({ params: { blogId } }: { params: { blogId: string };}) {
  const blog = await getDetail(blogId);

  return (
    <div id='' className='content bg-gray-100'>
    {/* <CustomHead /> */}
    <Header />
      <div id='blog-container' className='mt-40 m-10 p-8 pt-10 leading-10 bg-white text-gray-950 shadow-md'>
        {/* 記事のタイトル */}
        <h1 className='text-lg font-bold'>{blog.title}</h1>
        {/* 日付の生成 */}
        <p>{new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</p>
        {/* Xのシェアポスト用のボタンを配置 */}
        <X_ShareButton />
        {/* <br></br> */}

        {/* 記事本文 */}
        <div id='blog-doc' className='inline-block mb-10 pt-4'
          dangerouslySetInnerHTML={{
            __html: blog.body,
          }}
        />
        <br></br>
        <Link href={'/'} className="return-top bg-gray-300">記事一覧に戻る</Link>
      </div>
      <Footer />
    </div>
  );
};