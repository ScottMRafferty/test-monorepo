/** @type {import('next').NextConfig} */
const nextConfig = {
  // This helps Vercel trace dependencies in a monorepo
  output: 'standalone', 
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreDuringBuilds: true }
};

module.exports = nextConfig;