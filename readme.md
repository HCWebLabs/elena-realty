# Elena Vance Realty

A luxury real estate microsite for an architectural property specialist. Built as a portfolio piece demonstrating modern web development practices with a focus on refined design, performance, and user experience.

![Elena Vance Realty Preview](assets/images/preview.png)

---

## Overview

This project is a complete, production-ready microsite designed for a fictional high-end real estate agent specializing in mid-century modern and contemporary architectural homes. The site prioritizes elegant aesthetics, seamless interactions, and lead generation — everything a real client would need to establish authority and convert visitors.

**Live Demo:** [View on GitHub Pages](#)

---

## Features

- **Scroll-triggered animations** — Subtle reveal effects as content enters viewport
- **Smart header** — Hides on scroll down, reveals on scroll up, transforms on scroll
- **Property modals** — Detailed listing views with specs, features, and CTAs
- **Lead capture forms** — Email validation, loading states, success feedback
- **Custom cursor** — Elegant pointer interaction on desktop devices
- **Mobile-first responsive** — Fully adaptive from 320px to 4K displays
- **Accessibility** — Semantic HTML, ARIA attributes, keyboard navigation, reduced motion support
- **Performance optimized** — Lazy loading, efficient animations, minimal dependencies

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Structure** | HTML5 (semantic, accessible) |
| **Styling** | CSS3 (custom properties, fluid typography, grid/flexbox) |
| **Interaction** | Vanilla JavaScript ES6+ (no frameworks, no dependencies) |
| **Forms** | PHP handlers (ready for production integration) |
| **Fonts** | Google Fonts (Cormorant Garamond + Outfit) |

### Why No Frameworks?

This project intentionally avoids React, Vue, Bootstrap, Tailwind, and other frameworks to demonstrate:

1. **Deep understanding** of core web technologies
2. **Performance** — Zero framework overhead, ~36KB total (zipped)
3. **Longevity** — No dependency maintenance, no breaking changes
4. **Skill** — Anyone can install packages; hand-coding shows craft

---

## Project Structure

```
elena-vance-realty/
├── index.html              # Main HTML document
├── css/
│   ├── reset.css           # Modern CSS reset
│   ├── variables.css       # Design tokens (colors, fonts, spacing)
│   ├── base.css            # Typography, forms, buttons, global styles
│   ├── layout.css          # Header, footer, sections, modal structure
│   ├── components.css      # Property cards, UI components
│   └── animations.css      # Scroll reveals, hover effects, transitions
├── js/
│   └── main.js             # All JavaScript (modular IIFE pattern)
├── php/
│   ├── contact.php         # Contact form handler
│   └── guide-download.php  # Lead magnet form handler
└── assets/
    ├── icons/
    │   └── favicon.svg     # EV monogram favicon
    └── images/
        ├── hero-home.jpg
        ├── property-[1-4].jpg
        ├── ashford-valley.jpg
        ├── neighborhood-[1-3].jpg
        └── elena-portrait.jpg
```

---

## Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary Background | Warm Cream | `#FAF9F7` |
| Secondary Background | Pale Stone | `#F0EEEB` |
| Primary Text | Deep Charcoal | `#2C2C2C` |
| Secondary Text | Warm Gray | `#6B6560` |
| Accent | Muted Brass | `#A6896A` |

### Typography

- **Display:** Cormorant Garamond — Elegant serif for headings
- **Body:** Outfit — Clean, modern sans-serif for readability

### Spacing

Fluid spacing scale using CSS `clamp()` for responsive rhythm without breakpoint jumps.

---

## Performance

- **No JavaScript frameworks** — Zero bundle overhead
- **CSS custom properties** — Single source of truth, efficient updates
- **Intersection Observer** — Performant scroll animations (no scroll listeners)
- **Lazy loading** — Images load only when approaching viewport
- **System font fallbacks** — Content visible before web fonts load

---

## Accessibility

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<article>`)
- ARIA attributes for dynamic content (modals, menus, buttons)
- Keyboard navigation support
- Focus-visible styling
- Reduced motion support via `prefers-reduced-motion`
- Sufficient color contrast ratios
- Form labels and error messaging

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Graceful degradation for older browsers. Core content accessible everywhere.

---

## Local Development

No build process required. Just open `index.html` in a browser.

For PHP form handling, use a local server:

```bash
# Using PHP's built-in server
php -S localhost:8000

# Or Python
python -m http.server 8000
```

---

## Customization

### Replacing Images

1. Add your images to `assets/images/`
2. Update `src` attributes in `index.html`
3. Recommended: Use WebP format with JPG fallbacks

### Changing Colors

Edit the color variables in `css/variables.css`:

```css
:root {
    --color-cream: #FAF9F7;
    --color-brass: #A6896A;
    /* etc. */
}
```

### Connecting Forms

The PHP handlers are ready for integration. Update with your:
- Email service (SMTP, SendGrid, Mailgun)
- CRM (HubSpot, Salesforce)
- Email marketing (Mailchimp, ConvertKit)

---

## Credits

**Design & Development:** [HC Web Labs](https://hcweblabs.com)

**Photography:** Placeholder images — replace with [Unsplash](https://unsplash.com) or licensed photography

**Fonts:** [Google Fonts](https://fonts.google.com) — Cormorant Garamond, Outfit

---

## License

This project is available for portfolio and educational purposes. 

For client work or commercial use, please contact [HC Web Labs](https://hcweblabs.com).

---

## About HC Web Labs

HC Web Labs is a freelance web development studio based in East Tennessee, specializing in hand-coded websites for small businesses, nonprofits, artists, and entrepreneurs. We believe in clean code, thoughtful design, and people over profit.

[Visit HC Web Labs →](https://hcweblabs.com)
