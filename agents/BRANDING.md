# Agent: BRANDING
> **Role:** Visual design guardian — two design systems, per-brand CSS tokens, fonts, colours, component styling, animation rules.

---

## Two Design Systems

The ecosystem operates with **two distinct visual languages**. Every page belongs to one or the other. **Never mix them on the same page.**

### System 1: QME Elegant (Mystical/Purple/Gold)
**Brands:** Soul Blueprint, Classic, A Moment In Time, Ultimate, Gravity, K-Pop, Kosmick Pop, LifeStrategy

| Token | Value | Usage |
|---|---|---|
| `--merlin-purple` | `#2d1b4e` | Card backgrounds, sections |
| `--rose-pink` | `#ff6b9d` | The Rose's accent, hearts, love themes |
| `--quantum-gold` | `#daa520` | Headings, borders, important elements |
| `--ancient-gold` | `#ffd700` | Bright accent, stars, highlights |
| `--mystic-cyan` | `#00f5ff` | Quantum accents, glows |
| `--deep-void` | `#0a0015` | Primary background |
| `--ethereal-white` | `#f0e6ff` | Body text (lavender-white) |
| `--quantum-magenta` | `#ff00ff` | Accent magenta |

**Fonts:**
- **h1:** `'Cinzel Decorative', serif` — ornate, magical
- **h2/h3:** `'Cinzel', serif` — clean serif elegance
- **body:** `'Cormorant Garamond', Georgia, serif` — readable mystical serif
- **Font import:** `Cinzel+Decorative:wght@400;700;900&Cinzel:wght@400;500;600;700&Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400`

**Background:** Deep void (`#0a0015`) with subtle purple radial gradients
**Borders:** Gold with transparency `rgba(255, 215, 0, 0.2)` to `rgba(255, 215, 0, 0.3)`
**Heading style:** Gradient text (`gold → pink → purple`), letter-spacing 3px
**Card style:** Dark glass with gold border: `background: rgba(45, 27, 78, 0.3); border: 1px solid rgba(255, 215, 0, 0.2);`
**Button style:** Gold gradient background with dark text, or outlined gold border
**Tone:** Mystical, elegant, ancient wisdom meeting modern insight

### System 2: QRC Synthwave (Neon/Cyan/Tron)
**Brands:** Genesis, 40Hz, Quantum Reality Codes, Reality Codes

| Token | Value | Usage |
|---|---|---|
| `--neon-cyan` | `#00f5ff` | Primary brand colour |
| `--neon-magenta` | `#ff00ff` | Accent colour, love/heart |
| `--neon-pink` | `#ff1493` | Secondary accent |
| `--neon-purple` | `#9d00ff` | Mystical/spiritual |
| `--neon-gold` | `#ffd700` | Success/manifestation |
| `--neon-blue` | `#00a8ff` | Trust/wisdom |
| `--bg-dark` | `#0a0a0f` | Primary background |
| `--bg-surface` | `rgba(20, 20, 35, 0.95)` | Card surface |

**Fonts:**
- **Headings:** `'Orbitron', sans-serif` — futuristic, tech
- **Body:** `'Exo 2', sans-serif` — clean, modern
- **Font import:** `Orbitron:wght@400;500;600;700;800;900&Exo+2:wght@300;400;500;600;700`

**Background:** Near-black (`#0a0a0f`) with animated grid floor, floating neon particles, magenta sun/horizon
**Borders:** Cyan with glow `rgba(0, 245, 255, 0.3)` — 1px standard, 2px bright
**Heading style:** Uppercase, letter-spacing 2px, gradient text (`cyan → magenta`), glow shadow
**Card style:** Glass with cyan border: `background: rgba(30, 30, 50, 0.85); border: 1px solid rgba(0, 245, 255, 0.2); backdrop-filter: blur(10px);`
**Button style:** Primary: cyan gradient with black text. Secondary: transparent with cyan border
**Tone:** Futuristic, quantum-tech, Tron-like digital mysticism

---

## Shared Design Tokens (Both Systems)

These are defined in `shared/css/quantum-variables.css` and used across QRC brands. QME brands typically override these in brand-specific CSS.

| Category | Tokens |
|---|---|
| Spacing | `--space-1` (4px) through `--space-24` (96px) |
| Radius | `--radius-sm` (4px), `-md` (8px), `-lg` (12px), `-xl` (16px), `-2xl` (20px), `-3xl` (24px), `-full` (9999px) |
| Shadows | `--shadow-sm/md/lg/xl`, `--shadow-card`, `--shadow-inner` |
| Transitions | `--transition-fast` (150ms), `-normal` (300ms), `-slow` (500ms), `-bounce`, `-smooth` |
| Z-Index | `--z-background` (-1) through `--z-toast` (700) |
| Breakpoints | `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px |
| Text sizes | `--text-xs` (0.75rem) through `--text-6xl` (4rem) |
| Font weight | `--font-light` (300) through `--font-extrabold` (800) |

---

## Brand-Specific Overlays

### K-Pop / Kosmick Pop
- Base: QME Elegant system
- Overlay: K-Pop idol aesthetic — softer pinks, more playful energy
- Extra colours: Pastel pink, holographic shimmer
- Typography stays QME but may use slightly more playful headings

### Stranger
- Base: QME Elegant system  
- Overlay: Stranger Things horror/sci-fi — more red, flickering effects
- Extra: Christmas light strings, Upside Down references, 80s horror palette
- Darker, moodier version of QME Elegant

### A Moment In Time
- Base: QME Elegant system
- Overlay: Gift-oriented — more warmth, celebration feel
- Extra: Ribbons, frames, occasion-specific themes
- Multi-language (English, Spanish, Portuguese)

---

## CSS Architecture

### Loading Order
```html
<!-- 1. Design tokens (always first) -->
<link rel="stylesheet" href="../shared/css/quantum-variables.css">

<!-- 2. Base reset + body styles -->
<link rel="stylesheet" href="../shared/css/quantum-base.css">

<!-- 3. Core layout (containers, grids) -->
<link rel="stylesheet" href="../shared/css/quantum-core.css">

<!-- 4. Components (buttons, cards, inputs) -->
<link rel="stylesheet" href="../shared/css/quantum-components.css">

<!-- 5. Navigation -->
<link rel="stylesheet" href="../shared/css/quantum-navigation.css">

<!-- 6. Animations -->
<link rel="stylesheet" href="../shared/css/quantum-animations.css">

<!-- 7. Backgrounds (particles, grid, orbs) -->
<link rel="stylesheet" href="../shared/css/quantum-backgrounds.css">

<!-- 8. Brand overrides (if needed) -->
<link rel="stylesheet" href="styles/brand-specific.css">

<!-- 9. Page-specific inline styles -->
<style>/* page overrides */</style>
```

### Key Animations Available
| Animation | Effect | Duration |
|---|---|---|
| `floatUp` | Particles rising from bottom | infinite, linear |
| `gridMove` | Grid floor scrolling | 20s, infinite |
| `pulse` | Scale + opacity bounce | 2s default |
| `electricPulse` | Box-shadow intensity cycle | 2s |
| `shimmer` | Background position sweep | 2s |
| `letterPop` | Scale-in with rotation | 0.4s |
| `fireGlow` | Red-orange text shadow | 1.5s |
| `goldPulse` | Gold box-shadow intensity | 2s |

---

## Component Reference

### Standard Card
```css
/* QRC version */
.card {
  background: rgba(30, 30, 50, 0.85);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-card);
}

/* QME version */
.card {
  background: rgba(45, 27, 78, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
}
```

### Standard Button
```css
/* QRC primary */
.btn-primary {
  background: linear-gradient(135deg, #00f5ff, #00a8ff);
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
}

/* QME primary */
.btn-primary {
  background: linear-gradient(135deg, #ffd700, #daa520);
  color: #0a0015;
  font-family: 'Cinzel', serif;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}
```

### Input Field
```css
.input-field {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(0, 245, 255, 0.3); /* QRC */
  /* border: 2px solid rgba(255, 215, 0, 0.3);  QME */
  border-radius: 12px;
  padding: 15px 20px;
  color: #fff;
  font-family: 'Exo 2', sans-serif; /* QRC */
  /* font-family: 'Cormorant Garamond', serif;  QME */
  width: 100%;
}
```

---

## Responsive Rules

1. **Mobile first** — all designs start at 320px
2. **Max content width:** 900px (readings), 1200px (tool grids), 600px (forms)
3. **Font scaling:**
   - h1: 2rem mobile → 3rem desktop
   - h2: 1.5rem mobile → 2rem desktop
   - body: 16px mobile → 18px desktop
4. **Card grid:** 1 column mobile → 2 columns tablet → 3 columns desktop
5. **Navigation:** Hamburger on mobile → sidebar on desktop
6. **Touch targets:** Minimum 44×44px for all interactive elements
7. **No horizontal scroll** — ever. If content overflows, it's a bug.

---

## Branding Checklist for New Pages

- [ ] Correct design system selected (QME or QRC)?
- [ ] Correct font families loaded in `<head>`?
- [ ] CSS variables match the brand?
- [ ] Background matches the design system?
- [ ] Card borders use correct accent colour?
- [ ] Buttons use correct gradient and font?
- [ ] Heading gradient matches brand?
- [ ] Mobile responsive at 320px?
- [ ] Touch targets ≥ 44px?
- [ ] No mixed design system elements?
- [ ] Shared components loaded (header, footer, background, scripts)?
- [ ] favicon and meta theme-colour set?

---

*Consult [COUNCIL.md](COUNCIL.md) for brand → design system mapping.*
*Consult [ARCHITECT.md](ARCHITECT.md) for CSS loading order and shared infrastructure.*
