import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { posix } from 'node:path';
import { copy, languages, products } from './copy.mjs';
import { legalCopy, legalSources, operator } from './legal.mjs';

const origin = 'https://pezic-tech.com/';
const email = operator.email;
const legal = ['legal/impressum.html', 'legal/datenschutz.html'];
const sections = ['products', 'projects', 'engineering', 'about', 'contact'];
const engineeringIcons = ['chip', 'screen', 'layers'];
const pages = ['home', ...products.map(product => product.id), ...legal];
const versionedAssets = ['css/pezic.css', 'js/site.js'];
const assetVersions = new Map(await Promise.all(versionedAssets.map(async path => {
  const contents = await readFile(new URL('../assets/' + path, import.meta.url), 'utf8');
  return [path, createHash('sha256').update(contents.replace(/\r\n/g, '\n')).digest('hex').slice(0, 12)];
})));

const escape = text => String(text).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function pathFor(lang, page) {
  const prefix = lang === 'de' ? '' : lang + '/';
  if (page === 'home') return prefix;
  return prefix + (legal.includes(page) ? page : page + '/');
}

const icons = {
  arrow: '<path d="M4 10h11m-5-5 5 5-5 5"/>',
  external: '<path d="M5 15 15 5M6 5h9v9"/>',
  down: '<path d="M10 4v11m-5-5 5 5 5-5"/>',
  chip: '<rect x="5" y="5" width="10" height="10" rx="2"/><path d="M8 2v3m4-3v3m-4 10v3m4-3v3M2 8h3m-3 4h3m10-4h3m-3 4h3"/><rect x="8" y="8" width="4" height="4" rx=".5"/>',
  layers: '<path d="m10 3 7 4-7 4-7-4 7-4ZM3 10.5l7 4 7-4M3 14l7 4 7-4"/>',
  check: '<path d="m4 10 4 4 8-8"/>',
  screen: '<rect x="2.5" y="4" width="15" height="12" rx="2"/><path d="m5 12 3-3 3 2 4-4"/>',
  globe: '<circle cx="10" cy="10" r="7"/><ellipse cx="10" cy="10" rx="3.2" ry="7"/><path d="M3 10h14"/>',
  menu: '<path d="M3 6h14M3 10h14M3 14h14"/>',
};

function icon(name) {
  return '<svg class="icon" aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + icons[name] + '</svg>';
}

function button(href, label, style = 'primary', symbol = 'arrow') {
  return '<a class="button button-' + style + '" href="' + escape(href) + '">' + escape(label) + icon(symbol) + '</a>';
}

function board() {
  return `<svg class="board-traces" aria-hidden="true" viewBox="0 0 640 600" preserveAspectRatio="none" fill="none">
    <g stroke="#7ddfff" stroke-opacity=".38" vector-effect="non-scaling-stroke">
      <path d="M0 128h100l48 48h86M640 406H536l-48-48h-69M376 0v64l-32 32v47M320 600v-71l32-32v-57"/>
      <circle cx="234" cy="176" r="3"/><circle cx="419" cy="358" r="3"/><circle cx="344" cy="143" r="3"/><circle cx="352" cy="440" r="3"/>
    </g>
    <g class="board-pulses" stroke="#b7f4ff" stroke-width="2.3" stroke-linecap="round">
      <path pathLength="100" d="M0 128h100l48 48h86"/>
      <path pathLength="100" d="M640 406H536l-48-48h-69"/>
      <path pathLength="100" d="M376 0v64l-32 32v47"/>
      <path pathLength="100" d="M352 440v57l-32 32v71"/>
    </g>
  </svg>`;
}

function graphic(product) {
  const solar = product.theme === 'solar';
  const fill = 'graphic-' + product.id;
  const drawing = solar
    ? `<path d="M0 117c24 0 32-4 47-12s25-35 40-37c15-2 18 12 32 8s24-46 43-51c18-6 30 21 47 18 18-4 23-19 37-12 14 8 22 26 36 28s21-10 35-4 20 31 35 39 27 13 48 13V132H0Z" fill="url(#${fill})"/>
       <path d="M0 117c24 0 32-4 47-12s25-35 40-37c15-2 18 12 32 8s24-46 43-51c18-6 30 21 47 18 18-4 23-19 37-12 14 8 22 26 36 28s21-10 35-4 20 31 35 39 27 13 48 13" fill="none" stroke="#ffb061" stroke-width="2"/>
       <path d="M165 4v125" stroke="#ffb061" stroke-dasharray="3 5" opacity=".55"/><circle cx="165" cy="25" r="4" fill="#ffe2bc" stroke="#fba650" stroke-width="2"/>`
    : [44, 64, 78, 64, 88, 110, 96, 112, 91, 74, 82, 61].map((height, index) => `<rect x="${index * 33 + 5}" y="${130 - height}" width="22" height="${height}" rx="3" fill="url(#${fill})" opacity="${index === 7 ? 1 : .57 + (index % 3) * .12}"/>`).join('');
  return `<div class="product-graphic" aria-hidden="true">
    <svg viewBox="0 0 400 132" preserveAspectRatio="none">
      <defs><linearGradient id="${fill}" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop stop-color="${solar ? '#ff9c4c' : '#c5ec80'}" stop-opacity="${solar ? '.33' : '.96'}"/><stop offset="1" stop-color="${solar ? '#ff9c4c' : '#7eab50'}" stop-opacity=".07"/>
      </linearGradient></defs>
      <path d="M0 25h400M0 60h400M0 95h400M0 130h400" stroke="currentColor" opacity=".15"/>
      ${drawing}
    </svg>
  </div>`;
}

function productMark(product, asset) {
  return product.mark
    ? `<img class="product-mark" src="${asset('img/' + product.mark)}" alt="" width="40" height="40">`
    : icon('screen');
}

function productArt(product, label, sample) {
  return `<div class="product-art">
    <div class="art-caption"><span>${escape(label)}</span><span>${escape(sample)}</span></div>
    ${graphic(product)}
  </div>`;
}

function signalStrip(t, asset) {
  const fields = t.engineeringItems.map(([title], index) =>
    `<li>${icon(engineeringIcons[index])}${escape(title)}</li>`);
  const brands = products.map(product => `<li>${productMark(product, asset)}${product.name}</li>`);
  const row = [...fields, ...brands].join('');
  return `<div class="signal-strip">
    <div class="wrap signal-inner">
      <div class="signal-window"><div class="signal-track">
        <ul class="signal-group" role="list">${row}</ul>
        <ul class="signal-group signal-repeat" aria-hidden="true">${row}</ul>
      </div></div>
    </div>
  </div>`;
}

function shell(lang, page) {
  const t = copy[lang];
  const url = pathFor(lang, page);
  const directory = url.endsWith('.html') ? posix.dirname(url) : url || '.';
  const relative = target => posix.relative(directory, target || '.') || '.';
  const route = (targetLang, targetPage, hash = '') => {
    const path = pathFor(targetLang, targetPage);
    return (path.endsWith('.html') ? relative(path) : relative(path) + '/') + hash;
  };
  const asset = path => relative('assets/' + path) + (assetVersions.has(path) ? '?v=' + assetVersions.get(path) : '');
  const home = route(lang, 'home');
  const section = id => (page === 'home' ? '' : home) + '#' + id;
  const brand = `<a class="brand" href="${home}" aria-label="Pezic Tech Solutions · ${escape(t.home)}">
    <span class="brand-icon" aria-hidden="true"><img src="${asset('img/pezic-logo-color.png')}" alt="" width="1024" height="768"></span>
    <span class="brand-type" aria-hidden="true"><strong>PEZIC TECH</strong><small>SOLUTIONS</small></span>
  </a>`;
  const languagePicker = `<details class="languages">
    <summary aria-label="${escape(t.language)} · ${languages[lang]}">${icon('globe')} <span>${lang.toUpperCase()}</span><span class="chevron" aria-hidden="true"></span></summary>
    <ul>${Object.entries(languages).map(([code, label]) =>
      `<li><a href="${route(code, page)}" lang="${code}" hreflang="${code}" data-language${code === lang ? ' aria-current="page"' : ''}><span>${label}</span><small>${code.toUpperCase()}</small></a></li>`).join('')}</ul>
  </details>`;
  const header = `<a class="skip" href="#main">${escape(t.skip)}</a>
  <header class="header">
    <div class="wrap header-inner">
      ${brand}
      <nav class="nav" id="primary-nav" aria-label="${escape(t.navigation)}">
        ${sections.map((id, index) => `<a href="${section(id)}">${escape(t.nav[index])}</a>`).join('')}
      </nav>
      <div class="header-tools">
        ${languagePicker}
        <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="${escape(t.menu)}" hidden>${icon('menu')}</button>
      </div>
    </div>
  </header>`;
  const footer = `<footer class="footer">
    <div class="wrap">
      <div class="footer-grid">
        ${brand}
        <div><p class="micro">${escape(t.nav[0])}</p>${products.map(product => `<a href="${route(lang, product.id)}">${product.name}</a>`).join('')}<a href="${section('projects')}">${escape(t.nav[1])}</a></div>
        <div><p class="micro">${escape(t.nav[4])}</p><a href="mailto:${email}">${email}</a></div>
        <div><p class="micro">${escape(t.legal)}</p>${legal.map((id, index) => `<a href="${route(lang, id)}">${escape(t.legalNames[index])}</a>`).join('')}</div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} Pezic Tech Solutions</span><a href="#top" aria-label="${escape(t.top)}">↑</a></div>
    </div>
  </footer>`;
  return { t, asset, header, footer, route, section };
}

function contact(t) {
  return `<section class="contact" id="contact">
    <div class="wrap contact-inner">
      <div><h2>${escape(t.contactTitle)}</h2><p>${escape(t.contactText)}</p></div>
      ${button('mailto:' + email, email, 'primary', 'external')}
    </div>
  </section>`;
}

function featuredProject(t, asset) {
  const p = t.project;
  return `<section class="section projects" id="projects" aria-labelledby="project-title">
    <div class="wrap project-grid">
      <div class="project-copy">
        <p class="eyebrow">${icon('layers')}${escape(t.nav[1])}</p>
        <h2 id="project-title">${escape(p.title)}</h2>
        <p>${escape(p.description)}</p>
        <ul class="project-specs" role="list">${p.details.map(detail => `<li>${icon('check')}${escape(detail)}</li>`).join('')}</ul>
      </div>
      <div class="project-media">
        <figure class="project-open">
          <img src="${asset('img/screw-organizer-open.jpg')}" alt="${escape(p.openAlt)}" width="1280" height="960" loading="lazy" decoding="async">
          <figcaption>${escape(p.open)}</figcaption>
        </figure>
        <figure class="project-stacked">
          <img src="${asset('img/screw-organizer-stacked.jpg')}" alt="${escape(p.stackedAlt)}" width="1280" height="960" loading="lazy" decoding="async">
          <figcaption>${escape(p.stacked)}</figcaption>
        </figure>
      </div>
    </div>
  </section>`;
}

function homepage(lang, context) {
  const { t, asset, route } = context;
  return `<section class="hero" id="home">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow"><i></i>Pezic Tech Solutions</p>
        <h1><span class="hero-line">${escape(t.headline[0])}</span> <span class="hero-line hero-accent">${escape(t.headline[1])}</span></h1>
        <p class="hero-intro">${escape(t.intro)}</p>
        <div class="actions">${button('#products', t.explore, 'primary', 'down')}${button('#projects', t.nav[1], 'outline', 'down')}</div>
      </div>
      <div class="board" aria-hidden="true">
        <img class="board-photo" src="${asset('img/pezic-circuit-1120.webp')}"
          srcset="${asset('img/pezic-circuit-640.webp')} 640w, ${asset('img/pezic-circuit-1120.webp')} 1120w"
          sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1280px) 47vw, 610px"
          width="1120" height="1400" fetchpriority="high" alt="">
        ${board()}
        <div class="hero-logo"><img src="${asset('img/pezic-logo-color.png')}" alt="" width="1024" height="768"></div>
      </div>
    </div>
    ${signalStrip(t, asset)}
  </section>
  <section class="section portfolio" id="products">
    <div class="wrap">
      <div class="section-heading"><h2>${escape(t.productTitle)}</h2></div>
      <div class="product-grid">
        ${products.map(product => {
          const p = t[product.id];
          return `<article class="product-card ${product.theme}" id="${product.id}">
            <a href="${route(lang, product.id)}" aria-labelledby="link-${product.id} name-${product.id}">
              <div class="product-copy">
                <div class="product-identity">${productMark(product, asset)}<div><p class="micro">${escape(p.category)}</p><h3 id="name-${product.id}">${product.name}</h3></div></div>
                <p>${escape(p.description)}</p>
                <span class="product-link" id="link-${product.id}">${escape(t.productLink)} ${icon('external')}</span>
              </div>
              ${productArt(product, p.visual, t.sample)}
            </a>
          </article>`;
        }).join('')}
      </div>
      <span id="app" class="legacy-anchor"></span><span id="process" class="legacy-anchor"></span>
    </div>
  </section>
  ${featuredProject(t, asset)}
  <section class="section engineering" id="engineering">
    <div class="wrap">
      <div class="section-heading"><h2>${escape(t.engineeringTitle)}</h2></div>
      <div class="engineering-grid">${t.engineeringItems.map(([title, description], index) =>
        `<article><div class="stage-icon">${icon(engineeringIcons[index])}</div><h3>${escape(title)}</h3><p>${escape(description)}</p></article>`).join('')}</div>
    </div>
  </section>
  <section class="section about" id="about">
    <div class="wrap about-grid">
      <h2>${escape(t.nav[3])}</h2><p>${escape(t.aboutText)}</p>
    </div>
  </section>
  <div id="support" class="legacy-anchor"></div>
  ${contact(t)}`;
}

function productPage(lang, product, context) {
  const { t, asset, route } = context;
  const p = t[product.id];
  const brand = product.logo
    ? `<img class="product-logo" src="${asset('img/' + product.logo)}" alt="${product.name}" width="3000" height="900">`
    : `<span class="product-wordmark">${productMark(product, asset)}${product.name}</span>`;
  const demo = p.demoTabs
    ? `<div class="demo-panel">
        <div class="demo-heading"><span><i></i> ${product.name}</span><span>${escape(p.demo)}</span></div>
        <div class="demo-views">${p.demoTabs.map((label, index) => `<details name="${product.id}-preview"${index === 0 ? ' open' : ''}><summary>${escape(label)}</summary><div class="demo-reading"><span>${escape(p.demoRows[index][0])}</span><strong>${escape(p.demoRows[index][1])}</strong></div></details>`).join('')}</div>
      </div>`
    : product.demo && button(product.demo, p.demo, 'outline', 'external');
  const actions = product.portal
    ? button(product.portal, p.portal, 'primary', 'external') + (demo ? button('#app', p.demo, 'outline', 'down') : '')
    : demo ? button('#app', p.demo, 'primary', 'down') + button('#contact', t.support, 'outline')
    : button('#contact', t.support, 'primary');
  return `<section class="product-hero ${product.theme}" id="home">
    <div class="wrap">
      <div class="breadcrumb"><a href="${route(lang, 'home', '#products')}">${escape(t.nav[0])}</a><span aria-hidden="true">/</span><span>${product.name}</span></div>
      <div class="product-hero-grid">
        <div>${brand}<h1>${escape(p.title)}</h1><p class="hero-intro">${escape(p.description)}</p>
        <div class="actions">${actions}</div></div>
        ${productArt(product, p.visual, t.sample)}
      </div>
    </div>
  </section>
  <section class="section product-features ${product.theme}">
    <div class="wrap"><div class="section-heading"><h2>${escape(p.category)}</h2></div>
      <div class="feature-grid">${p.features.map(([title, description]) => `<article><h3>${escape(title)}</h3><p>${escape(description)}</p></article>`).join('')}</div>
    </div>
  </section>
  ${demo ? `<section class="section demo ${product.theme}" id="app">
    <div class="wrap demo-grid"><div><p class="eyebrow"><i></i>${escape(p.demo)}</p><h2>${escape(p.demoTitle)}</h2><p>${escape(p.demoNote)}</p></div>${demo}</div>
  </section>` : ''}
  ${contact(t)}`;
}

function legalPage(lang, index, { t, route }) {
  const notice = legalCopy[lang];
  const privacy = index === 1;
  const sourceLinks = keys => keys.map(key => {
    const [label, href] = legalSources[key];
    return `<a href="${escape(href)}">${escape(label)}</a>`;
  }).join(' <span aria-hidden="true">·</span> ');
  const address = `<address><strong>${escape(operator.name)}</strong><br>
    ${escape(operator.street)}<br>${escape(operator.city)}<br>${escape(notice.country)}<br>
    <a href="mailto:${email}">${email}</a></address>`;
  return `<section class="section legal-page"><div class="wrap">
    <p class="eyebrow"><i></i>${escape(t.legal)}</p>
    <h1>${escape(t.legalNames[index])}</h1>
    <p>${escape(privacy ? notice.scope : notice.imprint)}</p>
    <h2>${escape(privacy ? notice.controller : notice.operator)}</h2>
    ${address}
    ${privacy ? notice.sections.map(([title, paragraphs, links]) => `<section>
      <h2>${escape(title)}</h2>
      ${paragraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}
      ${links ? `<p class="legal-links">${sourceLinks(links)}</p>` : ''}
    </section>`).join('') + `<p class="legal-links">${sourceLinks(['heatcontrol'])}</p>` : ''}
    <p class="legal-links"><a href="${route(lang, legal[1 - index])}">${escape(t.legalNames[1 - index])}</a></p>
  </div></section>`;
}

function render(lang, page) {
  const context = shell(lang, page);
  const { t, asset, header, footer } = context;
  const product = products.find(item => item.id === page);
  const legalIndex = legal.indexOf(page);
  const description = product ? t[page].description : legalIndex === 0 ? legalCopy[lang].imprint : legalIndex === 1 ? legalCopy[lang].scope : t.intro;
  const title = product ? product.name + ' · Pezic Tech Solutions' : legalIndex >= 0
    ? t.legalNames[legalIndex] + ' · Pezic Tech Solutions'
    : 'Pezic Tech Solutions · ' + t.engineeringItems.map(([title]) => title).join(' / ');
  const content = product ? productPage(lang, product, context) : legalIndex >= 0
    ? legalPage(lang, legalIndex, context)
    : homepage(lang, context);
  const canonical = origin + pathFor(lang, page);
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'">
  <meta name="referrer" content="no-referrer">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <meta name="theme-color" content="#080e19">${legalIndex >= 0 ? '\n  <meta name="robots" content="noindex">' : ''}
  <link rel="canonical" href="${canonical}">
  ${Object.keys(languages).map(code => `<link rel="alternate" hreflang="${code}" href="${origin + pathFor(code, page)}">`).join('\n  ')}
  <link rel="alternate" hreflang="x-default" href="${origin + pathFor('de', page)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${origin}assets/img/pezic-logo-color.png">
  <link rel="icon" href="${asset('img/pezic-icon.svg')}" type="image/svg+xml">
  <link rel="stylesheet" href="${asset('css/pezic.css')}">
  <script src="${asset('js/site.js')}" defer></script>
</head>
<body id="top" data-page="${page}">
  ${header}
  <main id="main" tabindex="-1">${content}</main>
  ${footer}
</body>
</html>
`;
}

for (const lang of Object.keys(languages)) {
  for (const page of pages) {
    const path = pathFor(lang, page);
    const file = new URL('../' + (path.endsWith('.html') ? path : path + 'index.html'), import.meta.url);
    await mkdir(new URL('.', file), { recursive: true });
    await writeFile(file, render(lang, page).replace(/[ \t]+$/gm, ''));
  }
}

const sitemap = Object.keys(languages).flatMap(lang =>
  pages.filter(page => !legal.includes(page)).map(page => `  <url><loc>${origin + pathFor(lang, page)}</loc></url>`));
await writeFile(new URL('../sitemap.xml', import.meta.url),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemap.join('\n') + '\n</urlset>\n');
