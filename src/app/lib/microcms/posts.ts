import { createClient } from "microcms-js-sdk";

if (!process.env.SERVICE_DOMAIN) {
  throw new Error("SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
  throw new Error("API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

export type Blog = {
  source: "microcms" | "github";
  id: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  body: string;
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
  tag?: { id?: string; tag: string }[];
};

export type BlogData = {
  totalCount: number;
  limit: number;
  // offset: number;
  // source: "microcms";
  contents: Blog[];
};

export type Tag = {
  id: string;
  // name: string;
  tag: string;
};

export type TagData = {
  totalCount: number;
  contents: Tag[];
};

// ブログ一覧を取得する関数
export async function getBlogs(
  limit: number = 5,
  offset: number = 0
): Promise<{ data: BlogData }> {
  // ): Promise<{ data: BlogData; tags: TagData }> {
  const timestamp = new Date().getTime();

  try {
    const data = await client.get<BlogData>({
      endpoint: `blogs/?timestamp=${timestamp}&limit=${limit}`, //limit値がバグで反映されないため、直接URLに指定
      queries: {
        limit,
        offset,
        filters: "publishedAt[less_than]=now()",
        // cache: "no-cache", //キャッシュを無効化する。localhost用設定のため、不要であれば削除。
      },
    });
    // console.log("predatas", predatas);
    // const data = [
    //   ...predatas.contents.map((predata) => ({
    //     source: "microcms",
    //     id: predata.id,
    //     title: predata.title,
    //     publishedAt: predata.publishedAt,
    //     updatedAt: predata.updatedAt,
    //     body: predata.body,
    //     description: predata.description,
    //     image: predata.image,
    //     meta: predata.meta,
    //     tag: predata.tag,
    //   })),
    // ];

    // console.log(`Requested limit: ${limit}`);
    // console.log("dataA", data);

    // タグデータを取得
    const tags = await client.get<TagData>({
      endpoint: `tags`,
    });
    // console.log(tags);

    // publishedAtをISO8601形式に変換
    data.contents.forEach((blog) => {
      blog.publishedAt = new Date(blog.publishedAt).toISOString();
      blog.source = "microcms";
    });
    //   console.log("dataU", data.contents);
    return { data };
    // return { data, tags };
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
    return {
      data: {
        totalCount: 0,
        limit: 0,
        contents: [],
      },
    };
  }
}

// 特定のブログ詳細を取得する関数
export async function getDetail(blogId: string): Promise<Blog | null> {
  const timestamp = new Date().getTime();
  try {
    const data = await client.get<Blog>({
      endpoint: `blogs/${blogId}?timestamp=${timestamp}`,
      contentId: blogId,
      // queries: { cache: 'no-cache' }, //キャッシュを無効化する。localhost用設定のため、不要であれば削除。
    });
    return data;
  } catch (error) {
    console.error(`microCMS記事(${blogId})の取得に失敗しました:`, error);
    return null;
  }
}
