// Economy: output, prices, employment, merchandise trade and value-added shares.
import { gdp, inflation, unemployment, trade, sectors } from './data.js';
import { pageHead, sectionHead, panel, source, segmented, esc, fmt } from './views.js';
import { groupedBars, lineChart, hBarChart, donutChart, legend } from './charts.js';

const state = { priceMetric: 'cpi' };

const priceSeries = () => (state.priceMetric === 'cpi' ? inflation : unemployment);

export function render() {
  const compact = window.innerWidth < 560;
  const price = priceSeries();
  const priceLabel = state.priceMetric === 'cpi' ? 'Consumer prices' : 'Unemployment';

  return `${pageHead({
    index: '02 / ECONOMY',
    title: 'Output, prices, trade.',
    lede: 'The world’s fourth-largest economy in dollar terms, with a weak yen, a narrow inflation surprise and a persistent trade deficit.',
    aside: '2015–2024 · ANNUAL',
  })}
  <div class="facts economy-facts">
    <div class="fact"><b>$4.21T</b><span>GDP, current US dollars</span><small>World Bank, 2023</small></div>
    <div class="fact"><b>2.7%</b><span>Consumer price inflation</span><small>MIC, 2024</small></div>
    <div class="fact"><b>−¥${fmt(Math.abs(trade.balance), 1)}T</b><span>Merchandise trade balance</span><small>MOF, 2023</small></div>
  </div>

  <section class="section grid grid-2">
    ${panel({
      title: 'GDP · 2015–2023',
      controls: '<span class="tag">US$ TRILLION</span>',
      body: `${groupedBars([{ values: gdp, color: 'var(--accent)', name: 'GDP' }], {
        compact, yTitle: 'US$ TRILLION', unit: 'T', digits: 1, labelDigits: 1, showAllValues: true,
        label: 'Gross domestic product in current US dollars, trillions, 2015 to 2023',
      })}`,
      foot: source('World Bank, World Development Indicators, 2023'),
    })}
    <article class="card price-panel">
      <div class="card-head"><h3 id="price-title">${esc(priceLabel)} · 2015–2024</h3>
        ${segmented('price', [
          { value: 'cpi', label: 'CPI inflation' },
          { value: 'jobless', label: 'Unemployment' },
        ], state.priceMetric)}
      </div>
      <p class="card-sub" id="price-sub">${state.priceMetric === 'cpi' ? 'Annual change in the consumer price index, percent' : 'Annual average unemployment rate, percent'}</p>
      <div id="price-chart">${priceChart()}</div>
      ${source('Ministry of Internal Affairs and Communications, 2015–2024')}
    </article>
  </section>

  <section class="section grid grid-2">
    ${panel({
      title: 'Merchandise trade · 2023',
      controls: '<span class="tag">¥ TRILLION</span>',
      body: `${hBarChart([
        { label: 'Exports', value: trade.exports },
        { label: 'Imports', value: trade.imports },
      ], { compact, max: 120, unit: 'T', digits: 1, colors: ['var(--teal)', 'var(--accent)'], label: 'Merchandise exports and imports in trillion yen, 2023' })}
      <div class="callout" style="margin-top:14px"><b>−¥${fmt(Math.abs(trade.balance), 1)}T</b><span>Imports exceeded exports by ¥13.1 trillion in ${trade.year}.</span></div>`,
      foot: source('Ministry of Finance, Trade Statistics, 2023'),
    })}
    ${panel({
      title: 'Where the value is made',
      controls: '<span class="tag">GVA SHARE · 2023</span>',
      body: `<div class="grid grid-2" style="align-items:center">
        <div>${donutChart(sectors, { compact, center: 'GVA 2023', label: 'Sector shares of gross value added, 2023' })}</div>
        <div>${legend(sectors.map((s) => ({ name: s.label, color: s.color })))}
          <ul class="note-list" style="margin-top:12px">
            <li><b>Services</b> account for about seven tenths of value added.</li>
            <li><b>Industry</b> contributes just over a quarter; <b>agriculture</b> about one percent.</li>
          </ul>
        </div>
      </div>`,
      foot: source('World Bank / Cabinet Office, 2023 (rounded shares)'),
    })}
  </section>`;
}

function priceChart() {
  const values = priceSeries();
  const isCpi = state.priceMetric === 'cpi';
  return lineChart([{ values, color: isCpi ? 'var(--accent)' : 'var(--teal)', name: isCpi ? 'CPI' : 'Unemployment' }], {
    compact: window.innerWidth < 560, yTitle: 'PERCENT', unit: '%', digits: 1,
    label: `${isCpi ? 'Consumer price inflation' : 'Unemployment rate'} from 2015 to 2024, percent`,
  });
}

export function mount(root) {
  const box = root.querySelector('#price-chart');
  const title = root.querySelector('#price-title');
  const sub = root.querySelector('#price-sub');
  const buttons = Array.from(root.querySelectorAll('[data-price]'));

  function draw() {
    box.innerHTML = priceChart();
    const isCpi = state.priceMetric === 'cpi';
    title.textContent = `${isCpi ? 'Consumer prices' : 'Unemployment'} · 2015–2024`;
    sub.textContent = isCpi ? 'Annual change in the consumer price index, percent' : 'Annual average unemployment rate, percent';
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.price === state.priceMetric)));
  }
  buttons.forEach((b) => b.addEventListener('click', () => {
    state.priceMetric = b.dataset.price;
    draw();
  }));
  draw();
}
