const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    BACKEND_URL: "http://localhost:8000",
  },
  
};

module.exports = nextConfig
