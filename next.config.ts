import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/report-file": ["./private/**"],
  },
};

export default nextConfig;
