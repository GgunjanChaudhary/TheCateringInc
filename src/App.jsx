import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/shared/WhatsAppButton'
import ScrollToTop from './components/shared/ScrollToTop'

import Home from './pages/Home'
import About from './pages/About'
import Menus from './pages/Menus'
import Services from './pages/Services'
import WeddingCatering from './pages/WeddingCatering'
import CorporateCatering from './pages/CorporateCatering'
import PartyBirthday from './pages/PartyBirthday'
import IndianOccasions from './pages/IndianOccasions'
import BulkOutdoor from './pages/BulkOutdoor'
import Gallery from './pages/Gallery'
import Pricing from './pages/Pricing'
import Testimonials from './pages/Testimonials'
import Blog from './pages/Blog'
import ServiceAreas from './pages/ServiceAreas'
import GetQuote from './pages/GetQuote'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

export default function App() {
  // Deter casual image saving — block right-click on images
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/wedding" element={<WeddingCatering />} />
          <Route path="/services/corporate" element={<CorporateCatering />} />
          <Route path="/services/birthday-parties" element={<PartyBirthday />} />
          <Route path="/services/indian-occasions" element={<IndianOccasions />} />
          <Route path="/services/bulk-outdoor" element={<BulkOutdoor />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  )
}
