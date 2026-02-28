import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { ParticleBackground } from './components/ParticleBackground';
import { PWAInstaller } from './components/PWAInstaller';
import { CNYConfetti } from './components/CNYConfetti';
// import { AdSenseManager } from './components/ads/AdSenseManager';
// import { AdBanner } from './components/ads/AdBanner';
import { HeroSection } from './sections/HeroSection';
import { CalculatorSection } from './sections/CalculatorSection';
import { ResultsSection } from './sections/ResultsSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { ZodiacShowcase } from './sections/ZodiacShowcase';
import { ZodiacStorySection } from './sections/ZodiacStorySection';
import { FooterSection } from './sections/FooterSection';
import type { ZodiacResult } from './sections/CalculatorSection';

function App() {
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCalculate = (zodiacResult: ZodiacResult) => {
    setResult(zodiacResult);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Chinese New Year Celebration - 48 hours of confetti! */}
      <CNYConfetti duration={48} />

      {/* AdSense Manager - DISABLED FOR NOW */}
      {/* <AdSenseManager /> */}

      {/* Toast notifications */}
      <Toaster position="top-center" richColors />

      {/* PWA Install Prompt */}
      <PWAInstaller />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection onStartClick={scrollToCalculator} />

        {/* Top Ad Banner - DISABLED FOR NOW */}
        {/* <div className="container mx-auto px-4 py-4">
          <AdBanner adSlot="1234567890" adFormat="horizontal" className="w-full" />
        </div> */}

        {/* Features Section */}
        <FeaturesSection />

        {/* Mid-Page Ad Banner - DISABLED FOR NOW */}
        {/* <div className="container mx-auto px-4 py-4">
          <AdBanner adSlot="0987654321" adFormat="rectangle" className="max-w-md mx-auto" />
        </div> */}

        {/* Zodiac Showcase */}
        <ZodiacShowcase />

        {/* The Great Race Story */}
        <ZodiacStorySection />

        {/* Calculator Section */}
        <div ref={calculatorRef}>
          <CalculatorSection onCalculate={handleCalculate} />
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsSection result={result} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Ad Banner - DISABLED FOR NOW */}
        {/* <div className="container mx-auto px-4 py-4">
          <AdBanner adSlot="5432167890" adFormat="rectangle" className="max-w-md mx-auto" />
        </div> */}

        {/* Footer */}
        <FooterSection />
      </div>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled past 500px
  const handleScroll = () => {
    setIsVisible(window.scrollY > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add and remove scroll listener properly
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default App;
