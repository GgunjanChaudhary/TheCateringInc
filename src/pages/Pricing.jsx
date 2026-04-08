import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import QuoteButton from '../components/shared/QuoteButton'

const packages = [
  {
    name: 'Starter',
    tagline: 'For intimate gatherings',
    price: '₹800',
    priceNote: 'per plate onwards', // TODO: confirm actual pricing
    guestRange: '20 – 100 guests',
    inclusions: [
      'Curated vegetarian or non-veg menu',
      'Welcome drink station',
      '1 live chaat or snacks counter',
      'Main course — 4 dishes',
      'Bread & rice station',
      'Dessert — 2 items',
      'Serving staff in uniform',
      'Standard crockery & chafing dishes',
    ],
    cta: 'Book This Package',
    highlighted: false,
  },
  {
    name: 'Classic',
    tagline: 'Our most popular choice',
    price: '₹1,200',
    priceNote: 'per plate onwards', // TODO: confirm actual pricing
    guestRange: '100 – 500 guests',
    inclusions: [
      'Full vegetarian + non-veg menu',
      'Welcome drink & mocktail station',
      '2 live counters (kebab / chaat / sushi)',
      'Main course — 6 dishes',
      'Bread, rice & biryani station',
      'Dessert spread — 4 items',
      'Dedicated event manager',
      'Full service staff in uniform',
      'Upgraded crockery & copper chafing dishes',
      'Jain / vegan section available',
    ],
    cta: 'Book This Package',
    highlighted: true,
  },
  {
    name: 'Premium',
    tagline: 'Grand events, immaculate execution',
    price: '₹2,000',
    priceNote: 'per plate onwards', // TODO: confirm actual pricing
    guestRange: '500+ guests',
    inclusions: [
      'Fully customised multi-cuisine menu',
      'Signature welcome drink designed for your event',
      '3+ live counters (themed per event)',
      'Progressive cuisine menu options',
      'Main course — 8+ dishes',
      'Bread, rice, biryani & carving station',
      'Artisanal dessert table with macarons & mithai',
      'Senior event manager + dedicated team',
      'Premium crockery, floral centrepieces',
      'Pre-event tasting session',
      'Jain, vegan, allergen-labelled sections',
    ],
    cta: 'Book This Package',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Catering Packages & Pricing | The Catering Inc. Gurgaon</title>
        <meta name="description" content="Catering packages from The Catering Inc. — Starter from ₹800/plate, Classic from ₹1,200/plate, Premium from ₹2,000/plate. All packages customisable for your event." />
      </Helmet>

      {/* Hero */}
      <section className="py-20 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Investment</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Packages & Pricing
          </h1>
          <p className="mt-6 text-stone-sand text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Every package is a starting point — fully customisable to your occasion, guest count, and preferences.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-col border transition-shadow duration-500 hover:shadow-[0_8px_40px_rgba(240,180,20,0.15)]"
                style={{
                  borderColor: pkg.highlighted ? '#F0B414' : '#D4C5A9',
                  backgroundColor: pkg.highlighted ? '#FDF8EE' : '#FFFDF7',
                  position: 'relative',
                }}
              >
                {pkg.highlighted && (
                  <div className="text-center py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: '#F0B414', color: '#1A1200', fontFamily: 'var(--font-body)' }}>
                    Most Popular
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-body)', color: '#B5621E' }}>{pkg.tagline}</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 600, color: '#1A1200', marginBottom: '0.5rem' }}>{pkg.name}</h2>
                  <div className="mb-2">
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#1A1200' }}>{pkg.price}</span>
                    <span className="text-sm ml-2" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>{pkg.priceNote}</span>
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-6 pb-6 border-b" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45', borderColor: '#D4C5A9' }}>{pkg.guestRange}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
                        <Check size={14} strokeWidth={2} style={{ color: '#F0B414', flexShrink: 0, marginTop: 2 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/get-quote"
                    className="block text-center py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 min-h-[44px]"
                    style={{
                      fontFamily: 'var(--font-body)',
                      backgroundColor: pkg.highlighted ? '#F0B414' : 'transparent',
                      color: pkg.highlighted ? '#1A1200' : '#F0B414',
                      border: `2px solid #F0B414`,
                    }}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="text-center p-8 bg-cream border border-stone-sand">
            <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
              All packages are fully customisable — menu items, live counters, staff levels, and crockery can all be adjusted to suit your event and budget.<br />
              <span className="font-bold" style={{ color: '#1A1200' }}>Contact us for a tailored quote.</span>
            </p>
            <p className="text-xs mt-2" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>
              {/* TODO: confirm actual pricing before going live */}
              * All prices are indicative and subject to final menu confirmation, guest count, and location.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #1A1200 0%, #3D2E1A 100%)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#FDF8EE', marginBottom: '1rem' }}>
            Need something bespoke?
          </h2>
          <p className="mb-8 text-base" style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}>
            Every event is unique. Tell us what you have in mind and we will build the perfect package around it.
          </p>
          <QuoteButton label="Request a Custom Quote" variant="primary" />
        </div>
      </section>
    </>
  )
}
