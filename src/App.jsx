import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Blog from './components/Blog'

function SectionPlaceholder({ id, label, dark }) {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center ${dark ? 'bg-cream-dark' : 'bg-cream'}`}
    >
      <p className="font-handwriting text-3xl text-brown/40">{label} — wkrótce</p>
    </section>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Blog />
      <SectionPlaceholder id="galeria" label="Galeria" dark />
      <SectionPlaceholder id="mapa" label="Mapa" />
      <SectionPlaceholder id="urodziny" label="Urodziny" dark />
    </div>
  )
}

export default App
