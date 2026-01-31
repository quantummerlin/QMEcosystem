# Netlify Backend Setup for A Moment in Time

## Overview

This backend enables sharing of readings via unique URLs. When users click "Create Gift Version", the reading is saved to Netlify Blobs and a shareable link is generated.

## Features

- **Shareable Links**: Generate unique URLs like `quantummerlin.com/soulblueprint/r/abc123`
- **12-Month Expiry**: Shared readings auto-delete after 12 months
- **Offline Support**: Recipients can save to homescreen for permanent offline access
- **No Ads**: Shared readings are completely ad-free
- **Download Fallback**: If sharing fails, users can still download an HTML file

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (index.html)                   │
│  ┌─────────────┐                      ┌──────────────────┐ │
│  │ giftReading │ ───POST /api/save──► │ Netlify Function │ │
│  └─────────────┘                      └────────┬─────────┘ │
│                                                │           │
│  ┌─────────────┐                      ┌────────▼─────────┐ │
│  │  view.html  │ ◄──GET /api/get───── │ Netlify Blobs    │ │
│  └─────────────┘                      └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Files

### Netlify Functions (`/netlify/functions/`)

| File | Purpose |
|------|---------|
| `save-reading.mjs` | Saves reading to Blobs, returns shareable URL |
| `get-reading.mjs` | Retrieves reading by ID for viewing |
| `cleanup-readings.mjs` | Scheduled daily cleanup of expired readings |

### Frontend Files (`/soulblueprint/`)

| File | Purpose |
|------|---------|
| `view.html` | Viewer page for shared readings |
| `index.html` | Main app with updated `giftReading()` function |
| `sw.js` | Service worker with offline reading support |

### Configuration

| File | Purpose |
|------|---------|
| `netlify.toml` | Netlify build & redirect configuration |
| `package.json` | Dependencies for Netlify functions |

## Deployment

### 1. Connect Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: (leave empty for static site)
   - **Publish directory**: `.`
   - **Functions directory**: `netlify/functions`

### 2. Enable Netlify Blobs

Netlify Blobs is automatically enabled for all sites. No configuration needed!

### 3. Deploy

Push to your main branch and Netlify will automatically deploy.

## URL Structure

- Main app: `https://yoursite.com/soulblueprint/`
- Shared reading: `https://yoursite.com/soulblueprint/r/{reading-id}`
- API (save): `https://yoursite.com/api/save-reading`
- API (get): `https://yoursite.com/api/get-reading?id={reading-id}`

## API Reference

### POST /api/save-reading

Save a new reading.

**Request Body:**
```json
{
  "html": "<div>...reading content...</div>",
  "userData": {
    "name": "Baby Name",
    "birthDate": "2024-01-15",
    "birthTime": "14:30",
    "birthPlace": "London, UK",
    "giftedBy": "Grandma"
  },
  "colorScheme": "pink"
}
```

**Response:**
```json
{
  "success": true,
  "id": "m5xyz-abc12345",
  "shareUrl": "https://yoursite.com/soulblueprint/r/m5xyz-abc12345",
  "expiresAt": "2027-01-31T12:00:00.000Z"
}
```

### GET /api/get-reading?id={id}

Retrieve a reading by ID.

**Response:**
```json
{
  "success": true,
  "reading": {
    "id": "m5xyz-abc12345",
    "html": "<div>...reading content...</div>",
    "userData": { ... },
    "colorScheme": "pink",
    "createdAt": "2026-01-31T12:00:00.000Z",
    "expiresAt": "2027-01-31T12:00:00.000Z"
  }
}
```

## Offline Support

When users visit a shared reading:

1. The service worker caches the reading data
2. Users can "Save to Homescreen" for PWA install
3. Once saved, the reading works offline forever
4. The downloaded HTML file also works offline

## Scheduled Cleanup

The `cleanup-readings.mjs` function runs daily at midnight UTC and:

1. Lists all readings in the Blobs store
2. Checks each reading's `expiresAt` date
3. Deletes readings that have expired (older than 12 months)

## Testing Locally

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run local development server
netlify dev

# This starts:
# - Static file server on port 8888
# - Functions server on port 9999
# - Automatic function reloading
```

## Troubleshooting

### "Could not create shareable link"
- Check browser console for errors
- Verify Netlify functions are deployed
- Check Netlify function logs in dashboard

### Reading not loading
- Check if the reading ID is correct
- The reading may have expired after 12 months
- Check Netlify Blobs storage in dashboard

### Offline not working
- Ensure service worker is registered
- Check if reading was accessed while online first
- Try "Save to Homescreen" for full PWA support
