import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { X } from 'lucide-react'
import { galleryItems, galleryFilters } from '../data/gallery'

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <>
      <Helmet>
        <title>Event Gallery | Weddings, Corporate, Food | The Catering Inc. Gurgaon</title>
        <meta name="description" content="Browse The Catering Inc. gallery — weddings, corporate events, Indian occasions, parties and food photography from events across Gurgaon and India." />
      </Helmet>

      {/* Hero */}
      <section className="py-20 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Our Work</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Moments We've Been Part Of
          </h1>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-10 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {galleryFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 min-h-[44px]"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: activeFilter === filter ? '#F0B414' : 'transparent',
                  color: activeFilter === filter ? '#1A1200' : '#3D2E1A',
                  border: `2px solid ${activeFilter === filter ? '#F0B414' : '#D4C5A9'}`,
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid cursor-pointer overflow-hidden group"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  // TODO: replace with real event/food photos from /public/images/
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(13,9,0,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream-light hover:text-gold transition-colors duration-200"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <X size={32} strokeWidth={1} />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[90vh] w-full">
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-full object-contain"
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}>
                {lightbox.category}
              </p>
              <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: '#8B7355' }}>{lightbox.alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
