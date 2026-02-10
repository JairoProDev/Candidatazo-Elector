import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@candidatazo/types", "@candidatazo/utils"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
