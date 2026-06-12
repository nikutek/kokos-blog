import { motion } from 'framer-motion'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function BlogCard({ post, index, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      onClick={() => onClick(post)}
      className="bg-card border border-border/60 rounded-sm overflow-hidden cursor-pointer group hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      <div className="aspect-[4/3] overflow-hidden shrink-0">
        <img
          src={post.photo}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <span className="font-body text-[9px] uppercase tracking-[0.22em] text-muted-foreground border border-border rounded-none px-2 py-0.5">
            {post.location.name}
          </span>
          <span className="font-body text-[9px] text-muted-foreground/50">
            {formatDate(post.date)}
          </span>
        </div>

        <h3 className="font-handwriting text-2xl text-foreground font-bold leading-snug">
          {post.title}
        </h3>

        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <span className="font-body text-[10px] uppercase tracking-[0.15em] text-rose group-hover:text-rose-deep transition-colors self-start">
          Czytaj więcej →
        </span>
      </div>
    </motion.article>
  )
}
