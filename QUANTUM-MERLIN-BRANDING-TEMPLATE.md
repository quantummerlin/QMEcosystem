# 🔮 QUANTUM MERLIN ECOSYSTEM - OFFICIAL BRANDING TEMPLATE
*Reference this file when creating or rebranding any Quantum Merlin pages*

---

## 🎨 CORE COLOR PALETTE

### Primary Colors (CSS Variables)
```css
:root {
    --merlin-purple: #2d1b4e;      /* Deep mystical purple */
    --rose-pink: #ff6b9d;           /* The Rose's signature pink */
    --quantum-gold: #daa520;        /* Primary gold */
    --ancient-gold: #ffd700;        /* Bright accent gold */
    --mystic-cyan: #00f5ff;         /* Quantum cyan glow */
    --deep-void: #0a0015;           /* Primary background - deep space black */
    --ethereal-white: #f0e6ff;      /* Text color - soft lavender white */
    --quantum-magenta: #ff00ff;     /* Accent magenta */
}
```

### Color Usage Guidelines
- **Backgrounds**: `--deep-void` (#0a0015) or dark gradients
- **Text**: `--ethereal-white` (#f0e6ff) for body, gold variants for headings
- **Accents**: Purple → Pink → Gold gradient flows
- **Borders**: Gold with transparency `rgba(255, 215, 0, 0.2)` to `rgba(255, 215, 0, 0.3)`
- **Hover States**: Increase opacity/brightness by 0.1-0.2

---

## 📝 TYPOGRAPHY SYSTEM

### Font Families
```css
/* Import in <head> */
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

### Font Hierarchy
1. **Main Titles (h1)**: `'Cinzel Decorative'` - Ornate, magical headers
2. **Section Headings (h2, h3)**: `'Cinzel'` - Clean serif elegance
3. **Body Text**: `'Cormorant Garamond'` - Readable serif with mystical feel
4. **Fallbacks**: Georgia, serif

### Typography Specs
```css
h1 {
    font-family: 'Cinzel Decorative', serif;
    font-size: 3rem;  /* Desktop: 2.5-3rem, Mobile: 2rem */
    text-align: center;
    background: linear-gradient(135deg, #ffd700, #ff6b9d, #8a2be2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 15px;
    letter-spacing: 3px;
}

h2, h3 {
    font-family: 'Cinzel', serif;
    color: var(--ancient-gold);
}

body {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px;
    line-height: 1.9;
    color: var(--ethereal-white);
}
```

---

## 🌈 GRADIENT FORMULAS

### Primary Gradients
```css
/* Purple to Gold - Primary brand gradient */
background: linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(45, 27, 78, 0.25));

/* Gold Shimmer - Headings */
background: linear-gradient(135deg, #ffd700, #ff6b9d, #8a2be2);

/* Hover State - Cards/Buttons */
background: linear-gradient(135deg, rgba(218, 165, 32, 0.2), rgba(138, 43, 226, 0.2));

/* CTA Buttons */
background: linear-gradient(135deg, #daa520, #ffd700);

/* Explore Button - Purple/Pink */
background: linear-gradient(135deg, #8a2be2, #ff1493);

/* Coffee Button - Pink/Gold */
background: linear-gradient(135deg, #ff6b9d, #daa520);
```

### Gradient Usage Rules
- Always use `135deg` angle for consistency
- Use transparency (rgba) for overlays: 0.1-0.3
- Solid gradients for interactive elements
- Layer multiple gradients for depth

---

## 📦 COMPONENT PATTERNS

### Cards / Containers
```css
.card {
    background: linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(45, 27, 78, 0.25));
    padding: 30px 25px;
    border-radius: 20px;
    border: 1px solid rgba(255, 215, 0, 0.2);
    box-shadow: 0 8px 32px rgba(138, 43, 226, 0.3);
}
```

### Buttons (CTA)
```css
.cta-button {
    display: inline-block;
    padding: 15px 40px;
    background: linear-gradient(135deg, #daa520, #ffd700);
    color: #0a0015;  /* Dark text on gold background */
    text-decoration: none;
    border-radius: 25px;
    font-family: 'Cinzel', serif;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(218, 165, 32, 0.6);
}
```

### Interactive Lists (Collapsible)
```css
.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(138, 43, 226, 0.1));
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Cinzel', serif;
    color: var(--ancient-gold);
}

.category-header:hover {
    background: linear-gradient(135deg, rgba(218, 165, 32, 0.2), rgba(138, 43, 226, 0.2));
    transform: translateX(5px);
}
```

---

## ✨ EFFECTS & ANIMATIONS

### Box Shadows
```css
/* Subtle glow - Cards */
box-shadow: 0 8px 32px rgba(138, 43, 226, 0.3);

/* Strong emphasis - Buttons */
box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4);

/* Hover state */
box-shadow: 0 6px 20px rgba(218, 165, 32, 0.6);
```

### Transitions
```css
/* Standard */
transition: all 0.3s ease;

/* Smooth collapse */
transition: all 0.4s ease;
```

### Hover Transforms
```css
/* Lift effect */
transform: translateY(-2px);

/* Slide right */
transform: translateX(5px);

/* Scale up */
transform: scale(1.05);
```

---

## 🎯 LAYOUT STANDARDS

### Container Width
```css
.container {
    max-width: 900px;  /* Article pages */
    max-width: 1200px; /* Dashboard/Hub pages */
    margin: 0 auto;
    padding: 40px 20px;
}
```

### Spacing System
```css
/* Margins */
margin-bottom: 15px;   /* Small gaps */
margin-bottom: 25px;   /* Medium gaps */
margin-bottom: 40px;   /* Large section breaks */

/* Padding */
padding: 15px 20px;    /* Compact elements */
padding: 30px 25px;    /* Cards */
padding: 40px;         /* Large containers */
```

### Border Radius
```css
border-radius: 8px;    /* Small elements */
border-radius: 12px;   /* Medium elements */
border-radius: 20px;   /* Cards */
border-radius: 25px;   /* Buttons */
```

---

## 🎭 BRAND VOICE & ICONS

### Emoji System
- 🔮 Mystical/Fortune telling
- ⚛️ Quantum/Science
- 🌹 The Rose (feminine energy)
- 🧙‍♂️ Merlin (masculine wisdom)
- ✨ Magic/Manifestation
- 📚 Knowledge/Learning
- 💫 Energy/Frequency
- 🎯 Intention/Focus
- ☕ Support/Coffee
- 🏠 Home/Hub

### Section Headers Format
```html
<h3 style="font-family: 'Cinzel', serif; color: var(--ancient-gold); margin-bottom: 20px;">
    🔮 Section Title Here 🔮
</h3>
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile First Adjustments */
@media (max-width: 768px) {
    h1 { font-size: 2rem; }
    .subtitle { font-size: 1rem; }
    .container { padding: 20px 15px; }
    .card { padding: 20px 15px; }
}
```

---

## 🔧 STANDARD PAGE STRUCTURE

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title | Quantum Merlin</title>
    <link href="[GOOGLE FONTS URL]" rel="stylesheet">
    <style>
        :root { [CSS VARIABLES] }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Cormorant Garamond', Georgia, serif;
            background: var(--deep-void);
            color: var(--ethereal-white);
            line-height: 1.9;
            overflow-x: hidden;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>[Gradient Text Title]</h1>
        <p class="subtitle">[Subtitle in gold]</p>
        
        [MAIN CONTENT]
        
        <!-- CTA Box -->
        <div class="cta-box">
            <h3>✨ Call to Action ✨</h3>
            <p>[Description]</p>
            <a href="#" class="cta-button">Action Text</a>
            <p style="margin-top: 30px; color: var(--rose-pink); font-style: italic;">
                🧙‍♂️ The Wizard and the Rose await... 🌹
            </p>
        </div>
        
        <!-- Explore Quantum Merlin Hub -->
        <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(45, 27, 78, 0.3)); border: 1px solid rgba(218, 165, 32, 0.3); border-radius: 20px; padding: 40px; margin: 40px auto; max-width: 800px; text-align: center;">
            <h3 style="font-family: 'Cinzel', serif; color: var(--ancient-gold); margin-bottom: 20px;">
                🔮 Explore the Quantum Merlin Universe 🔮
            </h3>
            <p style="font-size: 1.1em; margin-bottom: 25px; line-height: 1.8;">
                Beyond Reality Codes, discover a complete mystical ecosystem: Tarot readings infused with quantum consciousness, 
                birth sigil generators, soul card revelations, and the legendary Quantum Rose divination system.
            </p>
            <a href="https://quantummerlin.com" class="cta-button" style="background: linear-gradient(135deg, #8a2be2, #ff1493); margin: 10px;">
                Enter the Quantum Merlin Hub
            </a>
        </div>
        
        <!-- Coffee Support -->
        <div style="background: linear-gradient(135deg, rgba(255, 107, 157, 0.15), rgba(218, 165, 32, 0.15)); border: 1px solid rgba(218, 165, 32, 0.3); border-radius: 20px; padding: 35px; margin: 40px auto 60px; max-width: 600px; text-align: center;">
            <h3 style="font-family: 'Cinzel', serif; color: var(--rose-pink); margin-bottom: 15px; font-size: 1.5em;">
                ☕ Support This Sacred Work
            </h3>
            <p style="font-size: 1.05em; margin-bottom: 20px; line-height: 1.7;">
                This research took years to compile. If these teachings have illuminated your path, 
                consider supporting the continued exploration of consciousness and manifestation.
            </p>
            <a href="https://buymeacoffee.com/quantummerlin" target="_blank" class="cta-button" style="background: linear-gradient(135deg, #ff6b9d, #daa520); font-size: 1.1em;">
                ☕ Buy Merlin a Coffee
            </a>
            <p style="margin-top: 15px; font-size: 0.95em; color: rgba(240, 230, 255, 0.7); font-style: italic;">
                Every contribution fuels more mystical discoveries 🌹✨
            </p>
        </div>
        
        <!-- Footer -->
        <footer style="text-align: center; padding: 30px 20px; border-top: 1px solid rgba(255, 215, 0, 0.2); margin-top: 50px;">
            <p>© 2026 Quantum Merlin | All Rights Reserved</p>
            <div style="margin-top: 15px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="../privacy.html" style="color: var(--quantum-gold);">Privacy Policy</a>
                <span>•</span>
                <a href="../terms.html" style="color: var(--quantum-gold);">Terms of Service</a>
                <span>•</span>
                <a href="../disclaimer.html" style="color: var(--quantum-gold);">Disclaimer</a>
            </div>
        </footer>
    </div>
</body>
</html>
```

---

## 🎨 BRANDING SIGNATURE ELEMENTS

### The Wizard & Rose Tagline
**Always end CTAs with:**
```html
<p style="margin-top: 30px; color: var(--rose-pink); font-style: italic;">
    🧙‍♂️ The Wizard and the Rose await... 🌹
</p>
```

### Copyright Footer
```
© 2026 Quantum Merlin | All Rights Reserved
```

### Link Styling
```css
a {
    color: var(--quantum-gold);
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: var(--ancient-gold);
}
```

---

## 🌟 SPECIAL EFFECTS (OPTIONAL)

### Floating Background Orbs
```css
.magical-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    filter: blur(40px);
    animation: float-orb 20s infinite ease-in-out;
}

.orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%);
    top: 10%;
    left: -10%;
}

@keyframes float-orb {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(30px, -30px); }
    66% { transform: translate(-20px, 20px); }
}
```

---

## ✅ BRANDING CHECKLIST

When creating/updating any Quantum Merlin page, ensure:

- [ ] Deep void background (`#0a0015`)
- [ ] Cinzel Decorative for main h1 titles
- [ ] Gradient text on h1 (gold → pink → purple)
- [ ] Cormorant Garamond body text
- [ ] Gold accent colors for headings/links
- [ ] Purple/gold gradient backgrounds on cards
- [ ] Rounded corners (20px for cards, 25px for buttons)
- [ ] Soft shadows with purple/gold glow
- [ ] "Wizard & Rose" tagline on CTAs
- [ ] Explore hub card before footer
- [ ] Coffee support card before footer
- [ ] Standard footer with privacy/terms links
- [ ] Mystical emoji system (🔮✨🌹🧙‍♂️)
- [ ] Smooth transitions (0.3s ease)
- [ ] Mobile responsive breakpoints

---

## 📋 QUICK COPY-PASTE SNIPPETS

### Full CSS Variables Block
```css
:root {
    --merlin-purple: #2d1b4e;
    --rose-pink: #ff6b9d;
    --quantum-gold: #daa520;
    --ancient-gold: #ffd700;
    --mystic-cyan: #00f5ff;
    --deep-void: #0a0015;
    --ethereal-white: #f0e6ff;
}
```

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

### Standard h1
```html
<h1 style="font-family: 'Cinzel Decorative', serif; font-size: 3rem; text-align: center; background: linear-gradient(135deg, #ffd700, #ff6b9d, #8a2be2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 15px; letter-spacing: 3px;">
    Your Title Here
</h1>
```

### Standard CTA Button
```html
<a href="#" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #daa520, #ffd700); color: #0a0015; text-decoration: none; border-radius: 25px; font-family: 'Cinzel', serif; font-weight: 600; font-size: 1.1rem; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4);">
    Button Text
</a>
```

---

**End of Branding Template**
*Version 1.0 - January 2026*
*For questions or additions, contact: Quantum Merlin Development Team*