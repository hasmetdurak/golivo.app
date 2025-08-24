// src/utils/seoHelpers.ts
// =======================================================
// GOLIVO • React/Vite SEO Utilities
// Metadata, Schema.org, ve hreflang helpers
// Enhanced with improved affiliate support and locale detection
// =======================================================

import { supportedLanguages } from '../i18n/index';

const BASE_DOMAIN = 'golivo.app';
const SITE_NAME = 'golivo.app';

// ====================================================
// Locale Detection (Browser-compatible)
// ====================================================
export function getLocaleFromBrowser(): string {
  if (typeof navigator !== 'undefined') {
    const languages = navigator.languages || [navigator.language];
    const supportedCodes = supportedLanguages.map(l => l.code);
    
    // Find best match
    for (const lang of languages) {
      const code = lang.split('-')[0]; // 'en-US' -> 'en'
      if (supportedCodes.includes(code)) {
        return code;
      }
    }
  }
  return 'en'; // fallback
}

export function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const supportedCodes = supportedLanguages.map(l => l.code);
  
  return supportedCodes.includes(firstSegment) ? firstSegment : 'en';
}

// ====================================================
// 1) Meta Tag Helpers (React Helmet için)
// ====================================================
export interface MetaData {
  title: string;
  description: string;
  canonical: string;
  image: string;
  alternates: Array<{ hrefLang: string; href: string }>;
  schema?: object;
}

export function buildGlobalMetadata(langCode: string, slug: string[] = []): MetaData {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[1];
  const path = slug.length ? `/${slug.join("/")}` : "";
  const url = `https://${lang.subdomain}.${BASE_DOMAIN}${path}`;
  
  const title = `Canlı Skor – ${lang.name}`;
  const description = "Dünyanın en çok dilde canlı skor platformu. Ücretsiz, hızlı, reklamsız canlı skor ve istatistikler.";
  const image = `https://${lang.subdomain}.${BASE_DOMAIN}/og-${lang.code}.png`;

  const alternates = supportedLanguages.map((l) => ({
    hrefLang: l.code,
    href: `https://${l.subdomain}.${BASE_DOMAIN}${path}`
  }));

  return {
    title,
    description,
    canonical: url,
    image,
    alternates,
    schema: buildWebsiteSchema()
  };
}

export function buildMatchMetadata(langCode: string, match: any): MetaData {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[1];
  const url = `https://${lang.subdomain}.${BASE_DOMAIN}/match/${match.id}`;
  
  const title = `${match.homeTeam} vs ${match.awayTeam} Canlı Skor - ${lang.name}`;
  const description = `${match.homeTeam} - ${match.awayTeam} maçının canlı skorunu, istatistiklerini ve detaylarını takip edin.`;
  const image = `https://${lang.subdomain}.${BASE_DOMAIN}/og-match-${match.id}.png`;

  const alternates = supportedLanguages.map((l) => ({
    hrefLang: l.code,
    href: `https://${l.subdomain}.${BASE_DOMAIN}/match/${match.id}`
  }));

  return {
    title,
    description,
    canonical: url,
    image,
    alternates,
    schema: buildSportsEventSchema({ ...match, lang: lang.code })
  };
}

export function buildAffiliateMetadata(langCode: string, affiliate: any): MetaData {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[1];
  const basePath = `betting-sites/${affiliate.slug}`;
  const url = `https://${lang.subdomain}.${BASE_DOMAIN}/${basePath}`;
  
  const title = `${affiliate.name} İnceleme ve Bonus - ${lang.name} | ${SITE_NAME}`;
  const description = `${affiliate.name} güvenilir mi? ${affiliate.bonus || 'Bonus mevcut'} teklifi, canlı bahis oranları ve detaylı inceleme. ⭐${affiliate.rating}/5 puan.`;
  const image = `https://${lang.subdomain}.${BASE_DOMAIN}/og-affiliate-${affiliate.slug}.png`;

  const alternates = supportedLanguages.map((l) => ({
    hrefLang: l.code,
    href: `https://${l.subdomain}.${BASE_DOMAIN}/${basePath}`
  }));

  return {
    title,
    description,
    canonical: url,
    image,
    alternates,
    schema: buildAffiliateSchema({ ...affiliate, lang: langCode })
  };
}

// ====================================================
// 2) Schema.org Builders
// ====================================================
export function buildSportsEventSchema(match: {
  id: string;
  lang: string;
  title?: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  endTime?: string;
  venue?: string;
  country?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: match.title || `${match.homeTeam} vs ${match.awayTeam}`,
    startDate: match.startTime,
    endDate: match.endTime,
    location: match.venue ? {
      "@type": "Place",
      name: match.venue,
      address: match.country ? { 
        "@type": "PostalAddress", 
        addressCountry: match.country 
      } : undefined,
    } : undefined,
    competitor: [
      { "@type": "SportsTeam", name: match.homeTeam },
      { "@type": "SportsTeam", name: match.awayTeam },
    ],
    sport: "Soccer",
    url: `https://${match.lang}.${BASE_DOMAIN}/match/${match.id}`,
  };
}

export function buildAffiliateSchema(bettingSite: {
  name: string;
  url: string;
  rating: number;
  bonus?: string;
  features: string[];
  slug: string;
  lang?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "WebSite",
      "@id": bettingSite.url,
      name: bettingSite.name,
      url: bettingSite.url,
      category: "Online Gambling",
      operatingSystem: "Web Browser",
      applicationCategory: "GameApplication"
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: bettingSite.rating.toString(),
      bestRating: "5",
      worstRating: "1"
    },
    author: { 
      "@type": "Organization", 
      name: "Golivo",
      url: `https://${BASE_DOMAIN}`
    },
    publisher: { 
      "@type": "Organization", 
      name: "Golivo",
      url: `https://${BASE_DOMAIN}`
    },
    description: `${bettingSite.name} inceleme: ${bettingSite.bonus || 'Bonus mevcut'}. Özellikler: ${bettingSite.features.join(", ")}.`,
    datePublished: new Date().toISOString(),
    inLanguage: bettingSite.lang || 'tr',
    reviewBody: `Detaylı ${bettingSite.name} incelemesi, bonus bilgileri ve kullanıcı deneyimi değerlendirmesi.`,
    positiveNotes: bettingSite.features,
    url: `https://${bettingSite.lang || 'tr'}.${BASE_DOMAIN}/betting-sites/${bettingSite.slug}`
  };
}

export function buildNewsArticleSchema(article: {
  lang: string;
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    description: article.description,
    image: article.image ? [article.image] : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: article.authorName ? { 
      "@type": "Person", 
      name: article.authorName 
    } : { "@type": "Organization", name: "Golivo" },
    publisher: { "@type": "Organization", name: "Golivo" },
    mainEntityOfPage: article.url,
    inLanguage: article.lang,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Golivo",
    url: `https://${BASE_DOMAIN}`,
    description: "Dünyanın en çok dilde canlı skor platformu",
    potentialAction: {
      "@type": "SearchAction",
      target: `https://${BASE_DOMAIN}/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    inLanguage: supportedLanguages.map(l => l.code),
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Golivo",
    url: `https://${BASE_DOMAIN}`,
    logo: `https://${BASE_DOMAIN}/logo-golivo.png`,
    description: "50+ dilde canlı futbol skorları, istatistikler ve bahis incelemeleri",
    sameAs: [
      "https://twitter.com/golivoapp",
      "https://facebook.com/golivoapp",
      "https://instagram.com/golivoapp"
    ],
  };
}

// ====================================================
// 3) React Helmet Utilities
// ====================================================
export function generateMetaTags(metadata: MetaData) {
  return {
    title: metadata.title,
    meta: [
      { name: 'description', content: metadata.description },
      { property: 'og:title', content: metadata.title },
      { property: 'og:description', content: metadata.description },
      { property: 'og:image', content: metadata.image },
      { property: 'og:url', content: metadata.canonical },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Golivo' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: metadata.title },
      { name: 'twitter:description', content: metadata.description },
      { name: 'twitter:image', content: metadata.image },
      { name: 'robots', content: 'index,follow,max-image-preview:large' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'canonical', href: metadata.canonical },
      ...metadata.alternates.map(alt => ({
        rel: 'alternate',
        hrefLang: alt.hrefLang,
        href: alt.href
      }))
    ],
    script: metadata.schema ? [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(metadata.schema)
      }
    ] : []
  };
}

// ====================================================
// 4) URL Generators
// ====================================================
export function generateMatchUrl(langCode: string, matchId: string): string {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[1];
  return `https://${lang.subdomain}.${BASE_DOMAIN}/match/${matchId}`;
}

export function generateLeagueUrl(langCode: string, leagueSlug: string): string {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[1];
  return `https://${lang.subdomain}.${BASE_DOMAIN}/league/${leagueSlug}`;
}

export function generateTeamUrl(langCode: string, teamSlug: string): string {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[1];
  return `https://${lang.subdomain}.${BASE_DOMAIN}/team/${teamSlug}`;
}

export function generateAffiliateUrl(langCode: string, affiliateSlug: string): string {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[1];
  return `https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites/${affiliateSlug}`;
}

// ====================================================
// 5) Enhanced Affiliate Data with SEO Optimization
// ====================================================
export const AFFILIATE_SITES = [
  {
    slug: "bets10",
    name: "Bets10",
    url: "https://bets10.com",
    rating: 4.5,
    bonus: "1000 TL Hoşgeldin Bonusu",
    features: ["Canlı Bahis", "Casino", "Hızlı Ödeme", "7/24 Destek"],
    logo: "/logos/bets10.png",
    description: "Türkiye'nin en güvenilir bahis sitelerinden biri olan Bets10, yüksek oranlar ve hızlı ödeme sistemi ile öne çıkıyor.",
    pros: ["Yüksek bonuslar", "Hızlı ödemeler", "Geniş oyun seçeneği", "Mobil uyumluluk"],
    cons: ["Müşteri hizmetleri bazen yavaş", "Bazı ülke kısıtlamaları"],
    category: "premium",
    license: "Curaçao Gaming License",
    established: "2016"
  },
  {
    slug: "misli",
    name: "Misli.com",
    url: "https://misli.com",
    rating: 4.7,
    bonus: "500 TL İlk Yatırım Bonusu",
    features: ["Canlı Skor", "İstatistik", "Mobil Uygulama", "BTK Lisanslı"],
    logo: "/logos/misli.png",
    description: "BTK lisanslı ve güvenilir bahis deneyimi sunan Misli.com, yasal çerçevede hizmet veren lider platform.",
    pros: ["BTK lisanslı", "Kolay kullanım", "Mobil uygulaması mükemmel", "Yasal güvence"],
    cons: ["Bonus miktarları düşük", "Uluslararası liglerde sınırlı seçenek"],
    category: "licensed",
    license: "BTK Lisanslı",
    established: "2008"
  },
  {
    slug: "nesine",
    name: "Nesine",
    url: "https://nesine.com",
    rating: 4.3,
    bonus: "100 TL Deneme Bonusu",
    features: ["Lisanslı", "Güvenli Ödeme", "24/7 Destek", "Canlı Bahis"],
    logo: "/logos/nesine.png",
    description: "Türkiye'nin en eski bahis sitesi olan Nesine, köklü geçmişi ve güvenilirliği ile öne çıkar.",
    pros: ["Köklü geçmiş", "Güvenilir", "İyi müşteri hizmetleri", "Geniş kullanıcı kitlesi"],
    cons: ["Arayüz eski", "Bonus seçenekleri sınırlı", "Modern özellikler eksik"],
    category: "traditional",
    license: "BTK Lisanslı",
    established: "2001"
  },
  {
    slug: "betboo",
    name: "Betboo",
    url: "https://betboo.com",
    rating: 4.4,
    bonus: "750 TL Hoşgeldin Paketi",
    features: ["Yüksek Oranlar", "Canlı Casino", "Poker", "Esports"],
    logo: "/logos/betboo.png",
    description: "Uluslararası deneyim ve yüksek oranlarla Türkiye'de hizmet veren Betboo, kapsamlı oyun portföyü sunar.",
    pros: ["Yüksek oranlar", "Çeşitli oyunlar", "İyi casino bölümü", "Esports desteği"],
    cons: ["Site hızı bazen sorunlu", "Türkçe desteğinde eksiklikler"],
    category: "international",
    license: "Curaçao Gaming License",
    established: "2006"
  },
  {
    slug: "superbahis",
    name: "Superbahis",
    url: "https://superbahis.com",
    rating: 4.2,
    bonus: "2000 TL Hoşgeldin Bonusu",
    features: ["Yüksek Bonus", "Canlı Destek", "Hızlı Kayıt", "Mobil Bahis"],
    logo: "/logos/superbahis.png",
    description: "Yüksek bonus oranları ve kullanıcı dostu arayüzü ile dikkat çeken güvenilir bahis platformu.",
    pros: ["Yüksek bonuslar", "Hızlı kayıt", "Canlı destek kalitesi", "Mobil uygulama"],
    cons: ["Çekim süreleri uzun", "Bazı spor dallarında sınırlı seçenek"],
    category: "bonus-focused",
    license: "Curaçao Gaming License",
    established: "2012"
  },
  {
    slug: "youwin",
    name: "Youwin",
    url: "https://youwin.com",
    rating: 4.1,
    bonus: "1500 TL İlk Üye Bonusu",
    features: ["Geniş Spor Menüsü", "Casino", "Poker", "Sanal Sporlar"],
    logo: "/logos/youwin.png",
    description: "Geniş spor menüsü ve çeşitli oyun seçenekleri ile her tür bahisçiye hitap eden platform.",
    pros: ["Geniş spor seçeneği", "Sanal sporlar", "Kullanıcı dostu", "İyi mobil deneyim"],
    cons: ["Bonus şartları karmaşık", "Bazı ödeme yöntemleri sınırlı"],
    category: "sports-focused",
    license: "Curaçao Gaming License",
    established: "2014"
  }
];

// ====================================================
// 6) Advanced SEO Utilities
// ====================================================
export function generateAffiliatesSitemap(languages: any[]) {
  const urls: string[] = [];
  
  // Main betting sites pages for each language
  for (const lang of languages) {
    urls.push(`https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites`);
    
    // Individual affiliate pages
    for (const affiliate of AFFILIATE_SITES) {
      urls.push(`https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}`);
      
      // Category and bonus pages
      urls.push(`https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}/bonus`);
      urls.push(`https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites/${affiliate.slug}/review`);
    }
    
    // Category pages
    const categories = ['licensed', 'premium', 'international', 'bonus-focused', 'sports-focused'];
    for (const category of categories) {
      urls.push(`https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites/category/${category}`);
    }
    
    // Comparison pages
    urls.push(`https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites/comparison`);
    urls.push(`https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites/best-bonuses`);
    urls.push(`https://${lang.subdomain}.${BASE_DOMAIN}/betting-sites/licensed`);
  }
  
  return urls;
}

export function generateSEOTitle(langCode: string, page: string, extra?: string): string {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[1];
  const baseTitle = `${SITE_NAME} - ${lang.name}`;
  
  const titles: Record<string, string> = {
    'home': `Canlı Skor - ${baseTitle}`,
    'betting-sites': `En İyi Bahis Siteleri - ${baseTitle}`,
    'match': `Canlı Maç Skoru - ${baseTitle}`,
    'league': `Lig Skorları - ${baseTitle}`,
    'team': `Takım İstatistikleri - ${baseTitle}`
  };
  
  const title = titles[page] || baseTitle;
  return extra ? `${extra} - ${title}` : title;
}

export function buildBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}