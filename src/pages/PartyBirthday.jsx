import { Helmet } from 'react-helmet-async'
import { Check, Star, PartyPopper, Phone } from 'lucide-react'
import { useState } from 'react'

const packages = [
  {
    name: 'The Celebration Starter',
    tagline: 'Perfect for intimate gatherings',
    guestRange: '20 – 60 Guests',
    priceHint: 'Starting from ₹650 per plate',
    color: '#D4C5A9',
    inclusions: [
      'Welcome mocktail station',
      'Choice of 4 starters (veg + non-veg)',
      'Main course — 2 vegetarian, 1 non-veg, rice, 2 breads',
      'Live chaat counter',
      'Dessert selection — 2 items',
      'Service staff included',
      'Basic crockery and serving equipment',
    ],
  },
  {
    name: 'The Grand Soirée',
    tagline: 'The crowd-pleaser for any party',
    guestRange: '60 – 200 Guests',
    priceHint: 'Starting from ₹950 per plate',
    color: '#F0B414',
    featured: true,
    inclusions: [
      'Signature welcome drink counter',
      'Choice of 6 starters with live grill station',
      'Main course — 4 vegetarian, 2 non-veg, biryani, 3 breads',
      'Live chaat + pani puri counter',
      'Dessert table — 4 items + fresh gulab jamun',
      'Uniformed service staff',
      'Styled crockery and chafing dishes',
      'Customised menu cards',
    ],
  },
  {
    name: 'The Marquee Experience',
    tagline: 'Unforgettable milestone celebrations',
    guestRange: '200 – 500 Guests',
    priceHint: 'Starting from ₹1,400 per plate',
    color: '#B5621E',
    inclusions: [
      'Premium welcome cocktail / mocktail bar',
      'Choice of 8 starters — multiple live counters',
      'Full main course spread — 6 veg, 3 non-veg, 2 biryanis, 4 breads',
      'Live pasta + chaat + carving station',
      'Dessert extravaganza — 6 items + live kulfi counter',
      'Senior service staff and event coordinator on-site',
      'Premium crockery, linen and ambiance setup',
      'Pre-event tasting session included',
      'Post-event cleanup',
    ],
  },
]

const foodImages = [
  {
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
    // TODO: replace with real party food photo
    alt: 'Colourful birthday spread',
  },
  {
    src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
    // TODO: replace with real birthday cake photo
    alt: 'Celebration dessert table',
  },
  {
    src: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80',
    // TODO: replace with real catering setup photo
    alt: 'Live food counter setup',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    // TODO: replace with real party buffet photo
    alt: 'Elegant party buffet',
  },
  {
    src: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?w=800&q=80',
    // TODO: replace with real food photography
    alt: 'Gourmet starters platter',
  },
  {
    src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    // TODO: replace with real dessert photo
    alt: 'Artisanal desserts',
  },
]

const occasions = [
  { label: 'Milestone Birthdays', detail: '18th, 21st, 30th, 40th, 50th, 60th & beyond' },
  { label: 'Anniversary Dinners', detail: 'Intimate or grand — silver, ruby, golden' },
  { label: 'Kitty Parties', detail: 'Themed lunches and brunches for 15–80 guests' },
  { label: 'Baby Showers', detail: 'Elegant afternoon setups with curated menus' },
  { label: 'Farewell Gatherings', detail: 'Office or personal — heartfelt sendoffs' },
  { label: 'House Parties', detail: 'Casual evenings where the food steals the show' },
]

export default function PartyBirthday() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: '',
    eventDate: '',
    guests: '',
    venue: '',
    packageInterest: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // TODO: connect to EmailJS or Formspree for actual email delivery
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Party/Birthday enquiry submitted:', formData)
  }

  return (
    <>
      <Helmet>
        <title>Birthday & Party Catering in Gurgaon | The Catering Inc.</title>
        <meta
          name="description"
          content="Birthday party catering, anniversary dinners and kitty party catering in Gurgaon by Chef Gautam Chaudhry. 3 celebration packages. Fun, fresh, flavourful. Call +91 9560459999."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(140deg, #1A1200 0%, #3D2E1A 50%, #1A1200 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 60% 30%, #F0B414 0%, transparent 50%), radial-gradient(circle at 30% 70%, #C8860A 0%, transparent 55%)',
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-5">
            <PartyPopper size={40} color="#F0B414" />
          </div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
          >
            The Catering Inc. — Celebrations
          </p>
          <h1
            className="mb-6 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 600,
              color: '#FDF8EE',
              letterSpacing: '-0.02em',
            }}
          >
            Every Milestone Deserves a Menu to Match
          </h1>
          <p
            className="mb-4 italic"
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: '#F0B414',
            }}
          >
            "Because the best celebrations are ones where the food is remembered too."
          </p>
          <p
            className="mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9', fontSize: '1.05rem' }}
          >
            Birthdays, anniversaries, kitty parties and social gatherings — curated menus, live
            counters and joyful service for 20 to 500 guests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919560459999"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', background: '#F0B414', color: '#1A1200' }}
            >
              <Phone size={16} />
              Call to Plan Your Party
            </a>
            <a
              href="#party-quote"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase border transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', borderColor: '#F0B414', color: '#F0B414' }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Occasions We Cover */}
      <section className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Every Occasion
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              What Are You Celebrating?
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {occasions.map((occ) => (
              <div
                key={occ.label}
                className="p-5 border text-center"
                style={{ borderColor: '#D4C5A9', background: '#FFFDF7' }}
              >
                <div className="w-6 h-0.5 mx-auto mb-3" style={{ background: '#F0B414' }} />
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ fontFamily: 'var(--font-body)', color: '#1A1200' }}
                >
                  {occ.label}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  {occ.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4" style={{ background: '#1A1200' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
            >
              Choose Your Experience
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#FDF8EE',
              }}
            >
              Celebration Packages
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-sm"
              style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}
            >
              All packages are fully customisable. These form a starting point — your event will be
              designed around you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-col border"
                style={{
                  borderColor: pkg.featured ? '#F0B414' : '#3D2E1A',
                  background: '#3D2E1A',
                  position: 'relative',
                }}
              >
                {pkg.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold tracking-widest uppercase"
                    style={{ background: '#F0B414', color: '#1A1200', fontFamily: 'var(--font-body)' }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="p-7 flex-1">
                  <div
                    className="w-8 h-1 mb-4"
                    style={{ background: pkg.color }}
                  />
                  <h3
                    className="text-xl mb-1"
                    style={{ fontFamily: 'var(--font-display)', color: '#FDF8EE', fontWeight: 600 }}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className="text-xs mb-1"
                    style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}
                  >
                    {pkg.tagline}
                  </p>
                  <p
                    className="text-xs font-bold mb-1"
                    style={{ fontFamily: 'var(--font-body)', color: pkg.color }}
                  >
                    {pkg.guestRange}
                  </p>
                  <p
                    className="text-xs mb-6"
                    style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                  >
                    {pkg.priceHint}
                  </p>
                  <ul className="space-y-3">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check size={14} color={pkg.color} className="mt-0.5 flex-shrink-0" />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 pt-0">
                  <a
                    href="#party-quote"
                    className="block text-center w-full py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 min-h-[44px] flex items-center justify-center"
                    style={{
                      fontFamily: 'var(--font-body)',
                      background: pkg.featured ? '#F0B414' : 'transparent',
                      color: pkg.featured ? '#1A1200' : '#F0B414',
                      border: pkg.featured ? 'none' : '1px solid #F0B414',
                    }}
                  >
                    Choose This Package
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p
            className="mt-8 text-center text-xs"
            style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
          >
            All prices are indicative. Final pricing based on guest count, venue and menu selections.
          </p>
        </div>
      </section>

      {/* Food Photography Section */}
      <section className="py-20 px-4" style={{ background: '#FFFDF7' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              A Feast for the Eyes
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              The Food We Bring to Your Party
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {foodImages.map((img, i) => (
              <div key={i} className="overflow-hidden group" style={{ aspectRatio: '4/3' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* TODO: replace with real food photography */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="party-quote" className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Let's Celebrate
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Request a Party Quote
            </h2>
          </div>

          {/* TODO: connect to EmailJS or Formspree for actual email delivery */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Occasion Type
                </label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="">Select occasion</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="anniversary">Anniversary Dinner</option>
                  <option value="kitty">Kitty Party</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="farewell">Farewell Party</option>
                  <option value="house-party">House Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="Approx. guest count"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Package Interest
                </label>
                <select
                  name="packageInterest"
                  value={formData.packageInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="">Select a package</option>
                  <option value="starter">The Celebration Starter</option>
                  <option value="soiree">The Grand Soirée</option>
                  <option value="marquee">The Marquee Experience</option>
                  <option value="custom">Custom / Not Sure Yet</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue name or city"
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                style={{
                  background: '#FFFDF7',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Tell Us More
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Theme, dietary needs, favourite dishes, anything else..."
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200 resize-none"
                style={{
                  background: '#FFFDF7',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', background: '#F0B414', color: '#1A1200' }}
            >
              Send My Party Enquiry
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
