// Society: longevity, the vital balance, marriages and median age.
import { lifeExpectancy, births, deaths, vital, marriages, medianAge } from './data.js';
import { pageHead, sectionHead, panel, source, fmt } from './views.js';
import { lineChart, groupedBars, hBarChart, legend } from './charts.js';

export function render() {
  const compact = window.innerWidth < 560;
  const birthSets = [
    { values: births, color: 'var(--teal)', name: 'Births' },
    { values: deaths, color: 'var(--accent)', name: 'Deaths' },
  ];

  return `${pageHead({
    index: '03 / SOCIETY',
    title: 'Long lives, fewer births.',
    lede: 'Japan combines the world’s highest life expectancy with a rapid fall in marriages and births — a demographic squeeze visible in every annual series.',
    aside: '2010–2024 · VITAL STATISTICS',
  })}
  <div class="facts">
    <div class="fact"><b>84.1</b><span>Years of life expectancy</span><small>WHO, 2023</small></div>
    <div class="fact"><b>${fmt(vital.births, 0)}k</b><span>Births, record low</span><small>MHLW, 2023</small></div>
    <div class="fact"><b>1.57M</b><span>Deaths in the same year</span><small>MHLW, 2023</small></div>
  </div>

  <section class="section grid grid-2">
    ${panel({
      title: 'Life expectancy at birth · 2010–2023',
      controls: '<span class="tag">BOTH SEXES</span>',
      body: `${lineChart([{ values: lifeExpectancy, color: 'var(--teal)', name: 'Life expectancy' }], {
        compact, yTitle: 'YEARS', unit: ' yrs', digits: 1,
        label: 'Life expectancy at birth from 2010 to 2023, years',
      })}`,
      foot: source('WHO, World Health Statistics, 2023'),
    })}
    ${panel({
      title: 'Births against deaths · 2015–2023',
      controls: '<span class="tag">THOUSANDS</span>',
      body: `${groupedBars(birthSets, { compact, yTitle: 'THOUSANDS OF EVENTS', digits: 0, unit: 'k', label: 'Annual births and deaths in thousands, 2015 to 2023' })}
        ${legend(birthSets.map((s) => ({ name: s.name, color: s.color })))}
        <div class="callout" style="margin-top:14px"><b>${fmt(Math.abs(vital.naturalChange), 0)}k</b><span>More deaths than births in ${vital.year} — the natural decrease.</span></div>`,
      foot: source('Ministry of Health, Labour and Welfare, Vital Statistics, 2023'),
    })}
  </section>

  <section class="section grid grid-2">
    ${panel({
      title: 'The 2023 balance',
      controls: '<span class="tag">THOUSANDS</span>',
      body: `${hBarChart([
        { label: 'Births', value: vital.births },
        { label: 'Deaths', value: vital.deaths },
        { label: 'Marriages', value: marriages.value },
      ], { compact, max: 1600, unit: 'k', digits: 0, colors: ['var(--teal)', 'var(--accent)', 'var(--gold)'], label: 'Births, deaths and marriages in 2023, thousands' })}
        <p class="note-list" style="margin-top:12px">Record-low births of <b>${fmt(vital.births, 0)}k</b> sit beside <b>${fmt(vital.deaths, 0)}k</b> deaths; about <b>${fmt(marriages.value, 0)}k</b> marriages were registered.</p>`,
      foot: source('MHLW, Vital Statistics, 2023'),
    })}
    <div class="stack">
      <article class="card">
        <div class="card-head"><h3>Family formation & ageing</h3></div>
        <div class="facts">
          <div class="fact"><b>${fmt(marriages.value, 0)}k</b><span>Marriages in 2023</span><small>MHLW, 2023</small></div>
          <div class="fact"><b>${fmt(medianAge.value, 1)}</b><span>Median age, years</span><small>Statistics Bureau, 2023</small></div>
          <div class="fact"><b>29.3%</b><span>Aged 65 and over</span><small>Statistics Bureau, 2023</small></div>
        </div>
        <p class="note-list" style="margin-top:14px">With a median age near <b>${fmt(medianAge.value, 1)}</b>, barely one resident in nine is under 15. Fewer marriages and later parenthood reinforce the narrow young base of the age pyramid.</p>
        ${source('MHLW / Statistics Bureau of Japan, 2023')}
      </article>
      <article class="card">
        <div class="card-head"><h3>What to notice</h3></div>
        <p class="note-list">Longevity has kept rising, reaching <b>84.1 years</b> in 2023 after the pandemic dip. The number of deaths has risen steadily, while births have fallen by roughly <b>${fmt(births[0].value - births[births.length - 1].value, 0)}k</b> since 2015.</p>
        ${source('WHO, 2023 · MHLW, Vital Statistics, 2015–2023')}
      </article>
    </div>
  </section>`;
}

export function mount() {}
