import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // /api/* se reenvía al backend (local por defecto; en Vercel: BACKEND_URL=https://api...).
  async rewrites() {
    const backend = process.env.BACKEND_URL || 'http://localhost:3000';
    return [{ source: '/api/:path*', destination: `${backend}/:path*` }];
  },
};

export default nextConfig;
