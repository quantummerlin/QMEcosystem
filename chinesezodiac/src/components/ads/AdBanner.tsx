import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  responsive?: boolean;
}

export function AdBanner({ 
  adSlot, 
  adFormat = 'auto',
  className = '',
  responsive = true 
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Only load ads in production
    if (import.meta.env.DEV) {
      console.log('AdSense development mode - ads not displayed');
      return;
    }

    // Check for ad blocker
    const checkAdBlocker = () => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      document.body.appendChild(testAd);
      
      const isBlocked = testAd.offsetHeight === 0;
      document.body.removeChild(testAd);
      
      if (isBlocked) {
        console.warn('Ad blocker detected - ads may not display');
      }
    };

    checkAdBlocker();

    // Push ad to Google AdSense
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adSlot]);

  // Get ad dimensions based on format
  const getAdDimensions = () => {
    switch (adFormat) {
      case 'rectangle':
        return { width: '300px', height: '250px' };
      case 'horizontal':
        return { width: '728px', height: '90px' };
      case 'vertical':
        return { width: '160px', height: '600px' };
      default:
        return { width: 'auto', height: 'auto' };
    }
  };

  const dimensions = getAdDimensions();

  return (
    <div 
      ref={adRef}
      className={`ad-container flex items-center justify-center ${className}`}
      style={{ minHeight: dimensions.height !== 'auto' ? dimensions.height : '100px' }}
    >
      {import.meta.env.DEV ? (
        <div 
          className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 text-sm p-4"
          style={{ width: dimensions.width, minHeight: dimensions.height }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">📢</div>
            <div>Ad Space</div>
            <div className="text-xs mt-1">{adFormat}</div>
          </div>
        </div>
      ) : (
        <ins
          className="adsbygoogle block"
          style={{
            display: 'block',
            width: dimensions.width,
            height: dimensions.height !== 'auto' ? dimensions.height : undefined,
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={adSlot}
          data-ad-format={responsive ? 'auto' : adFormat}
          data-full-width-responsive={responsive.toString()}
        />
      )}
    </div>
  );
}

// TypeScript declaration for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}