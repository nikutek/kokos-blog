import { motion } from 'framer-motion'
import { DOG_NAME, OWNER_NAME } from '../data/config'

function PawSmall() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-foreground/25 inline-block">
      <ellipse cx="50" cy="68" rx="22" ry="18" />
      <ellipse cx="24" cy="46" rx="10" ry="12" />
      <ellipse cx="39" cy="34" rx="10" ry="12" />
      <ellipse cx="61" cy="34" rx="10" ry="12" />
      <ellipse cx="76" cy="46" rx="10" ry="12" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border/60 py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4 text-center"
      >
        <div className="flex items-center gap-3 text-foreground/20">
          <div className="h-px w-16 bg-current" />
          <PawSmall />
          <div className="h-px w-16 bg-current" />
        </div>

        <p className="font-handwriting text-2xl text-foreground/55">
          Przygody {DOG_NAME}
        </p>

        <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
          Russell Terrier · Globtroter · Ambasador Dobrego Nastroju
        </p>

        <p className="font-body text-[10px] text-foreground/25 mt-1">
          © {new Date().getFullYear()} {OWNER_NAME} &amp; {DOG_NAME} · Wszelkie łapy zastrzeżone
        </p>
      </motion.div>
    </footer>
  )
}
