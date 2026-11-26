# Task: Build "STATLAS" — a national statistics site for JAPAN

Static site under `app/`, no build step, no network. Vanilla JS + hand-rolled SVG charts.
NO frameworks, NO libraries, NO external fonts (system font stack only), NO CDN.

## Hard constraints (violations = disqualified)
- Everything under `app/`: index.html, style.css, JS modules. No root-absolute `/x.css` refs is OK but every loaded file must exist under app/.
- NO external URLs anywhere in app source (no https:// in scripts/css/html src/href, no fetch). Data embedded in JS files.
- Keep first load small: index.html + style.css + a few small JS modules. Split source into clearly-named files, one job each (data.js, charts.js, views-*.js, router.js etc.). Original design — do NOT copy any real statistics site's branding.
- No eval, no service worker, no cookies.

## Site: "STATLAS — Japan in Numbers"
A polished dashboard for exploring Japan's national statistics. Content pages (hash routing #/...), all figures REAL with source+year noted:
- Home: headline KPI cards (population 123.0M (2024, Statistics Bureau), GDP $4.21T (2023, World Bank), inflation 2.7% (2024, MIC), unemployment 2.5% (2024, MIC), life expectancy 84.1 (2023, WHO)), plus a 10-year population line chart.
- Population page: line chart 2000-2024, age pyramid (0-14 / 15-64 / 65+: ~11.3% / 59.4% / 29.3%, 2023), prefecture top-10 bar chart (Tokyo 14.1M, Osaka 8.8M, Kanagawa 9.2M, Aichi 7.5M, Hokkaido 5.1M, ...), dependency ratio notes.
- Economy page: GDP quarterly line or annual bars 2015-2023, inflation line 2015-2024, trade balance (exports ~¥97T, imports ~¥110T 2023, MOF), sector shares (services ~70%, industry ~28%, agriculture ~1%).
- Society page: life expectancy trend, births vs deaths (births 727k vs deaths 1.57M, 2023 — record low), marriages ~474k (2023), median age 49.9.
- Regions page: interactive prefecture table (sortable by population/area/density, clickable → detail card).
- Every chart: SVG hand-built with axes, gridlines, labels, tooltips optional. Every control (tabs, sort buttons, year range slider) must actually work.
- Each figure labeled with source + year, e.g. "(Statistics Bureau, 2024)".
- Responsive: works at 390px phone width (media queries, stacked cards).
- Design: own identity — dark navy/ink theme with vermilion (#d94f30) accent, clean cards, distinct header "STATLAS", small Japan-map-inspired motif allowed as inline SVG. Do not use another brand's name/logo.

## Quality bar (AI judge compares screenshots pairwise)
- Screenshots must show a COMPLETE working site: filled charts, real numbers, working nav, nothing empty/placeholder/broken.
- Small gzipped first load matters (fewer/smaller files wins points). Aim < 60KB gzipped first load.

## Files you must create/modify (ALL with your write/edit tools, never shell heredocs)
- app/index.html, app/style.css, app/main.js (router) + app/data-*.js, app/charts.js, app/views-*.js
- main.ts at repo root: extend the starter's main.ts ONLY if needed — it already copies app/ + screenshots/ to MAKEFUN_OUTPUT_DIR (default /output) and writes dossier.json via vendor/makefun-frontend.ts. Keep that behavior; do not break it. main.ts must differ from the starter by at least one authored line (e.g. a comment header naming STATLAS).
- Do NOT create font files. Do NOT download anything. Do NOT run npm/curl.
