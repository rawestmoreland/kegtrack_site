/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  async headers() {
    const headers = [];
    console.log({ context: process.env.CONTEXT });
    if (process.env.CONTEXT !== 'production') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
};

module.exports = nextConfig;
