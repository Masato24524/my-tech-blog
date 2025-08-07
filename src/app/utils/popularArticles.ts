import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA4_PROPERTY_ID;
const credentials = {
  client_email: process.env.GA4_CLIENT_EMAIL,
  private_key: process.env.GA4_PRIVATE_KEY,
  project_id: process.env.GA4_PROJECT_ID,
};

console.log("=== 設定確認 ===");
console.log("プロパティID:", propertyId);
console.log("クライアントメール:", credentials.client_email);
console.log("プロジェクトID:", credentials.project_id);
console.log(
  "プライベートキー（最初の50文字）:",
  credentials.private_key?.substring(0, 50)
);

const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

export interface PopularArticle {
  title: string;
  path: string;
  pageViews: number;
  slug?: string;
}

export async function getPopularArticles(): Promise<PopularArticle[]> {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "30daysAgo", // 過去30日間
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "pagePath",
        },
        {
          name: "pageTitle",
        },
      ],
      metrics: [
        {
          name: "screenPageViews",
        },
      ],
      orderBys: [
        {
          metric: {
            metricName: "screenPageViews",
          },
          desc: true,
        },
      ],
      limit: 10, // 多めに取得して、後でフィルタリング
    });

    console.log("✅ 接続成功！");
    console.log("データ行数:", response.rows?.length || 0);

    if (response.rows && response.rows.length > 0) {
      console.log("サンプルデータ:", response.rows[0]);
    }
    console.log("response", response);

    const articles: PopularArticle[] = [];

    response.rows?.forEach((row) => {
      const path = row.dimensionValues?.[0]?.value || "";
      const title = row.dimensionValues?.[1]?.value || "";
      const pageViews = parseInt(row.metricValues?.[0]?.value || "0");

      // ブログ詳細ページのみフィルタリング
      if (path.includes("/blogs/github") || path.includes("blogs/microcms")) {
        // slugを抽出
        const slug = path.split("/").pop();

        articles.push({ title, path, pageViews, slug });
      }
    });

    console.log("articlesPop", articles);

    return articles.slice(0, 3); // TOP3を返す
  } catch (error) {
    console.error("Error fetching popular articles:", error);
    console.error("❌ 接続失敗");
    if (typeof error === "object" && error !== null) {
      console.error("エラーコード:", (error as any).code);
      console.error("エラーメッセージ:", (error as any).message);
      console.error(
        "エラー詳細:",
        JSON.stringify((error as any).details, null, 2)
      );
    }
    return []; // エラー時は空配列を返す}
  }
}
