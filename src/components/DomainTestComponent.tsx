import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, Globe } from 'lucide-react';

interface DomainTestResult {
  domain: string;
  subdomain: string;
  status: 'testing' | 'working' | 'error' | 'timeout';
  responseTime?: number;
  error?: string;
  statusCode?: number;
}

const PRIORITY_SUBDOMAINS = [
  'www', 'tr', 'en', 'de', 'es', 'fr', 'it', 'pt', 'ru', 'ar'
];

const ALL_SUBDOMAINS = [
  'www', 'tr', 'en', 'de', 'es', 'pt', 'fr', 'it', 'ja', 'ko', 'cn', 'tw', 
  'hi', 'ru', 'pl', 'fa', 'vi', 'sw', 'tl', 'kk', 'nl', 'cs', 'sk',
  'hu', 'el', 'ro', 'bg', 'sr', 'hr', 'uk', 'bn', 'ur', 'ta', 'te',
  'ml', 'id', 'ms', 'th', 'km', 'my', 'ha', 'yo', 'zu', 'am', 'ak',
  'gn', 'qu', 'ay', 'arn', 'nah', 'sv', 'no', 'fi', 'et', 'lv', 'lt',
  'he', 'ar', 'az', 'ka', 'uz', 'af', 'sq', 'mk'
];

export const DomainTestComponent: React.FC = () => {
  const [results, setResults] = useState<DomainTestResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [testType, setTestType] = useState<'quick' | 'full'>('quick');
  const [currentlyTesting, setCurrentlyTesting] = useState<string>('');

  const testDomain = async (subdomain: string): Promise<DomainTestResult> => {
    const domain = `https://${subdomain}.golivo.app`;
    const startTime = Date.now();
    
    setCurrentlyTesting(subdomain);
    
    try {
      // Use fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(domain, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors' // This will prevent CORS issues but limits response info
      });
      
      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      
      return {
        domain,
        subdomain,
        status: 'working', // With no-cors, we assume it's working if no error
        responseTime
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          domain,
          subdomain,
          status: 'timeout',
          responseTime,
          error: 'Request timeout'
        };
      }
      
      return {
        domain,
        subdomain,
        status: 'error',
        responseTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const runTest = async (type: 'quick' | 'full') => {
    setTesting(true);
    setResults([]);
    setTestType(type);
    
    const subdomainsToTest = type === 'quick' ? PRIORITY_SUBDOMAINS : ALL_SUBDOMAINS;
    
    // Initialize results with testing status
    const initialResults: DomainTestResult[] = subdomainsToTest.map(subdomain => ({
      domain: `https://${subdomain}.golivo.app`,
      subdomain,
      status: 'testing'
    }));
    setResults(initialResults);
    
    // Test domains in batches to avoid overwhelming
    const batchSize = 3;
    const finalResults: DomainTestResult[] = [];
    
    for (let i = 0; i < subdomainsToTest.length; i += batchSize) {
      const batch = subdomainsToTest.slice(i, i + batchSize);
      
      const batchResults = await Promise.all(
        batch.map(subdomain => testDomain(subdomain))
      );
      
      finalResults.push(...batchResults);
      
      // Update results progressively
      setResults(prev => {
        const updated = [...prev];
        batchResults.forEach(result => {
          const index = updated.findIndex(r => r.subdomain === result.subdomain);
          if (index !== -1) {
            updated[index] = result;
          }
        });
        return updated;
      });
      
      // Small delay between batches
      if (i + batchSize < subdomainsToTest.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setCurrentlyTesting('');
    setTesting(false);
  };

  const getStatusIcon = (status: DomainTestResult['status']) => {
    switch (status) {
      case 'working':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'timeout':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'testing':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <Globe className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: DomainTestResult['status']) => {
    switch (status) {
      case 'working': return 'Working';
      case 'error': return 'Error';
      case 'timeout': return 'Timeout';
      case 'testing': return 'Testing...';
      default: return 'Unknown';
    }
  };

  const workingCount = results.filter(r => r.status === 'working').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  const timeoutCount = results.filter(r => r.status === 'timeout').length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">GoLivo Domain Test</h2>
        <p className="text-gray-600">
          Test if your site is working on the main domain and all language subdomains
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => runTest('quick')}
          disabled={testing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Quick Test (10 domains)
        </button>
        <button
          onClick={() => runTest('full')}
          disabled={testing}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Full Test (60+ domains)
        </button>
      </div>

      {testing && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-blue-700">
              Testing {currentlyTesting ? `${currentlyTesting}.golivo.app` : 'domains...'}
            </span>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{results.length}</div>
              <div className="text-sm text-gray-600">Total Tested</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{workingCount}</div>
              <div className="text-sm text-gray-600">Working</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-sm text-gray-600">Errors</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{timeoutCount}</div>
              <div className="text-sm text-gray-600">Timeouts</div>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((result) => (
              <div
                key={result.subdomain}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <div className="font-medium text-gray-900">
                      {result.domain}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getStatusText(result.status)}
                      {result.error && ` - ${result.error}`}
                    </div>
                  </div>
                </div>
                {result.responseTime && (
                  <div className="text-sm text-gray-500">
                    {result.responseTime}ms
                  </div>
                )}
              </div>
            ))}
          </div>

          {!testing && results.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Test Results Summary:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  ✅ Success Rate: {((workingCount / results.length) * 100).toFixed(1)}%
                </div>
                {workingCount === results.length && (
                  <div className="text-green-600 font-medium">
                    🎉 All domains are working perfectly!
                  </div>
                )}
                {errorCount > 0 && (
                  <div className="text-red-600">
                    ⚠️ {errorCount} domains have connectivity issues
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 text-xs text-gray-500">
        <p>
          Note: This test uses browser-based requests which may be limited by CORS policies. 
          For the most accurate results, use the server-side test script.
        </p>
      </div>
    </div>
  );
};