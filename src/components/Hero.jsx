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

const contentVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.85 + i * 0.12, duration: 0.5 },
  }),
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cream relative overflow-hidden px-4 py-20">

      {/* Decorative background dots */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #7a5c4a 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Journal cover card with flip animation */}
      <div style={{ perspective: '1200px' }}>
        <motion.div
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="bg-cream-dark border-[3px] border-brown rounded-sm shadow-2xl w-full max-w-md"
        >
          {/* Spine accent */}
          <div className="h-2 bg-brown rounded-t-sm" />

          <div className="p-8 md:p-12">
            {/* Inner decorative border */}
            <div className="border border-brown/25 rounded-sm p-6 md:p-8 flex flex-col items-center text-center gap-4">

              <motion.p
                custom={0}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="font-body text-[10px] uppercase tracking-[0.35em] text-brown-light"
              >
                Dziennik Podróży
              </motion.p>

              <motion.div custom={1} variants={contentVariants} initial="hidden" animate="visible">
                <PawPrint className="w-10 h-10 fill-pink-dark mx-auto" />
              </motion.div>

              <motion.h1
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="font-handwriting text-5xl md:text-6xl font-bold text-brown leading-tight"
              >
                Przygody<br />{DOG_NAME}
              </motion.h1>

              <motion.div
                custom={3}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2 w-full"
              >
                <div className="flex-1 h-px bg-brown/20" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-brown/40">✦</span>
                <div className="flex-1 h-px bg-brown/20" />
              </motion.div>

              <motion.p
                custom={4}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="font-body text-xs text-brown-light leading-relaxed"
              >
                {DOG_BREED} · Globtroter<br />Ambasador Dobrego Nastroju
              </motion.p>

              {/* Stamp decoration */}
              <motion.div
                custom={5}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="mt-2 border-2 border-pink-dark/50 rounded-sm px-4 py-1.5 rotate-[-3deg]"
              >
                <span className="font-body text-[9px] uppercase tracking-[0.3em] text-pink-dark/60 font-bold">
                  World Traveller
                </span>
              </motion.div>

            </div>
          </div>

          {/* Bottom spine accent */}
          <div className="h-1.5 bg-brown/30 rounded-b-sm" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-brown/40"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.3em]">Przewiń w dół</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="text-sm"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
