import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Self-contained build used by the Docker image (Hugging Face Space).
  output: "standalone",
};

export default nextConfig;
