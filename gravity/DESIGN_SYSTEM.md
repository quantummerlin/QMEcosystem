# ✦ Gravity7 Design System
## The Equations for Beautiful, Swish Apps

*Extracted from the Gravity7 project. Use this as a blueprint for any app that needs to feel premium, mysterious, and engaging.*

---

## 1. THE CORE PHILOSOPHY

### The Chase Hughes Principles
1. **Pattern Interrupt** — First 3 seconds must create a "wait, what?" moment
2. **Curiosity Gap** — Always reveal less than you could
3. **Progressive Disclosure** — Information drips, never floods
4. **Direct Address** — Speak TO the user, not AT them
5. **Short Sentences** — Maximum impact per word

### The Feel
- Mysterious but not confusing
- Premium but not cold
- Animated but not distracting
- Dark but not depressing

---

## 2. COLOR EQUATIONS

### Primary Palette
```css
:root {
  /* Backgrounds — layered darkness */
  --bg-primary: #0a0a0f;      /* Deep void */
  --bg-secondary: #12121a;    /* Slightly lifted */
  --bg-card: rgba(255, 255, 255, 0.02);  /* Whisper of content */
  
  /* Text — hierarchical opacity */
  --text-primary: #ffffff;              /* Headlines, key numbers */
  --text-secondary: rgba(255, 255, 255, 0.6);  /* Body text */
  --text-tertiary: rgba(255, 255, 255, 0.4);   /* Labels, captions */
  
  /* Accents — use sparingly */
  --accent: #8b7cf7;          /* Primary action, mystical purple */
  --accent-secondary: #f7a87c; /* Warm complement */
  --accent-glow: rgba(139, 124, 247, 0.15);  /* Subtle glow effects */
  
  /* Borders — barely visible */
  --border: rgba(255, 255, 255, 0.06);
}
```

### The Equation
```
Background layers: 0a0a0f → 12121a → rgba(255,255,255,0.02)
Each step = +8 lightness, maintaining near-black

Text hierarchy: 100% → 60% → 40% opacity
Headlines = full, Body = 60%, Labels = 40%

Accent usage: Maximum 10% of visible elements
Accent appears on: CTAs, key numbers, hover states, highlights
```

### Themed Variations
```css
/* Leo/Fire theme (reading.html) */
--accent-leo: #ff9f43;
--leo-dim: rgba(255, 159, 67, 0.12);

/* Gold/Prophecy theme */
--gold: #d4a853;
--gold-dim: rgba(212, 168, 83, 0.12);
```

---

## 3. TYPOGRAPHY EQUATIONS

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

### The Weight Hierarchy
```
200 — Display numbers, giant text (countdown, hero numbers)
300 — Headlines, section titles
400 — Body text, descriptions
500 — Labels, badges, buttons, emphasis
```

### Size Scale (using clamp for fluidity)
```css
/* Responsive typography equation */
font-size: clamp(MIN, PREFERRED, MAX);

/* Examples */
--display: clamp(36px, 8vw, 56px);   /* Hero headlines */
--h1: clamp(28px, 5vw, 38px);        /* Page titles */
--h2: clamp(24px, 4vw, 32px);        /* Section titles */
--body: 15px - 16px;                  /* Readable body */
--small: 12px - 13px;                 /* Captions */
--micro: 10px - 11px;                 /* Badges, labels */
```

### Letter Spacing Rules
```css
/* Headlines: slightly tight */
letter-spacing: -0.02em to -0.03em;

/* Labels and badges: wide tracking */
letter-spacing: 0.1em to 0.15em;
text-transform: uppercase;
```

### Line Height
```
Headlines: 1.1 - 1.2
Body text: 1.6 - 1.8
Tight lists: 1.4 - 1.5
```

---

## 4. SPACING EQUATIONS

### The 8-Point Grid
All spacing uses multiples of 8px:
```
8px   — micro gaps (between icon and label)
16px  — small gaps (between list items)
24px  — medium gaps (between paragraphs)
32px  — large gaps (between sections)
48px  — section padding
60-80px — hero section breathing room
```

### Section Rhythm
```css
.section {
  margin-bottom: 48px - 60px;
}

.page {
  padding: 60px 24px 120px;
  max-width: 640px - 720px;
  margin: 0 auto;
}
```

---

## 5. ANIMATION EQUATIONS

### The Master Timing Functions

```css
/* Smooth and natural — use for most reveals */
cubic-bezier(0.16, 1, 0.3, 1)
/* Eases out dramatically, feels organic */

/* Bouncy entrance — use for countdowns, key numbers */
cubic-bezier(0.34, 1.56, 0.64, 1)
/* Slight overshoot, playful but controlled */

/* Standard ease — fallback */
ease or ease-in-out
```

### Animation Duration Guidelines
```
Micro interactions: 150ms - 200ms (button hover, toggle)
Element reveals: 400ms - 600ms (cards appearing)
Section reveals: 600ms - 800ms (scroll animations)
Ambient loops: 15s - 25s (background orbs, particles)
Dramatic reveals: 800ms - 1200ms (hero elements, key moments)
```

### Staggered Animation Equation
```javascript
// For lists, grids, sequential reveals
items.forEach((item, index) => {
  setTimeout(() => item.classList.add('visible'), index * DELAY);
});

// DELAY values by context:
// Fast sequence: 80ms - 100ms (planet cards, quick lists)
// Medium sequence: 120ms - 150ms (feature cards, aspects)
// Dramatic sequence: 200ms - 300ms (stellium planets, key reveals)
```

### Scroll Reveal Setup
```javascript
const observerOptions = {
  threshold: 0.15,              // Trigger at 15% visibility
  rootMargin: '0px 0px -50px 0px'  // Start slightly before fully in view
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});
```

### Base Reveal CSS
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Variant: Slide from Left
```css
.slide-left {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.4s ease;
}

.slide-left.visible {
  opacity: 1;
  transform: translateX(0);
}
```

### Variant: Scale Up
```css
.scale-reveal {
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.scale-reveal.visible {
  opacity: 1;
  transform: scale(1);
}
```

---

## 6. AMBIENT EFFECTS

### Floating Orbs (Background Glow)
```css
.ambient {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: ambientDrift 25s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  top: -100px;
  right: -100px;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%);
  bottom: 20%;
  left: -100px;
  animation-delay: -8s;
}

@keyframes ambientDrift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.05); }
  50% { transform: translate(-20px, 30px) scale(0.95); }
  75% { transform: translate(-30px, -30px) scale(1.02); }
}
```

### Floating Particles
```javascript
const container = document.getElementById('particles');
const PARTICLE_COUNT = 20;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 15 + 's';
  particle.style.animationDuration = (15 + Math.random() * 10) + 's';
  container.appendChild(particle);
}
```

```css
.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}
```

### Twinkling Stars
```javascript
for (let i = 0; i < 50; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 4 + 's';
  star.style.animationDuration = (3 + Math.random() * 3) + 's';
  container.appendChild(star);
}
```

```css
.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: starTwinkle ease-in-out infinite;
}

@keyframes starTwinkle {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.6; }
}
```

---

## 7. INTERACTIVE STATES

### Button Hover
```css
.button {
  transition: all 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px var(--accent-glow);
}
```

### Card Hover
```css
.card {
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: rgba(139, 124, 247, 0.3);
  transform: translateY(-2px);
  background: rgba(139, 124, 247, 0.03);
}
```

### Link Underline Reveal
```css
.link {
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}
```

---

## 8. COMPONENT PATTERNS

### Number Counter Animation
```javascript
function animateNumber(element, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  requestAnimationFrame(update);
}
```

### Countdown Tick Effect
```css
.countdown-value.tick {
  animation: tick 0.3s ease;
}

@keyframes tick {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); color: var(--accent); }
  100% { transform: scale(1); }
}
```

```javascript
function updateUnit(id, value) {
  const el = document.getElementById(id);
  if (el && el.textContent !== value) {
    el.classList.add('tick');
    setTimeout(() => {
      el.textContent = value;
      el.classList.remove('tick');
    }, 150);
  }
}
```

### Progress Bar Animation
```css
.progress-bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.progress-fill.animate {
  transform: scaleX(var(--progress));
}
```

---

## 9. HERO PATTERNS

### Mystery Landing (Pattern Interrupt)
```html
<section class="mystery-intro">
  <p class="mystery-line">Something happens on this day.</p>
  <p class="mystery-question">Have you heard about the pause?</p>
  <h1 class="mystery-answer"><span class="accent">7</span> seconds.</h1>
  <p class="mystery-date">12 August 2026 · 14:33 UTC</p>
</section>
```

```css
.mystery-line {
  opacity: 0;
  animation: fadeIn 1.5s ease 0.5s forwards;
}

.mystery-question {
  opacity: 0;
  animation: fadeIn 1.5s ease 1.5s forwards;
}

.mystery-answer {
  opacity: 0;
  animation: fadeUp 1s ease 3s forwards;
}

.mystery-date {
  opacity: 0;
  animation: fadeIn 0.8s ease 3.5s forwards;
}
```

### Giant Number Hero
```html
<section class="hero-number">
  <div class="big-number" id="heroNumber">224</div>
  <p class="number-reveal-text">The 224th day of 2026</p>
</section>
```

```css
.big-number {
  font-size: clamp(100px, 30vw, 200px);
  font-weight: 200;
  color: var(--accent);
  opacity: 0;
  animation: numberReveal 1.2s ease forwards;
}

@keyframes numberReveal {
  0% { opacity: 0; transform: scale(0.8); filter: blur(10px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
}
```

---

## 10. RESPONSIVE BREAKPOINTS

### The Equation
```css
/* Mobile first, enhance upward */

/* Small phones */
@media (max-width: 360px) {
  /* Reduce padding, tighten spacing */
}

/* Standard mobile */
@media (max-width: 480px) {
  .page { padding: 40px 20px 80px; }
  /* Stack grids to single column */
}

/* Tablets */
@media (min-width: 768px) {
  /* Expand content width */
  /* Add more whitespace */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Max-width containers */
  /* Multi-column layouts */
}
```

---

## 11. PERFORMANCE RULES

### CSS
- Use `transform` and `opacity` for animations (GPU accelerated)
- Never animate `width`, `height`, `top`, `left`, `margin`
- Use `will-change` sparingly and only when needed

### JavaScript
- Use `IntersectionObserver` instead of scroll events
- Debounce resize events
- Use `requestAnimationFrame` for smooth animations
- Lazy load images below the fold

### Loading
- Preconnect to Google Fonts
- Use system font stack as fallback
- Inline critical CSS for above-fold content

---

## 12. COPY PRINCIPLES

### Headlines
- Short, punchy, mysterious
- Use periods for weight: "7 seconds."
- Questions create engagement: "Have you heard about the pause?"

### Body Text
- One idea per paragraph
- Bold the key phrase
- Italics for emphasis, not decoration
- Use "you" frequently

### CTAs
- Action verbs: "Explore", "Discover", "Go Deeper"
- Create curiosity: "See what the numbers reveal"
- Never generic: NO "Learn More" or "Click Here"

---

## QUICK START TEMPLATE

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your App</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0a0a0f;
      --bg-card: rgba(255, 255, 255, 0.02);
      --text-primary: #ffffff;
      --text-secondary: rgba(255, 255, 255, 0.6);
      --text-tertiary: rgba(255, 255, 255, 0.4);
      --accent: #8b7cf7;
      --border: rgba(255, 255, 255, 0.06);
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
    }
    
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <!-- Your content -->
  
  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>
</body>
</html>
```

---

*Built with obsessive attention to detail.*
*Every pixel, every millisecond, every word — considered.*
