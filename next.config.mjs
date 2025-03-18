/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    SERVICE_DOMAIN: process.env.SERVICE_DOMAIN,
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["www.masato-tech-blog.com", "masato-tech-blog.com"],
  },

  //Claudflare用の設定
  images: {
    unoptimized: true, // Cloudflareの制約に対応
  },
  output: "standalone",
  // Cloudflare Pagesのファイルサイズ制限に対応するための設定
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: "all",
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 20000000, // 20MB以下のチャンクに分割
    };
    return config;
  },
};

export default nextConfig;
