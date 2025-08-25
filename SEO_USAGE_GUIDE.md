# GoLivo SEO System Usage Guide

## Overview
This guide explains how to use and maintain the SEO system for the GoLivo website, including sitemap generation and search engine optimization features.

## Sitemap System

### Structure
The SEO system generates a comprehensive sitemap structure:
- Main index: `sitemap-index.xml`
- Content-specific sitemaps:
  - Homepage (`sitemap-homepage.xml`)
  - Sections (`sitemap-sections.xml`)
  - Leagues (`sitemap-leagues.xml`)
  - Teams (`sitemap-teams.xml`)
  - Betting sites (`sitemap-betting-sites.xml`)
  - Languages (56 individual language sitemaps)
  - Matches (monthly organization)

### Available Commands

1. **Generate Enhanced Sitemaps**:
   ```bash
   npm run sitemap:update
   ```
   This is the recommended command for regular sitemap updates.

2. **Generate Original Sitemaps**:
   ```bash
   npm run sitemap:generate
   ```
   This generates the original sitemap structure.

3. **Full SEO System**:
   ```bash
   npm run seo:full
   ```
   This runs the complete SEO system including sitemap generation and search engine pinging.

### Manual Sitemap Generation
You can also run the sitemap generator directly:
```bash
node scripts/run-sitemap-generator.js
```

## Content Organization

### Priority System
- Homepage: 1.0 (Highest)
- Main sections: 0.8-0.9
- League/Team pages: 0.8-0.9
- Match pages: 1.0 (Live)
- News/Analytics: 0.7-0.8
- Review/Bonus pages: 0.7

### Change Frequency
- Homepage: hourly
- Sections: daily
- League/Team pages: daily
- Match pages: always (for live)
- News: hourly
- Analytics: daily
- Review/Bonus: weekly/monthly

## Search Engine Submission

### Google Search Console
1. Log into Google Search Console
2. Select your property
3. Navigate to "Sitemaps" under "Index"
4. Add the sitemap URL: `https://golivo.app/sitemap-index.xml`
5. Submit and monitor indexing status

### Bing Webmaster Tools
1. Log into Bing Webmaster Tools
2. Select your site
3. Navigate to "Configure My Site" → "Sitemaps"
4. Submit the sitemap URL: `https://golivo.app/sitemap-index.xml`

### Other Search Engines
Most search engines will automatically discover your sitemap through the robots.txt file, but you can manually submit to:
- Yandex.Webmaster
- Baidu Webmaster Platform
- DuckDuckGo (if applicable)

## Maintenance Schedule

### Recommended Update Frequency
- **Daily**: For sites with frequent content updates
- **Weekly**: For sites with moderate content updates
- **Monthly**: For sites with infrequent content updates

### Automated Updates
To set up automated sitemap updates, you can use a cron job or task scheduler:

**Linux/macOS Cron Example**:
```bash
# Update sitemaps every day at 2 AM
0 2 * * * cd /path/to/golivo && npm run sitemap:update
```

**Windows Task Scheduler**:
1. Open Task Scheduler
2. Create a new task
3. Set trigger to daily
4. Set action to run: `npm run sitemap:update`
5. Set start in directory to your project root

## Troubleshooting

### Common Issues

1. **Sitemap Not Found**
   - Verify the sitemap files exist in `/public/`
   - Check that the web server is serving static files correctly
   - Ensure the robots.txt file points to the correct sitemap location

2. **Search Engines Not Crawling**
   - Check server response codes (should be 200)
   - Verify sitemap XML validity
   - Ensure no robots.txt disallow rules are blocking sitemaps

3. **Sitemap Generation Errors**
   - Check file permissions on the `/public/sitemaps/` directory
   - Verify Node.js version compatibility
   - Ensure all dependencies are installed

### Validation Tools

1. **Google Search Console Sitemap Tester**
   - Provides detailed error information
   - Shows indexing statistics

2. **Online XML Validators**
   - W3C Markup Validator
   - XML Validator tools

3. **Sitemap Generators with Validation**
   - Some tools validate while generating

## Customization

### Adding New Content Types
To add new content types to the sitemap system:

1. Modify `enhanced-sitemap-generator.js`
2. Add new sections to the content arrays
3. Update the generation methods
4. Run the sitemap update script

### Modifying Priority/Change Frequency
Adjust the values in the sitemap generator script:
- Update priority values in content definitions
- Modify change frequency settings
- Regenerate sitemaps

## Performance Considerations

### Sitemap Size Limits
- Individual sitemaps: Max 50,000 URLs
- Sitemap index: Max 50,000 sitemaps
- File size: Max 50MB (uncompressed)

### Optimization Tips
1. Separate large content types into different sitemaps
2. Use appropriate priority values
3. Set realistic change frequencies
4. Compress large sitemaps (gzip)

## Monitoring and Analytics

### Tracking Indexing
1. Regularly check Google Search Console
2. Monitor crawl errors
3. Track indexed page count
4. Analyze search performance

### Performance Metrics
1. Sitemap generation time
2. Number of URLs submitted
3. Indexing rate
4. Crawl efficiency

## Support
For issues with the SEO system:
1. Check the console output for error messages
2. Verify all dependencies are installed
3. Ensure Node.js version compatibility
4. Review the documentation in `SEO_SITEMAP_STRUCTURE.md`