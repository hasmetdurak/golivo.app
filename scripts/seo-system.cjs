// scripts/seo-system.js
// =======================================================
// GOLIVO • Tek Dosyalık SEO Makinesi (Node.js Version)
// 50+ dil, programatik hreflang, dinamik sitemap üretimi
// =======================================================

const fs = require('fs');
const path = require('path');

const BASE_DOMAIN = process.env.BASE_DOMAIN || "golivo.app";
const SITE_NAME = process.env.SITE_NAME || "golivo.app";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";

const LANGUAGES = [
  { code: "tr", name: "Türkçe", region: "TR" },
  { code: "en", name: "English", region: "GLOBAL" },
  { code: "in", name: "English (IN)", region: "IN" },
  { code: "de", name: "Deutsch", region: "DE" },
  { code: "es", name: "Español", region: "ES" },
  { code: "pt", name: "Português", region: "BR" },
  { code: "fr", name: "Français", region: "FR" },
  { code: "it", name: "Italiano", region: "IT" },
  { code: "ru", name: "Русский", region: "RU" },
  { code: "ja", name: "日本語", region: "JP" },
  { code: "ko", name: "한국어", region: "KR" },
  { code: "cn", name: "简体中文", region: "CN" },
  { code: "tw", name: "繁體中文", region: "TW" },
  { code: "hi", name: "हिन्दी", region: "IN" },
  { code: "pl", name: "Polski", region: "PL" },
  { code: "fa", name: "فارسی", region: "IR", rtl: true },
  { code: "vi", name: "Tiếng Việt", region: "VN" },
  { code: "kk", name: "Қазақша", region: "KZ" },
  { code: "tl", name: "Filipino", region: "PH" },
  { code: "sw", name: "Kiswahili", region: "KE" },
  { code: "nl", name: "Nederlands", region: "NL" },
  { code: "cs", name: "Čeština", region: "CZ" },
  { code: "sk", name: "Slovenčina", region: "SK" },
  { code: "hu", name: "Magyar", region: "HU" },
  { code: "el", name: "Ελληνικά", region: "GR" },
  { code: "ro", name: "Română", region: "RO" },
  { code: "bg", name: "Български", region: "BG" },
  { code: "sr", name: "Српски", region: "RS" },
  { code: "hr", name: "Hrvatski", region: "HR" },
  { code: "uk", name: "Українська", region: "UA" },
  { code: "bn", name: "বাংলা", region: "BD" },
  { code: "ur", name: "اردو", region: "PK", rtl: true },
  { code: "ta", name: "தமிழ்", region: "LK" },
  { code: "te", name: "తెలుగు", region: "IN" },
  { code: "ml", name: "മലയാളം", region: "IN" },
  { code: "id", name: "Bahasa Indonesia", region: "ID" },
  { code: "ms", name: "Bahasa Melayu", region: "MY" },
  { code: "th", name: "ไทย", region: "TH" },
  { code: "km", name: "ខ្មែរ", region: "KH" },
  { code: "my", name: "မြန်မာ", region: "MM" },
  { code: "ha", name: "Hausa", region: "NG" },
  { code: "yo", name: "Yorùbá", region: "NG" },
  { code: "zu", name: "isiZulu", region: "ZA" },
  { code: "am", name: "አማርኛ", region: "ET" },
  { code: "ak", name: "Akan", region: "GH" },
  { code: "gn", name: "Avañeʼẽ", region: "PY" },
  { code: "qu", name: "Runa Simi", region: "PE" },
  { code: "ay", name: "Aymar", region: "BO" },
  { code: "arn", name: "Mapudungun", region: "CL" },
  { code: "nah", name: "Nāhuatl", region: "MX" },
];

function xmlEscape(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toUrlSetXml(urls) {
  const rows = urls
    .map((u) => {
      const lastmod = u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : "";
      const cf = u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : "";
      const pr = u.priority ? `<priority>${u.priority}</priority>` : "";
      return `<url><loc>${xmlEscape(u.loc)}</loc>${lastmod}${cf}${pr}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    rows +
    `</urlset>`;
}

function toSitemapIndexXml(items) {
  const rows = items
    .map((i) => {
      const lastmod = i.lastmod ? `<lastmod>${i.lastmod}</lastmod>` : "";
      return `<sitemap><loc>${xmlEscape(i.loc)}</loc>${lastmod}</sitemap>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    rows +
    `</sitemapindex>`;
}

function fetchInventory() {
  // Fallback envanter
  return {
    leagues: [
      { slug: "super-lig" }, 
      { slug: "premier-league" },
      { slug: "la-liga" },
      { slug: "serie-a" },
      { slug: "bundesliga" },
      { slug: "ligue-1" },
      { slug: "champions-league" }
    ],
    matches: [
      { id: "galatasaray-vs-fenerbahce-2025-08-24" }, 
      { id: "barcelona-vs-real-madrid-2025-08-24" },
      { id: "manchester-city-vs-liverpool-2025-08-25" },
      { id: "bayern-munich-vs-dortmund-2025-08-25" }
    ],
    teams: [
      { slug: "galatasaray" }, 
      { slug: "fenerbahce" },
      { slug: "barcelona" },
      { slug: "real-madrid" },
      { slug: "manchester-city" },
      { slug: "liverpool" }
    ],
    affiliates: [
      { 
        slug: "bets10", 
        name: "Bets10", 
        url: "https://bets10.com", 
        rating: 4.5, 
        bonus: "1000 TL Hoşgeldin Bonusu", 
        features: ["Canlı Bahis", "Casino", "Hızlı Ödeme"] 
      },
      { 
        slug: "misli", 
        name: "Misli.com", 
        url: "https://misli.com", 
        rating: 4.7, 
        bonus: "500 TL İlk Yatırım Bonusu", 
        features: ["Canlı Skor", "İstatistik", "Mobil Uygulama"] 
      },
      { 
        slug: "nesine", 
        name: "Nesine", 
        url: "https://nesine.com", 
        rating: 4.3, 
        bonus: "100 TL Deneme Bonusu", 
        features: ["Lisanslı", "Güvenli Ödeme", "24/7 Destek"] 
      },
      { 
        slug: "betboo", 
        name: "Betboo", 
        url: "https://betboo.com", 
        rating: 4.4, 
        bonus: "750 TL Hoşgeldin Paketi", 
        features: ["Yüksek Oranlar", "Canlı Casino", "Poker"] 
      }
    ],
  };
}

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function generateSitemaps() {
  console.log('🚀 Starting Golivo SEO sitemap generation...');
  
  const outPublic = path.join(process.cwd(), "public");
  const outDir = path.join(outPublic, "sitemaps");
  ensureDir(outDir);

  console.log(`📁 Output directory: ${outDir}`);

  const now = new Date().toISOString();
  const { leagues, matches, teams, affiliates } = fetchInventory();

  console.log(`📊 Inventory: ${leagues.length} leagues, ${matches.length} matches, ${teams.length} teams, ${affiliates.length} affiliates`);

  // Dil başına URL seti üret
  for (const lang of LANGUAGES) {
    const urls = [];

    // Ana ve listeler
    urls.push(
      { loc: `https://${lang.code}.${BASE_DOMAIN}/`, changefreq: "hourly", priority: "1.0", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/leagues`, changefreq: "daily", priority: "0.9", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/teams`, changefreq: "daily", priority: "0.9", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/news`, changefreq: "hourly", priority: "0.8", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/analytics`, changefreq: "daily", priority: "0.8", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites`, changefreq: "weekly", priority: "0.9", lastmod: now },
    );

    // Programatik sayfalar
    for (const lg of leagues) {
      urls.push({
        loc: `https://${lang.code}.${BASE_DOMAIN}/league/${lg.slug}`,
        changefreq: "daily",
        priority: "0.8",
        lastmod: now,
      });
    }
    
    for (const t of teams) {
      urls.push({
        loc: `https://${lang.code}.${BASE_DOMAIN}/team/${t.slug}`,
        changefreq: "daily",
        priority: "0.8",
        lastmod: now,
      });
    }
    
    for (const m of matches) {
      urls.push({
        loc: `https://${lang.code}.${BASE_DOMAIN}/match/${m.id}`,
        changefreq: "always",
        priority: "1.0",
        lastmod: now,
      });
      
      // News & Analytics alt sayfaları
      urls.push(
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/news/${m.id}-preview`,
          changefreq: "hourly",
          priority: "0.7",
          lastmod: now,
        },
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/analytics/${m.id}-xg`,
          changefreq: "daily",
          priority: "0.7",
          lastmod: now,
        },
      );
    }

    // Affiliate (Bahis Siteleri) sayfaları
    for (const affiliate of affiliates) {
      urls.push(
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}`,
          changefreq: "weekly",
          priority: "0.8",
          lastmod: now,
        },
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}/review`,
          changefreq: "monthly",
          priority: "0.7",
          lastmod: now,
        },
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}/bonus`,
          changefreq: "weekly",
          priority: "0.8",
          lastmod: now,
        }
      );
    }

    const xml = toUrlSetXml(urls);
    fs.writeFileSync(path.join(outDir, `sitemap-${lang.code}.xml`), xml, "utf8");
    console.log(`✅ ${lang.code} sitemap yazıldı (${urls.length} URL)`);
  }

  // Affiliate-only sitemap
  generateAffiliateSitemap(affiliates, outDir, now);

  // Index
  const indexItems = [
    ...LANGUAGES.map((l) => ({
      loc: `https://${BASE_DOMAIN}/sitemaps/sitemap-${l.code}.xml`,
      lastmod: now,
    })),
    {
      loc: `https://${BASE_DOMAIN}/sitemaps/sitemap-affiliates.xml`,
      lastmod: now,
    }
  ];
  const indexXml = toSitemapIndexXml(indexItems);
  fs.writeFileSync(path.join(outPublic, "sitemap.xml"), indexXml, "utf8");
  console.log(`✅ sitemap.xml (index) yazıldı`);

  // robots.txt
  const robots = [
    `User-agent: *`,
    `Allow: /`,
    `Sitemap: https://${BASE_DOMAIN}/sitemap.xml`,
    ``,
    `# Affiliate pages`,
    `Allow: /betting-sites/`,
  ].join("\n");
  fs.writeFileSync(path.join(outPublic, "robots.txt"), robots, "utf8");
  console.log(`✅ robots.txt yazıldı`);
  
  console.log(`🎯 SEO sitemap generation completed! Generated ${LANGUAGES.length} language sitemaps + affiliate sitemap.`);
}

async function pingSearchEngines() {
  console.log('📢 Starting search engine ping...');
  
  const sitemapUrl = `https://${BASE_DOMAIN}/sitemap.xml`;
  console.log(`📍 Sitemap URL: ${sitemapUrl}`);
  
  // Basit ping simülasyonu (gerçek implementasyon için fetch gerekli)
  const engines = [
    'Google',
    'Bing', 
    'Yandex',
    'Baidu',
    'Seznam',
    'IndexNow'
  ];
  
  for (const engine of engines) {
    console.log(`→ ${engine} ping simulated`);
  }
  
  console.log('✅ Search engine ping completed');
}

async function main() {
  console.log('🎬 SEO System starting...');
  console.log('Arguments:', process.argv);
  
  const cmd = process.argv[2] || "full";
  console.log(`📋 Command: ${cmd}`);
  
  switch (cmd) {
    case "generate":
      console.log('🔄 Running generate...');
      generateSitemaps();
      break;
    case "ping":
      console.log('🔄 Running ping...');
      await pingSearchEngines();
      break;
    case "full":
      console.log('🔄 Running full...');
      generateSitemaps();
      await pingSearchEngines();
      break;
    default:
      console.log(`Kullanım:
  npm run seo:generate   # sitemap + robots üret
  npm run seo:ping       # arama motorlarına ping
  npm run seo:full       # generate + ping`);
  }
  
  console.log('✨ SEO System completed!');
}

// CLI entry point
if (require.main === module) {
  main().catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  });
}

// Affiliate sitemap generator
function generateAffiliateSitemap(affiliates, outDir, now) {
  const urls = [];
  
  // Tüm dillerde affiliate URL'leri
  for (const lang of LANGUAGES) {
    // Ana affiliate sayfası
    urls.push({
      loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites`,
      changefreq: "weekly",
      priority: "0.9",
      lastmod: now,
    });
    
    // Her affiliate için sayfalar
    for (const affiliate of affiliates) {
      urls.push(
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}`,
          changefreq: "weekly",
          priority: "0.8",
          lastmod: now,
        },
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}/review`,
          changefreq: "monthly",
          priority: "0.7",
          lastmod: now,
        },
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}/bonus`,
          changefreq: "weekly",
          priority: "0.8",
          lastmod: now,
        },
        {
          loc: `https://${lang.code}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}/odds`,
          changefreq: "daily",
          priority: "0.7",
          lastmod: now,
        }
      );
    }
  }
  
  const xml = toUrlSetXml(urls);
  fs.writeFileSync(path.join(outDir, 'sitemap-affiliates.xml'), xml, "utf8");
  console.log(`✅ Affiliate sitemap yazıldı (${urls.length} URL)`);
}

// Schema.org helpers
function buildSportsEventSchema(match) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: match.title,
    startDate: match.startTime,
    endDate: match.endTime,
    location: {
      "@type": "Place",
      name: match.venue,
      address: { "@type": "PostalAddress", addressCountry: match.country },
    },
    competitor: [
      { "@type": "SportsTeam", name: match.home },
      { "@type": "SportsTeam", name: match.away },
    ],
    sport: "Soccer",
    url: `https://${match.lang}.${BASE_DOMAIN}/match/${match.id}`,
  };
}

function buildAffiliateSchema(bettingSite) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "OnlineGambling",
      name: bettingSite.name,
      url: bettingSite.url,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: bettingSite.rating.toString(),
      bestRating: "5",
    },
    author: { "@type": "Organization", name: "Golivo" },
    description: `Bonus: ${bettingSite.bonus}. Özellikler: ${bettingSite.features.join(", ")}`,
  };
}

function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: `https://${BASE_DOMAIN}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `https://${BASE_DOMAIN}/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

module.exports = {
  generateSitemaps,
  pingSearchEngines,
  buildSportsEventSchema,
  buildAffiliateSchema,
  buildWebsiteSchema,
  LANGUAGES
};