import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 on Vercel: ensure ESM @swc/helpers are traced for proxy/middleware lambdas
  outputFileTracingIncludes: {
    "*": ["./node_modules/@swc/helpers/**/*"],
  },
};

export default nextConfig;
