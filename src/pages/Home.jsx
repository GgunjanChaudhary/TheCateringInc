import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Heart, Briefcase, PartyPopper, Home as HomeIcon, Plane, ChevronLeft, ChevronRight, Clock, Users, Star, UtensilsCrossed } from 'lucide-react'
import QuoteButton from '../components/shared/QuoteButton'
import TestimonialCard from '../components/shared/TestimonialCard'
import { testimonials } from '../data/testimonials'
import { useState, useEffect } from 'react'
import heroImages from '../data/heroImages'

// ─── Carousel slides (images from /public/images/hero) ───
const carouselSlides = heroImages.map((img, idx) => {
  // You can customize subtitle/tagline per image if needed
  const defaultData = [
    {
      subtitle: 'Grand Buffet Experiences',
      tagline: 'Every detail, curated with care',
    },
    {
      subtitle: 'Weddings & Celebrations',
      tagline: 'Your most cherished moments, honoured at the table',
    },
    {
      subtitle: 'Culinary Excellence',
      tagline: 'Two decades of mastery on every plate',
    },
    {
      subtitle: 'Premium Events Across Delhi NCR',
      tagline: 'From intimate gatherings to grand feasts',
    },
    {
      subtitle: 'Crafted for Every Occasion',
      tagline: 'Corporate, weddings, and everything in between',
    },
  ]
  const meta = defaultData[idx] || { subtitle: '', tagline: '' }
  return {
    image: `/images/hero/${img}`,
    ...meta,
  }
})

/* ─── Service cards with background images ─────────────────────────────────*/
const serviceCards = [
  {
    icon: Heart,
    title: 'Weddings',
    description: 'Grand receptions to intimate ceremonies — crafted with the reverence your celebration deserves.',
    image: '/images/hindu-indian-wedding-137.jpg',
    to: '/services/wedding',
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    description: 'Office lunches, product launches, annual days — delivered with professional precision.',
    image: '/images/1472798003_event2.jpg',
    to: '/services/corporate',
  },
  {
    icon: PartyPopper,
    title: 'Social Parties & Events',
    description: 'Milestone birthdays, anniversaries and social gatherings — menus that match the mood.',
    image: '/images/buffet-3.jpg',
    to: '/services/birthday-parties',
  },
  {
    icon: HomeIcon,
    title: 'Home Parties',
    description: 'Intimate gatherings, kitty parties and family celebrations — fine dining at your doorstep.',
    image: '/images/CheeseDisplay.jpg',
    to: '/services/indian-occasions',
  },
  {
    icon: Plane,
    title: 'Destination Weddings',
    description: 'Weddings at exotic venues — full field kitchen, logistics and team, end to end.',
    image: '/images/Dinner-Buffet-In-Hyderabad.jpg',
    to: '/services/bulk-outdoor',
  },
]

/* ─── Menu categories (Saltt-inspired) ──────────────────────────────────────*/
const menuCategories = [
  {
    title: 'Vegetarian Feast',
    description: 'Rustic Indian thalis, paneer specialities, seasonal vegetables and farm-fresh preparations.',
    image: '/images/gty_grilled_vegetables_ll_130628_16x9_992.jpg',
  },
  {
    title: 'Non-Vegetarian',
    description: 'Tandoor kebabs, dum biryanis, slow-cooked curries and grilled specialities.',
    image: '/images/bbq-1.jpg',
  },
  {
    title: 'Live Counters & Chaat',
    description: 'Paani puri, dahi bhalla, dosa, pasta, sushi, mocktail bars — the theatre of food.',
    image: '/images/PaaniPoori.jpg',
  },
  {
    title: 'Sweets & Desserts',
    description: 'Jalebi with rabri, gulab jamun, kulfi, phirni and contemporary dessert stations.',
    image: '/images/5929BF5FB7926252_Punjabi-Di-Rasoi-ki-Jalebi-Naal-Rabri.jpg',
  },
]

/* ─── Stats and Why Choose Us ──────────────────────────────────────────────*/
const stats = [
  { value: '20+',   label: 'Years of Experience' },
  { value: '1000+', label: 'Events Catered' },
  { value: '50K+',  label: 'Happy Guests' },
  { value: '15+',   label: 'Cuisines Offered' },
]

const whyChooseUs = [
  { icon: UtensilsCrossed, title: 'Freshly Sourced Daily',  description: 'Every ingredient is locally sourced and delivered fresh to our 3,000 sq ft Gurgaon kitchen each morning. Nothing from the previous day reaches your plate.' },
  { icon: Star,            title: 'Customised Menus',       description: 'No two events are alike. Every menu is designed around your occasion, guest profile, dietary requirements and personal preferences.' },
  { icon: Users,           title: 'Experienced Team',       description: "Chef Gautam's 20+ years in India's finest hotels — The Oberoi, Radisson, Hyatt — flows through every dish his kitchen produces." },
  { icon: Clock,           title: 'Timely, Always',         description: 'Our 5-star Equinox Labs kitchen certification is matched by our operational discipline. Your event begins on time, every time.' },
]

/* ─── Gallery strip images ──────────────────────────────────────────────────*/
const homepageGallery = [
  { src: '/images/IMG20240219183751.jpg', alt: 'Event catering setup' },
  { src: '/images/IMG20240219183827.jpg', alt: 'Food spread at event' },
  { src: '/images/IMG20240315113303.jpg', alt: 'Catering at event' },
  { src: '/images/boufet.jpg',            alt: 'Grand buffet display' },
  { src: '/images/buffet-3.jpg',          alt: 'Buffet spread' },
  { src: '/images/IMG_9497.jpg',          alt: 'Live counter setup' },
]

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  /* Auto-advance carousel */
  useEffect(() => {
    if (isHovered) return
    const timer = setTimeout(
      () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length),
      5500
    )
    return () => clearTimeout(timer)
  }, [currentSlide, isHovered])

  const goToSlide = (idx) => setCurrentSlide((idx + carouselSlides.length) % carouselSlides.length)

  return (
    <>
      <Helmet>
        <title>The Catering Inc. | Premium Catering in Gurgaon | Chef Gautam Chaudhry</title>
        <meta name="description" content="The Catering Inc. by Chef Gautam Chaudhry — premium wedding, corporate and event catering in Gurgaon and across India. Two decades of culinary mastery." />
      </Helmet>

      {/* ── Section 1 — Hero Carousel ──────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 'calc(100vh - 80px)', minHeight: '560px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {carouselSlides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: idx === currentSlide ? 1 : 0, pointerEvents: idx === currentSlide ? 'auto' : 'none' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%)' }}
            />
          </div>
        ))}

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p
            className="text-xs font-bold uppercase mb-5"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414', letterSpacing: '0.35em' }}
          >
            By Chef Gautam Chaudhry
          </p>
          <h1
            className="text-white leading-none mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            The Catering Inc.
          </h1>

          <div style={{ minHeight: '2.5rem' }} className="mb-2">
            <p
              className="transition-all duration-700"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#F7D875',
              }}
            >
              "{carouselSlides[currentSlide].tagline}"
            </p>
          </div>

          <p
            className="text-white/50 text-xs font-bold uppercase mb-10"
            style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.25em' }}
          >
            {carouselSlides[currentSlide].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menus"
              className="inline-flex items-center justify-center px-9 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 min-h-[44px]"
              style={{ color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent' }}
            >
              Explore Our Menus
            </Link>
            <QuoteButton label="Get a Free Quote" variant="primary" className="min-h-[44px]" />
          </div>
        </div>

        {/* Prev / Next */}
        <button
          onClick={() => goToSlide(currentSlide - 1)}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300"
          style={{ width: 48, height: 48, border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(240,180,20,0.8)'; e.currentTarget.style.color = '#F0B414' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'white' }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => goToSlide(currentSlide + 1)}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300"
          style={{ width: 48, height: 48, border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(240,180,20,0.8)'; e.currentTarget.style.color = '#F0B414' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'white' }}
          aria-label="Next slide"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-3">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="transition-all duration-500"
              style={{
                height: 2,
                width: idx === currentSlide ? 40 : 10,
                background: idx === currentSlide ? '#F0B414' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Section 2 — Stats Bar ──────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(240,180,20,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#F0B414' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.45)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 — Brand Statement (with image) ────────────────────────*/}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Image side — 2 cols */}
            <div className="lg:col-span-2 relative overflow-hidden" style={{ height: '520px' }}>
              <img
                src="/images/CheeseDisplay.jpg"
                alt="Cheese display by The Catering Inc."
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2" style={{ borderColor: '#F0B414' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2" style={{ borderColor: '#F0B414' }} />
            </div>

            {/* Text side — 3 cols */}
            <div className="lg:col-span-3 lg:pl-10">
              <p className="text-taupe text-xs font-bold tracking-widest uppercase mb-5" style={{ fontFamily: 'var(--font-body)' }}>Our Story</p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight: 400,
                  lineHeight: 1.25,
                  fontStyle: 'italic',
                  color: '#1A1200',
                }}
              >
                "We don't just serve food. We craft moments that linger long after the last bite."
              </h2>
              <div className="mt-6 mb-6" style={{ width: 60, height: 1, background: '#F0B414' }} />
              <p
                className="text-walnut text-base leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Chef Gautam Chaudhry brings two decades of fine-hotel expertise — The Oberoi, Radisson, Hyatt —
                to your most cherished celebrations. Every event is personal. Every menu, one of a kind.
              </p>
              <p
                className="text-walnut text-base leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                From our 3,000 sq ft Gurgaon kitchen, we cater weddings, corporate events and intimate gatherings
                across Delhi NCR and beyond — with the discipline of a five-star operation and the warmth of a family table.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-xs font-bold tracking-widest uppercase border-2 transition-all duration-300"
                style={{ color: '#C8860A', borderColor: '#C8860A' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#C8860A'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8860A' }}
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4 — Services (with background images) ───────────────────*/}
      <section className="py-20 bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-taupe text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)' }}>Our Services</p>
            <h2 className="text-richblack" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.01em' }}>
              Catering for Every Occasion
            </h2>
            <div className="mt-5 mx-auto" style={{ width: 60, height: 1, background: '#F0B414' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {serviceCards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group relative overflow-hidden block"
                style={{ height: 440 }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)' }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <card.icon size={30} strokeWidth={1} className="text-gold mb-3 transition-transform duration-500 group-hover:-translate-y-1" />
                  <h3
                    className="text-white mb-2"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2 }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-4 transition-opacity duration-500">
                    {card.description}
                  </p>
                  <span
                    className="text-gold text-[11px] font-bold tracking-widest uppercase inline-flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Know More
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/60 transition-all duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 — Full-Bleed Gallery Strip ─────────────────────────────*/}
      <section className="overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="flex" style={{ height: 400 }}>
          {homepageGallery.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden flex-1 group"
              style={{ minWidth: 0 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              />
            </div>
          ))}
        </div>
        <div className="text-center py-8">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 border min-h-[44px]"
            style={{ color: '#F0B414', borderColor: 'rgba(240,180,20,0.4)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#F0B414'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#F0B414' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#F0B414'; e.currentTarget.style.borderColor = 'rgba(240,180,20,0.4)' }}
          >
            View Full Gallery
          </Link>
        </div>
      </section>

      {/* ── Section 6 — Menu Preview (Saltt-inspired) ────────────────────────*/}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-taupe text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)' }}>Our Menus</p>
            <h2 className="text-richblack" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600 }}>
              A Taste of What We Offer
            </h2>
            <div className="mt-5 mx-auto" style={{ width: 60, height: 1, background: '#F0B414' }} />
            <p className="mt-6 text-walnut text-base max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              From traditional Indian thalis to international live counters — every menu is custom-designed for your occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {menuCategories.map((cat) => (
              <Link
                key={cat.title}
                to="/menus"
                className="group relative overflow-hidden block"
                style={{ height: 520 }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)' }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-7 text-center">
                  <p className="text-gold text-[11px] font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                    Explore
                  </p>
                  <h3
                    className="text-white mb-3"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 500, lineHeight: 1.2 }}
                  >
                    {cat.title}
                  </h3>
                  <div className="mx-auto mb-4" style={{ width: 40, height: 1, background: '#F0B414' }} />
                  <p className="text-white/75 text-xs leading-relaxed mb-5" style={{ fontFamily: 'var(--font-body)' }}>
                    {cat.description}
                  </p>
                  <span
                    className="text-white text-[11px] font-bold tracking-widest uppercase inline-flex items-center justify-center gap-2 transition-all duration-300 group-hover:text-gold"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    View Menu
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/60 transition-all duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menus"
              className="inline-flex items-center justify-center px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 border-2 min-h-[52px]"
              style={{ background: '#F0B414', color: '#0A0A0A', borderColor: '#F0B414' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8860A'; e.currentTarget.style.borderColor = '#C8860A' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#F0B414'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#F0B414' }}
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 7 — Why Choose Us ────────────────────────────────────────*/}
      <section className="py-20 bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-taupe text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)' }}>Our Promise</p>
            <h2 className="text-richblack" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600 }}>
              Why Families Trust Us
            </h2>
            <div className="mt-5 mx-auto" style={{ width: 60, height: 1, background: '#F0B414' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex gap-6 p-8 bg-cream border border-stone-sand hover:shadow-[0_8px_40px_rgba(240,180,20,0.10)] transition-shadow duration-500">
                <div className="flex-shrink-0">
                  <item.icon size={32} strokeWidth={1} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-richblack text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>{item.title}</h3>
                  <p className="text-walnut text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8 — Testimonials ─────────────────────────────────────────*/}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-taupe text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)' }}>Client Stories</p>
            <h2 className="text-richblack" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600 }}>
              What Our Clients Say
            </h2>
            <div className="mt-5 mx-auto" style={{ width: 60, height: 1, background: '#F0B414' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-gold border-2 border-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-richblack transition-all duration-300 min-h-[44px]"
            >
              Read All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 9 — Instagram Feed ───────────────────────────────────────*/}
      <section className="py-20 bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)' }}>
              Follow Our Journey
            </p>
            <h2 className="text-richblack mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600 }}>
              @thecateringinc
            </h2>
            <div className="brand-divider" />
          </div>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <behold-widget feed-id="cr2uHzRdnfVOkqWJkmky" />
          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/thecateringinc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent text-gold border-2 border-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-richblack transition-all duration-300 min-h-[44px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 10 — CTA Banner ───────────────────────────────────────────*/}
      <section
        className="relative py-24 text-center px-4 overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url(/images/boufet-4.jpg)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(26,18,0,0.85) 50%, rgba(10,10,10,0.95) 100%)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase mb-6"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414', letterSpacing: '0.3em' }}
          >
            Ready to Begin?
          </p>
          <h2
            className="text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600 }}
          >
            Planning an Event?
          </h2>
          <p
            className="mb-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontStyle: 'italic', fontWeight: 400, color: '#F7D875' }}
          >
            Let's make it memorable.
          </p>
          <p
            className="text-base mb-10 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.55)' }}
          >
            Share your event details and receive a customised quote within 24 hours.
          </p>
          <QuoteButton label="Get a Free Quote Now" variant="primary" className="text-sm px-12 py-4 min-h-[52px]" />
        </div>
      </section>
    </>
  )
}
