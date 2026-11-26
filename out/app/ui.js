// Shared presentation pieces for STATLAS views: escaping, card shells and the
// small archipelago motif. No markup here comes from the network.

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ENTITIES[c]);

export const int = (n) => Math.round(n).toLocaleString('en-US');

export function source(text) {
  return `<p class="source">${esc(text)}</p>`;
}

export function card({ kicker = '', title, body, note = '', className = '' }) {
  return `<section class="card ${className}">
    ${kicker || title ? `<div class="card-head">
      <div>${kicker ? `<div class="card-kicker">${esc(kicker)}</div>` : ''}${title ? `<h2>${esc(title)}</h2>` : ''}</div>
    </div>` : ''}
    ${body}
    ${note ? source(note) : ''}
  </section>`;
}

export function intro({ kicker, title, text, badge }) {
  return `<div class="page-intro">
    <div class="eyebrow">${esc(kicker)}</div>
    <h1>${esc(title)}</h1>
    <p>${esc(text)}</p>
    ${badge ? `<div class="intro-badge">${esc(badge)}</div>` : ''}
  </div>`;
}

// A deliberately abstract island-chain mark, drawn here rather than loaded.
export function mapMotif() {
  return `<svg class="map-motif" viewBox="0 0 300 210" role="img" aria-label="Abstract map motif of the Japanese archipelago">
    <g stroke="#243650" stroke-width="1">
      <path d="M20 40H280M20 85H280M20 130H280M20 175H280" stroke-dasharray="2 7"/>
      <path d="M50 15V195M105 15V195M160 15V195M215 15V195M270 15V195" stroke-dasharray="2 7"/>
    </g>
    <g fill="#d94f30" opacity=".85">
      <ellipse cx="211" cy="39" rx="22" ry="10" transform="rotate(-28 211 39)"/>
      <ellipse cx="182" cy="72" rx="22" ry="9" transform="rotate(-22 182 72)"/>
    </g>
    <g fill="#d94f30" opacity=".52">
      <ellipse cx="158" cy="91" rx="24" ry="8" transform="rotate(-20 158 91)"/>
      <ellipse cx="131" cy="109" rx="25" ry="8" transform="rotate(-16 131 109)"/>
      <ellipse cx="105" cy="126" rx="20" ry="8" transform="rotate(-14 105 126)"/>
    </g>
    <g fill="#56b1a4" opacity=".72">
      <ellipse cx="120" cy="145" rx="16" ry="7" transform="rotate(-12 120 145)"/>
      <ellipse cx="82" cy="155" rx="17" ry="10" transform="rotate(-28 82 155)"/>
      <ellipse cx="53" cy="185" rx="8" ry="4" transform="rotate(-25 53 185)"/>
    </g>
    <circle cx="174" cy="78" r="11" fill="none" stroke="#e3b862" stroke-width="1.4"/>
    <circle cx="174" cy="78" r="3.6" fill="#e3b862"/>
    <text x="192" y="97" fill="#93a3bb" font-size="9" letter-spacing="1.6">35.7 N / 139.7 E</text>
    <text x="20" y="203" fill="#60728f" font-size="9" letter-spacing="2">47 PREFECTURES · ONE ARCHIPELAGO</text>
  </svg>`;
}
