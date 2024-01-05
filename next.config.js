/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/.well-known/:file',
        destination: '/api/.well-known/:file',
        permanent: false,
      },
    ];
  },
  async headers() {
    const headers = [];
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
