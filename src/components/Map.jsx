import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import adventures from '../data/adventures.json'

const PLACEHOLDER_GRADIENTS = [
  ['#be8d94', '#c5a25a'],
  ['#7d9a82', '#be8d94'],
  ['#c5a25a', '#96636b'],
  ['#96636b', '#7d9a82'],
  ['#2a1d10', '#c5a25a'],
]

function createPawIcon() {
  return L.divIcon({
    html: `<div style="
      width:34px;height:34px;
      background:#f8f3ec;
      border:2px solid #96636b;
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:15px;
      box-shadow:0 2px 8px rgba(42,29,16,0.2);
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
      <div style={{ height: '110px', overflow: 'hidden' }}>
        {post.photo ? (
          <img src={post.photo} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(135deg, ${c1}, ${c2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', opacity: 0.7,
          }}>🐾</div>
        )}
      </div>
      <div style={{ padding: '10px 12px 12px', background: '#f8f3ec' }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '17px', fontWeight: 700, color: '#2a1d10', lineHeight: 1.2, marginBottom: '4px' }}>
          {post.title}
        </p>
        <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#6a4f36' }}>
          {post.location.name}
        </p>
      </div>
    </div>
  )
}

export default function MapSection() {
  const pawIcon = useMemo(() => createPawIcon(), [])

  return (
    <section id="mapa" className="bg-secondary py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-foreground/35 mb-3">
            Śladem łap
          </p>
          <h2 className="font-handwriting text-5xl md:text-6xl text-foreground font-bold mb-5">
            Mapa Podróży
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-foreground/15" />
            <span className="text-rose text-sm">✦</span>
            <div className="h-px w-16 bg-foreground/15" />
          </div>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-sm mx-auto leading-relaxed">
            Każda łapka to miejsce, gdzie byłem. Kliknij, żeby się dowiedzieć co tam robiłem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.65 }}
          className="rounded-sm overflow-hidden border border-border/60 shadow-sm"
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
              <Marker key={post.id} position={[post.location.lat, post.location.lng]} icon={pawIcon}>
                <Popup>
                  <PopupContent post={post} index={i} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        <p className="text-center font-body text-[9px] uppercase tracking-[0.2em] text-foreground/30 mt-3">
          Kliknij na łapkę aby zobaczyć przygodę · Scroll wyłączony
        </p>
      </div>
    </section>
  )
}
