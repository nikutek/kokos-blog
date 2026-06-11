import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DOG_NAME } from '../data/config'

const navLinks = [
  { label: 'Blog', href: '#blog' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Mapa', href: '#mapa' },
  { label: 'Urodziny', href: '#urodziny' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : ''}`}>
      <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
        <a href="#" className="font-handwriting text-2xl font-bold text-brown">
          🐾 {DOG_NAME}
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-xs uppercase tracking-[0.2em] text-brown hover:text-pink-dark transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Otwórz menu"
        >
          <span className={`block w-6 h-0.5 bg-brown transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brown transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brown transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream border-t border-cream-dark overflow-hidden"
          >
            <ul className="flex flex-col py-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-brown hover:bg-cream-dark transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
