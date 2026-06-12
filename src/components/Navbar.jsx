import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DOG_NAME } from '../data/config'
import { Button } from '@/components/ui/button'

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/92 backdrop-blur-sm border-b border-border' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <a href="#" className="font-handwriting text-xl font-bold text-foreground">
          🐾 {DOG_NAME}
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <Button
                variant="ghost"
                size="sm"
                render={<a href={link.href} />}
                nativeButton={false}
                className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:bg-transparent"
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Otwórz menu"
          className="md:hidden text-foreground"
        >
          {menuOpen ? '✕' : '☰'}
        </Button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <ul className="flex flex-col py-2 max-w-5xl mx-auto px-6">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Button
                    variant="ghost"
                    render={<a href={link.href} onClick={() => setMenuOpen(false)} />}
                    nativeButton={false}
                    className="w-full justify-start font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
