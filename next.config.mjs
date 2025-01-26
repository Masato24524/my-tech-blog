/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    SERVICE_DOMAIN: process.env.SERVICE_DOMAIN,
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
