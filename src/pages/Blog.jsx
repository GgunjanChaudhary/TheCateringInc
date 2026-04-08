import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blog'

export default function Blog() {
  const [search, setSearch] = useState('')
  const filtered = blogPosts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Helmet>
        <title>Catering Tips, Trends & Inspiration | Blog | The Catering Inc.</title>
        <meta name="description" content="Catering tips, wedding menu ideas, corporate event trends and more from The Catering Inc. by Chef Gautam Chaudhry." />
      </Helmet>

      <section className="py-20 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Insights</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Tips, Trends & Inspiration
          </h1>
        </div>
      </section>

      <section className="py-16 bg-page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-5 py-3.5 border text-sm focus:outline-none"
              style={{ fontFamily: 'var(--font-body)', backgroundColor: '#FFFDF7', borderColor: '#D4C5A9', color: '#1A1200' }}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-sm" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>No articles found for "{search}".</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <div key={post.id} className="border overflow-hidden hover:shadow-[0_8px_40px_rgba(240,180,20,0.12)] transition-shadow duration-500 group" style={{ borderColor: '#D4C5A9', backgroundColor: '#FDF8EE' }}>
                  <div className="overflow-hidden h-52">
                    <img src={post.image} alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      // TODO: replace with real blog feature images
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)', color: '#B5621E' }}>{post.category}</span>
                      <span className="text-xs" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>{post.date}</span>
                    </div>
                    <h2 className="mb-2 leading-snug" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#1A1200' }}>
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>By {post.author}</span>
                      {/* TODO: create individual blog post pages and link here */}
                      <span className="text-xs font-bold tracking-widest uppercase border-b pb-0.5" style={{ fontFamily: 'var(--font-body)', color: '#C8860A', borderColor: '#C8860A', cursor: 'default' }}>
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
