#!/usr/bin/env node

/**
 * GoLivo Sitemap Verification Script
 * 
 * This script verifies that all sitemaps are properly generated
 * and accessible.
 */

import fs from 'fs';
import path from 'path';

// Configuration
const sitemapDir = './public';
const requiredSitemaps = [
  'sitemap-homepage.xml',
  'sitemap-sections.xml',
  'sitemap-leagues.xml',
  'sitemap-teams.xml',
  'sitemap-betting-sites.xml'
];

console.log('🔍 GoLivo Sitemap Verification');
console.log('==============================');

// Check if sitemaps directory exists
if (!fs.existsSync(sitemapDir)) {
  console.error(`❌ Sitemaps directory not found: ${sitemapDir}`);
  process.exit(1);
}

console.log(`✅ Public directory found: ${sitemapDir}`);

// Check required sitemaps
let allRequiredFound = true;
console.log('\n📋 Checking required sitemaps:');

requiredSitemaps.forEach(sitemap => {
  const sitemapPath = path.join(sitemapDir, sitemap);
  if (fs.existsSync(sitemapPath)) {
    const stats = fs.statSync(sitemapPath);
    console.log(`✅ ${sitemap} (${(stats.size / 1024).toFixed(2)} KB)`);
  } else {
    console.error(`❌ ${sitemap} - NOT FOUND`);
    allRequiredFound = false;
  }
});

if (!allRequiredFound) {
  console.error('\n❌ Some required sitemaps are missing!');
  process.exit(1);
}

// Count total sitemaps
const sitemapFiles = fs.readdirSync(sitemapDir)
  .filter(file => file.startsWith('sitemap-') && file.endsWith('.xml'));

console.log(`\n📊 Total sitemaps generated: ${sitemapFiles.length}`);

// Check sitemap index
const sitemapIndex = './public/sitemap-index.xml';
if (fs.existsSync(sitemapIndex)) {
  const stats = fs.statSync(sitemapIndex);
  console.log(`✅ Sitemap index found (${(stats.size / 1024).toFixed(2)} KB)`);
} else {
  console.error('❌ Sitemap index not found!');
  process.exit(1);
}

// Check robots.txt
const robotsTxt = './public/robots.txt';
if (fs.existsSync(robotsTxt)) {
  const content = fs.readFileSync(robotsTxt, 'utf8');
  if (content.includes('Sitemap:')) {
    console.log('✅ robots.txt includes sitemap reference');
  } else {
    console.warn('⚠️  robots.txt does not reference sitemap');
  }
} else {
  console.error('❌ robots.txt not found!');
}

console.log('\n✅ Sitemap verification completed successfully!');
console.log('\n📋 Next steps:');
console.log('  1. Test sitemap accessibility at https://golivo.app/sitemap-index.xml');
console.log('  2. Submit to Google Search Console: https://search.google.com/search-console');
console.log('  3. Submit to Bing Webmaster Tools: https://www.bing.com/webmasters/');
console.log('  4. Monitor indexing status regularly');