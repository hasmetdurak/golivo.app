# GoLivo SEO Sitemap Structure

## Overview
This document describes the comprehensive SEO sitemap structure implemented for the GoLivo football website. The sitemap system is designed to optimize search engine indexing for a multi-language sports platform with extensive content.

## Sitemap Index
The main sitemap index (`sitemap-index.xml`) serves as the entry point for search engines, referencing all individual sitemaps:

- Homepage sitemap (`sitemap-homepage.xml`)
- Sections sitemap (`sitemap-sections.xml`)
- Leagues sitemap (`sitemap-leagues.xml`)
- Teams sitemap (`sitemap-teams.xml`)
- Betting sites sitemap (`sitemap-betting-sites.xml`)
- Individual language sitemaps (56 languages)
- Match sitemaps (organized by month)

## Sitemap Components

### 1. Homepage Sitemap
Contains the root URLs for all supported languages:
- https://{language}.golivo.app/

### 2. Sections Sitemap
Covers the main sections of the website for each language:
- `/` (Homepage)
- `/leagues` (League listings)
- `/teams` (Team listings)
- `/news` (News articles)
- `/analytics` (Statistical analysis)
- `/betting-sites` (Betting site listings)

### 3. Leagues Sitemap
Includes the top football leagues:
- Premier League
- La Liga
- Bundesliga
- Serie A
- Ligue 1
- Champions League
- Süper Lig

### 4. Teams Sitemap
Features popular football teams:
- Galatasaray
- Fenerbahçe
- Barcelona
- Real Madrid
- Manchester City
- Liverpool
- Bayern Munich
- Borussia Dortmund

### 5. Betting Sites Sitemap
Comprehensive coverage of betting sites with subpages:
- Main betting site page
- Review pages
- Bonus pages

### 6. Match Sitemaps
Organized by month, includes:
- Match detail pages
- News preview pages
- Analytics/xG pages

## Language Support
The sitemap system supports 56 languages with dedicated subdomains:
- Turkish (tr)
- English (en)
- German (de)
- Spanish (es)
- Portuguese (pt)
- French (fr)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Chinese Simplified (cn)
- Chinese Traditional (tw)
- And 45 more languages

## SEO Best Practices Implemented

### Priority Settings
- Homepage: 1.0 (Highest priority)
- Leagues/Teams: 0.9
- News/Analytics: 0.8
- Betting sites: 0.8-0.9
- Match pages: 1.0 (Live matches)
- Review/Bonus pages: 0.7

### Change Frequency
- Homepage: hourly
- Leagues/Teams: daily
- News: hourly
- Analytics: daily
- Betting sites: weekly/monthly
- Match pages: always (live matches)

## Implementation Details

### Sitemap Generator
The enhanced sitemap generator (`enhanced-sitemap-generator.js`) creates:
1. Individual sitemaps for each content type
2. Language-specific comprehensive sitemaps
3. Monthly match sitemaps
4. Main sitemap index

### File Structure
```
/public/
  sitemap-index.xml          # Main index
  /sitemaps/
    sitemap-homepage.xml     # Homepage URLs
    sitemap-sections.xml     # Main sections
    sitemap-leagues.xml      # League pages
    sitemap-teams.xml        # Team pages
    sitemap-betting-sites.xml # Betting sites
    sitemap-{lang}.xml       # Language-specific comprehensive sitemaps
    sitemap-matches-{YYYY-MM}.xml # Monthly match sitemaps
```

## Benefits

1. **Comprehensive Coverage**: All content types are indexed
2. **Multi-language Support**: Each language has dedicated URLs
3. **Optimized Priority**: Important pages have higher priority
4. **Appropriate Frequency**: Content is crawled at optimal intervals
5. **Scalable Structure**: Easy to add new content types
6. **Performance**: Separated sitemaps for efficient crawling

## Maintenance

To regenerate sitemaps:
```bash
node scripts/run-sitemap-generator.js
```

The generator automatically:
- Updates last modification dates
- Maintains consistent URL structure
- Preserves SEO best practices
- Supports all 56 languages