import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, BarChart3, Activity } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  showBrand?: boolean;
}

export const ModernLoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Yükleniyor...',
  showBrand = false
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {showBrand && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-4 shadow-lg">
            <Trophy className="w-12 h-12 text-cream-light" />
          </div>
        </motion.div>
      )}
      
      <motion.div
        className={`${sizeClasses[size]} border-4 border-purple-200 border-t-purple-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-600 font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

// Full page loading screen with corporate branding
export const CorporateLoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        {/* Brand Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 shadow-2xl mx-auto w-24 h-24 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-cream-light" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2"
        >
          FutbolLive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-600 text-lg font-medium mb-8"
        >
          Profesyonel Futbol Takibi
        </motion.p>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <ModernLoadingSpinner size="lg" message="Canlı skorlar yükleniyor..." />
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center space-x-6"
        >
          {[
            { icon: Activity, label: 'Canlı Skorlar' },
            { icon: BarChart3, label: 'İstatistikler' },
            { icon: Trophy, label: 'Ligi Takibi' }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + (index * 0.2), duration: 0.4 }}
                className="text-center"
              >
                <div className="bg-purple-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-gray-500 font-medium">{feature.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

// Skeleton loading for match cards
export const MatchCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-8 h-6 bg-gray-200 rounded"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-8 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        <div className="text-center ml-4">
          <div className="w-16 h-8 bg-gray-200 rounded-lg mb-2"></div>
          <div className="w-12 h-3 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

// League section skeleton
export const LeagueSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6 animate-pulse">
      <div className="bg-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
          <div className="flex-1">
            <div className="w-32 h-5 bg-gray-300 rounded mb-2"></div>
            <div className="w-24 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {[1, 2, 3].map(i => (
          <MatchCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};