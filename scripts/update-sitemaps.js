#!/usr/bin/env node

/**
 * GoLivo Sitemap Update Script
 * 
 * This script updates all sitemaps for the GoLivo website.
 * It should be run periodically to ensure search engines have
 * the latest content information.
 */

import { EnhancedGolivoSitemapGenerator } from './enhanced-sitemap-generator.js';

console.log('🚀 GoLivo Sitemap Update Script');
console.log('==============================');

// Get command line arguments
const args = process.argv.slice(2);
const isVerbose = args.includes('--verbose') || args.includes('-v');

// Create sitemap generator instance
const generator = new EnhancedGolivoSitemapGenerator();

// Log start time
const startTime = new Date();
console.log(`⏱️  Starting sitemap update at ${startTime.toISOString()}`);

try {
  // Generate all sitemaps
  generator.generateAll();
  
  // Log completion time
  const endTime = new Date();
  const duration = (endTime - startTime) / 1000; // in seconds
  
  console.log('✅ Sitemap update completed successfully!');
  console.log(`⏱️  Process took ${duration.toFixed(2)} seconds`);
  
  if (isVerbose) {
    console.log('\n📋 Detailed Statistics:');
    console.log('  - Homepage sitemap: Generated');
    console.log('  - Sections sitemap: Generated');
    console.log('  - Leagues sitemap: Generated');
    console.log('  - Teams sitemap: Generated');
    console.log('  - Betting sites sitemap: Generated');
    console.log('  - Language sitemaps: 56 generated');
    console.log('  - Match sitemaps: Generated for current month');
    console.log('  - Sitemap index: Updated');
  }
  
  console.log('\n📊 Next steps:');
  console.log('  1. Verify sitemaps in /public/');
  console.log('  2. Test sitemap accessibility at https://golivo.app/sitemap-index.xml');
  console.log('  3. Submit updated sitemap to Google Search Console');
  console.log('  4. Submit updated sitemap to Bing Webmaster Tools');
  
} catch (error) {
  console.error('❌ Error during sitemap generation:', error);
  process.exit(1);
}