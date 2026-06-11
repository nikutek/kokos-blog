import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BIRTHDAY_DATE, DOG_NAME } from '../data/config'

function getNextBirthday(dateStr) {
  const [, month, day] = dateStr.split('-').map(Number)
  const now = new Date()
  let target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0)
  if (target <= now) target = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0)
  return target
}

function calcTimeLeft(target) {
  const diff = Math.max(0, target - Date.now())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function AnimatedDigit({ value }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={padded}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="font-handwriting text-4xl md:text-5xl font-bold text-brown select-none"
        >
          {padded}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const UNITS = [
  { key: 'days',    label: 'Dni',     rotate: -1.5 },
  { key: 'hours',   label: 'Godzin',  rotate: 0.8 },
  { key: 'minutes', label: 'Minut',   rotate: -0.6 },
  { key: 'seconds', label: 'Sekund',  rotate: 1.2 },
]

function CountdownDisplay() {
  const target = getNextBirthday(BIRTHDAY_DATE)
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const birthdayFormatted = new Date(BIRTHDAY_DATE + 'T00:00:00').toLocaleDateString('pl-PL', {
    day: 'numeric', month: 'long',
  })

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-body text-xs text-brown/45 uppercase tracking-[0.25em]"
      >
        Do urodzin {DOG_NAME} ({birthdayFormatted}) pozostało:
      </motion.p>

      <div className="flex gap-4 md:gap-6">
        {UNITS.map(({ key, label, rotate }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            style={{ rotate: `${rotate}deg` }}
            className="flex flex-col items-center gap-2"
          >
            <div className="bg-cream border-2 border-brown/20 rounded-sm w-18 h-18 md:w-22 md:h-22 shadow-md"
              style={{ width: '72px', height: '72px' }}
            >
              <AnimatedDigit value={timeLeft[key]} />
            </div>
            <span className="font-body text-[9px] uppercase tracking-[0.28em] text-brown/45">
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-handwriting text-4xl text-pink-dark font-bold"
        >
          🎂 Wszystkiego najlepszego, {DOG_NAME}!
        </motion.p>
      )}
    </div>
  )
}

function BirthdayPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ rotate: '-1.5deg' }}
        className="border-2 border-dashed border-brown/20 rounded-sm px-10 py-7 text-center"
      >
        <p className="font-handwriting text-4xl text-brown/35 mb-1">Data urodzin</p>
        <p className="font-handwriting text-3xl text-pink-dark/50">wkrótce...</p>
      </motion.div>
      <p className="font-body text-[9px] uppercase tracking-[0.2em] text-brown/25">
        uzupełnij BIRTHDAY_DATE w src/data/config.js
      </p>
    </div>
  )
}

export default function Countdown() {
  return (
    <section id="urodziny" className="bg-cream py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-brown/40 mb-3">
            Wielki Dzień
          </p>
          <h2 className="font-handwriting text-5xl md:text-6xl text-brown font-bold mb-4">
            Urodziny {DOG_NAME}a
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-brown/20" />
            <span className="text-pink-dark text-sm">🎂</span>
            <div className="h-px w-16 bg-brown/20" />
          </div>
        </motion.div>

        {/* Timer or placeholder */}
        <div className="flex justify-center">
          {BIRTHDAY_DATE ? <CountdownDisplay /> : <BirthdayPlaceholder />}
        </div>

        {/* Footer stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="border-2 border-brown/15 rounded-sm px-6 py-2 rotate-[2deg]">
            <p className="font-body text-[9px] uppercase tracking-[0.3em] text-brown/30">
              {DOG_NAME} · World Traveller · Good Boy
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
