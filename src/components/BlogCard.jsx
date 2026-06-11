import { motion } from 'framer-motion'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: 'easeOut' }}
      className="bg-cream border border-brown/15 rounded-sm flex flex-col gap-4 overflow-hidden group"
    >
      {/* Top color accent */}
      <div className="h-1 bg-gradient-to-r from-pink to-gold" />

      <div className="px-6 pb-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <span className="font-body text-[9px] uppercase tracking-[0.22em] text-brown/50 border border-brown/15 rounded-sm px-2 py-0.5">
            {post.location.name}
          </span>
          <span className="font-body text-[9px] text-brown/35">
            {formatDate(post.date)}
          </span>
        </div>

        <h3 className="font-handwriting text-2xl md:text-3xl text-brown font-bold leading-snug">
          {post.title}
        </h3>

        <p className="font-body text-sm text-brown-light leading-relaxed flex-1">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  )
}
