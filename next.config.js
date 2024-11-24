/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{number}}",
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};
// const nextConfig = {
//     reactStrictMode: true,
//     // swcMinify: true,
//     eslint: {
//       ignoreDuringBuilds: false,
//     },
//     typescript: {
//       ignoreBuildErrors: false,
//     },
//   };

//   module.exports = {
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.svg$/,
//         use: ['@svgr/webpack'],
//       });

//       config.alias = {
//         ...config.alias,
//         '@': path.resolve(__dirname, 'src'),
//       }

//       return config;
//     },
//   };
module.exports = nextConfig;
