// Overview: headline figures, decade of population change, and links into the atlas.
import { kpis, population, windowed, vital, trade, medianAge } from './data.js';
import { pageHead, sectionHead, source, esc, fmt } from './views.js';
import { lineChart, sparkline } from './charts.js';

const sparkColors = ['var(--accent)', 'var(--teal)', 'var(--gold)', 'var(--blue)', 'var(--accent)'];

export function render() {
  const compact = window.innerWidth < 560;
  const decade = windowed(population, 2015, 2024);
  const cards = kpis
    .map(
      (k, i) => `<article class="card kpi">
        <div class="kpi-label">${esc(k.label)}</div>
        <div class="kpi-value">${esc(k.value)}<small>${esc(k.unit)}</small></div>
        <div class="kpi-note">${esc(k.note)}</div>
        <div class="spark">${sparkline(k.trend, { color: sparkColors[i] })}</div>
        ${source(k.source)}
      </article>`,
    )
    .join('');

  return `${pageHead({
    index: 'STATLAS / OVERVIEW',
    title: 'Japan, in numbers.',
    lede: 'A compact atlas of the country’s people, output and everyday life — figures traceable to their source and year.',
    aside: '5 INDICATORS · 47 PREFECTURES',
  })}
  <div class="hero">
    <div>
      <div class="eyebrow">The national picture</div>
      <h1>Five signals, <em>one country.</em></h1>
      <p class="lede">A shrinking, long-lived, highly urban population with a mature economy and a widening gap between births and deaths.</p>
    </div>
    <div class="hero-note"><strong>Read this atlas</strong><br>Every panel below names its source and reference year. Trends use the same published series as the headline figure.</div>
  </div>

  <section class="section">
    ${sectionHead({ index: '01 / HEADLINE FIGURES', title: 'At a glance', note: 'Latest published values, with ten-year sparks where available.' })}
    <div class="grid grid-5">${cards}</div>
  </section>

  <section class="section grid grid-2">
    <article class="card">
      <div class="card-head"><h3>Resident population · 2015–2024</h3><span class="tag">10 YEARS</span></div>
      <p class="card-sub">Millions of residents, 1 October each year</p>
      ${lineChart([{ values: decade, color: 'var(--accent)', name: 'Population' }], {
        compact, yTitle: 'MILLION PEOPLE', unit: 'M', digits: 1, label: 'Resident population from 2015 to 2024, in millions',
      })}
      ${source('Statistics Bureau of Japan, 2024')}
    </article>
    <div class="stack">
      <article class="card">
        <div class="card-head"><h3>Pressure points</h3></div>
        <div class="facts">
          <div class="fact"><b>${fmt(vital.births, 0)}k</b><span>Births in ${vital.year}</span><small>MHLW, ${vital.year}</small></div>
          <div class="fact"><b>${fmt(vital.deaths / 1000, 2)}M</b><span>Deaths in ${vital.year}</span><small>MHLW, ${vital.year}</small></div>
          <div class="fact"><b>¥${fmt(Math.abs(trade.balance), 1)}T</b><span>Trade deficit</span><small>MOF, ${trade.year}</small></div>
        </div>
        <p class="note-list" style="margin-top:14px">Natural change was <b>−${fmt(Math.abs(vital.naturalChange), 0)}k</b> people in ${vital.year}; the median age reached <b>${fmt(medianAge.value, 1)}</b> years.</p>
        ${source('MHLW / Ministry of Finance / Statistics Bureau, 2023–2024')}
      </article>
      <article class="card">
        <div class="card-head"><h3>Explore the atlas</h3></div>
        <p class="card-sub">Four lenses on the same country.</p>
        <div class="quicklinks" style="grid-template-columns:repeat(2,minmax(0,1fr))">
          <a class="quicklink" href="#/population"><strong>Population</strong><span>Age structure & prefectures</span><em>123.0M →</em></a>
          <a class="quicklink" href="#/economy"><strong>Economy</strong><span>Output, prices & trade</span><em>$4.21T →</em></a>
          <a class="quicklink" href="#/society"><strong>Society</strong><span>Health & family life</span><em>84.1 yrs →</em></a>
          <a class="quicklink" href="#/regions"><strong>Regions</strong><span>All 47 prefectures</span><em>47 →</em></a>
        </div>
      </article>
    </div>
  </section>`;
}

export function mount() {}
