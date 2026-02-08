import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    ...(process.env.NODE_ENV === 'development' && { dangerouslyAllowLocalIP: true }),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lite-tech-api.litebox.ai',
      },
      {
        protocol: 'https',
        hostname: 'litetech-assets.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
};

export default nextConfig;
