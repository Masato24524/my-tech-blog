import type { Metadata } from "next";
// import { Noto_Sans_JP} from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-noto-sans-jp", 
});

//ページ一覧のメタデータ
export const metadata: Metadata = {
  title: "Masato's tech Blog",
  description: "本ブログは未経験からフロントエンドエンジニアを目指している、自身のポートフォリオも兼ねています。ブログページをNext.js/Vercel＋microCMSで構成しました。",
  openGraph: {
    title: "Masato's tech Blog",
    description: "本ブログは未経験からフロントエンドエンジニアを目指している、自身のポートフォリオも兼ねています。ブログページをNext.js/Vercel＋microCMSで構成しました。",
    url: "<https://my-tech-blog-five.vercel.app/>",
    siteName: "Masato's tech Blog",
    images: [
      {
        url: "",
        width: "",
        height: "",
      }
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
      {/* GoogleAnalyticsコンポーネントの追加 */}
      <GoogleAnalytics gaId={process.env.GA_ID ?? ""} />
    </html>
  );
}
