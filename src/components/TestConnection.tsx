import React, { useState, useEffect } from 'react';

export const TestConnection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testing connection...');
    
    try {
      const API_KEY = '47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d';
      const date = new Date().toISOString().split('T')[0];
      const url = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=${date}&APIkey=${API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(`Success! Found ${Array.isArray(data) ? data.length : 0} matches`);
      } else {
        setStatus('error');
        setMessage(`API Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Connection Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-card/60 backdrop-blur-sm border-border/50 rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
        🔧 Connection Test
      </h2>
      
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Click the button below to test the connection to the football API.
        </p>
        
        <button
          onClick={testConnection}
          disabled={status === 'testing'}
          className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50"
        >
          {status === 'testing' ? 'Testing...' : 'Test API Connection'}
        </button>
        
        {message && (
          <div className={`p-4 rounded-lg ${
            status === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : status === 'error'
              ? 'bg-red-50 border border-red-200 text-red-800'
              : 'bg-blue-50 border border-blue-200 text-blue-800'
          }`}>
            <p className="font-medium">{message}</p>
            {status === 'success' && (
              <p className="mt-2 text-sm">
                The API is working correctly. If you're still seeing a blank page, 
                the issue might be with data transformation or component rendering.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-2 text-sm">
                There's an issue with the API connection. Check your internet connection 
                and API key. If the problem persists, the API might be temporarily unavailable.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};