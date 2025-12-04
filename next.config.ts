import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  serverExternalPackages: ["pino", "pino-pretty", "thread-stream"],
};

export default nextConfig;
