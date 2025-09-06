import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, Clock, Users, TrendingUp, Award } from 'lucide-react';

interface MatchDetailsModalProps {
  match: any;
  isOpen: boolean;
  onClose: () => void;
  viewMode?: 'mini' | 'full';
  onViewModeChange?: (mode: 'mini' | 'full') => void;
}

export const ModernMatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ 
  match, 
  isOpen, 
  onClose,
  viewMode = 'mini',
  onViewModeChange
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'events' | 'lineups'>('stats');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Modern Purple Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-cream-light rounded-lg p-2">
                  <BarChart3 className="h-6 w-6 text-purple-800" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-cream-light">Maç Detayları</h2>
                  <p className="text-purple-100 text-sm">{match.league || 'Lig'}</p>
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-cream-light p-2 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Clean Match Display */}
            <div className="grid grid-cols-3 gap-6 items-center text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {match.homeTeam?.name?.charAt(0) || 'H'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-cream-light">{match.homeTeam?.name}</h3>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-cream-light mb-2">
                  {match.homeScore ?? 0} - {match.awayScore ?? 0}
                </div>
                <div className="inline-block px-4 py-2 rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
                  {match.status === 'live' ? 'CANLI' : match.time || 'Başlayacak'}
                </div>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {match.awayTeam?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-cream-light">{match.awayTeam?.name}</h3>
              </div>
            </div>
          </div>

          {/* Clean Tab Navigation */}
          <div className="border-b border-gray-200 bg-white">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'stats', label: 'İstatistikler', icon: BarChart3 },
                { id: 'events', label: 'Olaylar', icon: Clock },
                { id: 'lineups', label: 'Kadrolar', icon: Users }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-2 font-medium text-sm transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'text-purple-600 border-b-2 border-purple-600' 
                        : 'text-gray-500 hover:text-purple-600'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'stats' && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">İstatistikler</h3>
                <p className="text-gray-500">Maç istatistikleri burada görüntülenecek.</p>
              </div>
            )}
            
            {activeTab === 'events' && (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Maç Olayları</h3>
                <p className="text-gray-500">Gol, kart ve değişiklikler burada görüntülenecek.</p>
              </div>
            )}
            
            {activeTab === 'lineups' && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Kadro Bilgileri</h3>
                <p className="text-gray-500">Takım kadroları yakında eklenecek.</p>
              </div>
            )}
          </div>
          
          {/* Premium Footer */}
          <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-purple-50 to-cream">
            <div className="text-center">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-600 font-medium">Profesyonel Futbol Takibi</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};