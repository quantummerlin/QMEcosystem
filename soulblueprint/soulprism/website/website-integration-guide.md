# Website Integration Guide - DIY Infographics Feature

## 📋 Copy Button JavaScript Code

```html
<!-- Add this to your reading pages -->
<style>
.copy-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.copy-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.copy-btn:active {
  transform: translateY(0);
}

.copy-btn.copied {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.reading-section {
  position: relative;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.copy-position-top {
  position: absolute;
  top: 10px;
  right: 10px;
}

.copy-position-bottom {
  margin-top: 15px;
}

.toast-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.toast-notification.show {
  opacity: 1;
  transform: translateY(0);
}
</style>

<!-- Toast notification -->
<div id="toast" class="toast-notification">✓ Copied to clipboard!</div>

<!-- Copy button example -->
<div class="reading-section">
  <button onclick="copyReading('reading-1', this)" class="copy-btn copy-position-top">📋 Copy Reading</button>
  
  <div id="reading-1" class="reading-content">
    <h3>Your Core Identity</h3>
    <p>Your Sun in Taurus marks a soul born to build, sustain, and appreciate...</p>
    <!-- Full reading content here -->
  </div>
</div>

<script>
// Copy functionality
function copyReading(readingId, btn) {
  const reading = document.getElementById(readingId);
  const textToCopy = reading.innerText;
  
  // Copy to clipboard
  navigator.clipboard.writeText(textToCopy).then(() => {
    // Update button
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Copied!';
    btn.classList.add('copied');
    
    // Show toast
    showToast();
    
    // Reset button after 2 seconds
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    // Fallback for older browsers
    fallbackCopy(textToCopy);
  });
}

// Fallback copy method
function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  showToast();
}

// Toast notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Copy multiple readings at once
function copyMultipleReadings(readingIds, btn) {
  let combinedText = '';
  readingIds.forEach((id, index) => {
    const reading = document.getElementById(id);
    if (reading) {
      combinedText += `--- Reading ${index + 1} ---\n\n`;
      combinedText += reading.innerText + '\n\n';
    }
  });
  
  navigator.clipboard.writeText(combinedText).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ ' + readingIds.length + ' readings copied!';
    btn.classList.add('copied');
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('copied');
    }, 2000);
  });
}
</script>
```

---

## 🎨 DIY Infographics Page Content

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DIY Soul Blueprint Infographics | A Moment In Time</title>
</head>
<body>
    <div class="container">
        <h1>🎨 Create Your Own Soul Blueprint Infographics</h1>
        
        <p class="intro">
            Turn your Soul Blueprint readings into stunning visual infographics — 
            completely free using AI tools you already have access to.
        </p>
        
        <div class="steps">
            <div class="step">
                <h2>Step 1: Explore Readings</h2>
                <p>Browse our readings and click the 📋 Copy button on any reading that speaks to you.</p>
                <a href="/soulblueprint" class="cta-btn">Start Exploring →</a>
            </div>
            
            <div class="step">
                <h2>Step 2: Choose an AI Tool</h2>
                <div class="tools-grid">
                    <div class="tool-card">
                        <h3>ChatGPT</h3>
                        <p>chat.openai.com</p>
                        <span class="tag">Free version available</span>
                    </div>
                    <div class="tool-card">
                        <h3>Gemini</h3>
                        <p>gemini.google.com</p>
                        <span class="tag">Free version available</span>
                    </div>
                    <div class="tool-card">
                        <h3>NotebookLM</h3>
                        <p>notebooklm.google.com</p>
                        <span class="tag">Research-quality visuals</span>
                    </div>
                </div>
            </div>
            
            <div class="step">
                <h2>Step 3: Use a Prompt</h2>
                <p>Paste your reading and one of these prompts to create your infographic:</p>
                
                <div class="prompt-box">
                    <h4>Basic Infographic</h4>
                    <code>Create a visually stunning infographic summarizing this text. Highlight the main patterns, themes, and insights. Make it clear, elegant, and easy to share.</code>
                    <button onclick="copyPrompt(this)" class="copy-prompt-btn">📋 Copy Prompt</button>
                </div>
                
                <div class="prompt-box">
                    <h4>Color-Coded Design</h4>
                    <code>Design a beautiful infographic using a soft cosmic color palette (deep blues, purples, and gold accents). Organize it with clear sections, icons, and visual hierarchy.</code>
                    <button onclick="copyPrompt(this)" class="copy-prompt-btn">📋 Copy Prompt</button>
                </div>
                
                <div class="prompt-box">
                    <h4>Shareable Card Format</h4>
                    <code>Design this reading in a vertical card format perfect for social sharing. Include the most impactful insights at the top. Use a premium, non-cheesy aesthetic.</code>
                    <button onclick="copyPrompt(this)" class="copy-prompt-btn">📋 Copy Prompt</button>
                </div>
            </div>
        </div>
        
        <div class="tips-section">
            <h2>💡 Pro Tips</h2>
            <ul>
                <li>🎨 Customize colors by adding "Use [your color] accents" to any prompt</li>
                <li>📱 For social sharing, add "Design for vertical mobile viewing"</li>
                <li>🖨️ For printing, add "Design for A4 or letter-size printing"</li>
                <li>🔄 Try combining multiple readings to see patterns across your life</li>
                <li>✨ What you create is yours — share it, print it, gift it</li>
            </ul>
        </div>
        
        <div class="cta-section">
            <h2>Ready to Create?</h2>
            <p>Explore our readings and start creating your personal visual blueprints.</p>
            <a href="/soulblueprint" class="cta-btn large">Explore Readings →</a>
        </div>
    </div>
</body>
</html>
```

---

## 📊 Quick Actions Bar (Sticky Footer)

```html
<style>
.quick-actions-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  border-top: 1px solid #e0e0e0;
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.quick-action-btn {
  background: white;
  border: 2px solid #667eea;
  color: #667eea;
  padding: 8px 16px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.quick-action-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.quick-action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.quick-action-btn.primary:hover {
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
}

@media (max-width: 768px) {
  .quick-actions-bar {
    flex-wrap: wrap;
    padding: 10px;
  }
  
  .quick-action-btn {
    flex: 1;
    min-width: 80px;
    font-size: 12px;
    padding: 8px 12px;
  }
}
</style>

<div class="quick-actions-bar">
  <button onclick="copyCurrentReading()" class="quick-action-btn">📋 Copy</button>
  <button onclick="nextReading()" class="quick-action-btn">➡️ Next Reading</button>
  <button onclick="openDIYGuide()" class="quick-action-btn">🎨 Make Visual</button>
  <button onclick="shareReading()" class="quick-action-btn">🔗 Share</button>
</div>

<script>
// Quick actions functionality
function copyCurrentReading() {
  // Copies the currently visible reading
  const currentReading = document.querySelector('.reading-content:visible');
  if (currentReading) {
    navigator.clipboard.writeText(currentReading.innerText);
    showToast();
  }
}

function nextReading() {
  // Scrolls to or loads the next reading
  const currentReading = document.querySelector('.reading-section.active');
  const nextReading = currentReading.nextElementSibling;
  if (nextReading && nextReading.classList.contains('reading-section')) {
    nextReading.scrollIntoView({ behavior: 'smooth' });
    currentReading.classList.remove('active');
    nextReading.classList.add('active');
  }
}

function openDIYGuide() {
  window.open('/diy-infographics', '_blank');
}

function shareReading() {
  if (navigator.share) {
    navigator.share({
      title: 'My Soul Blueprint',
      text: 'Discover the hidden patterns in your life with a personal Soul Blueprint.',
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied!');
  }
}
</script>
```

---

## 📈 Progress Tracker

```html
<style>
.progress-tracker {
  position: sticky;
  top: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 300px;
}

.progress-bar-container {
  background: #f0f0f0;
  border-radius: 10px;
  height: 8px;
  margin: 10px 0;
  overflow: hidden;
}

.progress-bar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.progress-cta {
  font-size: 13px;
  color: #667eea;
  text-decoration: none;
  display: block;
  margin-top: 10px;
}
</style>

<div class="progress-tracker">
  <div class="progress-text">You've explored <span id="readings-explored">0</span> of 100 readings</div>
  <div class="progress-bar-container">
    <div class="progress-bar" id="progress-bar" style="width: 0%"></div>
  </div>
  <a href="/diy-infographics" class="progress-cta">🎨 Create an infographic from what you've found →</a>
</div>

<script>
// Track reading exploration
let readingsViewed = new Set();

function trackReadingView(readingId) {
  readingsViewed.add(readingId);
  updateProgress();
}

function updateProgress() {
  const total = 100;
  const viewed = readingsViewed.size;
  const percentage = (viewed / total) * 100;
  
  document.getElementById('readings-explored').textContent = viewed;
  document.getElementById('progress-bar').style.width = percentage + '%';
  
  // Save to localStorage
  localStorage.setItem('readingsViewed', JSON.stringify([...readingsViewed]));
}

// Load previous progress on page load
window.onload = function() {
  const saved = localStorage.getItem('readingsViewed');
  if (saved) {
    readingsViewed = new Set(JSON.parse(saved));
    updateProgress();
  }
};
</script>
```

---

## 🎯 Ad Placement Recommendations

```html
<!-- Ad Placement Structure -->

<!-- MAIN CONTENT AREA -->
<div class="reading-container">
  
  <!-- ABOVE FOLD: 0-1 ads max -->
  
  <div class="reading-section">
    <button class="copy-btn">📋 Copy Reading</button>
    <div class="reading-content">
      <!-- Reading #1 -->
    </div>
    <!-- AD 1: Below reading (display or native) -->
    <div class="ad-slot ad-below-reading">
      <!-- AdSense code here -->
    </div>
  </div>
  
  <div class="reading-section">
    <button class="copy-btn">📋 Copy Reading</button>
    <div class="reading-content">
      <!-- Reading #2 -->
    </div>
  </div>
  
  <!-- Every 3rd reading: subtle prompt + ad -->
  <div class="prompt-section">
    <p>🎨 Turn these readings into visuals — <a href="/diy-infographics">See how</a></p>
  </div>
  <!-- AD 2: In-content native ad -->
  <div class="ad-slot ad-in-content">
    <!-- AdSense code here -->
  </div>
  
  <!-- SIDEBAR: 2-3 ads -->
  <aside class="sidebar">
    <div class="ad-slot ad-sidebar-1">
      <!-- AdSense code here -->
    </div>
    <div class="ad-slot ad-sidebar-2">
      <!-- AdSense code here -->
    </div>
  </aside>
  
</div>

<!-- BOTTOM: 1-2 ads -->
<div class="ad-slot ad-bottom">
  <!-- AdSense code here -->
</div>

<style>
/* Ad styling - make them blend in */
.ad-slot {
  margin: 20px 0;
  min-height: 250px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-sidebar-1, .ad-sidebar-2 {
  position: sticky;
}

/* Don't overwhelm mobile */
@media (max-width: 768px) {
  .ad-sidebar-1, .ad-sidebar-2 {
    display: none; /* Hide sidebar ads on mobile */
  }
  
  .ad-slot {
    margin: 10px 0;
  }
}
</style>
```

---

## ⚙️ Implementation Checklist

### Phase 1 (This Week)
- [ ] Add copy button CSS to your stylesheet
- [ ] Add copy button JavaScript to your pages
- [ ] Place copy buttons on all reading sections
- [ ] Test copy functionality on mobile and desktop
- [ ] Create DIY infographics page with prompts

### Phase 2 (Next 2 Weeks)
- [ ] Add quick actions bar (sticky footer)
- [ ] Implement progress tracker
- [ ] Add ad slots to pages (3-5 per page)
- [ ] Add subtle prompts between readings
- [ ] Test user flow end-to-end

### Phase 3 (Month 2+)
- [ ] A/B test ad placements
- [ ] Optimize copy button placement based on data
- [ ] Add "Copy All" batch copy feature
- [ ] Add PDF upsell prompts
- [ ] Integrate analytics tracking

---

## 📝 Notes

- Copy buttons work with native clipboard API (modern browsers)
- Fallback included for older browsers
- All code is self-contained — no external dependencies
- Mobile-optimized styling included
- Ad placement follows Google AdSense best practices

---

*Implementation Guide for A Moment In Time - Soul Blueprints*
*quantummerlin.com*