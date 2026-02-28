# Reading Fulfillment Agent

## Trigger
When the user says **"Reading For:"** followed by birth details, this agent generates a personalised reading and deploys it as a permanent URL.

## Input Format
```
Reading For: [Name], [Date of Birth dd/mm/yyyy], [Time of Birth], [Place of Birth]
```

## Workflow

### Step 1: Parse Input
Extract from the user's message:
- **Name** — full name as provided
- **Date** — convert dd/mm/yyyy to yyyy-mm-dd (ISO format). Always treat ambiguous dates as dd/mm/yyyy
- **Time** — 24h format HH:MM (optional)
- **Place** — city/location string (optional)

### Step 2: Generate Reading
Run the headless generator:
```powershell
cd c:\Users\WIPED\QMEcosystem\soulblueprint\generator
node fulfill.js --name="[Name]" --date=[YYYY-MM-DD] --time=[HH:MM] --place="[Place]"
```

This takes ~30-60 seconds. It:
1. Starts a local HTTP server serving the generator files
2. Opens headless Chrome to the generator page with URL params
3. Waits for all 100+ reading cards to generate
4. Extracts the reading HTML + CSS into a standalone page
5. Saves to `soulblueprint/r/{slug}/index.html`
6. Prints the slug and preview URL

### Step 3: Deploy
```powershell
cd c:\Users\WIPED\QMEcosystem
git add soulblueprint/r/{slug}
git commit -m "Reading: [Name]"
git push origin main
```

GitHub Pages will deploy within 1-2 minutes.

### Step 4: Report
Tell the user:
- **Reading URL**: `https://quantummerlin.com/soulblueprint/r/{slug}/`
- **Card count**: how many reading cards were generated
- **Delivery message template** (copy-paste for Etsy):

```
Hi! 

Your personalised "A Moment in Time" reading for [Name] is ready!

 Click here to explore your reading:
[URL]

What you'll find:
 65+ personalised readings covering astrology, numerology & life patterns
 Expandable sections — explore at your own pace
 Works on all devices — phone, tablet, laptop
 Print or save anytime

This is your permanent link — it will never expire.

Enjoy your cosmic journey! 
```

## Important Notes
- Date format: ALWAYS treat user input as dd/mm/yyyy (European format)
- The generator uses local files (not the live website), so changes take effect immediately
- Each reading is ~500KB standalone HTML with all CSS embedded
- Generated readings are `noindex, nofollow` so they won't appear in search engines
- The reading page has expand/collapse cards, Google Fonts, and the pink theme
- puppeteer-core must be installed: `cd soulblueprint/generator && npm install puppeteer-core`
- Requires Chrome or Edge browser installed on the system
