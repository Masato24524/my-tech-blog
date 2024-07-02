// app/blogs/[blogId]/page.tsx
import { Footer } from 'app/compornents/Footer/Footer';
import { Header } from 'app/compornents/Header/Header';
import { getDetail, getBlogs } from 'app/libs/client';
import Link from 'next/link';
import React from 'react';

// 静的パスを生成する関数
export async function generateStaticParams() {
  const { contents } = await getBlogs();

  return contents.map((blog: { id: string; }) => ({
    blogId: blog.id,
  }));
}

// サーバーコンポーネントとしての詳細ページ
export default async function StaticDetailPage({ params: { blogId },}: { params: { blogId: string };}) {
  const blog = await getDetail(blogId);

  return (
    <div className='content'>
      <Header />
      <div className='m-10 pt-20 leading-10'>
        <h1 className='pb-1 text-lg font-bold'>{blog.title}</h1>
        <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
        {/* <br></br> */}
        <div className='mb-10'
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