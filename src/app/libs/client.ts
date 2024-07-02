import { createClient } from 'microcms-js-sdk';

if (!process.env.NEXT_PUBLIC_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is requierd")
}

if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
    serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN,
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export type Blog = {
    id: string;
    title: string;
    publishedAt: string;
    body: string;
}

export type BlogData = {
    totalCount: number;
    limit: number;
    // offset: number;
    contents: Blog[];
}

// ブログ一覧を取得する関数
export async function getBlogs(limit: number = 10, offset: number = 0): Promise<BlogData> {
    const data = await client.get<BlogData>({
        endpoint: 'blogs',
        queries: {
            limit,
            offset,
            filters: 'publishedAt[less_than]=now()'
        },
    });
    return data;
  }
  
// 特定のブログ詳細を取得する関数
export async function getDetail(blogId: string): Promise<Blog> {
const data = await client.get<Blog>({
    endpoint: 'blogs',
    contentId: blogId,
});
return data;
}