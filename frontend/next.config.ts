import type { NextConfig } from "next";
import { NextConfigComplete } from "next/dist/server/config-shared";

const securityHeaders: NextConfigComplete["headers"] = async () => {
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

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["vtexai.kinsta.cloud",'h2p.c25.myftpupload.com',"y55.fa4.myftpupload.com"],
  },
  headers: securityHeaders,
};

export default nextConfig;
