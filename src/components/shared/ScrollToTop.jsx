import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-canvas text-gold border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-richblack transition-all duration-300 shadow-lg"
    >
      <ArrowUp size={20} strokeWidth={1} />
    </button>
  )
}
