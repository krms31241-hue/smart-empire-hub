const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://smartempirehub.com';

// Static pages
const staticPages = [
    '/',
    '/categories/',
    '/search/',
    '/about/',
    '/contact/',
    '/premium/'
];

// Read tools index
let tools = [];
try {
    const indexPath = path.join(__dirname, '../data/tools-index.json');
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    tools = data.tools || [];
} catch (error) {
    console.log('No tools index found, creating sitemap with static pages only');
}

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

// Add static pages
staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
`;
});

// Add tool pages
tools.forEach(tool => {
    sitemap += `  <url>
    <loc>${BASE_URL}/tools/${tool.slug}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
`;
});

sitemap += `</urlset>
`;

// Write sitemap
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ Sitemap generated with ${staticPages.length + tools.length} URLs`);
console.log(`📍 Location: ${sitemapPath}`);
