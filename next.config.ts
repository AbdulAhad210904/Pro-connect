import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '/**',
      },
    ],
    domains: ['res.cloudinary.com'],
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET, // Inject environment variable
  },
};

export default nextConfig;
