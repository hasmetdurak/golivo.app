// Manual Domain Test for GoLivo
// Run this in your browser console to test specific domains

async function testGolivoDomain(subdomain) {
  const url = `https://${subdomain}.golivo.app`;
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    
    const responseTime = Date.now() - startTime;
    console.log(`✅ ${url} - Working (${responseTime}ms)`);
    return { success: true, responseTime, url };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.log(`❌ ${url} - Error: ${error.message} (${responseTime}ms)`);
    return { success: false, error: error.message, responseTime, url };
  }
}

async function testMainDomains() {
  console.log('🔍 Testing GoLivo Main Domains...');
  console.log('================================');
  
  const mainDomains = [
    'www',   // Main domain
    'tr',    // Turkish
    'en',    // English
    'de',    // German
    'es',    // Spanish
    'fr',    // French
    'it',    // Italian
    'pt',    // Portuguese
    'ru',    // Russian
    'ar'     // Arabic
  ];
  
  const results = [];
  
  for (const subdomain of mainDomains) {
    const result = await testGolivoDomain(subdomain);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  const working = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log('\n📊 Results Summary:');
  console.log(`✅ Working: ${working}/${total} (${((working/total)*100).toFixed(1)}%)`);
  
  if (working === total) {
    console.log('🎉 All main domains are working perfectly!');
  } else {
    console.log('⚠️ Some domains have issues - check the detailed logs above');
  }
  
  return results;
}

// Test individual domain
async function testSingleDomain(subdomain) {
  console.log(`🔍 Testing ${subdomain}.golivo.app...`);
  return await testGolivoDomain(subdomain);
}

// Test if golivo.app (without www) works
async function testRootDomain() {
  console.log('🔍 Testing root domain golivo.app...');
  const startTime = Date.now();
  
  try {
    const response = await fetch('https://golivo.app', { 
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    
    const responseTime = Date.now() - startTime;
    console.log(`✅ golivo.app - Working (${responseTime}ms)`);
    return { success: true, responseTime, url: 'https://golivo.app' };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.log(`❌ golivo.app - Error: ${error.message} (${responseTime}ms)`);
    return { success: false, error: error.message, responseTime, url: 'https://golivo.app' };
  }
}

// Quick manual test
console.log(`
🌐 GoLivo Domain Test Commands
=============================

Run these commands in your browser console:

1. Test main domains:
   testMainDomains()

2. Test root domain:
   testRootDomain()

3. Test specific subdomain:
   testSingleDomain('tr')  // Replace 'tr' with any language code

4. Test all important domains:
   Promise.all([
     testRootDomain(),
     testSingleDomain('www'),
     testSingleDomain('tr'),
     testSingleDomain('en')
   ])
`);

// Export functions for use
window.testGolivoDomain = testGolivoDomain;
window.testMainDomains = testMainDomains;
window.testSingleDomain = testSingleDomain;
window.testRootDomain = testRootDomain;