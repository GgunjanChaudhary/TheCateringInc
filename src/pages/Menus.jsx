import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import heroImages from '../data/heroImages'
import { Download, ChevronLeft, ChevronRight } from 'lucide-react'
import menuSections from '../data/menuSections'
import QuoteButton from '../components/shared/QuoteButton'

const BASE = import.meta.env.BASE_URL
const menuHeroSlides = (heroImages.menus || []).map((img) => ({ image: img }))

export default function Menus() {
  const [activeId, setActiveId] = useState(menuSections[0].id)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance hero carousel
  useEffect(() => {
    if (!menuHeroSlides.length) return
    const timer = setTimeout(
      () => setCurrentSlide((prev) => (prev + 1) % menuHeroSlides.length),
      5500
    )
    return () => clearTimeout(timer)
  }, [currentSlide])

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight * 0.35
      let current = menuSections[0].id
      for (const section of menuSections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top - offset < 0) {
          current = section.id
        }
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      // 80px navbar + 60px sticky tab strip
      const top = el.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Catering Menus | The Catering Inc. Gurgaon</title>
        <meta
          name="description"
          content="Explore The Catering Inc.'s curated catering menus — pass-around appetizers, live counters, chaat, salads, global cuisine, mains, breads, desserts and beverages — for every occasion in Gurgaon."
        />
      </Helmet>

      {/* ── Hero Carousel ────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 'min(75vh, 620px)', minHeight: '420px' }}
      >
        {menuHeroSlides.map((slide, idx) => (
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

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p
            className="text-xs font-bold uppercase mb-5"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414', letterSpacing: '0.35em' }}
          >
            What We Serve
          </p>
          <h1
            className="text-white leading-none mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            Our Curated Menus
          </h1>
          <div className="mx-auto mb-5" style={{ width: 60, height: 1, background: '#F0B414' }} />
          <p
            className="mx-auto max-w-2xl mb-10"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.05rem, 2.2vw, 1.45rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#F7D875',
              lineHeight: 1.5,
            }}
          >
            "Freshly sourced. Lovingly prepared. Every dish a reflection of Chef Gautam's two decades in India's finest kitchens."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-bold tracking-widest uppercase border min-h-[44px] transition-all duration-300"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Download size={14} strokeWidth={1.5} />
              Download Menu PDF
            </a>
            <QuoteButton label="Get a Custom Menu" variant="primary" className="min-h-[44px]" />
          </div>
        </div>

        {/* Prev / Next */}
        <button
          onClick={() => setCurrentSlide((currentSlide - 1 + menuHeroSlides.length) % menuHeroSlides.length)}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300"
          style={{ width: 48, height: 48, border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(240,180,20,0.8)'; e.currentTarget.style.color = '#F0B414' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'white' }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % menuHeroSlides.length)}
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
          {menuHeroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
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

      {/* ── Sticky Section Nav ────────────────────────────────────────────── */}
      <div
        className="sticky z-30 border-b"
        style={{
          top: 80,
          background: 'rgba(255,253,247,0.96)',
          borderColor: '#EDE8DF',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 no-scrollbar">
            {menuSections.map((section) => {
              const isActive = activeId === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex-shrink-0 px-5 py-4 text-[11px] font-bold tracking-widest uppercase border-b-2 transition-all duration-200 min-h-[44px] whitespace-nowrap inline-flex items-center gap-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: isActive ? '#F0B414' : '#6B5A45',
                    borderBottomColor: isActive ? '#F0B414' : 'transparent',
                  }}
                >
                  <span style={{ fontSize: 14 }}>{section.icon}</span>
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Menu Sections ─────────────────────────────────────────────────── */}
      {menuSections.map((section, idx) => {
        const isAlt = idx % 2 === 1
        const imageRight = idx % 2 === 0
        return (
          <section
            key={section.id}
            id={section.id}
            className="py-20 sm:py-24"
            style={{ background: isAlt ? '#FDF8EE' : '#FFFDF7', scrollMarginTop: 140 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header — image + intro */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
                {/* Image */}
                <div
                  className={`lg:col-span-5 relative overflow-hidden ${
                    imageRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  style={{ height: 420 }}
                >
                  <img
                    src={section.image}
                    alt={section.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.35) 100%)' }}
                  />
                  {/* Gold corner accents */}
                  <div
                    className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2"
                    style={{ borderColor: '#F0B414' }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2"
                    style={{ borderColor: '#F0B414' }}
                  />
                  {/* Floating section number */}
                  <div
                    className="absolute top-5 right-5 px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                    style={{
                      fontFamily: 'var(--font-body)',
                      background: 'rgba(10,10,10,0.65)',
                      color: '#F0B414',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')} / {String(menuSections.length).padStart(2, '0')}
                  </div>
                </div>

                {/* Intro */}
                <div className={`lg:col-span-7 ${imageRight ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span style={{ fontSize: 32 }}>{section.icon}</span>
                    <p
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-body)', color: '#C8860A' }}
                    >
                      Section {String(idx + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <h2
                    className="mb-5"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                      fontWeight: 600,
                      lineHeight: 1.1,
                      color: '#1A1200',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {section.title}
                  </h2>
                  <div className="mb-6" style={{ width: 60, height: 1, background: '#F0B414' }} />
                  <p
                    className="leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                      color: '#3D2E1A',
                      fontWeight: 400,
                    }}
                  >
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Segments grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {section.segments.map((segment, sIdx) => (
                  <div
                    key={segment}
                    className="group relative bg-cream-light border border-stone-mist transition-all duration-300 cursor-default"
                    style={{
                      padding: '1.75rem 1.5rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#F0B414'
                      e.currentTarget.style.background = '#FDF8EE'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(240,180,20,0.10)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#EDE8DF'
                      e.currentTarget.style.background = '#FFFDF7'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Gold corner accent (top-left) */}
                    <div
                      className="absolute top-0 left-0 w-6 h-6 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderColor: '#F0B414' }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-6 h-6 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderColor: '#F0B414' }}
                    />

                    <p
                      className="text-[10px] font-bold tracking-widest uppercase mb-3"
                      style={{ fontFamily: 'var(--font-body)', color: '#C8860A' }}
                    >
                      {String(sIdx + 1).padStart(2, '0')}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: '#1A1200',
                      }}
                    >
                      {segment}
                    </h3>
                    <div
                      className="mt-4"
                      style={{ width: 32, height: 1, background: '#D4C5A9' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        className="relative py-24 text-center px-4 overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${BASE}images/boufet-4.jpg)` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(26,18,0,0.85) 50%, rgba(10,10,10,0.95) 100%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase mb-6"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414', letterSpacing: '0.3em' }}
          >
            Crafted For You
          </p>
          <h2
            className="text-white leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 600,
            }}
          >
            Want a Custom Menu for Your Event?
          </h2>
          <p
            className="mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#F7D875',
            }}
          >
            Every menu we present is a starting point.
          </p>
          <p
            className="text-base mb-10 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.55)' }}
          >
            Share your event details and Chef Gautam's team will design a menu built around your occasion, guests and preferences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-bold tracking-widest uppercase border min-h-[44px] transition-all duration-300"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Download size={14} strokeWidth={1.5} />
              Download Menu PDF
            </a>
            <QuoteButton label="Get a Free Quote" variant="primary" className="text-sm px-10 py-4 min-h-[52px]" />
          </div>
        </div>
      </section>
    </>
  )
}
