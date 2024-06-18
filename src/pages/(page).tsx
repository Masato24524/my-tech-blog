"use client"; // クライアントコンポーネントとしてマーク

import { getBlogs } from '../app/libs/client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 10;

// ブログ一覧ページのサーバーコンポーネント
export default async function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // 非同期関数を useEffect 内で定義し、呼び出す
    const fetchData = async () => {
      try {
        const { contents, totalCount } = await getBlogs(ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE);
        setBlogs(contents);
        setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      }

    }
    fetchData();
  }, [currentPage]);

  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map((blog: { id: string; title: string; publishedAt: string }) => (
        <div key={blog.id}>
          <h2>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </h2>
          <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
        </div>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

