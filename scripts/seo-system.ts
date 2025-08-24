// scripts/seo-system.ts
// =======================================================
// GOLIVO • Tek Dosyalık SEO Makinesi
// Next.js 14 App Router uyumlu, 50+ dil, programatik hreflang,
// dinamik sitemap üretimi, Baidu/Yandex/Bing/IndexNow/Naver/Seznam ping,
// schema helpers, robots.txt, OpenGraph/Twitter meta builder.
// Çalıştırma:
//   npm i -D tsx
//   "scripts": {
//     "seo:generate": "tsx scripts/seo-system.ts generate",
//     "seo:ping":      "tsx scripts/seo-system.ts ping",
//     "seo:full":      "tsx scripts/seo-system.ts full"
//   }
// ENV (örnek .env):
//   BASE_DOMAIN=golivo.app
//   INDEXNOW_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//   LIVE_API_BASE=https://api.your-scorefeed.tld   (opsiyonel)
//   SITE_NAME=golivo.app
// Node 18+ gerektirir (global fetch vardır).
// =======================================================

/* -------------------- KONFİG -------------------- */

const BASE_DOMAIN = process.env.BASE_DOMAIN || "golivo.app";
const SITE_NAME = process.env.SITE_NAME || "golivo.app";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || ""; // IndexNow key zorunlu değil ama önerilir.
const LIVE_API_BASE = process.env.LIVE_API_BASE || ""; // Canlı skor API'n (opsiyonel)

type Lang = { code: string; name: string; region: string; rtl?: boolean };

export const LANGUAGES: Lang[] = [
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

/* -------------------- NEXT.JS METADATA HELPERS -------------------- */

// Not: Bunu app/seo.tsx benzeri yerden import edip page.tsx içinde kullanabilirsin.
export function buildGlobalMetadata(langCode: string, slug: string[] = []) {
  const lang = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[1];
  const path = slug.length ? `/${slug.join("/")}` : "";
  const url = `https://${lang.code}.${BASE_DOMAIN}${path}`;
  const title = `Canlı Skor – ${lang.name}`;
  const description =
    "Dünyanın en çok dilde canlı skor platformu. Hızlı, ücretsiz, reklamsız canlı skor ve istatistik.";

  const alternates: Record<string, string> = {};
  for (const l of LANGUAGES) {
    alternates[l.code] = `https://${l.code}.${BASE_DOMAIN}${path}`;
  }

  return {
    title,
    description,
    metadataBase: new URL(`https://${BASE_DOMAIN}`),
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: `https://${lang.code}.${BASE_DOMAIN}/og-${lang.code}.png`, width: 1200, height: 630, alt: title }],
      locale: lang.code,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://${lang.code}.${BASE_DOMAIN}/og-${lang.code}.png`],
    },
    robots: { index: true, follow: true, "max-image-preview": "large" as const },
    other: { "format-detection": "telephone=no" },
  };
}

/* -------------------- SCHEMA.ORG HELPERS -------------------- */

export function buildSportsEventSchema(match: {
  id: string;
  lang: string;
  title: string;
  startTime: string;
  endTime?: string;
  venue?: string;
  country?: string;
  home: string;
  away: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: match.title,
    startDate: match.startTime,
    endDate: match.endTime || undefined,
    location: match.venue
      ? {
          "@type": "Place",
          name: match.venue,
          address: match.country
            ? { "@type": "PostalAddress", addressCountry: match.country }
            : undefined,
        }
      : undefined,
    competitor: [
      { "@type": "SportsTeam", name: match.home },
      { "@type": "SportsTeam", name: match.away },
    ],
    sport: "Soccer",
    url: `https://${match.lang}.${BASE_DOMAIN}/match/${match.id}`,
  };
}

export function buildNewsArticleSchema(article: {
  lang: string;
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string; // ISO
  dateModified?: string; // ISO
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
    author: article.authorName
      ? { "@type": "Person", name: article.authorName }
      : undefined,
    mainEntityOfPage: article.url,
    inLanguage: article.lang,
  };
}

export function buildWebsiteSchema() {
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

/* -------------------- SİTEMAP ÜRETECİ -------------------- */

import fs from "node:fs";
import path from "node:path";

type UrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly";
  priority?: string; // "1.0"
};

function xmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toUrlSetXml(urls: UrlEntry[]) {
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

function toSitemapIndexXml(items: { loc: string; lastmod?: string }[]) {
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

async function fetchInventory() {
  // Üretimde, canlı API'den lig/maç/takım veri çek. Boş ise minimal set oluştur.
  try {
    if (LIVE_API_BASE) {
      // Örnek uçlar (projene göre uyarlayacaksın):
      // const leagues = await (await fetch(`${LIVE_API_BASE}/leagues`)).json();
      // const matches = await (await fetch(`${LIVE_API_BASE}/matches/today`)).json();
      // const teams   = await (await fetch(`${LIVE_API_BASE}/teams/top`)).json();
      // return { leagues, matches, teams };
      // Şimdilik dummy:
      return {
        leagues: [{ slug: "super-lig" }, { slug: "premier-league" }],
        matches: [{ id: "abc123" }, { id: "xyz789" }],
        teams: [{ slug: "galatasaray" }, { slug: "fenerbahce" }],
      };
    }
  } catch {
    // dev boş geç
  }
  // Fallback küçük envanter:
  return {
    leagues: [{ slug: "super-lig" }, { slug: "premier-league" }],
    matches: [{ id: "abc123" }, { id: "xyz789" }],
    teams: [{ slug: "galatasaray" }, { slug: "fenerbahce" }],
  };
}

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

export async function generateSitemaps() {
  console.log('🚀 Starting Golivo SEO sitemap generation...');
  
  const outPublic = path.join(process.cwd(), "public");
  const outDir = path.join(outPublic, "sitemaps");
  ensureDir(outDir);

  console.log(`📁 Output directory: ${outDir}`);

  const now = new Date().toISOString();
  const { leagues, matches, teams } = await fetchInventory();

  console.log(`📊 Inventory: ${leagues.length} leagues, ${matches.length} matches, ${teams.length} teams`);

  // Dil başına URL seti üret
  for (const lang of LANGUAGES) {
    const urls: UrlEntry[] = [];

    // Ana ve listeler:
    urls.push(
      { loc: `https://${lang.code}.${BASE_DOMAIN}/`, changefreq: "hourly", priority: "1.0", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/leagues`, changefreq: "daily", priority: "0.9", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/teams`, changefreq: "daily", priority: "0.9", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/news`, changefreq: "hourly", priority: "0.8", lastmod: now },
      { loc: `https://${lang.code}.${BASE_DOMAIN}/analytics`, changefreq: "daily", priority: "0.8", lastmod: now },
    );

    // Programatik sayfalar:
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
        changefreq: "always", // canlı sayfa
        priority: "1.0",
        lastmod: now,
      });
      // News & Analytics alt sayfaları (uzun-kuyruk):
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

    const xml = toUrlSetXml(urls);
    fs.writeFileSync(path.join(outDir, `sitemap-${lang.code}.xml`), xml, "utf8");
    console.log(`✅ ${lang.code} sitemap yazıldı (${urls.length} URL)`);
  }

  // Index
  const indexItems = LANGUAGES.map((l) => ({
    loc: `https://${BASE_DOMAIN}/sitemaps/sitemap-${l.code}.xml`,
    lastmod: now,
  }));
  const indexXml = toSitemapIndexXml(indexItems);
  fs.writeFileSync(path.join(outPublic, "sitemap.xml"), indexXml, "utf8");
  console.log(`✅ sitemap.xml (index) yazıldı`);

  // robots.txt
  const robots = [
    `User-agent: *`,
    `Allow: /`,
    `Sitemap: https://${BASE_DOMAIN}/sitemap.xml`,
  ].join("\n");
  fs.writeFileSync(path.join(outPublic, "robots.txt"), robots, "utf8");
  console.log(`✅ robots.txt yazıldı`);
  
  console.log(`🎯 SEO sitemap generation completed! Generated ${LANGUAGES.length} language sitemaps.`);
}

/* -------------------- PING (Google/Bing/Yandex/Baidu/Naver/Seznam/IndexNow) -------------------- */

async function pingGet(url: string) {
  try {
    const res = await fetch(url, { method: "GET" });
    console.log(`→ GET ping ${url} :: ${res.status}`);
  } catch (e) {
    console.error(`x GET ping fail ${url}`, e);
  }
}

async function pingPost(url: string, body: any) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(`→ POST ping ${url} :: ${res.status}`);
  } catch (e) {
    console.error(`x POST ping fail ${url}`, e);
  }
}

export async function pingSearchEngines(changedUrls?: string[]) {
  const sitemapUrl = `https://${BASE_DOMAIN}/sitemap.xml`;

  // Google, Bing klasik sitemap ping (GET)
  await pingGet(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
  await pingGet(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);

  // Seznam (CZ) sitemap ping
  await pingGet(`https://search.seznam.cz/pridat-stranku?url=${encodeURIComponent(sitemapUrl)}`);

  // Baidu XML-RPC benzeri endpointler değişken—sitemap GET ping:
  await pingGet(`http://ping.baidu.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);

  // Naver Search Advisor doğrudan public ping sağlamıyor → IndexNow ile kapsıyoruz.

  // Yandex: IndexNow desteği var (Bing proxy). Ayrıca sitemap GET ping:
  await pingGet(`https://yandex.com/indexnow?url=${encodeURIComponent(sitemapUrl)}&key=${INDEXNOW_KEY}`);

  // IndexNow (Bing/Yandex/Seznam/Naver'ı kapsar)
  if (INDEXNOW_KEY && (changedUrls?.length || 0) > 0) {
    const chunks = chunk(changedUrls!, 900); // payload limitlerini esnetmek için
    for (const group of chunks) {
      await pingPost("https://api.indexnow.org/indexnow", {
        host: BASE_DOMAIN,
        key: INDEXNOW_KEY,
        urlList: group,
      });
    }
  } else {
    // Hiç URL verilmediyse, en azından sitemap'i bildirelim:
    await pingPost("https://api.indexnow.org/indexnow", {
      host: BASE_DOMAIN,
      key: INDEXNOW_KEY || "no-key",
      urlList: [sitemapUrl],
    });
  }
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/* -------------------- KULLANIM NOTLARI -------------------- */
/*
1) Next.js sayfalarında:
   import { buildGlobalMetadata, buildSportsEventSchema, buildNewsArticleSchema, buildWebsiteSchema } from "@/scripts/seo-system";

   export const metadata = buildGlobalMetadata(params.lang, params.slug);
   // Schema'yı <script type="application/ld+json"> ile render et.

2) Edge ISR/Tazelik:
   - Canlı maç sayfalarında 30 sn revalidate düşün:
     export const revalidate = 30;

3) Hreflang:
   - buildGlobalMetadata zaten alternates.languages üretir (subdomain modeli).
   - Botlara GEO-IP redirect yapma; kullanıcıya banner ile öner.

4) Çalıştırma:
   - npm run seo:generate → /public/sitemap.xml + /public/sitemaps/* üretir + robots.txt
   - npm run seo:ping → arama motorlarına ping atar
   - npm run seo:full → generate + ping
*/

/* -------------------- CLI ENTRY -------------------- */

async function main() {
  console.log('🎬 SEO System starting...');
  console.log('Arguments:', process.argv);
  
  const cmd = process.argv[2] || "full";
  console.log(`📋 Command: ${cmd}`);
  
  switch (cmd) {
    case "generate":
      console.log('🔄 Running generate...');
      await generateSitemaps();
      break;
    case "ping":
      console.log('🔄 Running ping...');
      await pingSearchEngines();
      break;
    case "full":
      console.log('🔄 Running full...');
      await generateSitemaps();
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

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}