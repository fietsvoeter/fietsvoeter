/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Interne blog duplicaten
      { source: '/blog/beste-wielrenbanden-2026/', destination: '/blog/beste-wielrenbanden/', permanent: true },
      { source: '/blog/beste-fietscomputer-2026/', destination: '/blog/beste-fietscomputer/', permanent: true },
      { source: '/blog/beste-fietstrainer-2026/', destination: '/blog/beste-fietstrainer/', permanent: true },
      { source: '/blog/beste-mtb-helm-2026/', destination: '/blog/beste-mtb-helm/', permanent: true },
      { source: '/blog/beste-gravel-schoenen-2026/', destination: '/blog/beste-gravel-schoenen/', permanent: true },
      { source: '/blog/beste-fietskleding-2026/', destination: '/blog/beste-fietskleding/', permanent: true },
      { source: '/blog/mtb-banden-vergelijking-2026/', destination: '/blog/mtb-banden-vergelijking/', permanent: true },
      { source: '/blog/beste-mtb-schoenen-2026/', destination: '/blog/beste-mtb-schoenen/', permanent: true },

      // Oude fietsvoeter.nl URLs (Google Search Console 404s)
      { source: '/fiets-accessoires/wahoo-vs-garmin/', destination: '/blog/garmin-vs-wahoo/', permanent: true },
      { source: '/fiets-accessoires/beste-garmin-fietscomputer/', destination: '/blog/garmin-edge-540-review/', permanent: true },
      { source: '/fietskleding/fietsschoenen-voor-racefiets/', destination: '/blog/beste-wielrenschoenen/', permanent: true },
      { source: '/fiets-accessoires/vermogensmeter-racefiets/', destination: '/blog/beste-vermogensmeter/', permanent: true },
      { source: '/fiets-accessoires/alarm-voor-fiets/', destination: '/blog/wielrennen-accessoires/', permanent: true },
      { source: '/fiets-accessoires/top-5-fiets-montagestandaarden/', destination: '/blog/fiets-montagestandaard/', permanent: true },
      { source: '/tips/zwift-abonnement/', destination: '/blog/zwift-abonnement-kosten/', permanent: true },
      { source: '/fiets-accessoires/racefiets-zadeltas/', destination: '/blog/beste-racefiets-zadeltas/', permanent: true },

      // Wildcard fallbacks voor oude URL-structuur
      { source: '/fiets-accessoires/:slug*', destination: '/blog/', permanent: true },
      { source: '/fietskleding/:slug*', destination: '/categorie/kleding/', permanent: true },
      { source: '/tips/:slug*', destination: '/blog/', permanent: true },
    ];
  },
}

module.exports = nextConfig
