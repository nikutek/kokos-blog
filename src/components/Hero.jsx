import { motion } from 'framer-motion'
import { DOG_NAME, DOG_BREED } from '../data/config'

function PawPrint({ className }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <ellipse cx="50" cy="68" rx="22" ry="18" />
      <ellipse cx="24" cy="46" rx="10" ry="12" />
      <ellipse cx="39" cy="34" rx="10" ry="12" />
      <ellipse cx="61" cy="34" rx="10" ry="12" />
      <ellipse cx="76" cy="46" rx="10" ry="12" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen bg-cream relative overflow-hidden flex flex-col items-center justify-center">

      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #7a5c4a 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Decorative photos — right side, visible on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="relative w-48 h-64 mr-8">
          <div className="absolute top-0 right-0 w-44 h-60 rounded-sm overflow-hidden shadow-2xl border-[3px] border-cream rotate-[5deg]">
            <img src="/przygody/nowy_jork.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 w-40 h-56 rounded-sm overflow-hidden shadow-xl border-[3px] border-cream -rotate-[4deg]">
            <img src="/eb91967b-d677-4afc-8b91-c87ad69994ed.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute -top-3 left-4 z-10 bg-cream border-2 border-pink-dark/45 rounded-sm px-3 py-1 shadow-sm"
            style={{ rotate: '-7deg' }}
          >
            <span className="font-body text-[9px] uppercase tracking-[0.22em] text-pink-dark/65 font-bold">World Traveller</span>
          </div>
        </div>
      </motion.div>

      {/* Centered text content */}
      <div className="w-full max-w-2xl mx-auto px-8 py-28 flex flex-col items-center text-center gap-6 relative z-10">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-body text-[10px] uppercase tracking-[0.45em] text-brown/40"
        >
          Dziennik Podróży
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.65 }}
          className="font-handwriting font-bold text-brown leading-none"
          style={{ fontSize: 'clamp(4rem, 14vw, 7.5rem)' }}
        >
          Przygody<br />{DOG_NAME}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-12 bg-brown/25" />
          <PawPrint className="w-5 h-5 fill-pink-dark" />
          <div className="h-px w-12 bg-brown/25" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="font-body text-sm text-brown-light leading-relaxed"
        >
          {DOG_BREED} · Globtroter · Ambasador Dobrego Nastroju
        </motion.p>

        <motion.a
          href="#blog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-2 inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.25em] text-pink-dark border border-pink-dark/40 rounded-sm px-8 py-3 hover:bg-pink-dark/8 transition-colors"
        >
          Czytaj przygody
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>→</motion.span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brown/35"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.3em]">Przewiń w dół</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="text-sm"
        >↓</motion.span>
      </motion.div>
    </section>
  )
}
