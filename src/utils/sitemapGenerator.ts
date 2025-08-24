// Golivo Dynamic Sitemap Generator for React
import { supportedLanguages } from '../i18n/index';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  league: string;
}

interface League {
  id: string;
  name: string;
  priority: number;
}

export class GolivoSitemapUtils {
  private static baseUrl = 'https://golivo.app';
  
  // Ana ligler
  private static mainLeagues: League[] = [
    { id: 'champions-league', name: 'UEFA Champions League', priority: 1.0 },
    { id: 'premier-league', name: 'Premier League', priority: 0.9 },
    { id: 'la-liga', name: 'La Liga', priority: 0.9 },
    { id: 'bundesliga', name: 'Bundesliga', priority: 0.9 },
    { id: 'serie-a', name: 'Serie A', priority: 0.9 },
    { id: 'ligue-1', name: 'Ligue 1', priority: 0.9 },
    { id: 'super-lig', name: 'Süper Lig', priority: 0.8 }
  ];

  // Match slug generator
  static generateMatchSlug(homeTeam: string, awayTeam: string, date: string): string {
    const formatTeamName = (team: string) => 
      team.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

    const formattedDate = date.split('T')[0]; // 2025-08-24
    return `${formatTeamName(homeTeam)}-vs-${formatTeamName(awayTeam)}-${formattedDate}`;
  }

  // Generate match URLs for all languages
  static generateMatchUrls(match: Match): string[] {
    const slug = this.generateMatchSlug(match.homeTeam, match.awayTeam, match.date);
    
    return supportedLanguages.map(lang => 
      `https://${lang.subdomain}.golivo.app/match/${slug}`
    );
  }

  // Generate league URLs for all languages
  static generateLeagueUrls(leagueId: string): string[] {
    return supportedLanguages.map(lang => 
      `https://${lang.subdomain}.golivo.app/league/${leagueId}`
    );
  }

  // Generate homepage URLs for all languages
  static generateHomepageUrls(): string[] {
    return supportedLanguages.map(lang => 
      `https://${lang.subdomain}.golivo.app/`
    );
  }

  // Generate sitemap XML for matches
  static generateMatchSitemapXML(matches: Match[]): string {
    const urls = matches.flatMap(match => {
      const slug = this.generateMatchSlug(match.homeTeam, match.awayTeam, match.date);
      
      return supportedLanguages.map(lang => `
    <url>
      <loc>https://${lang.subdomain}.golivo.app/match/${slug}</loc>
      <lastmod>${new Date(match.date).toISOString()}</lastmod>
      <changefreq>always</changefreq>
      <priority>1.0</priority>
    </url>`);
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  // Generate sitemap XML for leagues
  static generateLeagueSitemapXML(): string {
    const urls = this.mainLeagues.flatMap(league => 
      supportedLanguages.map(lang => `
    <url>
      <loc>https://${lang.subdomain}.golivo.app/league/${league.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${league.priority}</priority>
    </url>`)
    ).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  // Generate robots.txt content
  static generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemaps/sitemap-homepage.xml
Sitemap: ${this.baseUrl}/sitemaps/sitemap-leagues.xml
Sitemap: ${this.baseUrl}/sitemaps/sitemap-matches-${new Date().toISOString().slice(0, 7)}.xml

# Crawl delay for respectful crawling
Crawl-delay: 1

# Block unnecessary paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: *.json$`;
  }

  // Submit URLs to IndexNow (client-side - güvenlik için backend'de çalıştırın)
  static async submitToIndexNow(urls: string[], apiKey: string): Promise<void> {
    const batchSize = 10; // IndexNow limits
    
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      
      try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            host: 'golivo.app',
            key: apiKey,
            urlList: batch
          })
        });

        if (response.ok) {
          console.log(`✅ IndexNow batch submitted: ${batch.length} URLs`);
        } else {
          console.warn(`⚠️ IndexNow batch failed: ${response.status}`);
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error('❌ IndexNow error:', error);
      }
    }
  }

  // Get SEO metrics
  static getSEOMetrics(matches: Match[]): object {
    const totalUrls = {
      homepage: supportedLanguages.length,
      leagues: this.mainLeagues.length * supportedLanguages.length,
      matches: matches.length * supportedLanguages.length,
      total: 0
    };
    
    totalUrls.total = totalUrls.homepage + totalUrls.leagues + totalUrls.matches;

    return {
      supportedLanguages: supportedLanguages.length,
      mainLeagues: this.mainLeagues.length,
      totalMatches: matches.length,
      urls: totalUrls,
      estimatedTraffic: {
        daily: Math.floor(totalUrls.total * 0.01), // %1 CTR
        monthly: Math.floor(totalUrls.total * 0.01 * 30),
        languages: supportedLanguages.map(lang => ({
          code: lang.code,
          subdomain: lang.subdomain,
          urls: totalUrls.total / supportedLanguages.length
        }))
      }
    };
  }
}

export default GolivoSitemapUtils;