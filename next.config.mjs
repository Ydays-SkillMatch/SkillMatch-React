/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:8000",
  },
  images: {
    domains: ["randomuser.me", "images.unsplash.com"],
  },
};

export default nextConfig;
