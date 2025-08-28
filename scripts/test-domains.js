#!/usr/bin/env node

// GoLivo Domain Connectivity Test
// Tests main domain and all 50+ language subdomains

const https = require('https');
const http = require('http');

// All supported language subdomains from your configuration
const SUBDOMAINS = [
  'www', // Main domain
  'tr', 'en', 'de', 'es', 'pt', 'fr', 'it', 'ja', 'ko', 'cn', 'tw', 
  'hi', 'ru', 'pl', 'fa', 'vi', 'sw', 'tl', 'kk', 'nl', 'cs', 'sk',
  'hu', 'el', 'ro', 'bg', 'sr', 'hr', 'uk', 'bn', 'ur', 'ta', 'te',
  'ml', 'id', 'ms', 'th', 'km', 'my', 'ha', 'yo', 'zu', 'am', 'ak',
  'gn', 'qu', 'ay', 'arn', 'nah', 'sv', 'no', 'fi', 'et', 'lv', 'lt',
  'he', 'ar', 'az', 'ka', 'uz', 'af', 'sq', 'mk'
];

const BASE_DOMAIN = 'golivo.app';
const TIMEOUT = 10000; // 10 seconds timeout

class DomainTester {
  constructor() {
    this.results = [];
    this.workingDomains = 0;
    this.failedDomains = 0;
  }

  async testDomain(subdomain) {
    const url = `https://${subdomain}.${BASE_DOMAIN}`;
    const startTime = Date.now();

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve({
          domain: url,
          subdomain,
          status: 'timeout',
          responseTime: TIMEOUT,
          error: 'Request timeout'
        });
      }, TIMEOUT);

      const request = https.get(url, (response) => {
        clearTimeout(timeout);
        const responseTime = Date.now() - startTime;
        
        resolve({
          domain: url,
          subdomain,
          status: response.statusCode >= 200 && response.statusCode < 400 ? 'working' : 'error',
          statusCode: response.statusCode,
          responseTime,
          headers: {
            server: response.headers.server,
            contentType: response.headers['content-type']
          }
        });
      });

      request.on('error', (error) => {
        clearTimeout(timeout);
        const responseTime = Date.now() - startTime;
        
        resolve({
          domain: url,
          subdomain,
          status: 'error',
          responseTime,
          error: error.message
        });
      });

      request.setTimeout(TIMEOUT, () => {
        clearTimeout(timeout);
        request.destroy();
        resolve({
          domain: url,
          subdomain,
          status: 'timeout',
          responseTime: TIMEOUT,
          error: 'Request timeout'
        });
      });
    });
  }

  async testAllDomains() {
    console.log('🔍 GoLivo Domain Connectivity Test');
    console.log('==================================');
    console.log(`Testing ${SUBDOMAINS.length} domains...`);
    console.log('');

    // Test domains in batches to avoid overwhelming the server
    const batchSize = 5;
    const batches = [];
    
    for (let i = 0; i < SUBDOMAINS.length; i += batchSize) {
      batches.push(SUBDOMAINS.slice(i, i + batchSize));
    }

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`Testing batch ${i + 1}/${batches.length}: ${batch.join(', ')}`);
      
      const batchResults = await Promise.all(
        batch.map(subdomain => this.testDomain(subdomain))
      );
      
      this.results.push(...batchResults);
      
      // Update counters
      batchResults.forEach(result => {
        if (result.status === 'working') {
          this.workingDomains++;
          console.log(`  ✅ ${result.domain} (${result.responseTime}ms)`);
        } else {
          this.failedDomains++;
          console.log(`  ❌ ${result.domain} - ${result.error || result.statusCode}`);
        }
      });
      
      // Wait between batches to be respectful
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  generateReport() {
    console.log('\n📊 TEST RESULTS SUMMARY');
    console.log('========================');
    console.log(`Total Domains Tested: ${this.results.length}`);
    console.log(`✅ Working: ${this.workingDomains}`);
    console.log(`❌ Failed: ${this.failedDomains}`);
    console.log(`📈 Success Rate: ${((this.workingDomains / this.results.length) * 100).toFixed(1)}%`);

    if (this.workingDomains > 0) {
      console.log('\n✅ WORKING DOMAINS:');
      const workingResults = this.results.filter(r => r.status === 'working');
      
      // Sort by response time
      workingResults.sort((a, b) => a.responseTime - b.responseTime);
      
      workingResults.forEach(result => {
        console.log(`  • ${result.domain} (${result.responseTime}ms, ${result.statusCode})`);
      });
    }

    if (this.failedDomains > 0) {
      console.log('\n❌ FAILED DOMAINS:');
      const failedResults = this.results.filter(r => r.status !== 'working');
      
      failedResults.forEach(result => {
        console.log(`  • ${result.domain} - ${result.error || `HTTP ${result.statusCode}`}`);
      });
    }

    console.log('\n💡 RECOMMENDATIONS:');
    
    if (this.failedDomains === 0) {
      console.log('  🎉 All domains are working perfectly!');
      console.log('  🌐 Your multi-language setup is fully operational');
    } else if (this.workingDomains > this.failedDomains) {
      console.log('  ⚠️  Most domains are working, but some need attention');
      console.log('  🔧 Check DNS configuration for failed domains');
      console.log('  🔒 Verify SSL certificates');
    } else {
      console.log('  🚨 Major connectivity issues detected');
      console.log('  🔧 Check your hosting provider settings');
      console.log('  📞 Contact support if issues persist');
    }

    // Performance analysis
    const workingResults = this.results.filter(r => r.status === 'working');
    if (workingResults.length > 0) {
      const avgResponseTime = workingResults.reduce((sum, r) => sum + r.responseTime, 0) / workingResults.length;
      const fastestDomain = workingResults.reduce((min, r) => r.responseTime < min.responseTime ? r : min);
      const slowestDomain = workingResults.reduce((max, r) => r.responseTime > max.responseTime ? r : max);
      
      console.log('\n⚡ PERFORMANCE ANALYSIS:');
      console.log(`  📊 Average Response Time: ${avgResponseTime.toFixed(0)}ms`);
      console.log(`  🚀 Fastest: ${fastestDomain.domain} (${fastestDomain.responseTime}ms)`);
      console.log(`  🐌 Slowest: ${slowestDomain.domain} (${slowestDomain.responseTime}ms)`);
    }
  }

  async saveResults() {
    const fs = require('fs');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `domain-test-results-${timestamp}.json`;
    
    const reportData = {
      testDate: new Date().toISOString(),
      summary: {
        totalDomains: this.results.length,
        workingDomains: this.workingDomains,
        failedDomains: this.failedDomains,
        successRate: ((this.workingDomains / this.results.length) * 100).toFixed(1)
      },
      results: this.results
    };
    
    fs.writeFileSync(filename, JSON.stringify(reportData, null, 2));
    console.log(`\n💾 Detailed results saved to: ${filename}`);
  }
}

// Main execution
async function main() {
  const tester = new DomainTester();
  
  try {
    await tester.testAllDomains();
    tester.generateReport();
    await tester.saveResults();
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Quick test function for main domains only
async function quickTest() {
  console.log('🚀 Quick Test - Main Domains Only');
  console.log('==================================');
  
  const mainDomains = ['www', 'tr', 'en', 'de', 'es', 'fr'];
  const tester = new DomainTester();
  
  const results = await Promise.all(
    mainDomains.map(subdomain => tester.testDomain(subdomain))
  );
  
  const working = results.filter(r => r.status === 'working');
  
  console.log(`✅ ${working.length}/${results.length} main domains working`);
  
  results.forEach(result => {
    if (result.status === 'working') {
      console.log(`  ✅ ${result.domain} (${result.responseTime}ms)`);
    } else {
      console.log(`  ❌ ${result.domain} - ${result.error || result.statusCode}`);
    }
  });
  
  return working.length === results.length;
}

// Command line interface
if (process.argv.includes('--quick')) {
  quickTest();
} else {
  main();
}

module.exports = { DomainTester, quickTest };