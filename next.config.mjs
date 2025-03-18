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
  output: "export",
};

export default nextConfig;
