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

function calcTime(diffMs) {
  const d = Math.max(0, diffMs)
  return {
    days:    Math.floor(d / 86400000),
    hours:   Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  }
}

function getCurrentAge(birthdateStr) {
  const birth = new Date(birthdateStr + 'T00:00:00')
  const now = new Date()
  const ageInYears = (now - birth) / (365.25 * 24 * 3600 * 1000)

  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  if (now.getDate() < birth.getDate()) months--
  if (months < 0) { years--; months += 12 }

  const dogYears = ageInYears > 0
    ? Math.round(16 * Math.log(ageInYears) + 31)
    : 0

  return { years, months, dogYears }
}

function pluralYears(n) {
  if (n === 1) return 'rok'
  if (n >= 2 && n <= 4) return 'lata'
  return 'lat'
}
function pluralMonths(n) {
  if (n === 1) return 'miesiąc'
  if (n >= 2 && n <= 4) return 'miesiące'
  return 'miesięcy'
}

function AnimatedDigit({ value }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={padded}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="font-handwriting text-3xl md:text-4xl font-bold select-none"
        >
          {padded}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const HUMAN_UNITS = [
  { key: 'days',    label: 'Dni',    rotate: -1.5 },
  { key: 'hours',   label: 'Godz',   rotate:  0.8 },
  { key: 'minutes', label: 'Min',    rotate: -0.6 },
  { key: 'seconds', label: 'Sek',    rotate:  1.2 },
]

const DOG_UNITS = [
  { key: 'days',    label: 'Dni',    rotate:  1.2 },
  { key: 'hours',   label: 'Godz',   rotate: -0.7 },
  { key: 'minutes', label: 'Min',    rotate:  1.5 },
  { key: 'seconds', label: 'Sek',    rotate: -1.0 },
]

function TimerGroup({ timeLeft, units, tileClass, digitClass, delay }) {
  return (
    <div className="flex gap-3 md:gap-4">
      {units.map(({ key, label, rotate }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.08, duration: 0.5 }}
          style={{ rotate: `${rotate}deg` }}
          className="flex flex-col items-center gap-2"
        >
          <div className={`border-2 rounded-sm shadow-sm ${tileClass}`} style={{ width: '64px', height: '64px' }}>
            <div className={digitClass}>
              <AnimatedDigit value={timeLeft[key]} />
            </div>
          </div>
          <span className="font-body text-[9px] uppercase tracking-[0.25em] text-muted-foreground/55">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function CountdownDisplay() {
  const target = getNextBirthday(BIRTHDAY_DATE)
  const [humanTime, setHumanTime] = useState(() => calcTime(target - Date.now()))
  const [dogTime,   setDogTime]   = useState(() => calcTime((target - Date.now()) * 7))

  useEffect(() => {
    const id = setInterval(() => {
      const diff = target - Date.now()
      setHumanTime(calcTime(diff))
      setDogTime(calcTime(diff * 7))
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  const birthdayFormatted = new Date(BIRTHDAY_DATE + 'T00:00:00').toLocaleDateString('pl-PL', {
    day: 'numeric', month: 'long',
  })

  const { years, months, dogYears } = getCurrentAge(BIRTHDAY_DATE)
  const ageHuman = months > 0
    ? `${years} ${pluralYears(years)} i ${months} ${pluralMonths(months)}`
    : `${years} ${pluralYears(years)}`

  const isBirthday = humanTime.days === 0 && humanTime.hours === 0 && humanTime.minutes === 0 && humanTime.seconds === 0

  return (
    <div className="flex flex-col items-center gap-10 w-full">

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-body text-xs text-muted-foreground uppercase tracking-[0.25em] text-center"
      >
        Do urodzin {DOG_NAME} ({birthdayFormatted}) pozostało:
      </motion.p>

      {/* Two timers */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">

        {/* Human timer */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-body text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
            ⏱ Czas ludzki
          </span>
          <TimerGroup
            timeLeft={humanTime}
            units={HUMAN_UNITS}
            tileClass="bg-card border-border text-foreground"
            digitClass="w-full h-full flex items-center justify-center text-foreground"
            delay={0.1}
          />
        </div>

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="hidden md:block h-16 w-px bg-border" />
          <div className="bg-rose-faint border border-rose/30 rounded-sm px-2.5 py-1">
            <span className="font-handwriting text-lg font-bold text-rose-deep">×7</span>
          </div>
          <div className="hidden md:block h-16 w-px bg-border" />
          <div className="md:hidden w-16 h-px bg-border" />
        </motion.div>

        {/* Dog timer */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-body text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
            🐾 Czas psi
          </span>
          <TimerGroup
            timeLeft={dogTime}
            units={DOG_UNITS}
            tileClass="bg-rose-faint border-rose/30 text-rose-deep"
            digitClass="w-full h-full flex items-center justify-center text-rose-deep"
            delay={0.3}
          />
        </div>
      </div>

      {/* Age labels */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col items-center gap-1.5 border-t border-border pt-6 w-full max-w-sm text-center"
      >
        <p className="font-body text-xs text-muted-foreground">
          {DOG_NAME} ma <span className="text-foreground font-medium">{ageHuman}</span>
        </p>
        <p className="font-body text-xs text-muted-foreground">
          w psim czasie to około{' '}
          <span className="font-handwriting text-lg font-bold text-rose-deep leading-none">{dogYears}</span>
          {' '}psich lat
        </p>
        <p className="font-body text-[9px] text-muted-foreground/35 mt-0.5">
          wg. wzoru: 16 × ln(wiek) + 31
        </p>
      </motion.div>

      {isBirthday && (
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-handwriting text-4xl text-rose-deep font-bold"
        >
          🎂 Wszystkiego najlepszego, {DOG_NAME}!
        </motion.p>
      )}
    </div>
  )
}

function BirthdayPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ rotate: '-1.5deg' }}
        className="border-2 border-dashed border-border rounded-sm px-10 py-7 text-center"
      >
        <p className="font-handwriting text-4xl text-foreground/30 mb-1">Data urodzin</p>
        <p className="font-handwriting text-3xl text-rose/50">wkrótce...</p>
      </motion.div>
      <p className="font-body text-[9px] uppercase tracking-[0.2em] text-foreground/25">
        uzupełnij BIRTHDAY_DATE w src/data/config.js
      </p>
    </div>
  )
}

export default function Countdown() {
  return (
    <section id="urodziny" className="bg-background py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/35 mb-3">
            Wielki Dzień
          </p>
          <h2 className="font-handwriting text-5xl md:text-6xl text-foreground font-bold mb-5">
            Urodziny {DOG_NAME}a
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-foreground/15" />
            <span className="text-rose text-sm">🎂</span>
            <div className="h-px w-16 bg-foreground/15" />
          </div>
        </motion.div>

        <div className="flex justify-center">
          {BIRTHDAY_DATE ? <CountdownDisplay /> : <BirthdayPlaceholder />}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="inline-block border border-border/50 rounded-sm px-6 py-2 rotate-[2deg]">
            <p className="font-body text-[9px] uppercase tracking-[0.3em] text-foreground/25">
              {DOG_NAME} · World Traveller · Good Boy
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
