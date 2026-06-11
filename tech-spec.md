# Platte Landing Page -- Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | React DOM renderer |
| typescript | ^5.6.0 | Type safety |
| vite | ^5.4.0 | Build tool / dev server |
| tailwindcss | ^3.4.19 | Utility-first CSS |
| @tailwindcss/typography | ^0.5.0 | Typography plugin (if needed) |
| gsap | ^3.12.0 | Animation engine + ScrollTrigger |
| @gsap/react | ^2.1.0 | useGSAP hook for React lifecycle |
| lenis | ^1.1.0 | Smooth scroll |
| lucide-react | ^0.400.0 | Icons (checkmark, arrows, etc.) |

Fonts (Cormorant Garamond + Outfit) loaded via Google Fonts `<link>` in index.html.

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Single -- fixed top bar with scroll-aware styling |
| Footer | Custom | Single |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport video bg with text overlay, scroll-driven fade |
| TrustedBy | Custom | Static logo band with stagger entrance |
| Features | Custom | 4-row alternating layout, per-row ScrollTrigger |
| PlatformShowcase | Custom | Dark section with phone-frame image slider |
| Testimonials | Custom | 3-column card grid |
| Pricing | Custom | 2-column pricing cards |
| FinalCTA | Custom | Centered CTA band |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| PillButton | Custom | Nav, Hero, Platform, Pricing, FinalCTA -- supports primary/secondary/outline variants on light and dark backgrounds |
| SectionLabel | Custom | TrustedBy, Features, Platform, Testimonials, Pricing -- uppercase label with consistent typography |
| FeatureRow | Custom | Features (x4) -- alternating image/text layout, handles its own entrance animation |
| PhoneSlider | Custom | PlatformShowcase -- phone-frame container with crossfade slides, auto-rotate, manual tab control |
| PricingCard | Custom | Pricing (x2) -- plan card with optional badge, feature list, CTA |
| TestimonialCard | Custom | Testimonials (x3) -- quote + avatar + attribution |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollEntrance | Wraps GSAP ScrollTrigger entrance pattern (translateY + fade, configurable direction/distance/duration) to avoid repetition across sections |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero text fade on scroll | GSAP + ScrollTrigger | `gsap.to` with `scrub: 1`, targeting hero text container, opacity 0 + y -60, scroll range top to 80% | Low |
| TrustedBy entrance | GSAP + ScrollTrigger | Label: translateY(20) + fade. Logos: stagger 0.1s. Single trigger, toggleActions play once. | Low |
| Feature row entrances | GSAP + ScrollTrigger | Per-row trigger. Text slides from side (translateX +-40), image from opposite, stagger 0.15s between them. 4 rows = 4 independent triggers. | Medium |
| Platform section entrance | GSAP + ScrollTrigger | Left col: translateX(-30) + fade. Right col (phone): translateX(30) + fade. Same trigger point. | Low |
| Phone slider auto-rotate | React state + CSS | setInterval 5000ms toggles active slide index. CSS `transition: opacity 0.5s` on slides. Tab click resets interval. | Medium |
| Phone frame scale entrance | GSAP + ScrollTrigger | scale(0.9) translateY(40) to neutral, 1.0s power3.out, triggered at 70% viewport. | Low |
| Testimonial cards stagger | GSAP + ScrollTrigger | translateY(40) + fade, stagger 0.12s, single trigger for container. | Low |
| Pricing cards scale entrance | GSAP + ScrollTrigger | scale(0.95) + fade, stagger 0.15s, single trigger. | Low |
| Final CTA stagger | GSAP + ScrollTrigger | H2 + body + button: translateY(30) + fade, stagger 0.1s. | Low |
| Smooth scroll | Lenis | Global instance, integrated with GSAP ScrollTrigger via lenis.on('scroll', ScrollTrigger.update). | Low |

## State & Logic Plan

### Phone Slider (PlatformShowcase)

- **State**: `activeSlide: 0 | 1`, `isAutoPlaying: boolean`
- **Logic**: `setInterval` on mount (5000ms) cycles activeSlide. Tab click: clears interval, sets slide, restarts interval. `useEffect` cleanup clears interval on unmount.
- **Accessibility**: Tabs use `role="tablist"` / `role="tab"` / `role="tabpanel"`. Respect `prefers-reduced-motion`: disable auto-rotate, show slide 0 only.

### Navigation Scroll Behavior

- **State**: `scrolled: boolean` -- toggled when scrollY > 50px
- **Logic**: Single scroll listener updates class for potential shadow/border enhancement (no major visual change per design, but hook ready for extension).

### Mobile Menu

- **State**: `menuOpen: boolean`
- **Logic**: Hamburger toggle on <768px. Full-screen overlay with nav links.

## Other Key Decisions

- **No shadcn/ui components used** -- the design is entirely custom with its own card/button aesthetics that do not match shadcn defaults. The shadcn/ui dependency in the project scaffold remains unused for components but provides the Tailwind theming infrastructure.
- **Hero video**: A `<video>` element with poster attribute for instant visual. MP4 only (no WebM source needed unless a WebM asset is generated). `object-fit: cover` ensures full bleed.
- **Image assets**: 6 AI-generated images. Feature images at 1200x750 (16:10), slider images at 750x1334 (phone portrait). All placed in `public/assets/`.
- **Font loading**: Google Fonts link tag in `index.html` with `display=swap` for both Cormorant Garamond (weights 500, 600, 700) and Outfit (weights 400, 500, 600).
