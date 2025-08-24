// Simple test of the SEO system
const fs = require('fs');
const path = require('path');

console.log('🚀 Test SEO script starting...');

const outPublic = path.join(process.cwd(), "public");
const outDir = path.join(outPublic, "sitemaps");

console.log('📁 Public dir:', outPublic);
console.log('📁 Sitemaps dir:', outDir);

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  console.log('✅ Created sitemaps directory');
}

// Test basic XML generation
const testXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tr.golivo.app/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

fs.writeFileSync(path.join(outDir, 'test-sitemap.xml'), testXml);
console.log('✅ Test sitemap created');

const testRobots = `User-agent: *
Allow: /
Sitemap: https://golivo.app/sitemap.xml`;

fs.writeFileSync(path.join(outPublic, 'test-robots.txt'), testRobots);
console.log('✅ Test robots.txt created');

console.log('🎯 Test completed!');