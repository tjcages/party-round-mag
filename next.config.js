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
  async redirects() {
    return [
      {
        source: "/pages/infinite-ads",
        destination: "https://www.infinite-pr-ads.com/",
        permanent: false,
      },
      {
        source: "/pages/gold-nft",
        destination: "/",
        permanent: false,
      },
      {
        source: "/pages/touch-grass",
        destination: "https://touch-grass-kits.webflow.io/",
        permanent: false,
      },
      {
        source: "/pages/spotify",
        destination: "https://open.spotify.com/playlist/0adA1s2Wejjv2j2faf3EME?si=Bzk-dC2PTMORr0ATrqpauA",
        permanent: false,
      },
      {
        source: "/pages/bear-goggles",
        destination: "https://www.beargoggles.xyz/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
