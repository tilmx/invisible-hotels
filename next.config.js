/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  experimental: {
    scrollRestoration: true
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.invisiblehotels.com" }],
        destination: "https://invisiblehotels.com/:path*",
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
