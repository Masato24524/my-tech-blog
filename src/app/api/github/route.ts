export const runtime = "edge";

import { headers } from "next/headers";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { NextRequest, NextResponse } from "next/server";

// if (!process.env.NEXT_PUBLIC_SERVICE_DOMAIN) {
//   throw new Error("MICROCMS_SERVICE_DOMAIN is requierd");
// }

// if (!process.env.NEXT_PUBLIC_API_KEY) {
//   throw new Error("MICROCMS_API_KEY is required");
// }

// export const client = createClient({
//   serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN,
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
// });

export interface md_datas {
  source: "github";
  id: string;
  title: string;
  date?: string;
  content: string;
  description?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  meta?: {
    title: string;
    description: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
  topics?: {
    id?: string;
    tag: string;
  }[];
}

export type BlogData = {
  // totalCount: number;
  // limit: number;
  // offset: number;
  contents: md_datas[];
};

export type Tag = {
  id?: string;
  // name: string;
  tag: string;
};

export type TagData = {
  totalCount: number;
  contents: Tag[];
};

// ブログ一覧を取得する関数
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    return NextResponse.json({ articles: [] });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// export async function GET(request: Request) {
//   const url = new URL(request.url);

//   try {
//     const getBlogsRepo = blogsRepo();
//     return NextResponse.json(getBlogsRepo);
//   } catch (error) {
//     NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// タグデータを取得
//   const tags = await client.get<TagData>({
//     endpoint: `tags`,
//   });
//   console.log(tags);

//   data.contents.forEach((blog) => {
//     blog.publishedAt = new Date(blog.publishedAt).toISOString();
//   });
//   return { data, tags };
// }

// 特定のブログ詳細を取得する関数
// export async function getDetail(blogId: string): Promise<Blog> {
//   const timestamp = new Date().getTime();
//   const data = await client.get<Blog>({
//     endpoint: `blogs/${blogId}?timestamp=${timestamp}`,
//     contentId: blogId,
// queries: { cache: 'no-cache' }, //キャッシュを無効化する。localhost用設定の���め、不要であれば削除。
//   });
//   return data;
// }
