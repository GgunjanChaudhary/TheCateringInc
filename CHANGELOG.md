# CHANGELOG — The Catering Inc. Website

## [2026-04-07] — Initial full build

### Setup
- Scaffolded Vite + React 18 project — `package.json`, `vite.config.js`
- Installed: tailwindcss @tailwindcss/vite, react-router-dom, lucide-react, react-helmet-async
- Configured Tailwind v4 with brand colors and Google Fonts via `@theme` in `src/index.css`
- Set `base: './'` in vite.config.js for cPanel/Hostinger deployment

### Core Files
- `index.html` — SEO meta, LocalBusiness schema markup, favicon
- `src/main.jsx` — BrowserRouter + HelmetProvider wrappers
- `src/App.jsx` — all 17 routes defined
- `src/index.css` — brand palette, fonts, animations

### Components
- `src/components/Navbar.jsx` — sticky, mobile hamburger, Services dropdown
- `src/components/Footer.jsx` — 4-column layout, social icons (inline SVG)
- `src/components/shared/WhatsAppButton.jsx` — floating, bounce animation
- `src/components/shared/ScrollToTop.jsx` — floating scroll-to-top
- `src/components/shared/QuoteButton.jsx` — reusable CTA (primary/secondary/ghost)
- `src/components/shared/TestimonialCard.jsx`
- `src/components/shared/DishCard.jsx`
- `src/components/shared/EventCard.jsx`

### Data Files
- `src/data/menus.js` — full menu across 4 categories
- `src/data/testimonials.js` — 9 India-specific testimonials
- `src/data/services.js` — 5 service types with inclusions
- `src/data/faqs.js` — 12 FAQs with warm answers
- `src/data/gallery.js` — 12 gallery items with filters
- `src/data/blog.js` — 6 blog posts

### Pages Built (17 total)
- `src/pages/Home.jsx` — all 10 sections
- `src/pages/About.jsx`
- `src/pages/Menus.jsx`
- `src/pages/Services.jsx`
- `src/pages/WeddingCatering.jsx`
- `src/pages/CorporateCatering.jsx`
- `src/pages/PartyBirthday.jsx`
- `src/pages/IndianOccasions.jsx`
- `src/pages/BulkOutdoor.jsx`
- `src/pages/Gallery.jsx` — with lightbox and filter
- `src/pages/Pricing.jsx` — 3 packages
- `src/pages/GetQuote.jsx` — full enquiry form
- `src/pages/FAQ.jsx` — accordion
- `src/pages/Testimonials.jsx`
- `src/pages/Blog.jsx` — with search filter
- `src/pages/ServiceAreas.jsx`
- `src/pages/Contact.jsx`

### Bug Fixes
- Fixed unescaped apostrophes in IndianOccasions.jsx (line 101) and WeddingCatering.jsx (line 65)
- Replaced lucide-react Instagram/Facebook/Youtube (not exported) with inline SVGs in Footer.jsx and Contact.jsx
- Fixed Google Fonts @import order warning in index.css (cosmetic only)
