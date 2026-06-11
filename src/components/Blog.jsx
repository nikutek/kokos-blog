import { useState } from 'react'
import { motion } from 'framer-motion'
import adventures from '../data/adventures.json'
import BlogCard from './BlogCard'
import BlogDrawer from './BlogDrawer'

const VISIBLE = 3

export default function Blog() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const visible = adventures.slice(0, VISIBLE)
  const hidden = adventures.slice(VISIBLE)

  return (
    <section id="blog" className="bg-cream-dark py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-brown/40 mb-3">
            Prosto z łapy
          </p>
          <h2 className="font-handwriting text-5xl md:text-6xl text-brown font-bold mb-4">
            Zapiski z Podróży
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-brown/20" />
            <span className="text-pink-dark text-sm">✦</span>
            <div className="h-px w-16 bg-brown/20" />
          </div>
          <p className="font-body text-sm text-brown-light mt-4 max-w-sm mx-auto leading-relaxed">
            Ja, Kokos, opisuję świat tak, jak go widzę — nosem i sercem.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Show more hint */}
        {hidden.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            {/* Fade hint */}
            <p className="font-body text-xs text-brown/40 uppercase tracking-[0.2em]">
              +{hidden.length} więcej przygód
            </p>

            <button
              onClick={() => setDrawerOpen(true)}
              className="group flex items-center gap-3 bg-cream border border-brown/20 hover:border-pink-dark rounded-sm px-7 py-3 transition-all duration-300 hover:shadow-md"
            >
              <span className="font-body text-xs uppercase tracking-[0.2em] text-brown group-hover:text-pink-dark transition-colors">
                Pokaż wszystkie przygody
              </span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="text-pink-dark text-sm"
              >
                →
              </motion.span>
            </button>
          </motion.div>
        )}
      </div>

      <BlogDrawer
        posts={hidden}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  )
}
