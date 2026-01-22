import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;




// t makes your frontend talk to backend WITHOUT writing backend URL everywhere.

// So instead of doing this  (messy + CORS problems)

// fetch("http://localhost:5000/api/projects")


// You can simply do this 

// fetch("/api/projects")