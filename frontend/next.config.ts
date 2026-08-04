import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://youtube-media-downloader-0gzl.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
