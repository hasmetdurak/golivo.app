// src/components/BettingSites.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, ExternalLink, Gift, Shield, Clock, TrendingUp } from 'lucide-react';
import { AFFILIATE_SITES, buildAffiliateMetadata, generateMetaTags, getLocaleFromBrowser } from '../utils/seoHelpers';
import { useTranslation } from '../i18n/useTranslation';

interface BettingSitesProps {
  langCode?: string;
}

const BettingSites: React.FC<BettingSitesProps> = ({ langCode }) => {
  const { t } = useTranslation();
  const currentLang = langCode || getLocaleFromBrowser();
  
  // Enhanced SEO metadata using existing helpers
  const dummyAffiliate = {
    slug: 'betting-sites',
    name: 'En İyi Bahis Siteleri',
    bonus: 'Özel Bonuslar',
    rating: 4.5,
    features: ['Güvenilir', 'Hızlı Ödeme', 'Yüksek Bonuslar']
  };
  
  const metadata = buildAffiliateMetadata(currentLang, dummyAffiliate);
  const enhancedMetadata = {
    ...metadata,
    title: `🎯 En İyi Bahis Siteleri 2025 - ${metadata.title}`,
    description: 'Güvenilir, lisanslı ve yüksek bonus veren bahis sitelerini inceleyin. Uzman değerlendirmelerimiz ile en iyi seçimi yapın. ⭐ Özel bonuslar mevcut!'
  };
  
  const metaTags = generateMetaTags(enhancedMetadata);
  
  // Enhanced schema for the collection page
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "En İyi Bahis Siteleri",
    description: enhancedMetadata.description,
    url: enhancedMetadata.canonical,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: AFFILIATE_SITES.length,
      itemListElement: AFFILIATE_SITES.map((site, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Review",
          itemReviewed: {
            "@type": "WebSite",
            name: site.name,
            url: site.url
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: site.rating,
            bestRating: 5
          },
          author: {
            "@type": "Organization",
            name: "Golivo"
          }
        }
      }))
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: enhancedMetadata.canonical.replace('/betting-sites', '')
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bahis Siteleri",
          item: enhancedMetadata.canonical
        }
      ]
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        {metaTags.meta.map((meta, index) => (
          <meta key={index} {...meta} />
        ))}
        {metaTags.link.map((link, index) => (
          <link key={index} {...link} />
        ))}
        {metaTags.script.map((script, index) => (
          <script key={index} {...script} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              🎯 En İyi Bahis Siteleri 2025
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
              Güvenilir, lisanslı ve yüksek bonus veren bahis sitelerini inceleyin. 
              <span className="hidden sm:inline">Uzman değerlendirmelerimiz ile en iyi seçimi yapın.</span>
            </p>
            <div className="mt-4 sm:mt-6 inline-flex items-center bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span className="font-medium">✓ Güvenilir • ✓ Lisanslı • ✓ Özel Bonuslar</span>
            </div>
          </div>

          {/* Betting Sites Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {AFFILIATE_SITES.map((site, index) => (
              <div key={site.slug} className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                
                {/* Badge for top sites */}
                {index === 0 && (
                  <div className="absolute -top-2 left-4 sm:left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold z-10 shadow-lg">
                    #1 ÖNERİMİZ
                  </div>
                )}
                
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <img 
                          src={site.logo} 
                          alt={site.name} 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain bg-gray-50 p-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-logo.png';
                          }}
                        />
                      </div>
                      <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{site.name}</h3>
                        <div className="flex items-center mt-1">
                          {getRatingStars(site.rating)}
                          <span className="ml-2 text-xs sm:text-sm text-gray-600 font-medium">({site.rating}/5)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        ÖNERİLİR
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">{site.description}</p>

                  {/* Bonus */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-4 rounded-lg mb-4 shadow-inner">
                    <div className="flex items-center mb-2">
                      <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      <span className="font-bold text-sm sm:text-base">ÖZEL BONUS</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold leading-tight">{site.bonus}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Özellikler:</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {site.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-medium text-green-700 mb-2 text-sm sm:text-base">✓ Artıları:</h5>
                      <ul className="text-xs sm:text-sm text-green-600 space-y-1">
                        {site.pros.slice(0, 3).map((pro, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-1 flex-shrink-0">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <h5 className="font-medium text-red-700 mb-2 text-sm sm:text-base">✗ Eksikleri:</h5>
                      <ul className="text-xs sm:text-sm text-red-600 space-y-1">
                        {site.cons.slice(0, 2).map((con, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-red-500 mr-1 flex-shrink-0">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <a
                      href={`/betting-sites/${site.slug}`}
                      className="flex-1 bg-blue-600 text-white py-3 sm:py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                      Detaylı İnceleme
                    </a>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white py-3 sm:py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors text-center text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                      <span>Siteye Git</span>
                      <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              🛡️ Güvenli Bahis Rehberi
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Lisans Kontrolü</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Sadece lisanslı ve denetlenen siteleri öneriyoruz.
                </p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Hızlı Ödemeler</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Kazançlarınızı hızlı ve güvenli şekilde çekin.
                </p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Yüksek Oranlar</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  En iyi oranlarla bahis yapma fırsatı.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              ❓ Sık Sorulan Sorular
            </h2>
            
            <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
              <details className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base py-2 flex items-center justify-between">
                  <span>Hangi bahis sitesi en güvenilir?</span>
                  <span className="text-gray-400 text-xl transform transition-transform duration-200">›</span>
                </summary>
                <p className="mt-3 text-gray-600 text-xs sm:text-sm leading-relaxed pl-2 border-l-2 border-blue-200">
                  Lisanslı tüm siteler güvenlidir. Özellikle Misli.com gibi BTK lisanslı siteler %100 güvenlidir.
                </p>
              </details>
              
              <details className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base py-2 flex items-center justify-between">
                  <span>Bonusları nasıl alabilirim?</span>
                  <span className="text-gray-400 text-xl transform transition-transform duration-200">›</span>
                </summary>
                <p className="mt-3 text-gray-600 text-xs sm:text-sm leading-relaxed pl-2 border-l-2 border-green-200">
                  Siteye üye olduktan sonra ilk yatırımınızda otomatik olarak bonus hesabınıza tanımlanır.
                </p>
              </details>
              
              <details className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base py-2 flex items-center justify-between">
                  <span>Minimum yatırım miktarı nedir?</span>
                  <span className="text-gray-400 text-xl transform transition-transform duration-200">›</span>
                </summary>
                <p className="mt-3 text-gray-600 text-xs sm:text-sm leading-relaxed pl-2 border-l-2 border-purple-200">
                  Çoğu sitede minimum yatırım 50-100 TL arasındadır. Detaylar her sitenin kendi kurallarına bağlıdır.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BettingSites;