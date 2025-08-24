// Golivo SEO Sitemap Generator
import fs from 'fs';
import path from 'path';

// Supported languages from our i18n system
const SUPPORTED_LANGUAGES = [
  'tr', 'en', 'de', 'es', 'pt', 'fr', 'it', 'ja', 'ko', 'zh-CN', 'zh-TW', 
  'hi', 'ru', 'pl', 'fa', 'vi', 'kk', 'tl', 'sw', 'ar', 'id', 'th', 'bn', 
  'ur', 'nl', 'sv', 'no', 'fi', 'cs', 'ro', 'el', 'hu', 'bg', 'sr', 'hr', 
  'sk', 'et', 'lv', 'lt', 'he', 'ms', 'az', 'ka', 'uk', 'uz', 'am', 'ha', 
  'yo', 'af', 'sq', 'mk', 'qu', 'ay', 'gn', 'arn', 'nah'
];

// Language subdomain mapping
const LANGUAGE_SUBDOMAINS = {
  'tr': 'tr', 'en': 'en', 'de': 'de', 'es': 'es', 'pt': 'pt', 'fr': 'fr',
  'it': 'it', 'ja': 'ja', 'ko': 'ko', 'zh-CN': 'cn', 'zh-TW': 'tw',
  'hi': 'hi', 'ru': 'ru', 'pl': 'pl', 'fa': 'fa', 'vi': 'vi', 'kk': 'kk',
  'tl': 'tl', 'sw': 'sw', 'ar': 'ar', 'id': 'id', 'th': 'th', 'bn': 'bn',
  'ur': 'ur', 'nl': 'nl', 'sv': 'sv', 'no': 'no', 'fi': 'fi', 'cs': 'cs',
  'ro': 'ro', 'el': 'el', 'hu': 'hu', 'bg': 'bg', 'sr': 'sr', 'hr': 'hr',
  'sk': 'sk', 'et': 'et', 'lv': 'lv', 'lt': 'lt', 'he': 'he', 'ms': 'ms',
  'az': 'az', 'ka': 'ka', 'uk': 'uk', 'uz': 'uz', 'am': 'am', 'ha': 'ha',
  'yo': 'yo', 'af': 'af', 'sq': 'sq', 'mk': 'mk', 'qu': 'qu', 'ay': 'ay',
  'gn': 'gn', 'arn': 'arn', 'nah': 'nah'
};

// Main leagues for sitemap
const MAIN_LEAGUES = [
  { id: 'premier-league', name: 'Premier League', priority: 0.9 },
  { id: 'la-liga', name: 'La Liga', priority: 0.9 },
  { id: 'bundesliga', name: 'Bundesliga', priority: 0.9 },
  { id: 'serie-a', name: 'Serie A', priority: 0.9 },
  { id: 'ligue-1', name: 'Ligue 1', priority: 0.9 },
  { id: 'champions-league', name: 'Champions League', priority: 1.0 },
  { id: 'super-lig', name: 'Süper Lig', priority: 0.8 }
];

class GolivoSitemapGenerator {
  constructor() {
    this.baseUrl = 'https://golivo.app';
    this.sitemapDir = './public/sitemaps';
    this.ensureSitemapDir();
  }

  ensureSitemapDir() {
    if (!fs.existsSync(this.sitemapDir)) {
      fs.mkdirSync(this.sitemapDir, { recursive: true });
    }
  }

  // Generate homepage sitemap for all languages
  generateHomepageSitemap() {
    const urls = SUPPORTED_LANGUAGES.map(lang => {
      const subdomain = LANGUAGE_SUBDOMAINS[lang];
      return `
    <url>
      <loc>https://${subdomain}.golivo.app/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>hourly</changefreq>
      <priority>1.0</priority>
    </url>`;
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    fs.writeFileSync(path.join(this.sitemapDir, 'sitemap-homepage.xml'), xml);
    console.log('✅ Homepage sitemap generated');
  }

  // Generate league sitemap for all languages
  generateLeagueSitemap() {
    const urls = [];
    
    SUPPORTED_LANGUAGES.forEach(lang => {
      const subdomain = LANGUAGE_SUBDOMAINS[lang];
      MAIN_LEAGUES.forEach(league => {
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/league/${league.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${league.priority}</priority>
    </url>`);
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

    fs.writeFileSync(path.join(this.sitemapDir, 'sitemap-leagues.xml'), xml);
    console.log('✅ Leagues sitemap generated');
  }

  // Generate individual language sitemaps
  generateLanguageSitemaps() {
    SUPPORTED_LANGUAGES.forEach(lang => {
      const subdomain = LANGUAGE_SUBDOMAINS[lang];
      
      const urls = [
        // Homepage
        `
    <url>
      <loc>https://${subdomain}.golivo.app/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>hourly</changefreq>
      <priority>1.0</priority>
    </url>`,
        // Leagues
        ...MAIN_LEAGUES.map(league => `
    <url>
      <loc>https://${subdomain}.golivo.app/league/${league.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${league.priority}</priority>
    </url>`)
      ];

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

      const filename = lang === 'zh-CN' ? 'sitemap-zh-cn.xml' : 
                      lang === 'zh-TW' ? 'sitemap-zh-tw.xml' : 
                      `sitemap-${lang}.xml`;
      
      fs.writeFileSync(path.join(this.sitemapDir, filename), xml);
    });
    
    console.log(`✅ Generated ${SUPPORTED_LANGUAGES.length} language sitemaps`);
  }

  // Generate match sitemap for current month
  generateMatchSitemap(matches = []) {
    const currentMonth = new Date().toISOString().slice(0, 7); // 2025-08
    const urls = [];

    // Demo matches if no real data provided
    if (matches.length === 0) {
      matches = [
        { id: 1, slug: 'barcelona-vs-real-madrid-2025-08-24', date: '2025-08-24T20:00:00Z' },
        { id: 2, slug: 'galatasaray-vs-fenerbahce-2025-08-24', date: '2025-08-24T19:00:00Z' },
        { id: 3, slug: 'bayern-munich-vs-dortmund-2025-08-25', date: '2025-08-25T18:30:00Z' }
      ];
    }

    matches.forEach(match => {
      SUPPORTED_LANGUAGES.forEach(lang => {
        const subdomain = LANGUAGE_SUBDOMAINS[lang];
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/match/${match.slug}</loc>
      <lastmod>${match.date || new Date().toISOString()}</lastmod>
      <changefreq>always</changefreq>
      <priority>1.0</priority>
    </url>`);
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

    fs.writeFileSync(path.join(this.sitemapDir, `sitemap-matches-${currentMonth}.xml`), xml);
    console.log(`✅ Match sitemap generated for ${currentMonth}`);
    
    return urls.length;
  }

  // Generate all sitemaps
  generateAll(matches = []) {
    console.log('🚀 Golivo Sitemap Generator başlatılıyor...');
    
    this.generateHomepageSitemap();
    this.generateLanguageSitemaps();
    this.generateLeagueSitemap();
    const matchCount = this.generateMatchSitemap(matches);
    
    console.log('🎯 Sitemap generation completed!');
    console.log(`📊 Total URLs generated: ${SUPPORTED_LANGUAGES.length * (1 + MAIN_LEAGUES.length) + matchCount}`);
    console.log(`🌍 Languages: ${SUPPORTED_LANGUAGES.length}`);
    console.log(`⚽ Leagues: ${MAIN_LEAGUES.length}`);
    console.log(`🏆 Matches: ${matchCount / SUPPORTED_LANGUAGES.length}`);
  }
}

// Export for use
export default GolivoSitemapGenerator;

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new GolivoSitemapGenerator();
  generator.generateAll();
}