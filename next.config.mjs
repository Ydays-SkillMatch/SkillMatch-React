/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:8080",
  },
  images: {
    domains: ["randomuser.me", "images.unsplash.com"],
  },
};

export default nextConfig;
