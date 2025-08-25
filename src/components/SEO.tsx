import React from "react";
import { Helmet } from "react-helmet-async";
import { getSEOConfig } from '../config/seoConfig';
import { getCurrentLanguage } from '../i18n/index';

// Desteklenen diller ve subdomain adresleri
const languages: Record<string, string> = {
  tr: "https://tr.golivo.app/",
  en: "https://en.golivo.app/",
  de: "https://de.golivo.app/",
  fr: "https://fr.golivo.app/",
  es: "https://es.golivo.app/",
  it: "https://it.golivo.app/",
  pt: "https://pt.golivo.app/",
  ru: "https://ru.golivo.app/",
  ar: "https://ar.golivo.app/",
  fa: "https://fa.golivo.app/",
  hi: "https://hi.golivo.app/",
  ja: "https://ja.golivo.app/",
  ko: "https://ko.golivo.app/",
  'zh-CN': "https://cn.golivo.app/",
  'zh-TW': "https://tw.golivo.app/",
  pl: "https://pl.golivo.app/",
  vi: "https://vi.golivo.app/",
  sw: "https://sw.golivo.app/",
  tl: "https://tl.golivo.app/",
  kk: "https://kk.golivo.app/",
  nl: "https://nl.golivo.app/",
  cs: "https://cs.golivo.app/",
  sk: "https://sk.golivo.app/",
  hu: "https://hu.golivo.app/",
  el: "https://el.golivo.app/",
  ro: "https://ro.golivo.app/",
  bg: "https://bg.golivo.app/",
  sr: "https://sr.golivo.app/",
  hr: "https://hr.golivo.app/",
  uk: "https://uk.golivo.app/",
  bn: "https://bn.golivo.app/",
  ur: "https://ur.golivo.app/",
  ta: "https://ta.golivo.app/",
  te: "https://te.golivo.app/",
  ml: "https://ml.golivo.app/",
  id: "https://id.golivo.app/",
  ms: "https://ms.golivo.app/",
  th: "https://th.golivo.app/",
  km: "https://km.golivo.app/",
  my: "https://my.golivo.app/",
  ha: "https://ha.golivo.app/",
  yo: "https://yo.golivo.app/",
  zu: "https://zu.golivo.app/",
  am: "https://am.golivo.app/",
  ak: "https://ak.golivo.app/",
  gn: "https://gn.golivo.app/",
  qu: "https://qu.golivo.app/",
  ay: "https://ay.golivo.app/",
  arn: "https://arn.golivo.app/",
  nah: "https://nah.golivo.app/",
  'en-IN': "https://in.golivo.app/"
};

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  path?: string; // Mevcut sayfa yolu
};

const SEO: React.FC<SEOProps> = ({ title, description, canonical, keywords, path = '' }) => {
  const currentLang = getCurrentLanguage();
  const seoConfig = getSEOConfig(currentLang);
  
  // Use passed props or fallback to config
  const finalTitle = title || seoConfig.title;
  const finalDescription = description || seoConfig.description;
  const finalKeywords = keywords || seoConfig.keywords;
  
  // Dinamik canonical URL oluşturma
  const finalCanonical = canonical || `${languages[currentLang] || languages['en']}${path}`;

  return (
    <Helmet>
      {/* Temel meta etiketleri */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Locale */}
      <meta property="og:locale" content={seoConfig.locale} />

      {/* Çoklu dil hreflang - doğru subdomain ile */}
      {Object.entries(languages).map(([lang, baseUrl]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={`${baseUrl}${path}`} />
      ))}

      {/* Varsayılan (x-default) */}
      <link rel="alternate" hrefLang="x-default" href={`https://golivo.app/${path}`} />

      {/* Open Graph (sosyal medya önizlemeleri için) */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content="Golivo" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://golivo.app/logo.png" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content="https://golivo.app/logo.png" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content={currentLang} />
      <meta name="geo.region" content={seoConfig.locale.split('_')[1] || 'US'} />
      <meta name="geo.placename" content={seoConfig.locale} />
    </Helmet>
  );
};

export default SEO;