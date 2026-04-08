import { Helmet } from 'react-helmet-async'
import { Sparkles, Phone } from 'lucide-react'
import { useState } from 'react'

const occasions = [
  {
    name: 'Mehendi Ceremony',
    emoji: '🌿',
    typicalGuests: '30 – 150 guests',
    menuStyle: 'Light, colourful and festive',
    description:
      'The mehendi is often the first big gathering of the wedding festivities — an afternoon of colour, music and flavour. Menus are typically light, vegetarian-friendly and vibrant to match the mood.',
    suggestions: [
      'Fresh chaats and street food counters — pani puri, dahi vada, bhel',
      'Colourful finger foods and small bites',
      'Flavoured lemonades, rose sharbat, aam panna',
      'Light Indian sweets — mithais and barfis',
      'Fruit chaat and fresh seasonal desserts',
    ],
    considerations: [
      'Mehendi afternoons often run 4–6 hours — replenishment planning is key',
      'Standing/strolling service preferred over formal buffet',
      'Vegetarian-only menus are common and recommended',
    ],
    color: '#F0B414',
  },
  {
    name: 'Sangeet Night',
    emoji: '🎶',
    typicalGuests: '80 – 400 guests',
    menuStyle: 'Festive, abundant, celebratory',
    description:
      'The sangeet is a night of music, dance and culinary celebration. Guests arrive hungry and energetic — the menu must be bold, plentiful and full of theatre.',
    suggestions: [
      'Live grill and kebab stations — murgh malai, seekh, tandoori',
      'Chaat counter with full street food selection',
      'Full dinner buffet with North Indian and continental options',
      'Cocktail / mocktail counter with signature drinks',
      'Dessert table with gulab jamun, phirni, kulfi falooda',
    ],
    considerations: [
      'Late-night snacks are appreciated as the event extends past midnight',
      'Live counters add energy and entertainment value',
      'Non-vegetarian options are typically high demand',
    ],
    color: '#B5621E',
  },
  {
    name: 'Engagement Ceremony',
    emoji: '💍',
    typicalGuests: '50 – 250 guests',
    menuStyle: 'Elegant, refined, celebratory',
    description:
      'An engagement calls for a menu that feels special without overwhelming. Elegant appetisers, a well-curated buffet or sit-down service, and a beautiful dessert table.',
    suggestions: [
      'Sophisticated starters — dahi ke kebab, Parsi patties, paneer shots',
      'A refined main course — both vegetarian and non-vegetarian',
      'Premium breads — laccha paratha, garlic naan, roomali roti',
      'Dessert corner — customised sweets, branded dessert presentation',
      'Champagne or mock-champagne toast service',
    ],
    considerations: [
      'Photography-friendly presentation is important for engagement events',
      'Allergen information should be communicated clearly to guests',
      'Coordinating with the event florist for food table styling',
    ],
    color: '#F0B414',
  },
  {
    name: 'Pooja & Havan',
    emoji: '🪔',
    typicalGuests: '20 – 150 guests',
    menuStyle: 'Sattvic — pure, simple, nourishing',
    description:
      'Poojas and havans call for sattvic food — prepared without onion or garlic, and reflecting the sanctity of the occasion. Our team is experienced in preparing fully sattvic spreads with great care.',
    suggestions: [
      'Sattvic dal — arhar dal without onion or garlic, tempered with ghee',
      'Sabudana khichdi, aloo subzi, paneer palak (sattvic preparation)',
      'Poori, halwa and chana — the classic prasad combination',
      'Kheer, panjiri and malpua as traditional sweet offerings',
      'Fresh fruit platter and dry fruit presentation',
    ],
    considerations: [
      'All preparations are strictly without onion, garlic and non-vegetarian items',
      'Sourcing verified pure ghee and certified organic ingredients available on request',
      'Coordination with pandit for timing of prasad distribution',
      'We follow traditional preparation guidelines with full respect for the ceremony',
    ],
    color: '#C8860A',
  },
  {
    name: 'Griha Pravesh',
    emoji: '🏡',
    typicalGuests: '30 – 200 guests',
    menuStyle: 'Auspicious, traditional, warm',
    description:
      'A Griha Pravesh is a sacred homecoming. The food served on this day carries significance — it must be auspicious, generous and reflective of the new beginning the family is celebrating.',
    suggestions: [
      'Sattvic or light vegetarian starters for the morning puja',
      'Full lunch spread — dal, subzis, rice, puri and roti',
      "Regional specialties that reflect the family's roots",
      'Traditional Indian sweets — ladoos, barfi, gulab jamun',
      'Nimbu paani, rose sharbat and warm chai service',
    ],
    considerations: [
      'Morning puja food and afternoon lunch are often separate courses',
      'Coordination required with construction/interior team if the venue is new',
      'Eco-friendly disposable service available if permanent crockery is not yet set up',
    ],
    color: '#F0B414',
  },
]

export default function IndianOccasions() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasionType: '',
    eventDate: '',
    guests: '',
    venue: '',
    dietaryNeed: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // TODO: connect to EmailJS or Formspree for actual email delivery
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Indian occasions enquiry submitted:', formData)
  }

  return (
    <>
      <Helmet>
        <title>Indian Occasions Catering — Mehendi, Pooja, Sangeet | The Catering Inc.</title>
        <meta
          name="description"
          content="Catering for Mehendi, Sangeet, Engagement, Pooja, Havan and Griha Pravesh in Gurgaon. Sattvic menus, traditional recipes, experienced team. Chef Gautam Chaudhry — +91 9560459999."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(150deg, #1A1200 0%, #3D2E1A 45%, #1A1200 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 35% 55%, #C8860A 0%, transparent 55%), radial-gradient(circle at 70% 30%, #F0B414 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-5">
            <Sparkles size={40} color="#F0B414" />
          </div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
          >
            The Catering Inc. — Indian Occasions
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
            Atithi Devo Bhavah — Every Ceremony, Honoured
          </h1>
          <p
            className="mb-4 italic"
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: '#F0B414',
            }}
          >
            "Every ceremony has its own food language. We speak all of them."
          </p>
          <p
            className="mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9', fontSize: '1.05rem' }}
          >
            From sattvic pooja spreads to energetic sangeet buffets, Chef Gautam and his team
            understand the cultural significance behind every dish served at an Indian ceremony.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919560459999"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', background: '#F0B414', color: '#1A1200' }}
            >
              <Phone size={16} />
              Discuss Your Ceremony
            </a>
            <a
              href="#occasions-quote"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase border transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', borderColor: '#F0B414', color: '#F0B414' }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Occasions Detail */}
      <section className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Ceremonies We Cater
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Occasions We've Mastered
            </h2>
          </div>
          <div className="space-y-12">
            {occasions.map((occ, index) => (
              <div
                key={occ.name}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 border"
                style={{
                  borderColor: '#D4C5A9',
                  background: index % 2 === 0 ? '#FFFDF7' : '#FDF8EE',
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl" role="img" aria-label={occ.name}>{occ.emoji}</span>
                    <div>
                      <h3
                        className="text-2xl"
                        style={{ fontFamily: 'var(--font-display)', color: '#1A1200', fontWeight: 600 }}
                      >
                        {occ.name}
                      </h3>
                      <p
                        className="text-xs font-bold tracking-wide"
                        style={{ fontFamily: 'var(--font-body)', color: occ.color }}
                      >
                        Typical: {occ.typicalGuests} · {occ.menuStyle}
                      </p>
                    </div>
                  </div>
                  <p
                    className="leading-relaxed mb-5 text-sm"
                    style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                  >
                    {occ.description}
                  </p>
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-3"
                      style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                    >
                      Special Considerations
                    </p>
                    <ul className="space-y-2">
                      {occ.considerations.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 text-sm"
                          style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                        >
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: occ.color }}
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                  >
                    Suggested Menu Items
                  </p>
                  <ul className="space-y-3">
                    {occ.suggestions.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 p-3 border-l-2"
                        style={{ borderColor: occ.color, background: '#FFFDF7' }}
                      >
                        <span
                          className="text-sm leading-relaxed"
                          style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}
                        >
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="occasions-quote" className="py-20 px-4" style={{ background: '#1A1200' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
            >
              Plan Your Ceremony
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#FDF8EE',
              }}
            >
              Request an Occasions Quote
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
                    background: '#FDF8EE',
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
                    background: '#FDF8EE',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                style={{
                  background: '#FDF8EE',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              />
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
                  name="occasionType"
                  value={formData.occasionType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FDF8EE',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="">Select occasion</option>
                  <option value="mehendi">Mehendi Ceremony</option>
                  <option value="sangeet">Sangeet Night</option>
                  <option value="engagement">Engagement Ceremony</option>
                  <option value="pooja">Pooja / Havan</option>
                  <option value="griha-pravesh">Griha Pravesh</option>
                  <option value="other">Other Indian Ceremony</option>
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
                    background: '#FDF8EE',
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
                    background: '#FDF8EE',
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
                  Venue / City
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Venue name or city"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FDF8EE',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Dietary Requirements
              </label>
              <select
                name="dietaryNeed"
                value={formData.dietaryNeed}
                onChange={handleChange}
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                style={{
                  background: '#FDF8EE',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="">Select dietary requirement</option>
                <option value="sattvic">Sattvic (no onion, no garlic)</option>
                <option value="jain">Jain-Compliant</option>
                <option value="vegetarian">Vegetarian Only</option>
                <option value="veg-nonveg">Vegetarian + Non-Vegetarian</option>
                <option value="other">Other — I'll explain below</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Additional Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Regional cuisine preferences, religious requirements, special dishes..."
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200 resize-none"
                style={{
                  background: '#FDF8EE',
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
              Send My Enquiry
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
