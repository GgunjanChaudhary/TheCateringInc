import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { menus, menuCategories } from '../data/menus'
import DishCard from '../components/shared/DishCard'
import QuoteButton from '../components/shared/QuoteButton'

export default function Menus() {
  const [activeTab, setActiveTab] = useState(menuCategories[0])

  return (
    <>
      <Helmet>
        <title>Catering Menus | Vegetarian, Non-Veg, Jain | The Catering Inc. Gurgaon</title>
        <meta name="description" content="Explore The Catering Inc.'s curated catering menus — vegetarian, non-vegetarian, Jain, vegan and beverages. Freshly prepared for every occasion in Gurgaon." />
      </Helmet>

      {/* Hero */}
      <section className="py-20 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>What We Serve</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Our Menus
          </h1>
          <p className="mt-6 text-stone-sand text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Freshly sourced. Lovingly prepared. Every dish a reflection of Chef Gautam's two decades in India's finest kitchens.
          </p>
        </div>
      </section>

      {/* Sticky Tab Nav */}
      <div className="sticky top-20 z-30 bg-cream-light border-b border-stone-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 no-scrollbar">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className="flex-shrink-0 px-6 py-4 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-200 min-h-[44px] whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: activeTab === cat ? '#F0B414' : '#6B5A45',
                  borderBottomColor: activeTab === cat ? '#F0B414' : 'transparent',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <section className="py-16 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(menus[activeTab]).map(([category, dishes]) => (
            <div key={category} className="mb-14">
              {/* Category heading with divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px" style={{ backgroundColor: '#D4C5A9' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: '#1A1200', whiteSpace: 'nowrap' }}>
                  {category}
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: '#D4C5A9' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dishes.map((dish) => (
                  <DishCard key={dish.id} name={dish.name} description={dish.description} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download + CTA */}
      <section className="py-16 bg-section">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1200', marginBottom: '1rem' }}>
            Want a custom menu for your event?
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
            Every menu we present is a starting point. Share your event details and Chef Gautam's team will design a menu built around your occasion, guests and preferences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 text-xs font-bold tracking-widest uppercase border-2 min-h-[44px] transition-all duration-300"
              style={{ fontFamily: 'var(--font-body)', borderColor: '#D4C5A9', color: '#3D2E1A' }}
            >
              {/* TODO: link to real downloadable menu PDF */}
              Download Menu PDF
            </a>
            <QuoteButton label="Get a Custom Menu" variant="primary" />
          </div>
        </div>
      </section>
    </>
  )
}
