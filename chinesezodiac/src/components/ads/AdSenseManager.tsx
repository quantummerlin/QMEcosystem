import { useEffect } from 'react';

export function AdSenseManager() {
  useEffect(() => {
    // Initialize AdSense configuration
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      (window as any).adsbygoogle.push({
        google_ad_client: 'ca-pub-3480541530392777',
        enable_page_level_ads: true,
      });
    }
  }, []);

  return null;
}

export function detectAdBlocker(): Promise<boolean> {
  return new Promise((resolve) => {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.left = '-99999px';
    document.body.appendChild(testAd);
    
    setTimeout(() => {
      const isBlocked = testAd.offsetHeight === 0;
      document.body.removeChild(testAd);
      resolve(isBlocked);
    }, 100);
  });
}

export function showAdBlockerMessage() {
  // You can implement a modal or toast message here
  console.warn('Ad blocker detected. Please consider whitelisting this site to support our content.');
}