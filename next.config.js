/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  experimental: {
    optimizeCss: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/",
        headers: [
          { key: "Link", value: "<https://fonts.googleapis.com>; rel=preconnect" },
          { key: "Link", value: "<https://fonts.gstatic.com>; rel=preconnect; crossorigin" },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // ============================================
      // SEO CANNIBALIZATION FIXES - FIETSCOMPUTER
      // ============================================
      { source: "/blog/beste-fietscomputer-beginners/", destination: "/blog/beste-fietscomputer/", permanent: true },
      { source: "/blog/beste-fietscomputer-onder-200/", destination: "/blog/beste-fietscomputer/", permanent: true },
      { source: "/blog/beste-budget-fietscomputer/", destination: "/blog/beste-fietscomputer/", permanent: true },
      { source: "/blog/fietscomputer-met-navigatie/", destination: "/blog/beste-fietscomputer-navigatie/", permanent: true },

      // ============================================
      // SEO CANNIBALIZATION FIXES - OVERIG
      // ============================================
      { source: "/blog/beste-fietsbril-goedkoop", destination: "/blog/beste-fietsbril", permanent: true },
      { source: "/blog/michelin-power-cup-vs-continental-gp5000", destination: "/blog/michelin-power-cup-vs-gp5000", permanent: true },
      { source: "/blog/garmin-vs-wahoo-fietscomputer", destination: "/blog/garmin-vs-wahoo", permanent: true },
      { source: "/blog/garmin-vs-wahoo-elemnt", destination: "/blog/garmin-vs-wahoo", permanent: true },
      { source: "/blog/fietscomputer-met-navigatie", destination: "/blog/beste-fietscomputer-navigatie", permanent: true },

      // ============================================
      // YEARLESS REDIRECTS
      // ============================================
      { source: "/blog/beste-e-bike-heren-2026/", destination: "/blog/beste-e-bike-heren/", permanent: true },
      { source: "/blog/beste-e-bike-stad-2026/", destination: "/blog/beste-e-bike-stad/", permanent: true },
      { source: "/blog/beste-e-bike-trekking-2026/", destination: "/blog/beste-e-bike-trekking/", permanent: true },
      { source: "/blog/beste-energiegels-2026/", destination: "/blog/beste-energiegels/", permanent: true },
      { source: "/blog/beste-energierepen-2026/", destination: "/blog/beste-energierepen/", permanent: true },
      { source: "/blog/beste-fietsbroek-dames-2026/", destination: "/blog/beste-fietsbroek-dames/", permanent: true },
      { source: "/blog/beste-fietskleding-2026/", destination: "/blog/beste-fietskleding/", permanent: true },
      { source: "/blog/beste-fietsschoenen-dames-2026/", destination: "/blog/beste-fietsschoenen-dames/", permanent: true },
      { source: "/blog/beste-fietsschoenen-heren-2026/", destination: "/blog/beste-fietsschoenen-heren/", permanent: true },
      { source: "/blog/beste-fietstrainer-2026/", destination: "/blog/beste-fietstrainer/", permanent: true },
      { source: "/blog/beste-gravel-banden-2026/", destination: "/blog/beste-gravel-banden/", permanent: true },
      { source: "/blog/beste-gravel-schoenen-2026/", destination: "/blog/beste-gravel-schoenen/", permanent: true },
      { source: "/blog/beste-gravel-schoenen-mannen-2026/", destination: "/blog/beste-gravel-schoenen-mannen/", permanent: true },
      { source: "/blog/beste-hartslagmeter-2026/", destination: "/blog/beste-hartslagmeter/", permanent: true },
      { source: "/blog/beste-mtb-banden-2026/", destination: "/blog/beste-mtb-banden/", permanent: true },
      { source: "/blog/beste-mtb-dames-2026/", destination: "/blog/beste-mtb-dames/", permanent: true },
      { source: "/blog/beste-mtb-helm-2026/", destination: "/blog/beste-mtb-helm/", permanent: true },
      { source: "/blog/beste-mtb-jersey-2026/", destination: "/blog/beste-mtb-jersey/", permanent: true },
      { source: "/blog/beste-mtb-kinderen-2026/", destination: "/blog/beste-mtb-kinderen/", permanent: true },
      { source: "/blog/beste-mtb-schoenen-2026/", destination: "/blog/beste-mtb-schoenen/", permanent: true },
      { source: "/blog/beste-racefiets-dames-2026/", destination: "/blog/beste-racefiets-dames/", permanent: true },
      { source: "/blog/beste-wielrenbanden-2026/", destination: "/blog/beste-wielrenbanden/", permanent: true },
      { source: "/blog/e-bike-subsidie-nederland-2026/", destination: "/blog/e-bike-subsidie-nederland/", permanent: true },
      { source: "/blog/fiets-gps-tracker-2026/", destination: "/blog/fiets-gps-tracker/", permanent: true },
      { source: "/blog/mtb-banden-vergelijking-2026/", destination: "/blog/mtb-banden-vergelijking/", permanent: true },
      { source: "/blog/beste-fietscomputer-2026/", destination: "/blog/beste-fietscomputer/", permanent: true },

      // ============================================
      // OLD URL STRUCTURE
      // ============================================
      { source: "/fiets-accessoires/wahoo-vs-garmin/", destination: "/blog/garmin-vs-wahoo/", permanent: true },
      { source: "/fiets-accessoires/beste-garmin-fietscomputer/", destination: "/blog/garmin-edge-540-review/", permanent: true },
      { source: "/fiets-accessoires/beste-wahoo-fietscomputers/", destination: "/blog/wahoo-elemnt-bolt-review/", permanent: true },
      { source: "/fiets-accessoires/vermogensmeter-racefiets/", destination: "/blog/beste-vermogensmeter/", permanent: true },
      { source: "/fiets-accessoires/alarm-voor-fiets/", destination: "/blog/fiets-gps-tracker/", permanent: true },
      { source: "/fiets-accessoires/top-5-fiets-montagestandaarden/", destination: "/blog/fiets-montagestandaard/", permanent: true },
      { source: "/fiets-accessoires/racefiets-zadeltas/", destination: "/blog/beste-racefiets-zadeltas/", permanent: true },
      { source: "/fiets-accessoires/fietsnavigatie-voor-racefietsen/", destination: "/blog/beste-fietscomputer-navigatie/", permanent: true },
      { source: "/fiets-accessoires/beste-indoor-fietstrainer/", destination: "/blog/beste-fietstrainer/", permanent: true },
      { source: "/fiets-accessoires/tacx-fietstrainers/", destination: "/blog/tacx-neo-3m-review/", permanent: true },
      { source: "/fiets-accessoires/wahoo-kickr/", destination: "/blog/wahoo-kickr-core-review/", permanent: true },
      { source: "/fiets-accessoires/wahoo-kickr-move/", destination: "/blog/wahoo-kickr-core-review/", permanent: true },
      { source: "/fiets-accessoires/speedplay-pedalen/", destination: "/blog/beste-fietspedalen/", permanent: true },
      { source: "/fiets-accessoires/zwift-ride/", destination: "/blog/zwift-abonnement-kosten/", permanent: true },
      { source: "/fiets-accessoires/wat-zijn-sks-spatborden/", destination: "/blog/wielrennen-accessoires/", permanent: true },
      { source: "/fietsonderdelen/tubeless-band/", destination: "/blog/tubeless-vs-clincher/", permanent: true },
      { source: "/fietsonderdelen/shimano-groepen/", destination: "/blog/shimano-105-vs-ultegra/", permanent: true },
      { source: "/fietskleding/fietsschoenen-voor-racefiets/", destination: "/blog/beste-fietsschoenen-heren/", permanent: true },
      { source: "/fietskleding/abus-airbreaker/", destination: "/blog/beste-fietshelm/", permanent: true },
      { source: "/fietskleding/beste-fietsshirt/", destination: "/blog/beste-wielrenshirt-zomer/", permanent: true },
      { source: "/tips/zwift-abonnement/", destination: "/blog/zwift-abonnement-kosten/", permanent: true },
      { source: "/tips/binnen-fietsen/", destination: "/blog/beste-fietstrainer/", permanent: true },
      { source: "/tips/goedkope-fietsdragers/", destination: "/blog/beste-fietsendrager-auto/", permanent: true },
      { source: "/tips/fietsendragen-voor-racefiets/", destination: "/blog/beste-fietsendrager-auto/", permanent: true },
      { source: "/tips/schoenendroger/", destination: "/blog/wielrennen-accessoires/", permanent: true },
      { source: "/category/fietsonderdelen/", destination: "/blog/", permanent: true },
      { source: "/page/2/", destination: "/blog/", permanent: true },
      { source: "/page/3/", destination: "/blog/", permanent: true },
      { source: "/page/:num/", destination: "/blog/", permanent: true },

      // ============================================
      // WILDCARD FALLBACKS - MUST BE LAST!
      // ============================================
      { source: "/fiets-accessoires/:slug*", destination: "/blog/", permanent: true },
      { source: "/fietsonderdelen/:slug*", destination: "/blog/", permanent: true },
      { source: "/fietskleding/:slug*", destination: "/categorie/kleding/", permanent: true },
      { source: "/tips/:slug*", destination: "/blog/", permanent: true },
      { source: "/category/:slug*", destination: "/blog/", permanent: true },
    ];
  },
}

module.exports = nextConfig