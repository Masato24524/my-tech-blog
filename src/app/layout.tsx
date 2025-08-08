import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_JP } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import "@splidejs/splide/dist/css/splide.min.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

//ページ一覧のメタデータ
export const metadata: Metadata = {
  title: { default: "Masato's tech Blog", template: "%s | Masato Tech Blog" },
  description:
    "本ブログは未経験からフロントエンドエンジニアを目指している、自身のポートフォリオも兼ねています。ブログページをNext.js/Vercel＋microCMSで構成しました。",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Web開発",
    "プログラミング",
  ],
  authors: [{ name: "Masato" }],
  creator: "Masato",
  openGraph: {
    title: "Masato's tech Blog",
    description:
      "本ブログは未経験からフロントエンドエンジニアを目指している、自身のポートフォリオも兼ねています。ブログページをNext.js/Vercel＋microCMSで構成しました。",
    url: "https://www.masato-tech-blog.com",
    siteName: "Masato's tech Blog",
    images: [
      {
        url: "https://www.masato-tech-blog.com/my-icon.jpg",
        width: "1200",
        height: "630",
        alt: "Masato's tech Blog",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masato's tech Blog",
    description:
      "Next.js、React、JavaScript、TypeScriptを中心としたフロントエンド技術ブログ",
    creator: "@ma_sato2024", // ← Twitterアカウントがあれば
  },
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.masato-tech-blog.com" />

        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Masato's tech Blog",
              url: "https://www.masato-tech-blog.com",
              description:
                "Next.js、React、JavaScript、TypeScriptを中心としたフロントエンド技術ブログ",
              author: {
                "@type": "Person",
                name: "Masato",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.masato-tech-blog.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={notoSansJp.variable}>
        <AppRouterCacheProvider>
          {/* <ButtonReturnProvider> */}
          {children}
          {/* Google AdSense */}
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
          {/* <ButtonReturn /> */}
          {/* GoogleAnalyticsコンポーネントの追加 */}
          <GoogleAnalytics gaId={process.env.GA_ID ?? ""} />
          {/* </ButtonReturnProvider> */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
