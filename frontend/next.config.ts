/** @type {import('next').NextConfig} */

const securityHeaders = async () => {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Cache-Control",
          value: "public, max-age=86400",
        },
      ],
    },
  ];
};

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "vtexai.kinsta.cloud",
      "h2p.c25.myftpupload.com",
      "y55.fa4.myftpupload.com",
    ],
  },
  async headers() {
    return await securityHeaders();
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:2000/api/:path*",
      },
      {
        source: "/create-checkout",
        destination: "http://localhost:2000/create-checkout", 
      },
    ];
  },
};

module.exports = nextConfig;
