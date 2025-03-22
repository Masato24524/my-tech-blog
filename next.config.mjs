/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    SERVICE_DOMAIN: process.env.SERVICE_DOMAIN,
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["www.masato-tech-blog.com", "masato-tech-blog.com"],
    unoptimized: true, // Cloudflareの制約に対応
  },

  //Claudflare用の設定
  output: "standalone",
  trailingSlash: true,
  // Cloudflare Pagesのファイルサイズ制限に対応するための設定
  experimental: {
    // optimizePackageImports: true,　// Next.js14では使用できない
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: "all",
      maxInitialRequests: 25,
      minSize: 10000,
      maxSize: 10000000, // 20MB以下のチャンクに分割
    };

    // キャッシュファイルを生成しない設定を追加
    config.cache = false;

    return config;
  },
};

export default nextConfig;
