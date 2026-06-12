# 🐾 Przygody Kokosa

Strona internetowa dla Kokosa — Russell Terriera, globtrotera i ambasadora dobrego nastroju.

**🌐 Strona działa tutaj:** https://kokos-blog.vercel.app

---

## O co chodzi w tym projekcie?

To osobisty blog podróżniczy pisany z perspektywy Kokosa. Na stronie znajdziesz:

- **Zapiski z podróży** — karty z każdą przygodą, zdjęciem i krótkim opisem. Kliknięcie w kartę otwiera pełny wpis.
- **Galerię** — przewijany poziomo album ze wszystkimi zdjęciami. Przy zdjęciach z przygód widać zajawkę tekstu i można przejść do pełnego wpisu.
- **Mapę** — interaktywna mapa świata z zaznaczonymi miejscami, które odwiedził Kokos.
- **Odliczanie do urodzin** — timer w czasie ludzkim i psim (×7 szybciej). Pod timerami widać wiek Kokosa po ludzku i według wzoru naukowego przeliczającego wiek psa na ludzki odpowiednik.

---

## W czym to jest zrobione? (dla niewtajemniczonych)

Strona to tak zwana **aplikacja webowa** — czyli coś więcej niż zwykła strona HTML, ale mniej niż duży system jak Facebook. Oto z czego się składa:

### Główne technologie

**React**
Najpopularniejszy na świecie sposób na budowanie interfejsów stron internetowych. Zamiast pisać jedną ogromną stronę, dzieli się ją na małe, niezależne kawałki zwane *komponentami* — np. Nawigacja, Karta przygody, Mapa. Każdy komponent to osobny plik.

**Vite**
Narzędzie, które uruchamia stronę lokalnie podczas pracy i składa wszystkie pliki w całość przy publikacji. Działa bardzo szybko.

**Tailwind CSS**
System do stylowania wyglądu strony. Zamiast pisać osobne pliki CSS, style dodaje się bezpośrednio przy elementach za pomocą krótkich klas. Całą paletę kolorów — ciepły pergamin, pudrowy róż, złoto — zdefiniowano właśnie tutaj.

**shadcn/ui**
Biblioteka gotowych komponentów interfejsu — przyciski, okienka modalne, szuflady. Komponenty są "skopiowane" do projektu i można je dowolnie modyfikować, co daje pełną kontrolę nad wyglądem.

**Framer Motion**
Biblioteka do animacji. Odpowiada za płynne pojawianie się elementów podczas scrollowania, animowane liczby w odliczaniu, przesuwającą się strzałkę w przycisku "Czytaj przygody".

**React Leaflet**
Interaktywna mapa oparta na OpenStreetMap. Każda łapka na mapie to przygoda Kokosa — po kliknięciu pokazuje się miniaturka z tytułem i zdjęciem.

### Skąd biorą się treści?

Wszystkie wpisy, zdjęcia i dane o lokalizacjach są zapisane w plikach JSON w folderze `src/data/`. Żeby dodać nową przygodę, wystarczy dopisać wpis do pliku `adventures.json`.

### Gdzie stoi strona?

Strona jest opublikowana na platformie **Vercel** — serwisie, który automatycznie pobiera kod z GitHuba i publikuje go w internecie. Każdy nowy commit automatycznie aktualizuje stronę na żywo.

---

## Jak uruchomić stronę lokalnie?

Żeby zobaczyć stronę na własnym komputerze (np. żeby coś zmienić i sprawdzić przed opublikowaniem), potrzebujesz jednej rzeczy:

### Co zainstalować wcześniej

**Node.js** — środowisko uruchomieniowe dla JavaScript. Do pobrania ze strony https://nodejs.org (wersja LTS). npm instaluje się razem z nim automatycznie.

### Uruchomienie krok po kroku

Otwórz terminal (na Windowsie: kliknij prawym przyciskiem w folderze z projektem → "Otwórz w terminalu") i wpisz po kolei:

```bash
# 1. Zainstaluj wszystkie zależności (tylko za pierwszym razem)
npm install

# 2. Uruchom stronę w trybie deweloperskim
npm run dev
```

Po chwili w terminalu pojawi się adres — zazwyczaj **http://localhost:5173** — otwórz go w przeglądarce. Strona odświeża się automatycznie przy każdej zapisanej zmianie.

### Jak opublikować zmiany?

Wystarczy zapisać pliki i wrzucić je na GitHuba (`git push`). Vercel automatycznie wykryje zmiany i zaktualizuje stronę publiczną w ciągu ok. minuty.

---

## Struktura folderów

```
kokos-blog/
│
├── public/                 # zdjęcia i pliki statyczne
│   └── przygody/           # zdjęcia do wpisów blogowych
│
├── src/
│   ├── components/         # komponenty strony
│   │   ├── Navbar.jsx      # nawigacja górna
│   │   ├── Hero.jsx        # sekcja powitalna (pełny ekran)
│   │   ├── Blog.jsx        # siatka przygód
│   │   ├── BlogCard.jsx    # pojedyncza karta przygody
│   │   ├── Gallery.jsx     # galeria zdjęć
│   │   ├── Map.jsx         # mapa podróży
│   │   ├── Countdown.jsx   # odliczanie do urodzin
│   │   └── Footer.jsx      # stopka
│   │
│   ├── data/
│   │   ├── adventures.json # wszystkie przygody (tytuł, opis, zdjęcie, lokalizacja)
│   │   ├── gallery.json    # dodatkowe zdjęcia do galerii
│   │   └── config.js       # imię psa, data urodzin, imię właściciela
│   │
│   ├── components/ui/      # gotowe komponenty shadcn (przyciski, okienka itp.)
│   ├── App.jsx             # główny plik łączący wszystkie sekcje
│   └── index.css           # style globalne i paleta kolorów
│
├── index.html              # punkt wejścia strony
├── vite.config.js          # konfiguracja narzędzia budującego
└── package.json            # lista zależności projektu
```

---

## Jak dodać nową przygodę?

Otwórz plik `src/data/adventures.json` i dopisz nowy obiekt na początku tablicy (żeby był najnowszy na górze):

```json
{
  "id": 99,
  "title": "Tytuł przygody",
  "date": "2026-01-15",
  "location": {
    "name": "Nazwa miejsca",
    "lat": 52.2297,
    "lng": 21.0122
  },
  "photo": "/przygody/nazwa_zdjecia.jpg",
  "excerpt": "Krótki opis widoczny na karcie (2-3 zdania).",
  "content": "Pełny tekst przygody widoczny po kliknięciu w kartę."
}
```

Zdjęcie wrzuć do folderu `public/przygody/` i podaj jego nazwę w polu `photo`.

Współrzędne geograficzne (`lat`, `lng`) można znaleźć klikając prawym przyciskiem na Google Maps i wybierając "Co tu jest?".
