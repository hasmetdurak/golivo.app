// Golivo SEO Auto-Ping System
import fetch from 'node-fetch';

class GolivoSEOPinger {
  constructor() {
    // IndexNow Key (Bing & Yandex için) - ücretsiz
    this.indexNowKey = process.env.INDEXNOW_KEY || 'your-indexnow-key-here';
    
    // Google Indexing API (quota sınırlı ama güçlü)
    this.googleApiKey = process.env.GOOGLE_API_KEY || 'your-google-api-key';
    
    this.baseUrl = 'https://golivo.app';
    this.rateLimitDelay = 1000; // 1 saniye delay
  }

  // IndexNow API - Bing & Yandex
  async pingIndexNow(urls) {
    console.log(`📢 IndexNow ping başlatılıyor: ${urls.length} URL`);
    
    for (const url of urls) {
      try {
        const pingUrl = `https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=${this.indexNowKey}`;
        
        const response = await fetch(pingUrl, { method: 'GET' });
        
        if (response.ok) {
          console.log(`✅ IndexNow: ${url}`);
        } else {
          console.log(`⚠️ IndexNow warning: ${url} - ${response.status}`);
        }
        
        // Rate limiting
        await this.delay(this.rateLimitDelay);
        
      } catch (error) {
        console.error(`❌ IndexNow error for ${url}:`, error.message);
      }
    }
  }

  // Google Indexing API
  async pingGoogle(urls) {
    console.log(`📢 Google Indexing API ping başlatılıyor: ${urls.length} URL`);
    
    for (const url of urls) {
      try {
        const response = await fetch(
          `https://indexing.googleapis.com/v3/urlNotifications:publish?key=${this.googleApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: url,
              type: 'URL_UPDATED'
            })
          }
        );

        if (response.ok) {
          console.log(`✅ Google: ${url}`);
        } else {
          const errorData = await response.text();
          console.log(`⚠️ Google warning: ${url} - ${response.status} - ${errorData}`);
        }
        
        // Rate limiting (Google quota önemli)
        await this.delay(this.rateLimitDelay * 2);
        
      } catch (error) {
        console.error(`❌ Google error for ${url}:`, error.message);
      }
    }
  }

  // Submit sitemap directly to search engines
  async submitSitemaps() {
    const sitemaps = [
      `${this.baseUrl}/sitemap.xml`,
      `${this.baseUrl}/sitemaps/sitemap-homepage.xml`,
      `${this.baseUrl}/sitemaps/sitemap-leagues.xml`,
      `${this.baseUrl}/sitemaps/sitemap-matches-${new Date().toISOString().slice(0, 7)}.xml`
    ];

    console.log('🗺️ Sitemap submission başlatılıyor...');

    // Google Search Console submission
    for (const sitemapUrl of sitemaps) {
      try {
        const response = await fetch(
          `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
          { method: 'GET' }
        );
        
        if (response.ok) {
          console.log(`✅ Google sitemap: ${sitemapUrl}`);
        } else {
          console.log(`⚠️ Google sitemap warning: ${sitemapUrl}`);
        }
        
        await this.delay(this.rateLimitDelay);
        
      } catch (error) {
        console.error(`❌ Sitemap submission error: ${sitemapUrl}`, error.message);
      }
    }

    // Bing Webmaster submission
    for (const sitemapUrl of sitemaps) {
      try {
        const response = await fetch(
          `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
          { method: 'GET' }
        );
        
        console.log(`📋 Bing sitemap submitted: ${sitemapUrl}`);
        await this.delay(this.rateLimitDelay);
        
      } catch (error) {
        console.error(`❌ Bing sitemap error: ${sitemapUrl}`, error.message);
      }
    }
  }

  // Generate URLs for today's matches (örnek)
  generateTodayMatchUrls() {
    const today = new Date().toISOString().slice(0, 10);
    const languages = ['en', 'tr', 'de', 'es', 'pt', 'fr', 'it', 'ar'];
    
    // Demo maçlar
    const demoMatches = [
      'barcelona-vs-real-madrid',
      'galatasaray-vs-fenerbahce', 
      'bayern-munich-vs-dortmund',
      'manchester-city-vs-liverpool'
    ];

    const urls = [];
    
    languages.forEach(lang => {
      demoMatches.forEach(match => {
        urls.push(`https://${lang}.golivo.app/match/${match}-${today}`);
      });
    });

    return urls;
  }

  // Delay helper
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Main execution
  async execute() {
    console.log('🚀 Golivo SEO Ping Machine başlatılıyor...');
    
    // Bugünkü maçların URL'lerini al
    const matchUrls = this.generateTodayMatchUrls();
    
    // Ana sayfa URL'leri
    const homepageUrls = [
      'https://en.golivo.app/',
      'https://tr.golivo.app/',
      'https://de.golivo.app/',
      'https://es.golivo.app/',
      'https://ar.golivo.app/'
    ];

    const allUrls = [...homepageUrls, ...matchUrls];

    console.log(`📊 Toplam ${allUrls.length} URL ping edilecek`);

    // Ping işlemleri
    await this.pingIndexNow(allUrls);
    await this.pingGoogle(allUrls.slice(0, 10)); // Google quota koruması
    await this.submitSitemaps();

    console.log('🎯 SEO Ping işlemi tamamlandı!');
  }
}

// Export
export default GolivoSEOPinger;

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const pinger = new GolivoSEOPinger();
  pinger.execute().catch(console.error);
}