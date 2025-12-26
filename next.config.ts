/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

     domains: [
      "cdn.shopify.com", // ✅ allow Shopify images
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-us-west-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
