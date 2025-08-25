// Enhanced Golivo SEO Sitemap Generator
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

// Main sections for sitemap
const MAIN_SECTIONS = [
  { path: '/', priority: 1.0, changefreq: 'hourly' },
  { path: '/leagues', priority: 0.9, changefreq: 'daily' },
  { path: '/teams', priority: 0.9, changefreq: 'daily' },
  { path: '/news', priority: 0.8, changefreq: 'hourly' },
  { path: '/analytics', priority: 0.8, changefreq: 'daily' },
  { path: '/betting-sites', priority: 0.9, changefreq: 'weekly' }
];

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

// Popular teams for sitemap
const POPULAR_TEAMS = [
  { id: 'galatasaray', name: 'Galatasaray', priority: 0.8 },
  { id: 'fenerbahce', name: 'Fenerbahçe', priority: 0.8 },
  { id: 'barcelona', name: 'Barcelona', priority: 0.8 },
  { id: 'real-madrid', name: 'Real Madrid', priority: 0.8 },
  { id: 'manchester-city', name: 'Manchester City', priority: 0.8 },
  { id: 'liverpool', name: 'Liverpool', priority: 0.8 },
  { id: 'bayern-munich', name: 'Bayern Munich', priority: 0.8 },
  { id: 'dortmund', name: 'Borussia Dortmund', priority: 0.8 }
];

// Betting sites for sitemap
const BETTING_SITES = [
  { id: 'bets10', name: 'Bets10', priority: 0.8 },
  { id: 'misli', name: 'Misli', priority: 0.8 },
  { id: 'nesine', name: 'Nesine', priority: 0.8 },
  { id: 'betboo', name: 'Betboo', priority: 0.8 }
];

class EnhancedGolivoSitemapGenerator {
  constructor() {
    this.baseUrl = 'https://golivo.app';
    this.sitemapDir = './public';
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

  // Generate sections sitemap for all languages
  generateSectionsSitemap() {
    const urls = [];
    
    SUPPORTED_LANGUAGES.forEach(lang => {
      const subdomain = LANGUAGE_SUBDOMAINS[lang];
      MAIN_SECTIONS.forEach(section => {
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app${section.path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${section.changefreq}</changefreq>
      <priority>${section.priority}</priority>
    </url>`);
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

    fs.writeFileSync(path.join(this.sitemapDir, 'sitemap-sections.xml'), xml);
    console.log('✅ Sections sitemap generated');
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

  // Generate teams sitemap for all languages
  generateTeamsSitemap() {
    const urls = [];
    
    SUPPORTED_LANGUAGES.forEach(lang => {
      const subdomain = LANGUAGE_SUBDOMAINS[lang];
      POPULAR_TEAMS.forEach(team => {
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/team/${team.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${team.priority}</priority>
    </url>`);
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

    fs.writeFileSync(path.join(this.sitemapDir, 'sitemap-teams.xml'), xml);
    console.log('✅ Teams sitemap generated');
  }

  // Generate betting sites sitemap for all languages
  generateBettingSitesSitemap() {
    const urls = [];
    
    SUPPORTED_LANGUAGES.forEach(lang => {
      const subdomain = LANGUAGE_SUBDOMAINS[lang];
      BETTING_SITES.forEach(site => {
        // Main betting site page
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/betting-sites/${site.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${site.priority}</priority>
    </url>`);
        
        // Review page
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/betting-sites/${site.id}/review</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`);
        
        // Bonus page
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/betting-sites/${site.id}/bonus</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`);
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

    fs.writeFileSync(path.join(this.sitemapDir, 'sitemap-betting-sites.xml'), xml);
    console.log('✅ Betting sites sitemap generated');
  }

  // Generate individual language sitemaps with comprehensive content
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
        // Main sections
        ...MAIN_SECTIONS.map(section => `
    <url>
      <loc>https://${subdomain}.golivo.app${section.path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${section.changefreq}</changefreq>
      <priority>${section.priority}</priority>
    </url>`),
        // Leagues
        ...MAIN_LEAGUES.map(league => `
    <url>
      <loc>https://${subdomain}.golivo.app/league/${league.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${league.priority}</priority>
    </url>`),
        // Teams
        ...POPULAR_TEAMS.map(team => `
    <url>
      <loc>https://${subdomain}.golivo.app/team/${team.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${team.priority}</priority>
    </url>`),
        // Betting sites
        ...BETTING_SITES.map(site => `
    <url>
      <loc>https://${subdomain}.golivo.app/betting-sites/${site.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${site.priority}</priority>
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
        // Main match page
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/match/${match.slug}</loc>
      <lastmod>${match.date || new Date().toISOString()}</lastmod>
      <changefreq>always</changefreq>
      <priority>1.0</priority>
    </url>`);
        
        // News preview page
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/news/${match.slug}-preview</loc>
      <lastmod>${match.date || new Date().toISOString()}</lastmod>
      <changefreq>hourly</changefreq>
      <priority>0.7</priority>
    </url>`);
        
        // Analytics/xG page
        urls.push(`
    <url>
      <loc>https://${subdomain}.golivo.app/analytics/${match.slug}-xg</loc>
      <lastmod>${match.date || new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
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

  // Generate sitemap index
  generateSitemapIndex() {
    const now = new Date().toISOString();
    const sitemaps = [
      'sitemap-homepage.xml',
      'sitemap-sections.xml',
      'sitemap-leagues.xml',
      'sitemap-teams.xml',
      'sitemap-betting-sites.xml',
      ...SUPPORTED_LANGUAGES.map(lang => {
        if (lang === 'zh-CN') return 'sitemap-zh-cn.xml';
        if (lang === 'zh-TW') return 'sitemap-zh-tw.xml';
        return `sitemap-${lang}.xml`;
      }),
      `sitemap-matches-${new Date().toISOString().slice(0, 7)}.xml`
    ];

    const sitemapEntries = sitemaps.map(sitemap => `
  <sitemap>
    <loc>https://golivo.app/${sitemap}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;

    fs.writeFileSync('./public/sitemap-index.xml', xml);
    console.log('✅ Sitemap index generated');
  }

  // Generate all sitemaps
  generateAll(matches = []) {
    console.log('🚀 Enhanced Golivo Sitemap Generator başlatılıyor...');
    
    this.generateHomepageSitemap();
    this.generateSectionsSitemap();
    this.generateLeagueSitemap();
    this.generateTeamsSitemap();
    this.generateBettingSitesSitemap();
    this.generateLanguageSitemaps();
    const matchCount = this.generateMatchSitemap(matches);
    this.generateSitemapIndex();
    
    console.log('🎯 Sitemap generation completed!');
    console.log(`📊 Total URLs generated: ${SUPPORTED_LANGUAGES.length * (1 + MAIN_SECTIONS.length + MAIN_LEAGUES.length + POPULAR_TEAMS.length + BETTING_SITES.length * 3) + matchCount}`);
    console.log(`🌍 Languages: ${SUPPORTED_LANGUAGES.length}`);
    console.log(`📂 Sections: ${MAIN_SECTIONS.length}`);
    console.log(`⚽ Leagues: ${MAIN_LEAGUES.length}`);
    console.log(`👥 Teams: ${POPULAR_TEAMS.length}`);
    console.log(`🎰 Betting Sites: ${BETTING_SITES.length}`);
    console.log(`🏆 Matches: ${matchCount / (SUPPORTED_LANGUAGES.length * 3)}`);
  }
}

// Export for use
export default EnhancedGolivoSitemapGenerator;

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new EnhancedGolivoSitemapGenerator();
  generator.generateAll();
}

export { EnhancedGolivoSitemapGenerator };