# PIXELRUSH — BROWSER GAMING PORTAL (V1.0)

> **Play. Explore. Repeat.**

PixelRush is a modern, high-performance browser gaming portal designed with a dark, cinematic gaming aesthetic inspired by platforms like CrazyGames and Poki, while featuring an original visual identity.

Built strictly with clean semantic **HTML5**, modern **CSS3**, and modular **Vanilla JavaScript**, PixelRush requires zero frameworks, zero external build steps, and zero runtime dependencies. It is 100% ready for static deployment on **Cloudflare Pages**, GitHub Pages, or any static web host.

---

## 🎮 Key Features

### 1. Brand & Aesthetic
- **Cinematic Dark Palette:** Deep navy (`#060911`), charcoal (`#0B0F19`), and elevated slate card surfaces (`#111726`).
- **Brand Accents:** Electric Neon Purple (`#A855F7`, `#8B5CF6`) as primary accent, and Cyber Cyan (`#00F0FF`, `#06B6D4`) as secondary accent.
- **Custom Original Branding:** Scalable SVG vector logo mark featuring a stylized fast-action rush blade, glowing core, and crisp typography.

### 2. Homepage & Interactive Catalogue
- **Hero Section:**
  - Headline: *"YOUR NEXT ADVENTURE STARTS HERE."*
  - Supporting text: *"Discover exciting browser games, jump straight into the action and find your next favourite."*
  - Spotlight preview card for flagship launch title **Space Survivor**.
  - Prominent "Play Space Survivor" primary CTA and "Browse All Games" navigation.
- **Featured Game Spotlight:** Full-width showcase highlighting Space Survivor with direct launch options, platform specs, and verified controls.
- **Working Dynamic Game Search:** Real-time client-side search matching game titles, genres, descriptions, and tags. Includes instant clear button, query counter, and friendly empty-state fallback with a one-click reset button.
- **Working Category Filters:** Interactive pills for **All Games**, **Action**, and **Survival** with live game counts dynamically calculated from the active catalogue.
- **Honest Platform Presentation:** In Version 1.0, Space Survivor is the sole playable title. No fabricated ratings, player statistics, or faux playable cards are presented.

### 3. Dedicated Game Page (`games/space-survivor.html`)
- **Live Game Embed:** Directly embeds the official game hosted at `https://space-survivor.pages.dev/` via a responsive 16:9 iframe with `allow="fullscreen; autoplay; gamepad; keyboard-map"`.
- **Loading Spinner Overlay:** Smooth loading state with graceful dismissal when the iframe finishes loading.
- **Fullscreen API:** Native HTML5 Fullscreen toggle on the player wrapper with keyboard shortcut hints and escape handler.
- **Theater / Wide Mode:** Allows players to expand the game viewport for a cinematic experience.
- **Direct Fallback Button:** Prominent "Open in New Tab ↗" fallback button for environments that restrict cross-origin iframe canvas rendering.
- **Verified Controls Guide:** Keycap visuals (`<kbd>W</kbd>`, `<kbd>A</kbd>`, `<kbd>S</kbd>`, `<kbd>D</kbd>`, `<kbd>Space</kbd>`, `<kbd>P</kbd>`, `<kbd>Esc</kbd>`) accurately documenting omnidirectional propulsion, auto-targeting blaster turrets, EMP shockwaves, and tactical pause.
- **Active Development Shelf:** Clean information card detailing future release plans on the platform roadmap.

### 4. Secondary Pages
- **About Page (`pages/about.html`):** Mission statement, core pillars (Frictionless Play, Curated Quality, Responsive Design), zero-bloat architecture overview, and platform roadmap (v1.0 -> v1.1 -> v1.2).
- **Contact & Support Page (`pages/contact.html`):** Clean feedback interface with an honest notice indicating that direct submission is under development for Version 1.0, and an accurate FAQ accordion answering player questions.

---

## 📁 Project Directory Structure

```text
Pixel Rush Website/
│
├── index.html                   # Homepage (Hero, Featured, Category Filters, Browse Grid)
├── style.css                    # Unified Design System, CSS tokens, responsive layouts
├── script.js                    # Expandable Game Catalogue Engine, Search, Filters, Modals
├── README.md                    # Project documentation & deployment guide
│
├── games/
│   └── space-survivor.html      # Dedicated game player page (responsive iframe, fullscreen)
│
├── pages/
│   ├── about.html               # About PixelRush, Pillars & Development Roadmap
│   └── contact.html             # Feedback form & Interactive FAQ accordion
│
└── assets/
    ├── logo/
    │   ├── logo.svg             # Full brand mark (Symbol + PixelRush typography)
    │   ├── icon.svg             # Standalone brand icon
    │   └── favicon.svg          # Browser tab icon
    │
    └── thumbnails/
        ├── space-survivor.svg   # 16:9 Space shooter vector artwork (Playable)
        ├── neon-drift.svg       # 16:9 Synthwave cyberpunk racing artwork
        ├── quantum-grid.svg     # 16:9 Isometric sci-fi puzzle matrix artwork
        ├── echoes-of-aethelgard.svg # 16:9 Celestial fantasy adventure artwork
        └── galactic-tactics.svg # 16:9 Deep space fleet strategy artwork
```

---

## 🚀 How to Add New Games in the Future

The game catalogue in `script.js` is structured as a data repository (`GAMES_CATALOGUE`). To add a new game, simply append a new object to the array:

```javascript
{
  id: 'game-slug-id',
  slug: 'game-slug-id',
  title: 'Game Title',
  category: 'Action',        // 'Action' | 'Racing' | 'Puzzle' | 'Adventure' | 'Strategy'
  subCategory: 'Platformer',
  tags: ['Action', 'Platformer', 'Pixel', 'Retro'],
  description: 'A short, engaging 1-2 sentence description of the game.',
  thumbnail: 'assets/thumbnails/your-game.svg',
  pageUrl: 'games/your-game.html',
  externalUrl: 'https://your-game.pages.dev/',
  status: 'playable',        // 'playable' or 'coming-soon'
  rating: 4.8,
  playsCount: '12.5K',
  featured: false,
  releaseDate: '2026',
  developer: 'Studio Name',
  controlsSummary: 'WASD to move, Space to jump'
}
```

The homepage grid, category filter counts, search matching, and related games shelves will **automatically render and update** without touching any HTML!

---

## 🌐 Running Locally

Because PixelRush uses standard relative paths and vanilla web technologies, you can preview it locally using any static web server:

### Option A: Using Python (Built-in)
```bash
# In the project root directory:
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Option B: Using Node.js `npx serve`
```bash
npx serve .
```

### Option C: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## ☁️ Deploying to Cloudflare Pages

PixelRush is designed for seamless, zero-config deployment on **Cloudflare Pages**:

1. **Push to Git Repository:**
   Push this project folder to your GitHub or GitLab repository.

2. **Connect to Cloudflare Pages:**
   - Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your PixelRush repository.

3. **Configure Build Settings:**
   - **Project Name:** `pixelrush`
   - **Production Branch:** `main` (or `master`)
   - **Framework Preset:** `None`
   - **Build Command:** *(Leave empty)*
   - **Build Output Directory:** `/` (or leave empty to deploy root)

4. **Deploy:**
   Click **Save and Deploy**. Cloudflare Pages will publish the static site globally across its edge network in seconds.

---

## 📱 Responsive & Accessibility Verification

- **Mobile Viewports (320px – 480px):** Single-column fluid card layout, accessible full-screen mobile menu drawer with hamburger toggle, touch-optimized button targets (minimum 44x44px).
- **Tablet Viewports (768px – 1024px):** 2-column card grid, scrollable category filter pills, stacked player details.
- **Desktop Viewports (1200px+):** 3-to-4 column responsive grid, side-by-side hero layout, wide theater player mode.
- **Accessibility:** Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`), keyboard navigation focus indicators (`:focus-visible`), ARIA attributes (`aria-expanded`, `aria-label`, `role="tab"`), and high-contrast text ratios.

---

## 📄 License & Attribution

- **Game Embed:** Space Survivor is hosted at `https://space-survivor.pages.dev/`.
- **Artwork & Code:** Original CSS styles, vector SVGs, and JavaScript code created for Version 1.0 of the PixelRush gaming portal.
