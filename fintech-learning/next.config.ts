import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['example.com', 'anotherdomain.com', 'lh3.googleusercontent.com'],
  },
};
// Add 'lh3.googleusercontent.com' to your existing domains array

export default nextConfig;
