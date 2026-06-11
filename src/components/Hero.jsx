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
    <section className="min-h-screen bg-cream relative overflow-hidden flex items-center">

      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #7a5c4a 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-8 py-28 flex flex-col md:flex-row items-center gap-12 md:gap-8">

        {/* LEFT — text */}
        <div className="flex-1 flex flex-col gap-6 text-center items-center">

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
            style={{ fontSize: 'clamp(4rem, 12vw, 7rem)' }}
          >
            Przygody<br />{DOG_NAME}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-brown/25" />
            <PawPrint className="w-5 h-5 fill-pink-dark" />
            <div className="h-px w-10 bg-brown/25" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-body text-sm text-brown-light leading-relaxed max-w-xs"
          >
            {DOG_BREED} · Globtroter<br />Ambasador Dobrego Nastroju
          </motion.p>

          <motion.a
            href="#blog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-2 inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.25em] text-pink-dark border border-pink-dark/40 rounded-sm px-6 py-3 hover:bg-pink-dark/8 transition-colors"
          >
            Czytaj przygody
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>→</motion.span>
          </motion.a>
        </div>

        {/* RIGHT — photo collage */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-64 h-72 md:w-80 md:h-96">

            {/* Back photo */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, y: 20 }}
              animate={{ opacity: 1, rotate: 6, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
              className="absolute top-0 right-0 w-44 h-60 md:w-52 md:h-72 rounded-sm overflow-hidden shadow-xl border-[3px] border-cream"
            >
              <img
                src="/przygody/nowy_jork.jpg"
                alt="Kokos w Nowym Jorku"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Front photo */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, y: 20 }}
              animate={{ opacity: 1, rotate: -5, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
              className="absolute bottom-0 left-0 w-44 h-60 md:w-52 md:h-72 rounded-sm overflow-hidden shadow-2xl border-[3px] border-cream"
            >
              <img
                src="/eb91967b-d677-4afc-8b91-c87ad69994ed.jpg"
                alt="Kokos w pociągu"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="absolute -top-3 left-6 z-10 bg-cream border-2 border-pink-dark/45 rounded-sm px-3 py-1 shadow-sm"
              style={{ rotate: '-7deg' }}
            >
              <span className="font-body text-[9px] uppercase tracking-[0.22em] text-pink-dark/65 font-bold">
                World Traveller
              </span>
            </motion.div>

            {/* Paw sticker */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.35, type: 'spring', stiffness: 300 }}
              className="absolute -bottom-3 right-4 z-10 bg-pink-light rounded-full w-10 h-10 flex items-center justify-center shadow-md"
            >
              <PawPrint className="w-5 h-5 fill-pink-dark" />
            </motion.div>

          </div>
        </div>
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
