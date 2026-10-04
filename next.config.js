/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages (configure-pages also injects this in CI).
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
