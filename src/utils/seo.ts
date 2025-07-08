// Sitemap generator for static routes
// This should be run during build process to generate sitemap.xml

export const generateSitemap = () => {
  const baseUrl = 'https://your-domain.com/ProBot'; // Update this with your actual domain
  
  const routes = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/camps', changefreq: 'weekly', priority: '0.9' },
    { url: '/camps/one-day', changefreq: 'weekly', priority: '0.8' },
    { url: '/camps/two-day', changefreq: 'weekly', priority: '0.8' },
    { url: '/camps/online', changefreq: 'weekly', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.7' },
    { url: '/shop', changefreq: 'weekly', priority: '0.8' },
    { url: '/blog', changefreq: 'weekly', priority: '0.7' },
    { url: '/register', changefreq: 'monthly', priority: '0.9' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { url: '/terms', changefreq: 'yearly', priority: '0.3' },
    { url: '/cookies', changefreq: 'yearly', priority: '0.3' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = () => {
  const baseUrl = 'https://your-domain.com/ProBot'; // Update this with your actual domain
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow certain paths
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$
Disallow: /*.txt$

# Allow important robots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Crawl delay for other bots
User-agent: *
Crawl-delay: 1`;
};
