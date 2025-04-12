"use client";

import Link from "next/link";

type PaginationProps = {
  totalPages: number;
  initialPage: number;
  pagenationOffset: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  initialPage,
  pagenationOffset,
}) => {
  // const [currentPage, setCurrentPage] = useState(initialPage || 1);

  const renderPageLink = (page: number): JSX.Element => {
    // const isDisabled = initialPage === page;
    return (
      <Link
        href={page === 1 ? "/" : `/${page}`}
        // href={`/pages/${page}`}
        className={`text-white p-4 py-3 m-2 mb-10 rounded-md ${
          initialPage === page
            ? "bg-blue-500 cursor-not-allowed"
            : "bg-gray-400"
        }`}
      >
        {page}
      </Link>
    );
  };

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  console.log(totalPages);

  return (
    <div className="">
      {/* ページ番号の記載 */}
      <div className="flex mb-10">
        {pageNumbers.map((number) => (
          <div key={number}>{renderPageLink(number)}</div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
