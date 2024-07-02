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
    const timestamp = new Date().getTime();
    const data = await client.get<BlogData>({
        endpoint: `blogs/?timestamp=${timestamp}`,
        queries: {
            limit,
            offset,
            filters: 'publishedAt[less_than]=now()',
            // cache: 'no-cache' //キャッシュを無効化する。localhost用設定のため、不要であれば削除。
        },
    });
    data.contents.forEach(blog => {
        blog.publishedAt = new Date(blog.publishedAt).toISOString();
    })
    return data;
  }
  
// 特定のブログ詳細を取得する関数
export async function getDetail(blogId: string): Promise<Blog> {
    const timestamp = new Date().getTime();
    const data = await client.get<Blog>({
        endpoint: `blogs/${blogId}?timestamp=${timestamp}`,
        contentId: blogId,
    // queries: { cache: 'no-cache' }, //キャッシュを無効化する。localhost用設定のため、不要であれば削除。
    });
return data;
}