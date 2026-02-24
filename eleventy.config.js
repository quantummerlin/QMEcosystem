import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  // ── Plugins ──────────────────────────────────────────────────────────────
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // ── Global Data ──────────────────────────────────────────────────────────
  eleventyConfig.addGlobalData("site", {
    name: "Quantum Merlin",
    url: "https://quantummerlin.com",
    ga4Id: "G-VW4LGE7L1T",
    adsensePub: "ca-pub-3480541530392777",
    etsyShop: "https://www.etsy.com/shop/QuantumMerlin",
    bmac: "https://buymeacoffee.com/quantummerlin"
  });

  // ── Shortcodes ───────────────────────────────────────────────────────────
  // Google Analytics snippet
  eleventyConfig.addShortcode("ga4", function() {
    return `<script async src="https://www.googletagmanager.com/gtag/js?id=G-VW4LGE7L1T"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-VW4LGE7L1T');
</script>`;
  });

  // AdSense snippet
  eleventyConfig.addShortcode("adsense", function() {
    return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480541530392777" crossorigin="anonymous"></script>`;
  });

  // Etsy CTA script
  eleventyConfig.addShortcode("etsyCta", function() {
    return `<script src="/shared/js/quantum-etsy-cta.js" defer></script>`;
  });

  // ── Config ───────────────────────────────────────────────────────────────
  // Only process .njk files in src/.
  // Output goes directly into the repo root so existing static HTML
  // continues to work without any passthrough copying.
  // Build is near-instant: only templated pages are processed.
  return {
    templateFormats: ["njk"],

    dir: {
      input: "src",          // Templated pages live in src/
      includes: "_includes", // Layouts: src/_includes/
      data: "_data",         // Global data: src/_data/
      output: "."            // Output to repo root (alongside existing HTML)
    },

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
