// Hand-rolled SVG charts. Every main chart carries axes, gridlines, tick labels and a source line in its panel.
import { esc, fmt } from './views.js';

let seriesId = 0;
const uid = () => `g${++seriesId}`;

function svg(inner, w, h, label) {
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${inner}</svg>`;
}

function niceStep(raw) {
  if (!Number.isFinite(raw) || raw <= 0) return 1;
  const exp = Math.floor(Math.log10(raw));
  const base = Math.pow(10, exp);
  const f = raw / base;
  const m = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return m * base;
}

function niceMax(v) {
  const step = niceStep(v / 4);
  return Math.ceil(v / step) * step || 1;
}

function tickText(v, digits) {
  return fmt(v, digits === undefined ? (Math.abs(v) < 10 ? 1 : 0) : digits);
}

function legend(sets) {
  return `<ul class="legend">${sets.map((s) => `<li><i style="background:${esc(s.color)}"></i>${esc(s.name)}</li>`).join('')}</ul>`;
}
export { legend };

/** One or more year/value series; axes, gridlines, points and native tooltips. */
export function lineChart(sets, opts = {}) {
  const compact = !!opts.compact;
  const w = opts.width || (compact ? 360 : 700);
  const h = opts.height || (compact ? 232 : 288);
  const m = { t: 22, r: compact ? 14 : 26, b: compact ? 28 : 32, l: compact ? 40 : 50 };
  const pw = w - m.l - m.r;
  const ph = h - m.t - m.b;
  const years = sets[0].values.map((d) => d.year);
  const n = years.length;
  const all = sets.reduce((acc, s) => acc.concat(s.values.map((d) => d.value)), []);
  const rawMin = opts.min !== undefined ? opts.min : Math.min(...all);
  const rawMax = opts.max !== undefined ? opts.max : Math.max(...all);
  const span = rawMax - rawMin || Math.max(1, Math.abs(rawMax) * 0.1);
  const yMin = opts.min !== undefined ? opts.min : rawMin - span * 0.12;
  const yMax = opts.max !== undefined ? opts.max : rawMax + span * 0.16;
  const x = (i) => m.l + (n < 2 ? pw / 2 : (i / (n - 1)) * pw);
  const y = (v) => m.t + ((yMax - v) / (yMax - yMin)) * ph;
  const gid = uid();
  const digits = opts.digits === undefined ? 1 : opts.digits;
  let out = '';

  const step = niceStep((yMax - yMin) / (compact ? 3 : 4));
  for (let t = Math.ceil(yMin / step) * step; t <= yMax + step * 0.001; t += step) {
    const gy = y(t);
    out += `<line class="grid" x1="${m.l}" x2="${w - m.r}" y1="${gy.toFixed(1)}" y2="${gy.toFixed(1)}"/>`;
    out += `<text class="tick" x="${m.l - 8}" y="${(gy + 3.5).toFixed(1)}" text-anchor="end">${tickText(t, digits)}</text>`;
  }

  const stride = Math.max(1, Math.ceil(n / (compact ? 4 : 8)));
  for (let i = 0; i < n; i += stride) {
    const anchor = i === 0 ? 'start' : i >= n - 2 ? 'end' : 'middle';
    out += `<text class="tick" x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="${anchor}">${esc(years[i])}</text>`;
  }
  if ((n - 1) % stride !== 0) {
    out += `<text class="tick" x="${x(n - 1).toFixed(1)}" y="${h - 8}" text-anchor="end">${esc(years[n - 1])}</text>`;
  }
  out += `<line class="axis" x1="${m.l}" x2="${w - m.r}" y1="${m.t + ph}" y2="${m.t + ph}"/>`;
  out += `<line class="axis" x1="${m.l}" x2="${m.l}" y1="${m.t}" y2="${m.t + ph}"/>`;
  if (opts.yTitle) out += `<text class="axis-title" x="${m.l}" y="11">${esc(opts.yTitle)}</text>`;

  sets.forEach((s, si) => {
    const pts = s.values.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
    if (si === 0 && opts.area !== false) {
      out += `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${esc(s.color)}" stop-opacity=".3"/><stop offset="1" stop-color="${esc(s.color)}" stop-opacity="0"/></linearGradient></defs>`;
      out += `<polygon points="${x(0).toFixed(1)},${m.t + ph} ${pts} ${x(n - 1).toFixed(1)},${m.t + ph}" fill="url(#${gid})"/>`;
    }
    out += `<polyline class="line" points="${pts}" stroke="${esc(s.color)}"/>`;
    s.values.forEach((d, i) => {
      const last = i === n - 1;
      out += `<circle class="dot" cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="${last ? 4 : sets.length > 1 ? 2.1 : 2.4}" fill="${esc(s.color)}"><title>${esc(d.year)}: ${fmt(d.value, digits)}${esc(opts.unit || '')}${s.name ? ` · ${esc(s.name)}` : ''}</title></circle>`;
    });
  });

  if (sets.length === 1 && opts.callout !== false) {
    const last = sets[0].values[n - 1];
    const ty = Math.max(m.t + 10, Math.min(m.t + ph - 6, y(last.value) - 10));
    out += `<text class="value" x="${(x(n - 1) - 6).toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="end">${fmt(last.value, digits)}${esc(opts.unit || '')}</text>`;
  }
  return svg(out, w, h, opts.label || 'Time series chart');
}

/** Horizontal bars with a value axis, gridlines and row labels. */
export function hBarChart(items, opts = {}) {
  const compact = !!opts.compact;
  const w = opts.width || (compact ? 360 : 700);
  const m = { t: 28, r: compact ? 46 : 58, b: 22, l: compact ? 94 : 116 };
  const rowH = compact ? 25 : 28;
  const h = m.t + items.length * rowH + m.b;
  const pw = w - m.l - m.r;
  const max = opts.max || niceMax(Math.max(...items.map((i) => i.value)));
  const x = (v) => m.l + (v / max) * pw;
  const step = niceStep(max / (compact ? 3 : 4));
  const digits = opts.digits === undefined ? 1 : opts.digits;
  let out = '';

  for (let t = 0; t <= max + step * 0.001; t += step) {
    const gx = x(t);
    out += `<line class="grid" x1="${gx.toFixed(1)}" x2="${gx.toFixed(1)}" y1="${m.t - 4}" y2="${h - m.b + 2}"/>`;
    out += `<text class="tick" x="${gx.toFixed(1)}" y="${m.t - 11}" text-anchor="middle">${tickText(t, digits)}</text>`;
  }
  out += `<line class="axis" x1="${m.l}" x2="${m.l}" y1="${m.t - 4}" y2="${h - m.b + 2}"/>`;

  items.forEach((item, i) => {
    const cy = m.t + i * rowH + rowH / 2;
    const bx = x(item.value);
    const color = (opts.colors && opts.colors[i]) || opts.color || 'var(--accent)';
    out += `<text class="row-label" x="${m.l - 8}" y="${cy + 4}" text-anchor="end">${esc(item.label)}</text>`;
    out += `<rect class="bar" x="${m.l}" y="${cy - 6}" width="${Math.max(1, bx - m.l).toFixed(1)}" height="12" fill="${esc(color)}"><title>${esc(item.label)}: ${fmt(item.value, digits)}${esc(opts.unit || '')}</title></rect>`;
    const inside = bx > m.l + pw - (compact ? 44 : 54);
    out += `<text class="row-value" x="${(inside ? bx - 6 : bx + 7).toFixed(1)}" y="${cy + 4}" text-anchor="${inside ? 'end' : 'start'}">${fmt(item.value, digits)}</text>`;
  });
  return svg(out, w, h, opts.label || 'Horizontal bar chart');
}

/** Grouped vertical bars: births vs deaths, annual GDP, etc. */
export function groupedBars(sets, opts = {}) {
  const compact = !!opts.compact;
  const w = opts.width || (compact ? 360 : 700);
  const h = opts.height || (compact ? 236 : 286);
  const m = { t: 24, r: compact ? 12 : 22, b: compact ? 28 : 32, l: compact ? 40 : 50 };
  const pw = w - m.l - m.r;
  const ph = h - m.t - m.b;
  const years = sets[0].values.map((d) => d.year);
  const n = years.length;
  const all = sets.reduce((acc, s) => acc.concat(s.values.map((d) => d.value)), []);
  const max = opts.max || niceMax(Math.max(...all));
  const y = (v) => m.t + ((max - v) / max) * ph;
  const groupW = pw / n;
  const barW = Math.min(opts.barW || 16, groupW / (sets.length + 0.7));
  const digits = opts.digits === undefined ? 0 : opts.digits;
  let out = '';

  const step = niceStep(max / (compact ? 3 : 4));
  for (let t = 0; t <= max + step * 0.001; t += step) {
    const gy = y(t);
    out += `<line class="grid" x1="${m.l}" x2="${w - m.r}" y1="${gy.toFixed(1)}" y2="${gy.toFixed(1)}"/>`;
    out += `<text class="tick" x="${m.l - 8}" y="${(gy + 3.5).toFixed(1)}" text-anchor="end">${tickText(t, 0)}</text>`;
  }
  out += `<line class="axis" x1="${m.l}" x2="${w - m.r}" y1="${m.t + ph}" y2="${m.t + ph}"/>`;
  if (opts.yTitle) out += `<text class="axis-title" x="${m.l}" y="11">${esc(opts.yTitle)}</text>`;

  const stride = Math.max(1, Math.ceil(n / (compact ? 5 : 9)));
  years.forEach((year, i) => {
    const center = m.l + (i + 0.5) * groupW;
    const totalW = sets.length * barW + (sets.length - 1) * 2;
    sets.forEach((s, j) => {
      const d = s.values[i];
      const bx = center - totalW / 2 + j * (barW + 2);
      const by = y(d.value);
      out += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${(m.t + ph - by).toFixed(1)}" rx="2" fill="${esc(s.color)}"><title>${esc(year)} · ${esc(s.name)}: ${fmt(d.value, digits)}${esc(opts.unit || '')}</title></rect>`;
      if (i === n - 1 || (opts.showAllValues && (!compact || i % 2 === 0))) {
        const labelDigits = opts.labelDigits === undefined ? 0 : opts.labelDigits;
        out += `<text class="value" x="${(bx + barW / 2).toFixed(1)}" y="${(by - 5).toFixed(1)}" text-anchor="middle" style="font-size:10px">${fmt(d.value, labelDigits)}</text>`;
      }
    });
    if (i % stride === 0 || i === n - 1) {
      out += `<text class="tick" x="${center.toFixed(1)}" y="${h - 8}" text-anchor="middle">${esc(year)}</text>`;
    }
  });
  return svg(out, w, h, opts.label || 'Grouped bar chart');
}

/** Three-band age pyramid drawn around a centre line, with a percentage axis. */
export function pyramidChart(groups, opts = {}) {
  const compact = !!opts.compact;
  const w = opts.width || (compact ? 360 : 700);
  const h = opts.height || (compact ? 226 : 270);
  const m = { t: 26, r: compact ? 18 : 36, b: 30, l: compact ? 62 : 92 };
  const pw = w - m.l - m.r;
  const ph = h - m.t - m.b;
  const mid = m.l + pw / 2;
  const band = ph / groups.length;
  let out = '';

  for (let t = 0; t <= 100; t += 25) {
    const gx = m.l + (t / 100) * pw;
    out += `<line class="${t === 50 ? 'axis' : 'grid'}" x1="${gx.toFixed(1)}" x2="${gx.toFixed(1)}" y1="${m.t - 4}" y2="${m.t + ph}"/>`;
    out += `<text class="tick" x="${gx.toFixed(1)}" y="${h - 9}" text-anchor="middle">${t}%</text>`;
  }
  groups.forEach((g, i) => {
    const bw = (g.pct / 100) * pw;
    const y = m.t + i * band + 9;
    const bh = band - 18;
    out += `<text class="row-label" x="${m.l - 10}" y="${(y + bh / 2 + 4).toFixed(1)}" text-anchor="end">${esc(g.label)}</text>`;
    out += `<rect x="${(mid - bw / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="${esc(g.color)}"><title>${esc(g.label)} (${esc(g.detail)}): ${fmt(g.pct, 1)}%</title></rect>`;
    out += `<text class="value" x="${mid.toFixed(1)}" y="${(y + bh / 2 + 4).toFixed(1)}" text-anchor="middle" style="fill:#08111f">${fmt(g.pct, 1)}%</text>`;
  });
  out += `<line class="axis" x1="${m.l}" x2="${w - m.r}" y1="${h - m.b + 3}" y2="${h - m.b + 3}"/>`;
  out += `<text class="axis-title" x="${m.l}" y="11">SHARE OF RESIDENT POPULATION</text>`;
  return svg(out, w, h, opts.label || 'Population by age group');
}

/** Proportional donut with a labelled legend supplied by the caller. */
export function donutChart(segments, opts = {}) {
  const size = opts.size || 208;
  const r = size / 2 - 20;
  const c = 2 * Math.PI * r;
  let offset = 0;
  let out = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line-soft)" stroke-width="26"/>`;
  segments.forEach((s) => {
    const len = (s.pct / 100) * c;
    out += `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${esc(s.color)}" stroke-width="26" stroke-dasharray="${Math.max(0, len - 2).toFixed(1)} ${(c - len + 2).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"><title>${esc(s.label)}: ${fmt(s.pct, 1)}%</title></circle>`;
    offset += len;
  });
  out += `<text class="value" x="${size / 2}" y="${size / 2 + 2}" text-anchor="middle" style="font-size:23px">100%</text>`;
  out += `<text class="axis-title" x="${size / 2}" y="${size / 2 + 20}" text-anchor="middle">${esc(opts.center || 'GVA SHARE')}</text>`;
  return svg(out, size, size, opts.label || 'Sector shares');
}

/** Compact decorative trend line used inside KPI cards. */
export function sparkline(values, opts = {}) {
  const w = 128;
  const h = 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => `${(4 + (i / (values.length - 1)) * (w - 8)).toFixed(1)},${(h - 5 - ((v - min) / span) * (h - 12)).toFixed(1)}`).join(' ');
  const gid = uid();
  const color = opts.color || 'var(--accent)';
  const last = pts.split(' ').pop().split(',');
  return `<svg class="chart spark" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${esc(color)}" stop-opacity=".32"/><stop offset="1" stop-color="${esc(color)}" stop-opacity="0"/></linearGradient></defs>
    <line class="grid" x1="4" x2="${w - 4}" y1="${h - 3}" y2="${h - 3}"/>
    <polygon points="4,${h - 3} ${pts} ${w - 4},${h - 3}" fill="url(#${gid})"/>
    <polyline class="line" points="${pts}" stroke="${esc(color)}" style="stroke-width:2"/>
    <circle cx="${last[0]}" cy="${last[1]}" r="2.8" fill="${esc(color)}"/>
  </svg>`;
}
