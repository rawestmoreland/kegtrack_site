/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  async headers() {
    const headers = [];
    headers.push({
      source: '/.well-known/apple-app-site-association',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
    });
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
