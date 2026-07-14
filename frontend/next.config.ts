import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/products/titanium-silver-sunshade",
        destination: "/products/nano-titanium-windshield-umbrella",
        permanent: true,
      },
      {
        source: "/products/premium-leather-gap-console",
        destination: "/products/wazzen-airsafe-tire-inflator",
        permanent: true,
      },
      {
        source: "/products/hepa-car-vacuum",
        destination: "/products/wazzen-glassguard-chip-system",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
