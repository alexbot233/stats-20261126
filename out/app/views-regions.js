// Regions: a sortable, filterable table of all 47 prefectures with a live detail card.
import { prefectures, regions, densityOf } from './data.js';
import { pageHead, source, esc, fmt } from './views.js';

const state = { key: 'pop', dir: -1, region: 'All regions', query: '', selected: 'Tokyo' };
const columns = [
  { key: 'name', label: 'Prefecture' },
  { key: 'region', label: 'Region' },
  { key: 'pop', label: 'Population (M)', num: true },
  { key: 'area', label: 'Area (km²)', num: true },
  { key: 'density', label: 'Density (/km²)', num: true },
];

function value(p, key) {
  return key === 'density' ? densityOf(p) : p[key];
}

function rows() {
  const q = state.query.trim().toLowerCase();
  return prefectures
    .filter((p) => (state.region === 'All regions' || p.region === state.region)
      && (!q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)))
    .sort((a, b) => {
      const av = value(a, state.key);
      const bv = value(b, state.key);
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return cmp * state.dir || a.name.localeCompare(b.name);
    });
}

function rowHtml(p) {
  return `<tr data-pref="${esc(p.name)}" tabindex="0" aria-selected="${p.name === state.selected}">
    <td>${esc(p.name)}</td><td><span class="tag">${esc(p.region)}</span></td>
    <td class="num">${fmt(p.pop, 1)}</td>
    <td class="num">${p.area.toLocaleString('en-US')}</td>
    <td class="num">${Math.round(densityOf(p)).toLocaleString('en-US')}</td>
  </tr>`;
}

function detailHtml() {
  const p = prefectures.find((x) => x.name === state.selected) || prefectures[0];
  const rank = prefectures.slice().sort((a, b) => b.pop - a.pop).findIndex((x) => x.name === p.name) + 1;
  return `<div class="detail-region">${esc(p.region)} · PREFECTURE</div>
    <h3>${esc(p.name)}</h3>
    <p class="card-sub">Prefectural capital: ${esc(p.capital)}</p>
    <div class="detail-grid">
      <div><b>${fmt(p.pop, 1)}M</b><span>POPULATION · 2023</span></div>
      <div><b>${p.area.toLocaleString('en-US')}</b><span>AREA · KM²</span></div>
      <div><b>${Math.round(densityOf(p)).toLocaleString('en-US')}</b><span>PEOPLE / KM²</span></div>
    </div>
    <p class="note-list" style="margin-top:14px">Ranked <b>#${rank}</b> of 47 by population; about <b>${fmt((p.pop / 124.4) * 100, 1)}%</b> of the national total lives here.</p>`;
}

export function render() {
  const list = rows();
  return `${pageHead({
    index: '04 / REGIONS',
    title: 'All 47 prefectures.',
    lede: 'Sort by people, land or density; filter by region or name; select a row to see its profile.',
    aside: '2023 ESTIMATES',
  })}
  <section class="section">
    <div class="table-tools">
      <label class="field"><span>Search</span><input id="region-search" type="search" placeholder="Name or capital" value="${esc(state.query)}" autocomplete="off"></label>
      <label class="field"><span>Region</span><select id="region-filter">${regions
        .map((r) => `<option value="${esc(r)}"${r === state.region ? ' selected' : ''}>${esc(r)}</option>`)
        .join('')}</select></label>
      <span class="count" id="region-count">${list.length} of 47 prefectures</span>
    </div>
    <div class="grid grid-2" style="grid-template-columns:minmax(0,1.7fr) minmax(0,1fr)">
      <div class="table-wrap">
        <table>
          <thead><tr>${columns
            .map((c) => `<th class="${c.num ? 'num' : ''}"><button type="button" data-sort="${c.key}" aria-sort="${state.key === c.key ? (state.dir === 1 ? 'ascending' : 'descending') : 'none'}">${esc(c.label)}<span class="sortmark">${state.key === c.key ? (state.dir === 1 ? '▲' : '▼') : ''}</span></button></th>`)
            .join('')}</tr></thead>
          <tbody id="region-rows">${list.length ? list.map(rowHtml).join('') : '<tr><td class="empty" colspan="5">No prefectures match this filter.</td></tr>'}</tbody>
        </table>
      </div>
      <article class="card" style="align-self:start;position:sticky;top:96px">
        <div class="card-head"><h3>Prefecture profile</h3><span class="tag">SELECTED</span></div>
        <div id="region-detail">${detailHtml()}</div>
        ${source('Statistics Bureau of Japan, 2023; GSI, land area')}
      </article>
    </div>
  </section>`;
}

export function mount(root) {
  const tbody = root.querySelector('#region-rows');
  const detail = root.querySelector('#region-detail');
  const count = root.querySelector('#region-count');
  const search = root.querySelector('#region-search');
  const filter = root.querySelector('#region-filter');
  const heads = Array.from(root.querySelectorAll('[data-sort]'));

  function update() {
    const list = rows();
    if (list.length && !list.some((p) => p.name === state.selected)) state.selected = list[0].name;
    tbody.innerHTML = list.length ? list.map(rowHtml).join('') : '<tr><td class="empty" colspan="5">No prefectures match this filter.</td></tr>';
    detail.innerHTML = detailHtml();
    count.textContent = `${list.length} of 47 prefectures`;
    heads.forEach((b) => {
      const active = b.dataset.sort === state.key;
      b.setAttribute('aria-sort', active ? (state.dir === 1 ? 'ascending' : 'descending') : 'none');
      b.querySelector('.sortmark').textContent = active ? (state.dir === 1 ? '▲' : '▼') : '';
    });
  }

  heads.forEach((b) => b.addEventListener('click', () => {
    const key = b.dataset.sort;
    if (state.key === key) state.dir *= -1;
    else {
      state.key = key;
      state.dir = key === 'name' || key === 'region' ? 1 : -1;
    }
    update();
  }));
  search.addEventListener('input', () => {
    state.query = search.value;
    update();
  });
  filter.addEventListener('change', () => {
    state.region = filter.value;
    update();
  });
  tbody.addEventListener('click', (e) => {
    const tr = e.target.closest('[data-pref]');
    if (!tr) return;
    state.selected = tr.dataset.pref;
    update();
  });
  tbody.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const tr = e.target.closest('[data-pref]');
    if (!tr) return;
    e.preventDefault();
    state.selected = tr.dataset.pref;
    update();
  });
  update();
}
