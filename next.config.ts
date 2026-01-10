import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  images: {
    // This allows Next.js to serve the image directly without 
    // trying to "fetch and process" it through the internal proxy
    unoptimized: process.env.NODE_ENV === 'development', 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "down-ph.img.susercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",  
        pathname: "/uploads/**",
      }
    ],
  },
};

export default nextConfig;
