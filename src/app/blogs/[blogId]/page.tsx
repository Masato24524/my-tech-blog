// app/blogs/[blogId]/page.tsx
import { getDetail, getBlogs } from 'app/libs/client';
import Link from 'next/link';

// 静的パスを生成する関数
export async function generateStaticParams() {
  const { contents } = await getBlogs();

  return contents.map((blog: { id: string; }) => ({
    blogId: blog.id,
  }));
}

// サーバーコンポーネントとしての詳細ページ
export default async function StaticDetailPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const blog = await getDetail(blogId);

  return (
    <>
      <p>{blog.title}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: blog.body,
        }}
      />
      <br></br>
      <Link href={'/blogs'} className="return-top">記事一覧に戻る</Link>
    </>
  );
};