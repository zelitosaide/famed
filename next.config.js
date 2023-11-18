/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.med.uem.mz",
        port: "",
        pathname: "/**",
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
