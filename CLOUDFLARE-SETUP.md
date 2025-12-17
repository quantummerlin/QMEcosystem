# Cloudflare Redirect Rules for Subdomains

This document outlines the redirect configuration needed in Cloudflare 
to route subdomains to the correct HTML files on GitHub Pages.

## GitHub Pages Setup

1. Your main repository should be hosted at: `quantummerlin.github.io`
2. Custom domain configured: `quantummerlin.com`
3. Cloudflare DNS should be configured as the nameserver

## DNS Records (Cloudflare)

Add these CNAME records in Cloudflare DNS:

| Type  | Name       | Target                    | Proxy |
|-------|------------|---------------------------|-------|
| CNAME | @          | quantummerlin.github.io   | Yes   |
| CNAME | www        | quantummerlin.github.io   | Yes   |
| CNAME | codes      | quantummerlin.github.io   | Yes   |
| CNAME | frequency  | quantummerlin.github.io   | Yes   |
| CNAME | tarot      | quantummerlin.github.io   | Yes   |
| CNAME | gematria   | quantummerlin.github.io   | Yes   |
| CNAME | sigils     | quantummerlin.github.io   | Yes   |
| CNAME | astrology  | quantummerlin.github.io   | Yes   |
| CNAME | chinese    | quantummerlin.github.io   | Yes   |
| CNAME | forecasts  | quantummerlin.github.io   | Yes   |
| CNAME | crystals   | quantummerlin.github.io   | Yes   |
| CNAME | water      | quantummerlin.github.io   | Yes   |
| CNAME | angels     | quantummerlin.github.io   | Yes   |
| CNAME | birthsigil | quantummerlin.github.io   | Yes   |
| CNAME | jukebox    | quantummerlin.github.io   | Yes   |

## Cloudflare Page Rules / Redirect Rules

Since GitHub Pages doesn't natively support subdomain routing to specific files,
we need Cloudflare redirect rules.

### Option 1: Cloudflare Redirect Rules (Recommended)

Go to: Rules > Redirect Rules

Create these redirect rules:

```
1. codes.quantummerlin.com/*
   → https://quantummerlin.com/quantum-merlin-hub/codes.html
   Status: 301

2. frequency.quantummerlin.com/*
   → https://quantummerlin.com/genesis/index-enhanced.html
   Status: 301

3. tarot.quantummerlin.com/*
   → https://quantummerlin.com/quantum-merlin-hub/tarot.html
   Status: 301

4. gematria.quantummerlin.com/*
   → https://quantummerlin.com/quantum-merlin-hub/gematria.html
   Status: 301

5. sigils.quantummerlin.com/*
   → https://quantummerlin.com/quantum-merlin-hub/sigils.html
   Status: 301

6. astrology.quantummerlin.com/*
   → https://quantummerlin.com/quantum-merlin-hub/astrology.html
   Status: 301

7. chinese.quantummerlin.com/*
   → https://quantummerlin.com/quantum-merlin-hub/chinese.html
   Status: 301

8. forecasts.quantummerlin.com/*
   → https://quantummerlin.com/quantum-merlin-hub/forecasts.html
   Status: 301

9. crystals.quantummerlin.com/*
   → https://quantummerlin.com/quantum-merlin-hub/crystals.html
   Status: 301

10. water.quantummerlin.com/*
    → https://quantummerlin.com/quantum-merlin-hub/water.html
    Status: 301

11. angels.quantummerlin.com/*
    → https://quantummerlin.com/angel-number-calculator.html
    Status: 301

12. birthsigil.quantummerlin.com/*
    → https://quantummerlin.com/quantum-sigil-generator.html
    Status: 301

13. jukebox.quantummerlin.com/*
    → https://quantummerlin.com/quantum-merlin-hub/jukebox.html
    Status: 301
```

### Option 2: Cloudflare Workers (More Flexible)

If you want to preserve the subdomain in the URL bar, use a Worker:

```javascript
// Cloudflare Worker for subdomain routing
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const subdomain = url.hostname.split('.')[0]
  
  const routes = {
    'codes': '/quantum-merlin-hub/codes.html',
    'frequency': '/genesis/index-enhanced.html',
    'tarot': '/quantum-merlin-hub/tarot.html',
    'gematria': '/quantum-merlin-hub/gematria.html',
    'sigils': '/quantum-merlin-hub/sigils.html',
    'astrology': '/quantum-merlin-hub/astrology.html',
    'chinese': '/quantum-merlin-hub/chinese.html',
    'forecasts': '/quantum-merlin-hub/forecasts.html',
    'crystals': '/quantum-merlin-hub/crystals.html',
    'water': '/quantum-merlin-hub/water.html',
    'angels': '/angel-number-calculator.html',
    'birthsigil': '/quantum-sigil-generator.html',
    'jukebox': '/quantum-merlin-hub/jukebox.html'
  }
  
  if (routes[subdomain]) {
    url.hostname = 'quantummerlin.com'
    url.pathname = routes[subdomain]
    return fetch(url)
  }
  
  return fetch(request)
}
```

## SSL/TLS Settings

In Cloudflare SSL/TLS settings:
- Mode: Full (strict)
- Always Use HTTPS: On
- Automatic HTTPS Rewrites: On

## GitHub Pages CNAME File

Create a `CNAME` file in the root of your repository:

```
quantummerlin.com
```

## Testing

After configuration, test each subdomain:
- https://codes.quantummerlin.com
- https://frequency.quantummerlin.com
- etc.

All should load the correct tool page.
