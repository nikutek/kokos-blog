# Przygody Kokosa — Plan budowy

## M1 — Setup projektu ✅
- [x] `npm create vite@latest` z szablonem React
- [x] Instalacja zależności: `tailwindcss`, `framer-motion`, `react-leaflet`, `leaflet`
- [x] Konfiguracja Tailwind v4 (`@tailwindcss/vite`, `index.css`)
- [x] Google Fonts: *Caveat* (nagłówki) + *Lato* (treść) — w `index.html`
- [x] Paleta kolorów w `@theme` (cream, pink, brown, gold)
- [x] Struktura katalogów: `components/`, `data/`, `assets/photos/`
- [x] `src/data/adventures.json` — 5 przykładowych przygód
- [x] `src/data/config.js` — `DOG_NAME`, `BIRTHDAY_DATE`, `OWNER_NAME`
- [x] `index.html` — tytuł PL, meta description
- [ ] Deploy na Vercel (do zrobienia ręcznie — push do GitHub + połącz z Vercel)

---

## M2 — Hero section
- [ ] Komponent `Hero.jsx`
- [ ] Okładka vintage travel journal — stylizowany tytuł "Przygody Kokosa"
- [ ] Framer Motion: flip/reveal animation przy wejściu na stronę
- [ ] Mała łapka jako logo/ikona
- [ ] Navbar (sticky, anchory do sekcji: Blog, Galeria, Mapa, Urodziny)
- [ ] Hamburger menu na mobile

---

## M3 — Blog section
- [ ] Komponent `Blog.jsx` + `BlogCard.jsx` + `BlogDrawer.jsx`
- [ ] Wyświetlenie pierwszych 3 wpisów z `adventures.json`
- [ ] "Pokaż więcej" hint (fade-out + strzałka)
- [ ] Drawer/modal z pozostałymi wpisami + animacja wejścia
- [ ] Framer Motion: `whileInView` fade-in + slide-up kart
- [ ] Wpisy z perspektywy Kokosa (pierwsza osoba)

---

## M4 — Galeria
- [ ] Komponent `Gallery.jsx`
- [ ] Poziomy carousel ze strzałkami (lewo/prawo)
- [ ] Zdjęcia z `adventures.json` (pole `photo`)
- [ ] Lightbox po kliknięciu w zdjęcie
- [ ] Framer Motion: animacja przesuwania
- [ ] Touch-swipe na mobile

---

## M5 — Mapa
- [ ] Komponent `Map.jsx`
- [ ] `react-leaflet` z OpenStreetMap (bez API key)
- [ ] Piny na podstawie `lat`/`lng` z `adventures.json`
- [ ] Custom ikona pinu (łapka)
- [ ] Popup po kliknięciu: miniaturka + tytuł przygody
- [ ] Framer Motion: fade-in sekcji przy scrollu

---

## M6 — Countdown do urodzin
- [ ] Komponent `Countdown.jsx`
- [ ] Timer dni/godziny/minuty/sekundy do `BIRTHDAY_DATE`
- [ ] Jeśli `BIRTHDAY_DATE = null` — placeholder "Data wkrótce..."
- [ ] Vintage styl cyfr
- [ ] Framer Motion: animacja cyfr przy zmianie

---

## M7 — Polish & szczegóły
- [ ] Tekstura tła (papier/linen pattern)
- [ ] Stemple/naklejki jako dekoracje między sekcjami
- [ ] Responsywność całości (mobile-first check)
- [ ] Favicon (łapka)
- [ ] Testy na różnych przeglądarkach

---

## M8 — Treść i zdjęcia
- [ ] Zuzia dostarcza zdjęcia Kokosa
- [ ] AI: Kokos na Everescie, w Tokio, nad basenem...
- [ ] Uzupełnienie `adventures.json` prawdziwymi danymi (min. 5–6)
- [ ] Uzupełnienie `BIRTHDAY_DATE` w `config.js`
- [ ] Finalna korekta tekstów

---

## M9 — Finalizacja
- [ ] Ostateczny deploy na Vercel
- [ ] Sprawdzenie linku na różnych urządzeniach
- [ ] README (jeśli wymagany przez prowadzącego)
