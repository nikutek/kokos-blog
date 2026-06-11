import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import adventures from '../data/adventures.json'

const PLACEHOLDER_GRADIENTS = [
  ['#e8b4b8', '#c9a84c'],
  ['#a8846e', '#e8b4b8'],
  ['#c9a84c', '#c97c82'],
  ['#c97c82', '#a8846e'],
  ['#7a5c4a', '#c9a84c'],
]

function createPawIcon() {
  return L.divIcon({
    html: `<div style="
      width:34px;height:34px;
      background:#faf6f0;
      border:2px solid #c97c82;
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:15px;
      box-shadow:0 2px 8px rgba(122,92,74,0.25);
      cursor:pointer;
    ">🐾</div>`,
    className: '',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -22],
  })
}

function PopupContent({ post, index }) {
  const [c1, c2] = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]
  return (
    <div style={{ fontFamily: 'Lato, sans-serif', width: '180px' }}>
      {/* Photo thumbnail */}
      <div style={{ height: '110px', overflow: 'hidden' }}>
        {post.photo ? (
          <img src={post.photo} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(135deg, ${c1}, ${c2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', opacity: 0.7,
          }}>
            🐾
          </div>
        )}
      </div>
      {/* Caption */}
      <div style={{ padding: '10px 12px 12px', background: '#faf6f0' }}>
        <p style={{
          fontFamily: 'Caveat, cursive', fontSize: '17px', fontWeight: 700,
          color: '#7a5c4a', lineHeight: 1.2, marginBottom: '4px',
        }}>
          {post.title}
        </p>
        <p style={{
          fontSize: '9px', textTransform: 'uppercase',
          letterSpacing: '0.18em', color: '#a8846e',
        }}>
          {post.location.name}
        </p>
      </div>
    </div>
  )
}

export default function MapSection() {
  const pawIcon = useMemo(() => createPawIcon(), [])

  return (
    <section id="mapa" className="bg-cream-dark py-20">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-brown/40 mb-3">
            Śladem łap
          </p>
          <h2 className="font-handwriting text-5xl md:text-6xl text-brown font-bold mb-4">
            Mapa Podróży
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-brown/20" />
            <span className="text-pink-dark text-sm">✦</span>
            <div className="h-px w-16 bg-brown/20" />
          </div>
          <p className="font-body text-sm text-brown-light mt-4 max-w-sm mx-auto leading-relaxed">
            Każda łapka to miejsce, gdzie byłem. Kliknij, żeby się dowiedzieć co tam robiłem.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.65 }}
          className="rounded-sm overflow-hidden border border-brown/15 shadow-md"
          style={{ height: '420px' }}
        >
          <MapContainer
            center={[20, 15]}
            zoom={2}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={false}
            minZoom={2}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {adventures.map((post, i) => (
              <Marker
                key={post.id}
                position={[post.location.lat, post.location.lng]}
                icon={pawIcon}
              >
                <Popup>
                  <PopupContent post={post} index={i} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        <p className="text-center font-body text-[9px] uppercase tracking-[0.2em] text-brown/30 mt-3">
          Kliknij na łapkę aby zobaczyć przygodę · Scroll wyłączony
        </p>
      </div>
    </section>
  )
}
