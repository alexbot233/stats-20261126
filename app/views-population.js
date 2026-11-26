// Population: a windowed trend, the age pyramid, dependency notes and the ten largest prefectures.
import { population, ageShares, dependency, prefectures, windowed } from './data.js';
import { pageHead, sectionHead, panel, source, segmented, esc, fmt } from './views.js';
import { lineChart, hBarChart, pyramidChart, legend } from './charts.js';

const state = { metric: 'total', start: 2000 };

function seriesForState() {
  const years = windowed(population, state.start, 2024);
  if (state.metric === 'change') {
    return {
      values: years.slice(1).map((d, i) => ({ year: d.year, value: Math.round((d.value - years[i].value) * 100) / 100 })),
      yTitle: 'ANNUAL CHANGE, MILLIONS', unit: 'M', digits: 1, label: 'Annual change in resident population, millions',
    };
  }
  return {
    values: years, yTitle: 'MILLION PEOPLE', unit: 'M', digits: 1, label: 'Resident population, millions',
  };
}

function trendChart() {
  const s = seriesForState();
  return lineChart([{ values: s.values, color: 'var(--accent)', name: 'Population' }], {
    compact: window.innerWidth < 560, yTitle: s.yTitle, unit: s.unit, digits: s.digits, label: s.label,
  });
}

export function render() {
  const compact = window.innerWidth < 560;
  const top = prefectures.slice().sort((a, b) => b.pop - a.pop).slice(0, 10);
  const share = Math.round((top.reduce((t, p) => t + p.pop, 0) / 124.4) * 100);
  const bars = top.map((p) => ({ label: p.name, value: p.pop }));

  return `${pageHead({
    index: '01 / POPULATION',
    title: 'A country getting older.',
    lede: 'The resident count peaked in the 2000s and has fallen every year since 2010. The age structure tells the longer story.',
    aside: '2000–2024 · ANNUAL',
  })}
  <div class="facts">
    <div class="fact"><b>123.0M</b><span>Resident population</span><small>Statistics Bureau, 2024</small></div>
    <div class="fact"><b>29.3%</b><span>Aged 65 and over</span><small>Statistics Bureau, 2023</small></div>
    <div class="fact"><b>${fmt(dependency.total, 1)}</b><span>Dependants per 100 working age</span><small>Statistics Bureau, 2023</small></div>
  </div>

  <section class="section">
    ${sectionHead({
      index: 'TREND / 2000–2024',
      title: 'Resident population',
      note: 'Choose the window start year; the series always ends in 2024.',
      right: `<div class="controls" style="margin:0">${segmented('metric', [
        { value: 'total', label: 'Total population' },
        { value: 'change', label: 'Annual change' },
      ], state.metric)}</div>`,
    })}
    <article class="card">
      <div class="controls">
        <label class="range-control" for="pop-start"><span>Start year</span>
          <input id="pop-start" type="range" min="2000" max="2020" step="1" value="${state.start}">
          <output id="pop-window">${state.start}–2024</output>
        </label>
      </div>
      <div id="pop-chart">${trendChart()}</div>
      ${source('Statistics Bureau of Japan, Population Estimates, 2000–2024')}
    </article>
  </section>

  <section class="section grid grid-2">
    ${panel({
      title: 'Age pyramid · 2023',
      controls: '<span class="tag">THREE BROAD BANDS</span>',
      body: `${pyramidChart(ageShares, { compact, label: 'Share of population by age group, 2023' })}
        ${legend(ageShares.map((a) => ({ name: `${a.label} · ${a.detail}`, color: a.color })))}
        <ul class="note-list" style="margin-top:14px">
          <li><b>${fmt(dependency.total, 1)}</b> dependants per 100 people of working age.</li>
          <li><b>${fmt(dependency.old, 1)}</b> older dependants and <b>${fmt(dependency.child, 1)}</b> children per 100.</li>
          <li>Children are now a smaller share of the population than adults 65 and over.</li>
        </ul>`,
      foot: source('Statistics Bureau of Japan, 2023'),
    })}
    ${panel({
      title: 'Ten largest prefectures',
      controls: '<span class="tag">2023 · MILLIONS</span>',
      body: `${hBarChart(bars, { compact, max: 16, unit: 'M', digits: 1, label: 'Ten prefectures with the largest populations, millions' })}
        <p class="note-list" style="margin-top:12px">Together these ten prefectures hold about <b>${share}%</b> of the national population. Tokyo alone accounts for <b>14.1M</b>.</p>`,
      foot: source('Statistics Bureau of Japan, 2023'),
    })}
  </section>`;
}

export function mount(root) {
  const box = root.querySelector('#pop-chart');
  const out = root.querySelector('#pop-window');
  const slider = root.querySelector('#pop-start');
  const buttons = Array.from(root.querySelectorAll('[data-metric]'));

  function draw() {
    box.innerHTML = trendChart();
    out.textContent = `${state.start}–2024`;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.metric === state.metric)));
  }
  buttons.forEach((b) => b.addEventListener('click', () => {
    state.metric = b.dataset.metric;
    draw();
  }));
  slider.addEventListener('input', () => {
    state.start = Number(slider.value);
    draw();
  });
  draw();
}
