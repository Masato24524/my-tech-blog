import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getBlogs } from 'app/libs/client';
import { Header } from 'app/compornents/Header/Header';
import { Profile } from 'app/compornents/profile/Profile';

import './index.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const CustomHead = () => {
  return (
    <Head>
      <title> {`Masato's tech Blog`} </title>;
      <meta name="description" content="サンプルページの説明文" />;
      <meta name="viewport" content="width=device-width, initial-scale=1" />;
    </Head>
  );
};

const BlogsPage = ({ blogs, totalPages, currentPage }: BlogsPageProps) => {

  return (
  <div>
      <CustomHead />
      {/* <Router>       */}
        <Header />
        {/* <Routes>
          <Route path="/blogs" element={<BlogsPage blogs={[]} totalPages={0} currentPage={0} />} />
        </Routes>
      </Router> */}


      <div id='container' className='flex mt-10'>
        <div id='main' className='w-full mt-40 ml-80'>
        {/* Blog List */}
          <h1 className='inline text-3xl font-bold pb-12'></h1>
          {/* 各投稿記事の表示 */}
          {blogs.map((blog) => (
            <div key={blog.id} className='border m-4 p-2 rounded-lg border-gray-300'>
              {/* 記事のタイトル */}
              <h2 className='pb-12 text-lg font-bold'>
                <Link href={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>
              {/* 日付の生成 */}
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
        {/* プロフィール欄の表示 */}
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