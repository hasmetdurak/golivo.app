import React, { useState } from 'react';
import { Trophy, Calendar, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

interface FutbolHeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  currentDate?: Date;
  onDateChange?: (date: Date) => void;
}

const menuItems = [
  { key: 'scores', label: 'Scores', icon: Trophy },
  { key: 'news', label: 'News', icon: Globe },
  { key: 'analysis', label: 'Analysis', icon: ChevronDown },
  { key: 'contact', label: 'Contact', icon: Menu }
];

export const FutbolHeader: React.FC<FutbolHeaderProps> = ({ 
  currentView, 
  onViewChange,
  currentDate = new Date(),
  onDateChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange?.(date);
  };

  const handleViewChange = (view: string) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-800 to-purple-600 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-cream-light rounded-lg p-2 shadow-md">
              <Trophy className="h-8 w-8 text-purple-800" />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-cream-light">
              FutbolLive
            </h1>
          </motion.div>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.key}
                  onClick={() => handleViewChange(item.key)}
                  className={`
                    relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${currentView === item.key 
                      ? 'text-cream-light bg-white/10 shadow-md' 
                      : 'text-cream hover:text-cream-light hover:bg-white/5'
                    }
                    before:absolute before:inset-0 before:rounded-lg 
                    before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity
                  `}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {currentView === item.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
          
          {/* Date Selector */}
          <div className="hidden sm:block">
            <motion.button
              className="bg-cream text-purple-800 hover:bg-cream-dark px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{format(selectedDate, 'MMM dd')}</span>
              </div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-cream-light p-2 rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-purple-900/95 backdrop-blur-md border-t border-purple-500/20"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.key}
                      onClick={() => handleViewChange(item.key)}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300
                        ${currentView === item.key 
                          ? 'text-cream-light bg-white/10 shadow-md' 
                          : 'text-cream hover:text-cream-light hover:bg-white/5'
                        }
                      `}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    </motion.button>
                  );
                })}
                
                {/* Mobile Date Selector */}
                <motion.button
                  className="w-full text-left px-4 py-3 rounded-lg font-medium text-cream hover:text-cream-light hover:bg-white/5 transition-all duration-300"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <span>{format(selectedDate, 'MMMM dd, yyyy')}</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.header>
  );
};