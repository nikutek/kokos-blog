import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function DrawerPost({ post }) {
  return (
    <article className="border-b border-brown/10 pb-6 last:border-0 last:pb-0">
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <span className="font-body text-[9px] uppercase tracking-[0.22em] text-brown/50 border border-brown/15 rounded-sm px-2 py-0.5">
          {post.location.name}
        </span>
        <span className="font-body text-[9px] text-brown/35">{formatDate(post.date)}</span>
      </div>
      <h3 className="font-handwriting text-2xl text-brown font-bold mb-2 leading-snug">
        {post.title}
      </h3>
      <p className="font-body text-sm text-brown-light leading-relaxed">
        {post.content}
      </p>
    </article>
  )
}

export default function BlogDrawer({ posts, open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-brown/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-cream rounded-t-2xl max-h-[82vh] flex flex-col"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-brown/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-brown/10 shrink-0">
              <h2 className="font-handwriting text-3xl text-brown font-bold">
                Wszystkie Przygody
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-brown/8 hover:bg-brown/15 text-brown/50 hover:text-brown transition-all text-sm"
                aria-label="Zamknij"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-6 py-6 flex flex-col gap-6">
              {posts.map(post => (
                <DrawerPost key={post.id} post={post} />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
