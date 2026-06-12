import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Blog from './components/Blog'
import Gallery from './components/Gallery'
import MapSection from './components/Map'
import Countdown from './components/Countdown'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Blog />
      <Gallery />
      <MapSection />
      <Countdown />
      <Footer />
    </div>
  )
}

export default App
