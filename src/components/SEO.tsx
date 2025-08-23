import React from "react";
import { Helmet } from "react-helmet-async";

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
  zh: "https://cn.golivo.app/",
  pl: "https://pl.golivo.app/",
  vi: "https://vi.golivo.app/",
  sw: "https://sw.golivo.app/",
  tl: "https://tl.golivo.app/",
  kk: "https://kk.golivo.app/",
};

type SEOProps = {
  title: string;
  description: string;
  canonical: string;
};

const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  return (
    <Helmet>
      {/* Temel meta etiketleri */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Çoklu dil hreflang */}
      {Object.entries(languages).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Varsayılan (x-default) */}
      <link rel="alternate" hrefLang="x-default" href="https://golivo.app/" />

      {/* Open Graph (sosyal medya önizlemeleri için) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Golivo" />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;