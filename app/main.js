// STATLAS router. Five hash-routed views, all rendered from embedded data with no network calls.
// window.__shotReady is false during a render and true once the new view is on screen.
import * as home from './views-home.js';
import * as population from './views-population.js';
import * as economy from './views-economy.js';
import * as society from './views-society.js';
import * as regions from './views-regions.js';

const routes = {
  '/': { label: 'Overview', view: home },
  '/population': { label: 'Population', view: population },
  '/economy': { label: 'Economy', view: economy },
  '/society': { label: 'Society', view: society },
  '/regions': { label: 'Regions', view: regions },
};

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const baseTitle = 'STATLAS — Japan in Numbers';

function path() {
  const hash = location.hash.replace(/^#/, '') || '/';
  return routes[hash] ? hash : '/';
}

function render(scroll = true) {
  window.__shotReady = false;
  try {
    const here = path();
    const route = routes[here];
    document.title = here === '/' ? baseTitle : `${route.label} | ${baseTitle}`;
    app.innerHTML = route.view.render();
    nav.querySelectorAll('[data-route]').forEach((a) => {
      const current = a.dataset.route === here;
      a.classList.toggle('active', current);
      if (current) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    route.view.mount(app);
    if (scroll) window.scrollTo(0, 0);
  } finally {
    window.__shotReady = true;
  }
}

window.addEventListener('hashchange', () => render());
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => render(false), 220);
});
render();
