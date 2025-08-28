// Domain and Subdomain Test Utility
// This script tests if the site works on main domain and all subdomains

export interface DomainTestResult {
  domain: string;
  status: 'working' | 'error' | 'timeout';
  responseTime?: number;
  error?: string;
}

export class DomainTester {
  private baseUrl = 'golivo.app';
  private testPaths = ['/', '/leagues', '/betting-sites'];
  
  async testSubdomain(subdomain: string): Promise<DomainTestResult> {
    const domain = `https://${subdomain}.${this.baseUrl}`;
    const startTime = Date.now();
    
    try {
      // Test the main page
      const response = await fetch(domain, {
        method: 'HEAD',
        timeout: 5000
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          domain,
          status: 'working',
          responseTime
        };
      } else {
        return {
          domain,
          status: 'error',
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }
    } catch (error) {
      return {
        domain,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async testMainDomain(): Promise<DomainTestResult> {
    return this.testSubdomain('www');
  }

  async testAllSubdomains(): Promise<DomainTestResult[]> {
    // Get all supported language subdomains
    const supportedLanguages = [
      'tr', 'en', 'de', 'es', 'pt', 'fr', 'it', 'ja', 'ko', 'cn', 'tw', 
      'hi', 'ru', 'pl', 'fa', 'vi', 'sw', 'tl', 'kk', 'nl', 'cs', 'sk',
      'hu', 'el', 'ro', 'bg', 'sr', 'hr', 'uk', 'bn', 'ur', 'ta', 'te',
      'ml', 'id', 'ms', 'th', 'km', 'my', 'ha', 'yo', 'zu', 'am', 'ak',
      'gn', 'qu', 'ay', 'arn', 'nah', 'sv', 'no', 'fi', 'et', 'lv', 'lt',
      'he', 'ar', 'az', 'ka', 'uz', 'af', 'sq', 'mk'
    ];

    const results: DomainTestResult[] = [];
    
    // Test main domain first
    results.push(await this.testMainDomain());
    
    // Test all subdomains in parallel (but with rate limiting)
    const batchSize = 5; // Test 5 domains at a time
    for (let i = 0; i < supportedLanguages.length; i += batchSize) {
      const batch = supportedLanguages.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(subdomain => this.testSubdomain(subdomain))
      );
      results.push(...batchResults);
      
      // Rate limiting - wait 1 second between batches
      if (i + batchSize < supportedLanguages.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }

  generateReport(results: DomainTestResult[]): string {
    const working = results.filter(r => r.status === 'working');
    const errors = results.filter(r => r.status === 'error');
    
    let report = '🌐 GOLIVO DOMAIN TEST REPORT\\n';
    report += '================================\\n\\n';
    
    report += `✅ Working Domains: ${working.length}/${results.length}\\n`;
    report += `❌ Failed Domains: ${errors.length}/${results.length}\\n\\n`;
    
    if (working.length > 0) {
      report += '✅ WORKING DOMAINS:\\n';
      working.forEach(result => {
        report += `  • ${result.domain} (${result.responseTime}ms)\\n`;
      });
      report += '\\n';
    }
    
    if (errors.length > 0) {
      report += '❌ FAILED DOMAINS:\\n';
      errors.forEach(result => {
        report += `  • ${result.domain} - ${result.error}\\n`;
      });
      report += '\\n';
    }
    
    // Recommendations
    report += '💡 RECOMMENDATIONS:\\n';
    
    if (errors.length === 0) {
      report += '  • All domains are working perfectly! 🎉\\n';
    } else {
      report += `  • Check DNS configuration for ${errors.length} failed domains\\n`;
      report += '  • Verify SSL certificates are properly configured\\n';
      report += '  • Consider setting up automatic health checks\\n';
    }
    
    return report;
  }
}

// Usage example:
export async function runDomainTest(): Promise<void> {
  console.log('🔍 Starting domain test...');
  
  const tester = new DomainTester();
  const results = await tester.testAllSubdomains();
  const report = tester.generateReport(results);
  
  console.log(report);
  
  // Save report to file if in Node.js environment
  if (typeof window === 'undefined') {
    const fs = require('fs');
    fs.writeFileSync('domain-test-report.txt', report);
    console.log('📄 Report saved to domain-test-report.txt');
  }
}

// Quick test for main domains
export async function quickDomainTest(): Promise<boolean> {
  const tester = new DomainTester();
  const mainDomains = ['www', 'tr', 'en', 'de', 'es', 'fr'];
  
  console.log('🚀 Quick test for main domains...');
  
  const results = await Promise.all(
    mainDomains.map(subdomain => tester.testSubdomain(subdomain))
  );
  
  const working = results.filter(r => r.status === 'working').length;
  const total = results.length;
  
  console.log(`✅ ${working}/${total} main domains working`);
  
  return working === total;
}