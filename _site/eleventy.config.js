import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  // ── Passthrough copy ─────────────────────────────────────────────────────
  // Copy ALL existing static assets unchanged into _site/
  // 11ty processes .njk by default; everything else passes through.
  eleventyConfig.addPassthroughCopy("shared");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("stranger");
  eleventyConfig.addPassthroughCopy("classic");
  eleventyConfig.addPassthroughCopy("kpop");
  eleventyConfig.addPassthroughCopy("kosmickpop");
  eleventyConfig.addPassthroughCopy("genesis");
  eleventyConfig.addPassthroughCopy("40hz");
  eleventyConfig.addPassthroughCopy("gravity");
  eleventyConfig.addPassthroughCopy("amomentintime");
  eleventyConfig.addPassthroughCopy("lifestrategy");
  eleventyConfig.addPassthroughCopy("pt");
  eleventyConfig.addPassthroughCopy("soulblueprint");
  eleventyConfig.addPassthroughCopy("chinesezodiac");
  eleventyConfig.addPassthroughCopy("ultimate");
  eleventyConfig.addPassthroughCopy("qrcodes-science");
  eleventyConfig.addPassthroughCopy("quantum-merlin-hub");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("agents");

  // Static root files
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("*.js");
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("*.json");
  eleventyConfig.addPassthroughCopy("*.xml");
  eleventyConfig.addPassthroughCopy("*.txt");
  eleventyConfig.addPassthroughCopy("*.ico");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.svg");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("sw.js");

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
  return {
    // Only process .njk files as templates.
    // All .html files pass through unchanged.
    templateFormats: ["njk"],

    dir: {
      input: "src",          // Templated pages live in src/
      includes: "_includes", // Layouts: src/_includes/
      data: "_data",         // Global data: src/_data/
      output: "_site"        // Build output
    },

    // Use Nunjucks for processing
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
