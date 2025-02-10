/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    SERVICE_DOMAIN: process.env.SERVICE_DOMAIN,
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["www.masato-tech-blog.com", "masato-tech-blog.com"],
  },
};

export default nextConfig;
