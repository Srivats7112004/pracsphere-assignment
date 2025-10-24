import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  typescript: { tsconfigPath: "./tsconfig.build.json" },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.cloudinary.com" },
    ],
  },
};

export default config;
