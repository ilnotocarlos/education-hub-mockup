import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@edu-hub/ui-neutral", "@edu-hub/types"],
  reactStrictMode: true,
}

export default nextConfig
