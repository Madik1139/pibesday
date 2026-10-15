---
name: Rosé Reverie
colors:
  surface: '#fff8f7'
  surface-dim: '#ffced4'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f1'
  surface-container: '#ffe9ea'
  surface-container-high: '#ffe1e4'
  surface-container-highest: '#ffd9dd'
  on-surface: '#400014'
  on-surface-variant: '#5c3f40'
  inverse-surface: '#670024'
  inverse-on-surface: '#ffecee'
  outline: '#906f70'
  outline-variant: '#e5bdbe'
  surface-tint: '#be0037'
  primary: '#b80035'
  on-primary: '#ffffff'
  primary-container: '#e11d48'
  on-primary-container: '#fffaf9'
  inverse-primary: '#ffb3b6'
  secondary: '#a43073'
  on-secondary: '#ffffff'
  secondary-container: '#fc79bd'
  on-secondary-container: '#76014e'
  tertiary: '#815100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffaf9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b6'
  on-primary-fixed: '#40000c'
  on-primary-fixed-variant: '#920028'
  secondary-fixed: '#ffd8e7'
  secondary-fixed-dim: '#ffafd3'
  on-secondary-fixed: '#3d0026'
  on-secondary-fixed-variant: '#85145a'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#fff8f7'
  on-background: '#400014'
  surface-variant: '#ffd9dd'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 46px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  margin-mobile: 1.25rem
  margin-desktop: 3rem
---

## Brand & Style
The design system establishes an intimate, deeply affectionate, and luxurious atmosphere crafted specifically for a romantic celebration. It evokes wonder, tenderness, and emotional depth through luminous surfaces, delicate ambient glows, and nostalgic keepsake motifs. The visual style merges refined editorial luxury with luminous soft glassmorphism—featuring translucent panels, glowing rose-gold gradients, and delicate polished borders reminiscent of fine jewelry. The tone feels warm, intentional, and heartfelt, treating each interaction as a treasured digital love letter.

## Colors
The color foundation rests on warm ivory and soft blush backgrounds, avoiding sterile cool whites in favor of radiant candlelit tones. 

- **Primary (`#E11D48` Rose Gold Crimson):** Anchors focal actions, primary CTA ribbons, and emotional highlights.
- **Secondary (`#F472B6` Soft Blush Glow):** Powers ambient backdrops, selection states, and delicate gradient shifts.
- **Tertiary (`#F59E0B` Starlight Gold):** Reserved for celebratory accents, shimmer micro-interactions, floating star particles, and gift ribbon badges.
- **Deep Wine (`#881337` Romantic Crimson Neutral):** Supplies high-contrast, lyrical typography and subtle structural elements, replacing harsh blacks with velvety warmth.
- **Canvas Base:** Soft ivory (`#FFFDFD`) transitioning to delicate blush mist (`#FFF1F2`) on layered interactive sections.

## Typography
Typographic scale blends dramatic, editorial serif headlines with contemporary humanist sans-serif for comfortable reading. Headings set in Playfair Display convey poetic emotion and grandeur, while body passages set in Plus Jakarta Sans provide effortless legibility with soft, approachable curves. Large editorial quotes and heartfelt anniversary statements use italicized weights of Playfair Display to emulate bespoke print invitations.

## Layout & Spacing
The layout follows an 8pt rhythmic grid within an adaptive, centered container architecture. 

- **Breakpoints:**
  - Compact (Mobile): `< 640px` — Single column flow, edge padding of `1.25rem`, vertical card stacking.
  - Medium (Tablet): `640px - 1024px` — 6-column fluid grid, `1.5rem` gutters.
  - Expanded (Desktop): `> 1024px` — 12-column max-width container (`1200px`) centered on canvas to preserve an intimate reading experience.
- Spacing preserves generous breathing room around photography and handwritten notes, avoiding dense dashboards in favor of paced storytelling.

## Elevation & Depth
Depth is built through luminous glassmorphism and candlelit ambient drops rather than harsh grey drop shadows.

- **Frosted Glass Panels:** Constructed using semi-transparent white fills (`rgba(255, 255, 255, 0.65)`) over dynamic blush tones with `backdrop-filter: blur(16px)` and delicate semi-translucent borders (`rgba(255, 255, 255, 0.8)`).
- **Romantic Ambient Shadows:** Diffuse, tinted drop shadows using deep rose tones instead of neutral black:
  - Resting Card: `0 8px 32px -4px rgba(225, 29, 72, 0.08)`
  - Elevated / Interactive Card: `0 16px 48px -6px rgba(225, 29, 72, 0.16)`
  - Shimmer Accent Halo: `0 0 24px 0 rgba(245, 158, 11, 0.25)`

## Shapes
Surfaces use pill and soft organic radii to foster warmth, gentleness, and physical touchability. Standard structural panels adhere to a baseline `0.5rem` to `1rem` radius, while interactive buttons, surprise reveal badges, and celebratory countdown tags employ pill-shaped curvatures. Memory polaroid frames break the system deliberately with traditional squared outer silhouettes and gently softened photo viewports.

## Components

- **Buttons:**
  - *Primary Button:* Pill-shaped gradient (`#FB7185` to `#E11D48`) with crisp white label text, subtle rose glow on hover, and gentle tactile scale depression (`scale(0.98)`).
  - *Secondary / Shimmer Button:* Frosted ivory glass with a delicate border (`#FDE68A`) and gold shimmer hover animation.
- **Polaroid Keepsake Cards:**
  - Asymmetric white card base with generous bottom chin, tilted subtly (`-1.5deg` to `+2deg`), featuring soft drop shadow, pin ornament at top, and serif handwritten captions.
- **Surprise Countdown & Reveal Units:**
  - Luminous glass tiles with large serif digits, overlaid with floating golden star particles (`#F59E0B`). Interactive unboxing cards feature ribbon overlays that animate open upon tap.
- **Input Fields & Text Areas:**
  - Soft ivory backdrop with `1px` translucent rose outline (`#F472B6`), shifting to glowing `#E11D48` ring on focus.
- **Selection Controls (Checkboxes & Radios):**
  - Heart-shaped glyph indicators or rose gold circular checks with smooth scale transitions.