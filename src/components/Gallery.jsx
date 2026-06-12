import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import adventures from '../data/adventures.json'
import galleryPhotos from '../data/gallery.json'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

const allPhotos = [
  ...adventures.map(a => ({
    id: `adv-${a.id}`,
    photo: a.photo,
    title: a.title,
    location: a.location.name,
    date: a.date,
    excerpt: a.excerpt,
    content: a.content,
  })),
  ...galleryPhotos.map(g => ({
    id: g.id,
    photo: g.photo,
    title: null,
    location: null,
    date: null,
    excerpt: null,
    content: null,
  })),
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function PhotoCard({ item, index, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.06, 0.4), duration: 0.4 }}
      onClick={() => onClick(index)}
      className="shrink-0 w-48 md:w-56 cursor-pointer group flex flex-col"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="aspect-[3/4] rounded-sm overflow-hidden relative">
        <img
          src={item.photo}
          alt={item.title ?? 'Kokos'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.title && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/75 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-3">
              <p className="font-handwriting text-base text-white leading-tight">{item.title}</p>
              <p className="font-body text-[9px] text-white/65 uppercase tracking-widest mt-0.5">
                {item.location}
              </p>
            </div>
          </>
        )}
      </div>

      {item.excerpt && (
        <div className="pt-2.5 space-y-1.5">
          <p className="font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.excerpt}
          </p>
          <span className="font-body text-[10px] uppercase tracking-[0.15em] text-rose hover:text-rose-deep transition-colors">
            Czytaj więcej →
          </span>
        </div>
      )}
    </motion.article>
  )
}

function PostDialog({ item, open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) onClose() }}>
      <DialogContent className="max-w-lg bg-card rounded-sm p-0 overflow-hidden border-border/60 max-h-[90vh] flex flex-col">
        <DialogTitle className="sr-only">{item?.title}</DialogTitle>

        {item && (
          <>
            {item.photo && (
              <div className="h-56 shrink-0 overflow-hidden">
                <img src={item.photo} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="overflow-y-auto px-6 py-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="font-body text-[9px] uppercase tracking-[0.22em] text-muted-foreground border border-border rounded-none px-2 py-0.5">
                  {item.location}
                </span>
                {item.date && (
                  <span className="font-body text-[9px] text-muted-foreground/50">
                    {formatDate(item.date)}
                  </span>
                )}
              </div>

              <h2 className="font-handwriting text-3xl text-foreground font-bold leading-snug">
                {item.title}
              </h2>

              <div className="h-px w-12 bg-rose/40" />

              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.content}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function Gallery() {
  const scrollRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [postItem, setPostItem] = useState(null)
  const total = allPhotos.length

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('article')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 192) + 16), behavior: 'smooth' })
  }

  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i - 1 + total) % total)
  const next = () => setLightboxIndex((i) => (i + 1) % total)
  const currentItem = lightboxIndex !== null ? allPhotos[lightboxIndex] : null

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex])

  return (
    <>
      <section id="galeria" className="bg-background py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/35 mb-3">
              Album ze wspomnień
            </p>
            <h2 className="font-handwriting text-5xl md:text-6xl text-foreground font-bold mb-5">
              Galeria
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-foreground/15" />
              <span className="text-rose text-sm">✦</span>
              <div className="h-px w-16 bg-foreground/15" />
            </div>
          </motion.div>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll(-1)}
              aria-label="Poprzednie"
              className="hidden md:flex absolute -left-5 top-1/3 z-10 rounded-full bg-card border border-border hover:border-rose hover:text-rose shadow-sm"
            >←</Button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-3 hide-scrollbar items-start"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {allPhotos.map((item, i) => (
                <PhotoCard key={item.id} item={item} index={i} onClick={setLightboxIndex} />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll(1)}
              aria-label="Następne"
              className="hidden md:flex absolute -right-5 top-1/3 z-10 rounded-full bg-card border border-border hover:border-rose hover:text-rose shadow-sm"
            >→</Button>
          </div>

          <p className="md:hidden text-center font-body text-[9px] uppercase tracking-[0.2em] text-foreground/30 mt-3">
            Przesuń w bok →
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={(val) => { if (!val) close() }}>
        <DialogContent className="max-w-xs sm:max-w-sm bg-card rounded-sm p-0 overflow-hidden border-border/60">
          {currentItem && (
            <>
              <DialogTitle className="sr-only">{currentItem.title ?? 'Zdjęcie'}</DialogTitle>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prev}
                  aria-label="Poprzednie"
                  className="shrink-0 h-full rounded-none hover:bg-secondary text-muted-foreground hover:text-foreground"
                >←</Button>

                <div className="flex-1 min-w-0">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={currentItem.photo}
                      alt={currentItem.title ?? 'Kokos'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {currentItem.title && (
                    <div className="px-4 pt-3 text-center">
                      <p className="font-handwriting text-xl text-foreground leading-snug">{currentItem.title}</p>
                      <p className="font-body text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">
                        {currentItem.location}
                      </p>
                    </div>
                  )}

                  {currentItem.excerpt && (
                    <div className="px-4 pt-2">
                      <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {currentItem.excerpt}
                      </p>
                    </div>
                  )}

                  <div className={`px-4 pb-3 flex items-center ${currentItem.excerpt ? 'justify-between pt-2 border-t border-border mt-3' : 'justify-center pt-2'}`}>
                    {currentItem.content && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { close(); setPostItem(currentItem) }}
                        className="font-body text-[10px] uppercase tracking-[0.15em] text-rose hover:text-rose-deep hover:bg-rose-faint p-0 h-auto"
                      >
                        Czytaj całą przygodę →
                      </Button>
                    )}
                    <span className="font-body text-[9px] text-muted-foreground/40">
                      {lightboxIndex + 1} / {total}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={next}
                  aria-label="Następne"
                  className="shrink-0 h-full rounded-none hover:bg-secondary text-muted-foreground hover:text-foreground"
                >→</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Full post dialog */}
      <PostDialog
        item={postItem}
        open={postItem !== null}
        onClose={() => setPostItem(null)}
      />
    </>
  )
}
