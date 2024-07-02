import './page.css'
import Head from 'next/head';
import Link from 'next/link';
import { getBlogs } from 'app/libs/client';
import { Header } from 'app/compornents/Header/Header';
import { Footer } from 'app/compornents/Footer/Footer';
import { Profile } from 'app/compornents/profile/Profile';
import Pagination from './compornents/Pagination/Pagination';

const ITEMS_PER_PAGE = 10;

type Blog = {
  id: string;
  title: string;
  publishedAt: string;
  body: string;
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

const BlogsPage = async (): Promise<JSX.Element> => {
  const data = await getBlogs();
  const blogs: Blog[] = data.contents;
  const totalPages = Math.ceil(data.totalCount / data.limit);
  const currentPage = 1;

  // const blog = await getDetail(blogId);

  return (
    <body className='w-screen'>
      <CustomHead />
      <Header />

      <div id='container' className='flex w-4/5 h-auto mt-4 mx-auto'>
        <div id='main' className='w-full mx-auto mt-40 ml-4'>
        {/* Blog List */}
          <h1 className='inline text-3xl font-bold pb-12'></h1>
          {/* 各投稿記事の表示 */}
          {blogs.map((blog: Blog) => {
              const maxInnerHtml = (body: string, length: number) => {
                return body.length > length ? `${body.substring(0, length)}...`: body; 
                // return body.slice(0, maxLength) + '...';
              };
            
              const idPhoto: number = Math.floor(Math.random()*1000);
            
              return (
                <div key={blog.id} className='border m-4 p-2 rounded-lg border-gray-300'>
                {/* 記事のタイトル */}
                <h2 className='pb-10 text-lg font-bold'>
                  <Link href={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </h2>
                <div className='flex ml-2 mb-2'>
                  <img className='w-1/2 mr-4' src={`https://picsum.photos/id/${idPhoto}/1200/800.jpg`} alt='No image' />
                  {/* 記事内容のプレビュー */}
                  <div className='mb-10' dangerouslySetInnerHTML={{
                      __html: maxInnerHtml(blog.body, 20),
                  }}
                  /> 
                </div>
                {/* 日付の生成 */}
                <p className='text-sm'>&nbsp;🕒{new Date(blog.publishedAt).toLocaleDateString()}</p>
              </div>
              );
          })}
          {/* ページ番号の記載 */}
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
        {/* プロフィール欄の表示 */}
        <Profile />
      </div>
      <Footer />
    </body>
  );
};

// ページ番号を生成
// export const BlogPagination = async (context: any) => {
//   const currentPage = parseInt(context.query.page as string, 10) || 1;
//   const { contents, totalCount } = await getBlogs(ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE);

//   return {
//     props: {
//       blogs: contents,
//       totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
//       currentPage,
//     },
//   };
// };

export default BlogsPage;