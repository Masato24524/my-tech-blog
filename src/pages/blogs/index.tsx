import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getBlogs } from '../../app/libs/client';

const ITEMS_PER_PAGE = 10;

type Blog = {
  id: string;
  title: string;
  publishedAt: string;
};

type BlogsPageProps = {
  blogs: Blog[];
  totalPages: number;
  currentPage: number;
};

const BlogsPage = ({ blogs, totalPages, currentPage }: BlogsPageProps) => {
  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map((blog) => (
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
          <button
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = parseInt(context.query.page as string, 10) || 1;
  const { contents, totalCount } = await getBlogs(ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE);

  return {
    props: {
      blogs: contents,
      totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
      currentPage,
    },
  };
};

export default BlogsPage;