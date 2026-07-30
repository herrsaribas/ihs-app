import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for shared hosting (Hostinger public_html):
  // `npm run build` writes the deployable site into the `out/` folder.
  output: "export",
  // Emit /sayfa/index.html so Apache serves clean URLs without extra config.
  trailingSlash: true,
};

export default nextConfig;
