// ============================================================
// LOVE BLUEPRINT — icon loading resilience
// Incident (2026-10-20): right after deploy, a CDN edge served the
// new HTML but 404'd icons.js, leaving 108 empty icon slots with no
// recovery. Hardening so a missing/late icons.js can never blank the UI:
//   1. LBIcon shim defined INLINE before icons.js (returns '' safely,
//      so no ReferenceError in any builder)
//   2. one cache-busted retry if icons.js is missing at DOMContentLoaded
//   3. empty slots remount automatically once the real set arrives
//   4. empty slots collapse (display:none) so layout never shows gaps
// Run once: node tests/icons-resilience.cjs
// ============================================================
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'index.html');
let src = fs.readFileSync(FILE, 'utf8');
let ok = 0; const misses = [];
function rep(from, to, label) {
    const n = src.split(from).length - 1;
    if (!n) { misses.push(label); return; }
    src = src.split(from).join(to); ok += n;
}

// 1+2. inline shim + retry loader, placed BEFORE icons.js
rep('<script src="icons.js"></script>',
`<script>
/* Icon resilience: icons.js is a separate file, so guard against it
   failing to load (CDN edge lag right after a deploy, flaky network).
   Shim keeps every builder safe; retry restores the real set. */
(function(){
  if(typeof window.LBIcon === 'function') return;
  window.__lbIconsPending = true;
  window.LBIcon = window.LBIcon || function(){ return ''; };
  window.__lbIconShim = true;
})();
</script>
<script src="icons.js" onerror="window.__lbIconsFailed=true"></script>
<script>
/* If the real set did not load, retry once with a cache-buster. */
(function(){
  function real(){ return typeof window.LBIcons === 'object' && window.LBIcons && window.LBIcons.heart; }
  if(real()){ window.__lbIconShim = false; return; }
  function retry(){
    if(real()) return;
    var s = document.createElement('script');
    s.src = 'icons.js?r=' + Date.now();
    s.onload = function(){
      if(real()){ window.__lbIconShim = false; if(typeof window.mountIcons === 'function') window.mountIcons(); }
    };
    document.head.appendChild(s);
  }
  window.addEventListener('DOMContentLoaded', retry);
  setTimeout(retry, 2500);
})();
</script>`, 'script tag');

// 3. mountIcons must be reachable from the retry, and skip while shimmed
rep('function mountIcons(){\n  if(typeof LBIcon !== \'function\') return;',
    'function mountIcons(){\n  if(typeof LBIcon !== \'function\' || window.__lbIconShim) return;', 'mountIcons guard lf');
rep('function mountIcons(){\r\n  if(typeof LBIcon !== \'function\') return;',
    'function mountIcons(){\r\n  if(typeof LBIcon !== \'function\' || window.__lbIconShim) return;', 'mountIcons guard crlf');
rep('mountIcons();\r\nif(typeof MutationObserver', 'window.mountIcons = mountIcons;\r\nmountIcons();\r\nif(typeof MutationObserver', 'expose mountIcons');

// 4. empty icon slots collapse instead of leaving visible gaps
rep('.ic{width:1em;height:1em;vertical-align:-.15em;flex:none}',
    '.ic{width:1em;height:1em;vertical-align:-.15em;flex:none}\r\n[data-icon]:empty{display:none!important}', 'css collapse');

fs.writeFileSync(FILE, src, 'utf8');
console.log('  resilience replacements: ' + ok);
console.log('  MISSES (' + misses.length + '):'); misses.forEach(m => console.log('    - ' + m));
