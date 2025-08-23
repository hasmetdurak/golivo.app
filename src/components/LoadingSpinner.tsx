import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-200 rounded-full"></div>
          <div className="w-12 h-12 border-4 border-purple-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading matches...</p>
      </div>
    </div>
  );
};