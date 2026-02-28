import { motion } from 'framer-motion';
import { Heart, Facebook, Twitter, MessageCircle, Link2, Coffee, Shield, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function FooterSection() {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = 'Discover your Chinese Zodiac fortune!';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Share Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Share Your Fortune</h3>
          <p className="text-gray-400 mb-6">Let your friends discover their zodiac destiny too!</p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-full font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </motion.button>
            <motion.button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 rounded-full font-medium hover:bg-sky-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </motion.button>
            <motion.button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 rounded-full font-medium hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.button>
            <motion.button
              onClick={() => handleShare('copy')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-full font-medium hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link2 className="w-5 h-5" />
              {copied ? 'Copied!' : 'Copy Link'}
            </motion.button>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Footer Info */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </motion.span>
            <span>for zodiac enthusiasts</span>
          </div>
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Chinese Zodiac Fortune Guide. 
            Discover your destiny with ancient wisdom.
          </p>

          {/* Legal Links */}
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="/chinesezodiac/privacy.html" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </a>
            <a href="/chinesezodiac/terms.html" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Terms of Service
            </a>
          </div>
        </motion.div>

        {/* Buy Me a Coffee Card */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-block bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 max-w-md">
            <Coffee className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h4 className="text-xl font-bold text-white mb-2">Enjoy the Zodiac Guide?</h4>
            <p className="text-gray-300 mb-4 text-sm">
              If this free tool brought you insight or joy, consider buying me a coffee to keep the cosmic wisdom flowing!
            </p>
            <motion.a
              href="https://www.buymeacoffee.com/quantummerlin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Coffee className="w-5 h-5" />
              Buy Me a Coffee
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
