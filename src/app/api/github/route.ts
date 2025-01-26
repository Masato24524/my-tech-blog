import { headers } from "next/headers";
import matter from "gray-matter";

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
export async function getBlogsRepo(
  limit: number = 5,
  offset: number = 0
): Promise<md_datas[]> {
  const timestamp = new Date().getTime();
  const zennArticles: Promise<any> = await fetch(
    "https://api.github.com/repos/Masato24524/Zenn-contents/contents/articles/",
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      // キャッシュの設定
      next: { revalidate: 3600 }, // 1時間ごとに再取得
    }
  )
    // if (zennArticles.ok) {
    //   throw new Error(`HTTP error! status: $(zennArticles).status}`);
    // }
    // console.log(`repo's(zennArticles)`, zennArticles);
    // const fileData = await(zennArticles).json();
    // const content = atob(fileData.content);
    // console.log("Markdown content:", content);
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.error("Error fething(zennArticles):", error);
      throw new Error("データ取得中にエラーが発生しました");
    });
  console.log("zennArticlesLog", zennArticles);

  // 上記のメタ情報からファイルデータを取得
  const md_datas: md_datas[] = await (async (zennArticles: any) => {
    if (!zennArticles) {
      return [];
    }

    return (await Promise.all(
      zennArticles.map(async (article: any) => {
        const md_data = await fetch(
          "https://api.github.com/repos/Masato24524/Zenn-contents/contents/articles/" +
            article.name,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            next: { revalidate: 3600 }, // 1時間ごとに再取得
          }
        )
          .then((res: any) => {
            return res.json();
          })
          .catch((error: any) => {
            console.log("Error fetching md_data:", error);
            return null; // エラー時に null を返す
          });

        // console.log("md_data", md_data);
        //取得したデータをbase64からutf-8に変換
        const buffer: any = Buffer.from(md_data.content, "base64");
        // console.log("buffer", buffer);
        const fileContents = buffer.toString("utf-8");
        console.log("fileContents", fileContents);

        // mdファイルの構文を解析してメタ情報とコンテンツをオブジェクトに格納する
        const matterResult: any = matter(fileContents);
        // console.log("matterResult", matterResult); // matterResult の内容を確認
        if (matterResult.data.published) {
          // 一時的に published が falseの場合で記事取得
          return null; // published でない場合は null を返す
        }
        return {
          source: "github",
          id: article.name.replace(/\.md$/, ""),
          ...(matterResult.data as {
            title: string;
            date: string;
            topics: string;
          }),
          content: matterResult.content,
        };
      })
    )) as any[]; // 型アサーションを追加
  })(zennArticles);
  console.log("md_datas", md_datas);

  const removeFlasyDatas = md_datas.filter(Boolean);
  console.log("removeFlasyDatas", removeFlasyDatas);
  return removeFlasyDatas;
}

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
