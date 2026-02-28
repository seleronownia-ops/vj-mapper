# VJ Mapper — Architecture

## Cel
Aplikacja do spatial mapping z projekcją na dowolne powierzchnie. Automatyczna kalibracja, segmentacja sceny, generatywne shadery ISF. Priorytet: łatwość konfiguracji, minimum ręcznej roboty dla usera.

## Stack
- **Tauri (native app)** — Rust backend + WebView UI od dnia 1
  - Instalacja jako .exe / .app / .dmg
  - Pełny dostęp do GPU, kamer, plików
- **ONNX Runtime (natywny, Rust)** — modele segmentacji, tracking, zero kosztów
- **WebGL2** — ISF shader rendering (w WebView)
- **OpenCV (natywny, Rust bindings)** — kalibracja, homografia, korekcja perspektywy
- **Komunikacja:** Tauri IPC (Rust backend ↔ WebView frontend)

---

## Faza 1: Kalibracja + Segmentacja + Mapping

### 1.1 Kalibracja (auto-setup, live)
Kamera stoi przy projektorze, obraz stabilny.

Klucz: **oddzielenie realnej sceny od projekcji**.

```
1. Projektor OFF (czarny ekran)
2. Kamera → zdjęcie sceny (ambient / doświetlenie)
3. Segmentacja sceny → realne kształty (ściana, okno, kolumna...)
4. Projektor ON → wzór kalibracyjny (structured light)
5. Kamera → zdjęcie sceny Z wzorem
6. Diff obraz 2 vs 5 → wykrycie zakresu rzutnika
7. Teraz znamy: kształty realne (3) + zasięg projekcji (6)
8. Dopasowanie: warp/zoom/perspective projekcji do realnych kształtów
9. Weryfikacja: projektor rzuca dopasowany obraz → kamera sprawdza
10. Iteracja jeśli potrzebna
    ↓
User: minimalne korekty (drag corners) lub akceptacja
```

Powierzchnie: dowolne (płaskie, zakrzywione, narożniki, nieregularne).

### 1.2 Segmentacja sceny
Wielowarstwowa:

**Warstwa 1: YOLO26n-seg** (ONNX Runtime Web)
- Instance segmentation, 80 klas COCO
- Obiekty: ludzie, meble, przedmioty

**Warstwa 2: Semantic segmentation** (ADE20K lub podobny)
- 150 klas: ściana, podłoga, sufit, okno, kolumna...
- Architektura, elementy budynku

**Warstwa 3: Interactive (SAM-like)**
- User klika/rysuje → "segmentuj to"
- Dla niestandardowych regionów

**Warstwa 4 (przyszłość): Custom mały model**
- Wytrenowany na konkretnych use-case'ach
- Łączący najlepsze cechy warstw 1-3

Tryby mapowania ukrywają złożoność — user wybiera tryb, pod spodem modele współpracują.

### 1.3 Mapping: segmenty → shadery
- Segmenty to "okna" do shaderów lecących pod spodem
- Shadery ISF chodzą ciągle (full-screen), segmenty wycinają podgląd
- Każdy segment może być przypisany do dowolnego shadera
- Grupowanie segmentów — łatwe, przyjazne UI
- Ręczna edycja regionów (polygon tool) jako fallback

---

## Faza 2: Live + Tracking + Content Design

### 2.1 Tryb live + Tracking (warstwa persystencji)
Po konfiguracji → przejście do trybu live:
- Segmentacja real-time (YOLO26n-seg, natywny ONNX w Rust)
- **Tracking segmentów (BoT-SORT/ByteTrack)** — stabilne ID per obiekt
  - Segment ID 7 = "osoba" → shader "glitch" → state preserved między klatkami
  - Nawet przy chwilowej utracie → bufor: trzymaj maskę N klatek przed usunięciem
- **Problem:** wielokrotna segmentacja tego samego kadru = inna kolejność/wyniki
- **Rozwiązanie:** tracking nadaje persystentne ID, nie indeksy z segmentacji
- Stabilność: ten sam obiekt = ten sam segment ID = ten sam shader state

### 2.1b Interaktywna segmentacja (SAM-like / "sticker cut")
- User tapuje/zaznacza obiekt → wycięcie jak naklejka na iPhone
- Zaznaczanie czegokolwiek — nie ograniczone do klas modelu
- Przydatne do niestandardowych regionów w trybie konfiguracji
- Model SAM (lub lżejszy wariant) w Rust backend

### 2.2 Preset System (wagoniki w loopie)
```
Presety: A, B, C, D, ...

Każdy preset = zestaw przypisań (segment → shader + parametry)

Preset A:
  - segment "ściana" → shader "plasma" 
  - segment "osoba" → shader "glitch"
  
Preset B:
  - segment "ściana" → shader "noise_field"
  - segment "osoba" → shader "mirror"

Pipeline presetów: D → A → C → B → loop
Każdy preset może się loopować wewnętrznie
Tranzycje między presetami (fade/cut/morph)
```

Segment może być wpięty do wielu presetów.
Na włączenie presetu B → startują wszystkie shadery przypisane do B.

### 2.3 Timeline
- Wagoniki na osi czasu (loop)
- Każdy wagonik = preset + czas trwania
- Wagoniki mogą się loopować indywidualnie
- Drag & drop do ustawiania kolejności

---

## Faza 3: AI Shader Generation

### 3.1 Shader Mixing
- **Algorytmiczne (C):** parametryczne łączenie fragmentów ISF — blending uniforms, łączenie pass-ów, mixowanie kolorów
- **Lokalne małe modele (B):** wytrenowane na korpusie ISF shaderów, generują nowe kombinacje
  - Trenowane z uwzględnieniem stylu/smaku usera
  - User wybiera kierunek, model podąża
- **LLM API (A):** jako upgrade, generowanie GLSL z opisu

### 3.2 Custom Training
- User ocenia wygenerowane shadery (like/dislike)
- Model uczy się preferencji estetycznych
- Reinforcement z ludzkim feedbackiem na shader output

---

## Model danych

```
Project
├── Scene (kalibracja + segmenty)
│   ├── Calibration (homografia, korekcja)
│   ├── Segments[] (maski, nazwy, grupy)
│   └── SegmentationConfig (które modele, tryb)
├── Shaders[]
│   ├── ISF predefiniowane
│   ├── ISF custom/generowane
│   └── Shader parameters (uniforms)
├── Presets[]
│   ├── Mappings[] (segment → shader + params)
│   └── Loop config
├── Timeline
│   ├── Wagons[] (preset + duration + loop?)
│   └── Pipeline order
└── Config
    ├── Camera source
    ├── Output (fullscreen/window/NDI)
    └── Performance settings
```

---

## Priorytety budowania

1. **Camera input + YOLO26n-seg w przeglądarce** — proof of concept
2. **ISF shader renderer (WebGL2)** — odpalenie shaderów
3. **Segment → shader mapping** — łączenie 1+2
4. **Kalibracja** — auto-setup z feedback loop
5. **Preset system + timeline**
6. **Tracking (live mode)**
7. **AI shader generation**
