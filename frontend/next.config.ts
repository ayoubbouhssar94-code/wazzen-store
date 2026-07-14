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
        destination: "/products/wazzen-foldable-windshield-umbrella",
        permanent: true,
      },
      {
        source: "/products/premium-leather-gap-console",
        destination: "/products/wazzen-portable-tire-inflator",
        permanent: true,
      },
      {
        source: "/products/hepa-car-vacuum",
        destination: "/products/wazzen-windshield-crack-repair-kit",
        permanent: true,
      },
      {
        source: "/products/nano-titanium-windshield-umbrella",
        destination: "/products/wazzen-foldable-windshield-umbrella",
        permanent: true,
      },
      {
        source: "/products/wazzen-airsafe-tire-inflator",
        destination: "/products/wazzen-portable-tire-inflator",
        permanent: true,
      },
      {
        source: "/products/wazzen-glassguard-chip-system",
        destination: "/products/wazzen-windshield-crack-repair-kit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
