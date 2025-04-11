import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "normaprostorage.blob.core.windows.net",
        pathname: "**", // acepta todos los paths
      },
    ],
  },
};

export default nextConfig;
