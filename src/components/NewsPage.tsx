import React from 'react';
import { Go35Header } from './Go35Header';
import { Calendar, User, Eye } from 'lucide-react';

interface NewsPageProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  views: number;
  image?: string;
  category: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Premier League Transfer Window: Major Signings This Summer',
    summary: 'A comprehensive look at the biggest transfers in the Premier League this transfer window.',
    content: 'The Premier League has seen some incredible transfers this summer...',
    author: 'John Smith',
    date: '2025-01-27',
    views: 1250,
    category: 'Transfers'
  },
  {
    id: '2',
    title: 'Champions League Draw: Exciting Matchups Ahead',
    summary: 'The Champions League draw has produced some thrilling potential matchups.',
    content: 'UEFA Champions League draw has been completed...',
    author: 'Sarah Johnson',
    date: '2025-01-26',
    views: 980,
    category: 'Champions League'
  },
  {
    id: '3',
    title: 'La Liga Title Race: Real Madrid vs Barcelona Analysis',
    summary: 'An in-depth analysis of the current La Liga title race between the Spanish giants.',
    content: 'The La Liga season is heating up with Real Madrid and Barcelona...',
    author: 'Carlos Rodriguez',
    date: '2025-01-25',
    views: 1450,
    category: 'La Liga'
  }
];

export const NewsPage: React.FC<NewsPageProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Go35Header currentView={currentView} onViewChange={onViewChange} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Football News
          </h1>
          <p className="text-gray-600">
            Latest news, transfers, and updates from the world of football
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              {/* Article Image */}
              <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <div className="text-6xl">⚽</div>
              </div>
              
              {/* Article Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                  {article.category}
                </span>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                
                {/* Summary */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{article.views}</span>
                  </div>
                </div>
                
                {/* Read More Button */}
                <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium">
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-purple-600 border-2 border-purple-600 py-3 px-8 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200 font-medium">
            Load More Articles
          </button>
        </div>
      </main>
    </div>
  );
};