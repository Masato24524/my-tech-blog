"use client";

import { getBlogs } from "app/libs/client";
import React, { useEffect, useState } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

export const Pagination: React.FC<PaginationProps> = () => {
  const [data, setData] = useState<{
    totalCount: number;
    limit: number;
  } | null>(null);
  const [currentPage, setCrrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBlogs();
      setData({
        totalCount: result.data.totalCount,
        limit: result.data.limit,
      });
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(data.totalCount / data.limit);

  return (
    <div>
      {/* ページ番号の記載 */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="bg-gray-300 px-2 m-5 mb-10 rounded-lg"
            key={index}
            onClick={() => {
              window.location.href = `/blogs?page=${index + 1}`;
            }}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
