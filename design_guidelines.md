# CipherCore Audits Design Guidelines

## Design Approach

**Selected Approach:** Hybrid - Drawing inspiration from enterprise security leaders (Cloudflare, Okta) combined with Tailwind's utility-first methodology for precision and professionalism. The design prioritizes trust, clarity, and technical sophistication while maintaining accessibility.

**Design Principles:**
- Trust through minimalism and precision
- Security-focused visual language (sharp edges, structured layouts)
- Professional restraint with strategic accent usage
- Information clarity over decoration

---

## Core Design Elements

### Typography System

**Font Families:**
- Headings: Montserrat (600, 700, 800 weights)
- Body: Open Sans (400, 600 weights)
- Monospace: JetBrains Mono for technical details/code snippets

**Typography Scale:**
- Hero Headlines: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headings: text-3xl md:text-4xl, font-semibold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Text: text-base md:text-lg
- Captions/Labels: text-sm, font-medium

### Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section vertical spacing: py-16 md:py-24 lg:py-32
- Card gaps: gap-6 to gap-8
- Container max-width: max-w-7xl

**Grid System:**
- Desktop: 3-column feature grids, 2-column content splits
- Mobile: Single column stack
- Service cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

## Page-Specific Layouts

### Homepage
**Hero Section:**
- Large hero image: Abstract cybersecurity visualization (digital locks, encrypted data streams, shield iconography in navy/ice blue gradient) - 60vh height
- Centered headline overlay with blurred-background buttons (Request Audit - primary, Our Services - secondary)
- Subtle diagonal accent lines in ice blue creating depth

**Feature Cards Section:**
- 3-column grid (stack on mobile)
- Cards with subtle silver borders, navy background hover state
- Icons from Heroicons (shield-check, check-badge, light-bulb)
- Generous padding (p-8), rounded corners (rounded-xl)

**Stats/Social Proof:**
- 4-column stat display: "X Audits Completed", "Y Industries Served", etc.
- Large numbers in ice blue, labels in silver

### Services Overview
**Service Cards:**
- 2-column layout for 5 services (last card spans if needed)
- Each card: Service icon, title, brief description, price badge (ice blue background), "Learn More" link
- Price badges: Prominent, top-right corner, rounded-full with px-4 py-2

### Individual Service Pages
**Structure:**
- Hero banner: Service name + tagline (h-48, navy background with ice blue accent line)
- Two-column layout: Left (Overview, What's Included list), Right (Price card sticky, Timeline, CTA button)
- Checklist items with Heroicon check-circle icons in ice blue

### About Page
**Three-Card Layout:**
- Vision, Mission, Values as separate cards in grid-cols-1 md:grid-cols-3
- Icon-first design with large illustrative icons
- Quoted text styling for Vision/Mission statements

### Clients & Industries
**Industry Cards:**
- 2x2 grid (4 industries)
- Icon + industry name + description
- Subtle background patterns (diagonal lines in navy at 5% opacity)

### Insights/Blog
**Article Grid:**
- 2-column layout for articles
- Card design: Featured image placeholder (16:9 aspect), title, summary, "Read More" link
- Published date in small silver text

### Contact Page
**Two-Column Split:**
- Left: Company details with icon prefixes (Heroicons: envelope, phone, map-pin)
- Right: Form with navy labels, silver borders on inputs, ice blue focus states
- Form inputs: rounded-lg, py-3 px-4, full border styling

---

## Component Library

### Navigation
- Transparent background with backdrop blur on scroll
- Desktop: Horizontal links with underline hover animation in ice blue
- Mobile: Full-screen overlay hamburger menu (navy background)
- Logo: 40px height, maintains aspect ratio

### Buttons
**Primary (Ice Blue):**
- Background blur when on images
- px-8 py-3, rounded-lg, font-semibold
- No custom hover states (system handles)

**Secondary (Outlined):**
- Border in silver, text in navy
- Same padding/sizing as primary

### Cards
- Background: White with subtle shadow (shadow-md)
- Border: 1px silver on hover
- Padding: p-6 to p-8
- Rounded: rounded-xl

### Footer
- Three-column layout: Logo + tagline, Quick Links, Contact info
- Navy background, silver text
- Copyright centered at bottom with thin ice blue divider line above

---

## Images

**Hero Image (Homepage):**
Abstract cybersecurity theme - visualize encrypted data streams, digital shield, or lock mechanisms with navy-to-ice-blue gradient overlay. Professional stock photo or custom 3D render showing technological precision.

**Service Page Banners:**
Icon-based abstract backgrounds - no photos, geometric patterns representing each service's focus area (compliance grids, security checkmarks, cloud infrastructure).

**About Page (Optional):**
Team photo or office environment showing professionalism - only if authentic imagery available, otherwise omit.

---

## Animation Guidelines

**Minimal Motion:**
- Card hover: Subtle lift (transform translateY(-2px)) with shadow increase
- Button hover: System-defined only
- Page transitions: Fade-in only for content sections
- No parallax, no scroll-triggered animations

---

## Accessibility Standards

- Maintain WCAG AA contrast ratios (Navy #0A1E3F on white passes)
- All interactive elements: min 44px touch target
- Form labels: Explicit label elements, not placeholders
- Focus indicators: 2px ice blue outline with offset
- Semantic HTML5 structure throughout

This design balances corporate professionalism with modern web aesthetics, emphasizing CipherCore's precision and trustworthiness through restrained, purposeful design decisions.