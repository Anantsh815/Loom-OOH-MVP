import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "Loom-OOH-MVP";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : undefined,
};

export default nextConfig;
