import { useState } from 'react'
import { motion } from 'framer-motion'
import adventures from '../data/adventures.json'
import BlogCard from './BlogCard'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function PostDialog({ post, open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) onClose() }}>
      <DialogContent className="max-w-xl bg-card rounded-sm p-0 overflow-hidden border-border/60 max-h-[90vh] flex flex-col">
        <DialogTitle className="sr-only">{post?.title}</DialogTitle>

        {post && (
          <>
            <div className="h-64 md:h-80 shrink-0 overflow-hidden">
              <img
                src={post.photo}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="overflow-y-auto px-6 md:px-8 py-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="font-body text-[9px] uppercase tracking-[0.22em] text-muted-foreground border border-border rounded-none px-2 py-0.5">
                  {post.location.name}
                </span>
                <span className="font-body text-[9px] text-muted-foreground/50">
                  {formatDate(post.date)}
                </span>
              </div>

              <h2 className="font-handwriting text-4xl md:text-5xl text-foreground font-bold leading-snug">
                {post.title}
              </h2>

              <div className="h-px w-12 bg-rose/40" />

              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {post.content}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <section id="blog" className="bg-secondary py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/35 mb-3">
            Prosto z łapy
          </p>
          <h2 className="font-handwriting text-5xl md:text-6xl text-foreground font-bold mb-5">
            Zapiski z Podróży
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-foreground/15" />
            <span className="text-rose text-sm">✦</span>
            <div className="h-px w-16 bg-foreground/15" />
          </div>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-sm mx-auto leading-relaxed">
            Ja, Kokos, opisuję świat tak, jak go widzę — nosem i sercem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {adventures.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} onClick={setSelectedPost} />
          ))}
        </div>
      </div>

      <PostDialog
        post={selectedPost}
        open={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
      />
    </section>
  )
}
