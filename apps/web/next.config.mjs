/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@edu-hub/types", "@edu-hub/api"],
}

export default nextConfig
