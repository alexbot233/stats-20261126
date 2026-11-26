// Small shared HTML helpers. No framework: views are plain strings with escaped values.
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const fmt = (n, digits = 1) => Number(n).toFixed(digits).replace(/\.0+$/, '');

export const source = (text) => `<p class="source">Source: ${esc(text)}</p>`;

export function panel({ title, sub = '', controls = '', body = '', foot = '' }) {
  return `<section class="card">
    <div class="card-head"><h3>${esc(title)}</h3>${controls}</div>
    ${sub ? `<p class="card-sub">${esc(sub)}</p>` : ''}
    ${body}
    ${foot}
  </section>`;
}

export function pageHead({ index, title, lede, aside = '' }) {
  return `<div class="page-head">
    <div><div class="eyebrow">${esc(index)}</div><h1>${esc(title)}</h1><p>${esc(lede)}</p></div>
    ${aside ? `<div class="page-index">${esc(aside)}</div>` : ''}
  </div>`;
}

export function sectionHead({ index, title, note = '', right = '' }) {
  return `<div class="section-head">
    <div><div class="eyebrow">${esc(index)}</div><h2>${esc(title)}</h2>${note ? `<p>${esc(note)}</p>` : ''}</div>
    ${right}
  </div>`;
}

export function segmented(name, options, active) {
  return `<div class="segmented" role="group" aria-label="${esc(name)}">${options
    .map((o) => `<button type="button" data-${esc(name)}="${esc(o.value)}" aria-pressed="${o.value === active}">${esc(o.label)}</button>`)
    .join('')}</div>`;
}
