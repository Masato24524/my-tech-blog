import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getBlogs } from 'app/libs/client';
import { Header } from 'app/compornents/Header/Header';
import './index.css';
import { Profile } from 'app/compornents/profile/Profile';

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
    <div className='bg-[url(/unsplash.jpg)]'>
      <div > </div>
      <Header />
      <div className='flex'>
        <div className='w-full m-10'>
          <h1 className='inline text-3xl font-bold pb-12'>Blog List</h1>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <h2 className='pt-12 pb-2'>
                <Link href={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>
              <p className=''>{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
          ))}
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button className='bg-gray-300 px-2 m-5 mb-96 rounded-lg'
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
        
        <Profile />
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