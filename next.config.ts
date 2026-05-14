import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/waitlist",
        destination: "https://app.inboxbuster.com/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
