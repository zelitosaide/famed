/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // protocol: "http",
        // hostname: "api.med.uem.mz",
        hostname: "med.uem.mz",
        // hostname: "localhost",
        port: "",
        // port: "3001",
        pathname: "/**",
        // pathname: '/account123/**',
      },
    ],
  },
};

// remotePatterns: [
//   {
//     // protocol: "https",
//     // protocol: "http",
//     // hostname: "api.med.uem.mz",
//     // hostname: "localhost",
//     // port: "",
//     // port: "3001",
//     // pathname: "/**",
//     // pathname: '/account123/**',
//     //
//     protocol: 'http',
//     hostname: 'localhost',
//     port: '3001',
//     pathname: '/uploads/**',
//   },
// ],

module.exports = nextConfig;
