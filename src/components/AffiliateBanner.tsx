import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Shield, Trophy } from 'lucide-react';

interface AffiliateBannerProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const AffiliateBanner: React.FC<AffiliateBannerProps> = ({ 
  title = \"Bahis Siteleri\", 
  subtitle = \"Güvenilir ve Lisanslı Platformlar\",
  className = \"\"
}) => {
  const affiliateLinks = [
    {
      id: '1',
      name: 'Bets10',
      logo: '/affiliate-logos/bets10.png',
      bonus: '%100 Hoşgeldin Bonusu',
      rating: 4.8,
      url: '#',
      featured: true
    },
    {
      id: '2', 
      name: 'Betboo',
      logo: '/affiliate-logos/betboo.png',
      bonus: '1000 TL Bonus',
      rating: 4.6,
      url: '#',
      featured: false
    },
    {
      id: '3',
      name: 'Misli',
      logo: '/affiliate-logos/misli.png', 
      bonus: 'Süper Oranlar',
      rating: 4.7,
      url: '#',
      featured: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 shadow-lg ${className}`}
    >
      <div className=\"text-center mb-6\">
        <motion.h3 
          className=\"text-2xl font-bold text-cream-light mb-2\"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <p className=\"text-purple-100\">{subtitle}</p>
      </div>

      <div className=\"grid grid-cols-1 md:grid-cols-3 gap-4\">
        {affiliateLinks.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className={`
              relative bg-white rounded-xl p-4 transition-all duration-300 cursor-pointer
              hover:shadow-xl hover:scale-105
              ${site.featured ? 'ring-2 ring-gold' : ''}
            `}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {site.featured && (
              <div className=\"absolute -top-2 -right-2\">
                <div className=\"bg-gold text-purple-800 text-xs font-bold px-2 py-1 rounded-full\">
                  ÖNERİLEN
                </div>
              </div>
            )}
            
            <div className=\"text-center\">
              <div className=\"w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center\">
                <span className=\"text-sm font-bold text-purple-600\">{site.name}</span>
              </div>
              
              <h4 className=\"font-bold text-gray-900 mb-1\">{site.name}</h4>
              
              <div className=\"flex items-center justify-center mb-2\">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(site.rating) 
                        ? 'text-gold fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className=\"ml-1 text-sm text-gray-600\">{site.rating}</span>
              </div>
              
              <p className=\"text-sm text-purple-600 font-medium mb-3\">{site.bonus}</p>
              
              <motion.button
                className=\"w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-colors hover:bg-purple-700\"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className=\"w-4 h-4 inline mr-2\" />
                Siteye Git
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className=\"text-center mt-6\">
        <div className=\"flex items-center justify-center space-x-4 text-purple-100 text-sm\">
          <div className=\"flex items-center\">
            <Shield className=\"w-4 h-4 mr-1\" />
            Lisanslı
          </div>
          <div className=\"flex items-center\">
            <Trophy className=\"w-4 h-4 mr-1\" />
            Güvenilir
          </div>
        </div>
        <p className=\"text-xs text-purple-200 mt-2\">
          +18 | Sorumlu Oyun | Kumar bağımlılığına karşı dikkatli olun
        </p>
      </div>
    </motion.div>
  );
};

export default AffiliateBanner;