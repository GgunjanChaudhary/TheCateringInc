import { Helmet } from 'react-helmet-async'
import { Award, ChefHat, Users, Star } from 'lucide-react'
import QuoteButton from '../components/shared/QuoteButton'

const stats = [
  { value: '20+', label: 'Years of Experience' },
  { value: '1000+', label: 'Events Catered' },
  { value: '50K+', label: 'Guests Served' },
  { value: '15+', label: 'Cuisines Offered' },
]

const credentials = [
  'The Great KebabFactory — Radisson, New Delhi',
  'Three Sixty Degree — The Oberoi New Delhi',
  'The Pink Poppadam — Hyatt Bangalore (award-winning)',
  'Tanzore — Beverly Hills, USA (Michelin recognized)',
  'Gourmet Aura — luxury catering brand (ET Most Promising Entrepreneur)',
  'Top 10 Chefs of India — Hotelier India',
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About The Catering Inc. | Chef Gautam Chaudhry | Gurgaon</title>
        <meta name="description" content="The story behind The Catering Inc. — Chef Gautam Chaudhry's 20+ years of culinary mastery from The Oberoi and Hyatt to your celebration. Premium catering in Gurgaon." />
      </Helmet>

      {/* Hero */}
      <section className="py-24 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Our Story</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Two Decades of Mastery.<br />One Extraordinary Table.
          </h1>
          <p className="mt-6 text-stone-sand text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            The Catering Inc. is the high-end food boutique service from the House of Demiurgic Hospitality — where a chef's lifetime of craft becomes your most memorable meal.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>The Founder</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1200', marginBottom: '1.5rem' }}>
              Chef Gautam Chaudhry
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
              Chef Gautam Chaudhry is a 'chefentrepreneur' with over 20 years of experience working in managerial and entrepreneurial roles across India and internationally. His career has taken him from the most prestigious hotel kitchens in India to Beverly Hills — always in pursuit of the extraordinary.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
              His work at Tanzore in Beverly Hills earned Michelin recognition. He was named one of India's Top 10 Chefs by Hotelier India. His previous catering venture, Gourmet Aura, earned him the Most Promising Entrepreneur of the Year award from The Economic Times — before he made a conscious exit to build something even more personal.
            </p>
            <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
              The Catering Inc. is Chef Gautam's most personal expression of that lifetime of craft. Every event he takes on carries the weight of two decades in India's finest kitchens — and the warmth of someone who genuinely believes that cooking is love made visible.
            </p>
          </div>
          <div>
            {/* TODO: replace with real photo of Chef Gautam */}
            <div className="aspect-[3/4] bg-stone-mist flex items-center justify-center border border-stone-sand">
              <div className="text-center p-8">
                <ChefHat size={48} strokeWidth={1} style={{ color: '#F0B414', margin: '0 auto 1rem' }} />
                <p className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>
                  {/* TODO: add real photo of Chef Gautam here */}
                  Chef Gautam Chaudhry<br />Founder & MD
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>A Career Built on Excellence</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1200' }}>
              From India's Finest Kitchens
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {credentials.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-5 bg-cream border border-stone-sand">
                <Award size={16} strokeWidth={1} style={{ color: '#F0B414', flexShrink: 0, marginTop: 2 }} />
                <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>What We Believe</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1200', marginBottom: '2rem' }}>
            Our Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Atithi Devo Bhavah', desc: 'The guest is God. We pride ourselves on customer service — meticulously planning every event and attending to the smallest details, because we believe little things make big things happen.' },
              { title: 'Let Food Do the Talking', desc: 'Our food sets the tone and takes centre stage at every event. The freshest locally sourced ingredients, transformed by our chefs\' wizardry and finesse — because cooking is love made visible.' },
              { title: 'Every Occasion Honoured', desc: 'We cater to all cultures, all religions, all tastes — with equal grace, equal precision, and equal pride. From Jain-friendly spreads to multicourse Continental dinners, the kitchen adapts.' },
            ].map((item) => (
              <div key={item.title} className="p-8 bg-cream border border-stone-sand">
                <div className="flex items-center justify-center mb-4">
                  <span style={{ color: '#F0B414', fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>✦</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: '#1A1200', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen */}
      <section className="py-20 bg-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            {/* TODO: replace with real photo of the kitchen */}
            <div className="aspect-video bg-stone-mist flex items-center justify-center border border-stone-sand">
              <p className="text-xs font-bold tracking-widest uppercase text-center px-4" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>
                {/* TODO: add real kitchen photo */}
                Base Kitchen — Gurgaon
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Our Kitchen</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, color: '#1A1200', marginBottom: '1.5rem' }}>
              The Most Hygienic Kitchen in Gurgaon
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
              Our 3,000 sq ft base kitchen in the heart of Gurgaon is rated 5-stars by Equinox Labs — audited across over 140 stringent hygiene and safety parameters. Sparkingly sanitised, state-of-the-art, and maintained to the highest food safety standards.
            </p>
            <ul className="space-y-3">
              {['5-Star Equinox Labs Certified', '140+ hygiene parameters audited', '3,000 sq ft — heart of Gurgaon', 'Daily deep sanitation protocol', 'Cold chain logistics for outdoor events', 'FSSAI compliant'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
                  <Star size={14} strokeWidth={1} style={{ color: '#F0B414', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ backgroundColor: '#F0B414' }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#1A1200' }}>{s.value}</p>
              <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-page">
        <div className="max-w-xl mx-auto px-4">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1200', marginBottom: '1rem' }}>
            Ready to work with Chef Gautam?
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
            Tell us about your event and receive a personalised proposal within 24 hours.
          </p>
          <QuoteButton label="Get a Free Quote" variant="secondary" />
        </div>
      </section>
    </>
  )
}
