/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "s3-us-west-2.amazonaws.com",
      "win98icons.alexmeub.com",
      "screenshots.webflow.com",
      "uploads-ssl.webflow.com",
      "pbs.twimg.com",
    ],
  },
};

module.exports = nextConfig;
