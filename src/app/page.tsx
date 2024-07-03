import './page.css'
import Head from 'next/head';
import Link from 'next/link';
import { getBlogs } from 'app/libs/client';
import { Header } from 'app/compornents/Header/Header';
import { Footer } from 'app/compornents/Footer/Footer';
import { Profile } from 'app/compornents/profile/Profile';
import Pagination from './compornents/Pagination/Pagination';
import { JSDOM } from 'jsdom';


const ITEMS_PER_PAGE = 10;

type Blog = {
  id: string;
  title: string;
  publishedAt: string;
  body: string;
};

const CustomHead = async () => {
  const data = await getBlogs();
  const blogs: Blog[] = data.contents;
  return (
    <Head>
      <title> {`Masato's tech Blog`} </title>
      <meta name="description" content="本ブログは未経験からフロントエンドエンジニアを目指している、自身のポートフォリオも兼ねています。ブログページをNext.js/Vercel＋microCMSで構成しました。" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="ページの種類" />
      <meta property="og:url" content="ページのURL" />
      {/* <meta property="og:image" content="アイキャッチのURL" /> */}
      {/* <meta property="og:title" content={blogs.title} /> */}
      <meta property="og:description" content="デスクリプション" />
      <meta property="og:locale" content="ja_JP" />

    </Head>
  );
};

// HTMLタグを安全に表示する関数
const sanitizeHtml = (htmlString: string): string => {
  const { window } = new JSDOM;
  const { DOMParser } = window;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  return doc.body.innerHTML;
}

// 文字列を指定の文字数でカットする関数
const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + '...';
}

const BlogsPage = async (): Promise<JSX.Element> => {
  const data = await getBlogs();
  const blogs: Blog[] = data.contents;
  const totalPages = Math.ceil(data.totalCount / data.limit);
  const currentPage = 1;

  // const blog = await getDetail(blogId);

  return (
    <div className='w-screen'>
      <CustomHead />
      <Header />

      <div id='container' className='flex w-5/6 h-auto mt-4 mx-auto'>
        <div id='main' className='w-full mx-auto mt-40 ml-4'>
        {/* Blog List */}
          <h1 className='inline text-3xl font-bold pb-12'></h1>
          {/* 各投稿記事の表示 */}
          {blogs.map((blog: Blog) => {
              // const maxInnerHtml = (body: string, length: number) => {
              //   return body.length > length ? `${body.substring(0, length)}...`: body; 
              //   // return body.slice(0, maxLength) + '...';
              // };
            
              const idPhoto: number = Math.floor(Math.random()*1000);
              const timestamp: number = new Date().getTime();
            
              return (
                <Link href={`/blogs/${blog.id}`}>
                  <div key={blog.id} className='m-2 mb-8 p-4 pb-1 text-gray-950 bg-white rounded-lg shadow-md hover:bg-blue-100'>
                    {/* 記事のタイトル */}
                    <h2 className='pb-2 text-lg font-bold'>
                        {blog.title}
                    </h2>
                    <div className='flex ml-2 mb-2'>
                      <img className='w-1/2 h-1/2 mr-4' src={`https://picsum.photos/seed/${idPhoto}/1200/800.jpg?${timestamp}`} alt='No image' />
                      {/* 記事内容のプレビュー */}
                      <div className='text-sm mb-1'>
                        {/* 危険なHTMLを安全に表示  */}
                        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(truncateString(blog.body, 150)) + `...` }} />
                      {/* {removeHtmlTags(blog.body.slice(0, 200))}; */}
                      </div> 
                    </div>
                    {/* 日付の生成 */}
                    <p className='text-sm mb-4'>&nbsp;🕒{new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</p>
                  </div>
                </Link>
              );
          })}
          {/* ページ番号の記載 */}
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
        {/* プロフィール欄の表示 */}
        <Profile />
      </div>
      <Footer />
    </div>
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