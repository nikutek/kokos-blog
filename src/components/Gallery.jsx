import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import adventures from '../data/adventures.json'

const PLACEHOLDER_GRADIENTS = [
  ['#e8b4b8', '#c9a84c'],
  ['#a8846e', '#e8b4b8'],
  ['#c9a84c', '#c97c82'],
  ['#c97c82', '#a8846e'],
  ['#7a5c4a', '#c9a84c'],
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })
}

function PhotoCard({ post, index, onClick }) {
  const [c1, c2] = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      onClick={() => onClick(index)}
      className="shrink-0 w-52 md:w-60 cursor-pointer group"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="aspect-[3/4] rounded-sm overflow-hidden relative">
        {post.photo ? (
          <img
            src={post.photo}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
            style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
          >
            <span className="text-5xl opacity-50">🐾</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brown/75 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-3">
          <p className="font-handwriting text-lg text-white leading-tight">{post.title}</p>
          <p className="font-body text-[9px] text-white/65 uppercase tracking-widest mt-0.5">
            {post.location.name}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

function Lightbox({ post, index, total, onClose, onPrev, onNext }) {
  const [c1, c2] = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-brown/92 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/15 hover:bg-cream/25 text-cream flex items-center justify-center transition-colors"
        aria-label="Poprzednie zdjęcie"
      >
        ←
      </button>

      {/* Photo + caption */}
      <motion.div
        key={post.id}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs"
      >
        <div className="aspect-[3/4] rounded-sm overflow-hidden">
          {post.photo ? (
            <img src={post.photo} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            >
              <span className="text-8xl opacity-40">🐾</span>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="font-handwriting text-2xl text-cream leading-snug">{post.title}</p>
          <p className="font-body text-[10px] text-cream/55 uppercase tracking-widest mt-1">
            {post.location.name} · {formatDate(post.date)}
          </p>
          <p className="font-body text-[10px] text-cream/30 mt-3">{index + 1} / {total}</p>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/15 hover:bg-cream/25 text-cream flex items-center justify-center transition-colors"
        aria-label="Następne zdjęcie"
      >
        →
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream/15 hover:bg-cream/25 text-cream flex items-center justify-center transition-colors text-xs"
        aria-label="Zamknij"
      >
        ✕
      </button>
    </motion.div>
  )
}

export default function Gallery() {
  const scrollRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('article')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 208) + 16), behavior: 'smooth' })
  }

  const total = adventures.length
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i - 1 + total) % total)
  const next = () => setLightboxIndex((i) => (i + 1) % total)

  return (
    <>
      <section id="galeria" className="bg-cream py-20">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 px-4"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-brown/40 mb-3">
              Album ze wspomnień
            </p>
            <h2 className="font-handwriting text-5xl md:text-6xl text-brown font-bold mb-4">
              Galeria
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-brown/20" />
              <span className="text-pink-dark text-sm">✦</span>
              <div className="h-px w-16 bg-brown/20" />
            </div>
          </motion.div>

          {/* Carousel wrapper */}
          <div className="relative">
            <button
              onClick={() => scroll(-1)}
              className="hidden md:flex absolute -left-6 top-1/3 z-10 w-10 h-10 rounded-full bg-cream-dark border border-brown/15 hover:border-pink-dark items-center justify-center text-brown hover:text-pink-dark transition-all shadow-sm"
              aria-label="Poprzednie"
            >
              ←
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-3 px-4 md:px-0 hide-scrollbar"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {adventures.map((post, i) => (
                <PhotoCard key={post.id} post={post} index={i} onClick={setLightboxIndex} />
              ))}
            </div>

            <button
              onClick={() => scroll(1)}
              className="hidden md:flex absolute -right-6 top-1/3 z-10 w-10 h-10 rounded-full bg-cream-dark border border-brown/15 hover:border-pink-dark items-center justify-center text-brown hover:text-pink-dark transition-all shadow-sm"
              aria-label="Następne"
            >
              →
            </button>
          </div>

          <p className="md:hidden text-center font-body text-[9px] uppercase tracking-[0.2em] text-brown/30 mt-3 px-4">
            Przesuń w bok →
          </p>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            post={adventures[lightboxIndex]}
            index={lightboxIndex}
            total={total}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  )
}
