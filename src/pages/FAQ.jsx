import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '../data/faqs'
import QuoteButton from '../components/shared/QuoteButton'

export default function FAQ() {
  const [openId, setOpenId] = useState(null)
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | The Catering Inc. Gurgaon</title>
        <meta name="description" content="Answers to common questions about The Catering Inc. — minimum guests, service areas, dietary requirements, cancellation policy, tasting sessions and more." />
      </Helmet>

      <section className="py-20 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Common Questions</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="py-16 bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border" style={{ borderColor: '#D4C5A9', backgroundColor: '#FDF8EE' }}>
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left min-h-[56px]"
                  aria-expanded={openId === faq.id}
                >
                  <span className="text-base font-bold pr-4" style={{ fontFamily: 'var(--font-display)', color: '#1A1200', fontWeight: 500 }}>
                    {faq.question}
                  </span>
                  {openId === faq.id
                    ? <Minus size={18} strokeWidth={1} style={{ color: '#F0B414', flexShrink: 0 }} />
                    : <Plus size={18} strokeWidth={1} style={{ color: '#F0B414', flexShrink: 0 }} />
                  }
                </button>
                {openId === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="h-px mb-4" style={{ backgroundColor: '#D4C5A9' }} />
                    <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 p-10 text-center border" style={{ borderColor: '#D4C5A9', backgroundColor: '#FDF8EE' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#1A1200', marginBottom: '0.75rem' }}>
              Still have questions?
            </h2>
            <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
              Reach out and we will answer personally — no chatbots, no templates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+919560459999"
                className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold tracking-widest uppercase border-2 min-h-[44px] transition-all duration-300"
                style={{ fontFamily: 'var(--font-body)', borderColor: '#D4C5A9', color: '#3D2E1A' }}>
                Call +91 9560459999
              </a>
              <QuoteButton label="Get a Free Quote" variant="primary" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
