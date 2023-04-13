/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
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
  async rewrites() {
    return [
      {
        source: '/privacy-policy',
        destination: '/html/privacy.html',
      },
    ];
  },
};

module.exports = nextConfig;
