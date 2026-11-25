// Static site generator. No dependencies: run with  node src/build.mjs
// Reads src/data.mjs and src/art.mjs and writes plain HTML pages into the
// repository root, which GitHub Pages serves as-is.

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, groups, services, projects, projectCategories, steps, manifesto, tools, capabilities } from './data.mjs';
import { serviceArt, stepArt, orbitArt } from './art.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Bumped on every build so browsers fetch fresh CSS and JS after a deploy.
const VERSION = new Date().toISOString().replace(/\D/g, '').slice(0, 12);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Bilingual text: both languages are in the HTML, CSS shows the active one.
const t = (x) => (typeof x === 'string' ? esc(x) : x.ru === x.en ? esc(x.ru) : `<span class="l-ru">${esc(x.ru)}</span><span class="l-en">${esc(x.en)}</span>`);
const L = (ru, en) => t({ ru, en });
// Bilingual attribute (placeholder, aria-label, title): JS swaps it on language change.
const ta = (name, x) => `${name}="${esc(x.ru)}" data-i18n-${name}="${esc(JSON.stringify(x))}"`;
const pad = (n) => String(n).padStart(2, '0');
const svcBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
const svcNum = (s) => pad(services.indexOf(s) + 1);
const brand = site.brand;

const arrow = '<svg class="ic-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8 H13 M9 4 L13 8 L9 12"/></svg>';

// Contact links. Telegram and WhatsApp links open the app on phones and desktops
// that have it installed; the Gmail button is switched to Gmail's compose window
// on desktop by js/site.js and opens the mail app (mailto) on phones.
const links = {
  telegram: `https://t.me/${site.telegram.replace(/^@/, '')}`,
  whatsapp: `https://wa.me/${site.whatsapp}`,
  mail: `mailto:${site.email}`,
  tel: `tel:${site.phone}`,
};
const icons = {
  telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.7 4.2 2.9 11.1c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.7 5.3c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.1c.3-1.3-.5-1.8-1.4-1.4ZM8.6 13.7l9.3-5.9c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.3-1.9-4.5Z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3c-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.7-.1Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.5 5h17A1.5 1.5 0 0 1 22 6.5v11a1.5 1.5 0 0 1-1.5 1.5H19V9.3l-7 5.2-7-5.2V19H3.5A1.5 1.5 0 0 1 2 17.5v-11A1.5 1.5 0 0 1 3.5 5Zm1.3 1.6L12 12l7.2-5.4H4.8Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>',
};
const channel = {
  telegram: { href: links.telegram, label: { ru: 'Telegram', en: 'Telegram' }, aria: { ru: 'Написать в Telegram', en: 'Message us on Telegram' } },
  whatsapp: { href: links.whatsapp, label: { ru: 'WhatsApp', en: 'WhatsApp' }, aria: { ru: 'Написать в WhatsApp', en: 'Message us on WhatsApp' } },
  mail: { href: links.mail, label: { ru: 'Gmail', en: 'Gmail' }, aria: { ru: 'Написать письмо', en: 'Send us an email' } },
};
const extAttrs = (k) => (k === 'mail' ? ` data-gmail="${esc(site.email)}"` : ' target="_blank" rel="noopener"');
// Round icon buttons (top bar and side rail).
const chanIcon = (k, cls = '') => `<a class="ch ch-${k} ${cls}" href="${esc(channel[k].href)}"${extAttrs(k)} ${ta('aria-label', channel[k].aria)} ${ta('title', channel[k].aria)}>${icons[k]}</a>`;
// Labelled buttons (footer, contact page, service pages).
const chanBtn = (k) => `<a class="chb chb-${k}" href="${esc(channel[k].href)}"${extAttrs(k)}><span class="chb-i">${icons[k]}</span><span class="chb-t">${t(channel[k].label)}</span></a>`;
const chanRow = () => `<div class="chb-row">${chanBtn('telegram')}${chanBtn('whatsapp')}${chanBtn('mail')}</div>`;

const mark = `<svg class="mark" viewBox="0 0 28 28" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
  const big = i % 3 === 0;
  const cls = i % 6 === 0 ? 'mb' : i % 3 === 0 ? 'mr' : '';
  return `<circle${cls ? ` class="${cls}"` : ''} cx="${(14 + Math.cos(a) * 10).toFixed(2)}" cy="${(14 + Math.sin(a) * 10).toFixed(2)}" r="${big ? 2.2 : 1.6}"/>`;
}).join('')}</svg>`;

const tri = '<span class="tri" aria-hidden="true"><i></i><i></i><i></i></span>';
const kick = (x, cls = '') => `<span class="kick ${cls}">${tri}${t(x)}</span>`;

// ---------------------------------------------------------------------------
// Page shell
// ---------------------------------------------------------------------------
const NAV = [
  ['services', { ru: 'Услуги', en: 'Services' }],
  ['projects', { ru: 'Проекты', en: 'Projects' }],
  ['process', { ru: 'Процесс', en: 'Process' }],
  ['about', { ru: 'О нас', en: 'About' }],
];
const CTA = { ru: 'Запрос / Демо', en: 'Inquiry / Demo' };

function layout({ path, title, desc, body, section = '', bodyClass = '' }) {
  const depth = path.split('/').filter(Boolean).length - (path.endsWith('.html') ? 1 : 0);
  const root = depth ? '../'.repeat(depth) : './';
  const r = (p) => root + p;
  const fullTitle = {
    ru: title ? `${title.ru} · ${brand.ru}` : `${brand.ru} · ${site.tagline.ru}`,
    en: title ? `${title.en} · ${brand.en}` : `${brand.en} · ${site.tagline.en}`,
  };
  const navLinks = NAV.map(([k, label]) => `<a href="${r(k + '/')}"${section === k ? ' aria-current="page"' : ''}>${t(label)}</a>`).join('');
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="only light">
<meta name="theme-color" content="#071433">
<title>${esc(fullTitle.ru)}</title>
<meta name="description" content="${esc(desc.ru)}">
<link rel="canonical" href="${esc(site.url + path)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(brand.ru)}">
<meta property="og:title" content="${esc(fullTitle.ru)}">
<meta property="og:description" content="${esc(desc.ru)}">
<meta property="og:url" content="${esc(site.url + path)}">
<meta property="og:locale" content="ru_RU">
<meta property="og:locale:alternate" content="en_US">
<link rel="icon" href="${r('favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${r('fonts/unbounded-cyrillic-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${r('css/fonts.css')}?v=${VERSION}">
<link rel="stylesheet" href="${r('css/site.css')}?v=${VERSION}">
<script>try{if(localStorage.getItem('lang')==='en'){document.documentElement.classList.add('lang-en');document.documentElement.lang='en'}}catch(e){}document.documentElement.classList.add('js')</script>
</head>
<body class="${bodyClass}" data-title="${esc(JSON.stringify(fullTitle))}">
<a class="skip" href="#main">${L('Перейти к содержанию', 'Skip to content')}</a>
<div class="prog" aria-hidden="true"></div>
<header class="nav">
  <a class="logo" href="${r('')}" ${ta('aria-label', { ru: brand.ru + ': главная', en: brand.en + ': home' })}>${mark}<span class="logo-t">${t(brand)}</span></a>
  <nav class="nav-links" aria-label="${esc('Main')}">${navLinks}</nav>
  <div class="nav-r">
    <div class="nav-ch">${chanIcon('telegram')}${chanIcon('whatsapp')}${chanIcon('mail')}</div>
    <button class="lang" type="button" ${ta('aria-label', { ru: 'Switch to English', en: 'Переключить на русский' })}><span class="lang-o o-ru">RU</span><span class="lang-o o-en">EN</span></button>
    <a class="btn btn-red nav-cta" href="${r('contact/')}"${section === 'contact' ? ' aria-current="page"' : ''}>${t(CTA)}</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="menu" ${ta('aria-label', { ru: 'Открыть меню', en: 'Open menu' })}><span><i></i><i></i></span></button>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <nav aria-label="Mobile">
    ${NAV.map(([k, label], i) => `<a class="menu-a" href="${r(k + '/')}" style="--i:${i}"><em>${pad(i + 1)}</em>${t(label)}</a>`).join('\n    ')}
    <a class="menu-a" href="${r('contact/')}" style="--i:4"><em>05</em>${t(CTA)}</a>
  </nav>
  <div class="menu-foot">${chanRow()}</div>
</div>
<aside class="rail" ${ta('aria-label', { ru: 'Связаться с нами', en: 'Contact us' })}>
  ${chanIcon('telegram', 'ch-lg')}${chanIcon('whatsapp', 'ch-lg')}${chanIcon('mail', 'ch-lg')}
</aside>
<main id="main">
${body}
</main>
${footer(r)}
<script src="${r('js/site.js')}?v=${VERSION}" defer></script>
</body>
</html>
`;
  const file = join(OUT, path, path.endsWith('.html') ? '' : 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return file;
}

function footer(r) {
  const svcLinks = services.map((s) => `<a href="${r('services/' + s.slug + '/')}">${t(s.title)}</a>`).join('');
  return `<footer class="foot">
  <section class="foot-cta">
    <div class="wrap">
      ${kick({ ru: 'Связаться', en: 'Get in touch' })}
      <h2 class="big rvh"><span class="ln"><span>${L('Есть задача?', 'Have a project?')}</span></span><span class="ln"><span class="red">${L('Обсудим.', 'Let’s talk.')}</span></span></h2>
      <div class="foot-cta-row rv">
        ${chanRow()}
        <a class="btn btn-white" href="${r('contact/')}">${t(CTA)}${arrow}</a>
      </div>
    </div>
  </section>
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <a class="logo" href="${r('')}">${mark}<span class="logo-t">${t(brand)}</span></a>
      <p>${L('Инжиниринг, софт и рост в одной команде.', 'Engineering, software and growth under one roof.')}</p>
    </div>
    <nav class="foot-col foot-svc" ${ta('aria-label', { ru: 'Услуги', en: 'Services' })}>
      <h3>${L('Услуги', 'Services')}</h3>${svcLinks}
    </nav>
    <nav class="foot-col" ${ta('aria-label', { ru: 'Компания', en: 'Company' })}>
      <h3>${L('Компания', 'Company')}</h3>
      ${NAV.map(([k, label]) => `<a href="${r(k + '/')}">${t(label)}</a>`).join('')}
      <a href="${r('contact/')}">${t(CTA)}</a>
    </nav>
    <div class="foot-col">
      <h3>${L('Контакты', 'Contact')}</h3>
      <a href="${esc(links.telegram)}" target="_blank" rel="noopener">Telegram</a>
      <a href="${esc(links.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>
      <a href="${esc(links.mail)}" data-gmail="${esc(site.email)}">${esc(site.email)}</a>
      <a href="${esc(links.tel)}">${esc(site.phoneDisplay)}</a>
    </div>
  </div>
  <div class="flagline" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="wrap legal">
    <span>© <span data-year>${new Date().getFullYear()}</span> ${t(brand)}</span>
    <span>${L('Русский · English', 'Russian · English')}</span>
  </div>
</footer>`;
}

// Page header used by inner pages.
function pageHead({ kicker, title, lead, crumbs = [], extra = '', r }) {
  const bc = crumbs.length
    ? `<nav class="crumbs" aria-label="Breadcrumb"><a href="${r('')}">${L('Главная', 'Home')}</a>${crumbs.map(([href, label]) => (href ? `<a href="${r(href)}">${t(label)}</a>` : `<span aria-current="page">${t(label)}</span>`)).join('')}</nav>`
    : '';
  return `<section class="phead">
  <div class="phead-bg" aria-hidden="true"></div>
  <div class="wrap">
    ${bc}
    ${kicker ? kick(kicker, 'tf-in') : ''}
    <h1 class="h1 rise">${title}</h1>
    ${lead ? `<p class="lead tf-in">${t(lead)}</p>` : ''}
    ${extra}
  </div>
</section>`;
}
const rootOf = (path) => {
  const d = path.split('/').filter(Boolean).length;
  return (p) => (d ? '../'.repeat(d) : './') + p;
};

// Small building blocks
const tile = (s, r, i = 0) => `<a class="tile ${s.color} rv" style="--d:${(i % 4) * 0.06}s" href="${r('services/' + s.slug + '/')}">
  <span class="tile-top mono"><span>${svcNum(s)}</span><span>${t(groups[s.group])}</span></span>
  <span class="tile-art">${serviceArt[s.slug]}</span>
  <span class="tile-t">${t(s.title)}</span>
  <span class="tile-go">${L('Подробнее', 'Details')}${arrow}</span>
</a>`;

const projectCard = (p, r) => `<a class="pcard rv" href="${r('projects/#' + p.slug)}">
  <span class="pcard-k mono">${t(p.tags)}</span>
  <span class="pcard-t">${t(p.title)}</span>
  <span class="pcard-d">${t(p.desc)}</span>
</a>`;

const marquee = (items, cls = '') => {
  const run = items.map((x) => `<span>${t(x)}</span>`).join('');
  return `<div class="band ${cls}"><div class="mq"><div class="mqs">${run}</div><div class="mqs" aria-hidden="true">${run}</div></div></div>`;
};

const counts = Object.fromEntries(projectCategories.map((c) => [c.id, projects.filter((p) => p.category === c.id).length]));

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------
const written = [];

// Home ---------------------------------------------------------------------
{
  const r = rootOf('');
  const letters = [...brand.ru].map((ch, i) => `<span style="--i:${i}">${esc(ch)}</span>`).join('');
  const group = (g) => services.filter((s) => s.group === g);
  const body = `
<section class="hero" data-hero>
  <canvas class="hero-cv" aria-hidden="true"></canvas>
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="hero-in">
    ${kick({ ru: 'Инжиниринг · Софт · Рост', en: 'Engineering · Software · Growth' }, 'tf-in')}
    <h1 class="brand-name" aria-label="${esc(brand.ru)}"><span class="bn" aria-hidden="true">${letters}</span></h1>
    <p class="hero-line tf-in">${L('От чертежа до облака и до клиента.', 'From CAD to cloud to customer.')}</p>
    <div class="ctas tf-in">
      <a class="btn btn-red" href="${r('contact/')}">${t(CTA)}${arrow}</a>
      <a class="btn btn-ghost" href="#services">${L('Услуги', 'Services')}</a>
    </div>
  </div>
  <a class="scroll-cue" href="#services" ${ta('aria-label', { ru: 'К услугам', en: 'To services' })}><i></i></a>
</section>

<section class="sec sec-light" id="services">
  <div class="wrap">
    <div class="sec-head">
      <div>
        ${kick({ ru: '(01) Услуги', en: '(01) Services' }, 'rv')}
        <h2 class="h2 rvh"><span class="ln"><span>${L('Двенадцать направлений.', 'Twelve disciplines.')}</span></span><span class="ln"><span class="red">${L('Одна команда.', 'One team.')}</span></span></h2>
      </div>
      <a class="more rv" href="${r('services/')}">${L('Все услуги', 'All services')}${arrow}</a>
    </div>
    ${['growth', 'engineering'].map((g) => `<div class="grp rv"><span class="grp-l mono">${t(groups[g])}</span><span class="grp-n mono">${group(g).length}</span></div>
    <div class="tiles">${group(g).map((s, i) => tile(s, r, i)).join('')}</div>`).join('\n    ')}
  </div>
</section>

<section class="sec sec-dark">
  <div class="wrap">
    <div class="sec-head">
      <div>
        ${kick({ ru: '(02) Проекты', en: '(02) Projects' }, 'rv')}
        <h2 class="h2 rvh"><span class="ln"><span><b class="count" data-count="${projects.length}">${projects.length}</b> ${L('реализованных проекта.', 'delivered projects.')}</span></span></h2>
      </div>
      <a class="more rv" href="${r('projects/')}">${L('Все проекты', 'All projects')}${arrow}</a>
    </div>
    <div class="cats">
      ${projectCategories.map((c, i) => `<a class="cat rv" style="--d:${i * 0.06}s" href="${r('projects/?cat=' + c.id)}"><span class="cat-n">${pad(counts[c.id])}</span><span class="cat-t">${t(c.label)}</span>${arrow}</a>`).join('')}
    </div>
  </div>
  ${marquee(projects.map((p) => p.title), 'band-dark')}
</section>

<section class="sec sec-light">
  <div class="wrap">
    <div class="sec-head">
      <div>
        ${kick({ ru: '(03) Процесс', en: '(03) Process' }, 'rv')}
        <h2 class="h2 rvh"><span class="ln"><span>${L('Четыре шага.', 'Four steps.')}</span></span></h2>
      </div>
      <a class="more rv" href="${r('process/')}">${L('Как мы работаем', 'How we work')}${arrow}</a>
    </div>
    <ol class="mini-steps">
      ${steps.map((s, i) => `<li class="rv" style="--d:${i * 0.08}s"><a href="${r('process/#step-' + (i + 1))}"><span class="ms-ill">${stepArt[i]}</span><span class="ms-n mono">${pad(i + 1)}</span><span class="ms-t">${t(s.title)}</span></a></li>`).join('')}
    </ol>
  </div>
</section>

<section class="sec sec-tools" ${ta('aria-label', { ru: 'Инструменты', en: 'Tools' })}>
  <div class="bands">
    ${marquee(tools[0], 'b1')}
    ${marquee(tools[1], 'b2')}
  </div>
</section>`;
  written.push(layout({ path: '', desc: { ru: 'Двенадцать направлений в одной команде: маркетинг, автоматизация, ИИ, веб, облака и инженерия.', en: 'Twelve disciplines in one team: marketing, automation, AI, web, cloud and engineering.' }, body, bodyClass: 'home' }));
}

// Services index -----------------------------------------------------------
{
  const path = 'services/';
  const r = rootOf(path);
  const body = `${pageHead({
    r,
    crumbs: [[null, { ru: 'Услуги', en: 'Services' }]],
    kicker: { ru: '12 направлений', en: '12 disciplines' },
    title: `<span class="ln"><span>${L('Услуги', 'Services')}</span></span>`,
    lead: { ru: 'Выберите направление, чтобы узнать, что в него входит.', en: 'Pick a discipline to see what it covers.' },
  })}
<section class="sec sec-light">
  <div class="wrap">
    ${['growth', 'engineering'].map((g) => `<div class="grp rv"><span class="grp-l mono">${t(groups[g])}</span></div>
    <div class="slist">${services.filter((s) => s.group === g).map((s) => `<a class="srow rv" href="${r('services/' + s.slug + '/')}">
      <span class="srow-n mono">${svcNum(s)}</span>
      <span class="srow-art ${s.color}">${serviceArt[s.slug]}</span>
      <span class="srow-b"><span class="srow-t">${t(s.title)}</span><span class="srow-d">${t(s.intro)}</span></span>
      <span class="srow-go">${arrow}</span>
    </a>`).join('')}</div>`).join('\n    ')}
  </div>
</section>`;
  written.push(layout({ path, section: 'services', title: { ru: 'Услуги', en: 'Services' }, desc: { ru: 'Двенадцать направлений: от маркетинга и ИИ до инженерных расчётов и энергетики.', en: 'Twelve disciplines, from marketing and AI to engineering simulation and energy.' }, body }));
}

// Service detail pages -----------------------------------------------------
services.forEach((s, idx) => {
  const path = `services/${s.slug}/`;
  const r = rootOf(path);
  const rel = projects.filter((p) => p.services.includes(s.slug));
  const prev = services[(idx + services.length - 1) % services.length];
  const next = services[(idx + 1) % services.length];
  const body = `<section class="shero ${s.color}">
  <div class="wrap shero-in">
    <div class="shero-text">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${r('')}">${L('Главная', 'Home')}</a><a href="${r('services/')}">${L('Услуги', 'Services')}</a><span aria-current="page">${t(s.title)}</span></nav>
      <span class="kick tf-in">${tri}${svcNum(s)} / 12 · ${t(groups[s.group])}</span>
      <h1 class="h1 rise"><span class="ln"><span>${t(s.title)}</span></span></h1>
      <p class="lead tf-in">${t(s.intro)}</p>
      <div class="ctas tf-in">
        <a class="btn btn-dark" href="${r('contact/?service=' + s.slug)}">${L('Обсудить задачу', 'Discuss a project')}${arrow}</a>
      </div>
    </div>
    <div class="shero-art tf-in">${serviceArt[s.slug]}</div>
  </div>
</section>

<section class="sec sec-light">
  <div class="wrap two">
    <div>${kick({ ru: 'Что входит', en: 'What’s included' }, 'rv')}</div>
    <ul class="skills">
      ${s.skills.map((k, i) => `<li class="rv" style="--d:${(i % 6) * 0.04}s"><span class="mono">${pad(i + 1)}</span><span>${t(k)}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>
${rel.length ? `
<section class="sec sec-ice">
  <div class="wrap">
    <div class="sec-head">
      <div>${kick({ ru: 'Сделано', en: 'Delivered' }, 'rv')}<h2 class="h2 rvh"><span class="ln"><span>${L('Проекты по направлению', 'Related projects')}</span></span></h2></div>
      <a class="more rv" href="${r('projects/')}">${L('Все проекты', 'All projects')}${arrow}</a>
    </div>
    <div class="pcards">${rel.map((p) => projectCard(p, r)).join('')}</div>
  </div>
</section>` : ''}
${s.tools.length ? `
<section class="sec sec-light sec-tight">
  <div class="wrap two">
    <div>${kick({ ru: 'Инструменты', en: 'Tools' }, 'rv')}</div>
    <ul class="chips rv">${s.tools.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
  </div>
</section>` : ''}
<section class="sec sec-dark sec-tight">
  <div class="wrap">
    <div class="ask rv">
      <div>
        <h2 class="h3">${L('Нужна помощь с этим направлением?', 'Need help in this area?')}</h2>
        <p>${L('Напишите нам удобным способом или отправьте запрос.', 'Message us the way that suits you, or send an inquiry.')}</p>
      </div>
      <div class="ask-r">${chanRow()}<a class="btn btn-red" href="${r('contact/?service=' + s.slug)}">${t(CTA)}${arrow}</a></div>
    </div>
    <nav class="pn" aria-label="${esc('Services')}">
      <a class="pn-a" href="${r('services/' + prev.slug + '/')}"><span class="mono">← ${svcNum(prev)}</span>${t(prev.title)}</a>
      <a class="pn-a pn-next" href="${r('services/' + next.slug + '/')}"><span class="mono">${svcNum(next)} →</span>${t(next.title)}</a>
    </nav>
  </div>
</section>`;
  written.push(layout({ path, section: 'services', title: s.title, desc: s.intro, body, bodyClass: 'svc-page' }));
});

// Projects -----------------------------------------------------------------
{
  const path = 'projects/';
  const r = rootOf(path);
  const tabs = [{ id: 'all', label: { ru: 'Все', en: 'All' }, n: projects.length }, ...projectCategories.map((c) => ({ ...c, n: counts[c.id] }))];
  const body = `${pageHead({
    r,
    crumbs: [[null, { ru: 'Проекты', en: 'Projects' }]],
    kicker: { ru: 'Портфолио', en: 'Portfolio' },
    title: `<span class="ln"><span>${L('Проекты', 'Projects')}</span></span>`,
    lead: { ru: 'Только то, что мы уже сделали. Нажмите на проект, чтобы прочитать подробнее.', en: 'Only work we have already delivered. Open a project to read more.' },
  })}
<section class="sec sec-light">
  <div class="wrap">
    <div class="tabs rv" role="group" ${ta('aria-label', { ru: 'Фильтр проектов', en: 'Filter projects' })}>
      ${tabs.map((c, i) => `<button type="button" class="tab${i === 0 ? ' on' : ''}" data-cat="${c.id}" aria-pressed="${i === 0}">${t(c.label)}<sup>${c.n}</sup></button>`).join('')}
    </div>
    <div class="plist">
      ${projects.map((p, i) => `<details class="prow" id="${p.slug}" data-cat="${p.category}">
        <summary><span class="prow-n mono">${pad(i + 1)}</span><span class="prow-t">${t(p.title)}</span><span class="prow-k mono">${t(p.tags)}</span><span class="prow-x" aria-hidden="true"></span></summary>
        <div class="prow-b">
          <p>${t(p.desc)}</p>
          <div class="prow-s">${p.services.map((k) => `<a href="${r('services/' + k + '/')}">${t(svcBySlug[k].title)}${arrow}</a>`).join('')}</div>
        </div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec sec-dark">
  <div class="wrap">
    <div class="sec-head">
      <div>
        ${kick({ ru: 'Что мы можем сделать', en: 'What we can build' }, 'rv')}
        <h2 class="h2 rvh"><span class="ln"><span>${L('Проекты, которые', 'Projects we')}</span></span><span class="ln"><span class="red">${L('мы берём.', 'take on.')}</span></span></h2>
      </div>
    </div>
    <ul class="caps">
      ${capabilities.map((c, i) => `<li class="rv" style="--d:${(i % 4) * 0.05}s"><a href="${r('services/' + c.service + '/')}"><span class="mono">${pad(i + 1)}</span><span>${t(c.title)}</span>${arrow}</a></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
  written.push(layout({ path, section: 'projects', title: { ru: 'Проекты', en: 'Projects' }, desc: { ru: 'Реализованные проекты: веб и облака, автоматизация, ИИ и инженерные исследования.', en: 'Delivered projects: web and cloud, automation, AI and engineering research.' }, body }));
}

// Process ------------------------------------------------------------------
{
  const path = 'process/';
  const r = rootOf(path);
  const body = `${pageHead({
    r,
    crumbs: [[null, { ru: 'Процесс', en: 'Process' }]],
    kicker: { ru: 'Как мы работаем', en: 'How we work' },
    title: `<span class="ln"><span>${L('От эскиза', 'From sketch')}</span></span><span class="ln"><span class="red">${L('до сдачи.', 'to handover.')}</span></span>`,
    lead: { ru: 'Каждый этап ведут одни и те же люди, поэтому ничего не теряется между отделами.', en: 'The same people carry the work through every stage, so nothing gets lost between departments.' },
  })}
<section class="sec sec-light">
  <div class="wrap">
    <ol class="steps" data-steps>
      <span class="steps-rail" aria-hidden="true"><i></i></span>
      ${steps.map((s, i) => `<li class="step rv" id="step-${i + 1}">
        <span class="step-big" aria-hidden="true">${pad(i + 1)}</span>
        <div class="step-card">
          <div class="step-head"><span class="kick">${L('Этап', 'Stage')} ${pad(i + 1)}</span><span class="step-ill">${stepArt[i]}</span></div>
          <h2 class="h3">${t(s.title)}</h2>
          <p>${t(s.desc)}</p>
          <ul class="chips">${s.chips.map((c) => `<li>${t(c)}</li>`).join('')}</ul>
        </div>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>`;
  written.push(layout({ path, section: 'process', title: { ru: 'Процесс', en: 'Process' }, desc: { ru: 'Четыре этапа работы: задача, модель, сборка, передача.', en: 'Four stages: scope, model, build, hand over.' }, body }));
}

// About --------------------------------------------------------------------
{
  const path = 'about/';
  const r = rootOf(path);
  const stats = [
    [services.length, { ru: 'направлений, и все внутри команды', en: 'disciplines, all in-house' }],
    [projects.length, { ru: 'реализованных проекта', en: 'delivered projects' }],
    [2, { ru: 'рабочих языка: русский и английский', en: 'working languages: Russian and English' }],
  ];
  const body = `${pageHead({
    r,
    crumbs: [[null, { ru: 'О нас', en: 'About' }]],
    kicker: { ru: 'Почему одна команда', en: 'Why one team' },
    title: `<span class="ln"><span>${L('Одна команда', 'One team')}</span></span><span class="ln"><span class="red">${L('вместо пяти.', 'instead of five.')}</span></span>`,
  })}
<section class="sec sec-light">
  <div class="wrap">
    <p class="mani" data-mani>${t(manifesto)}</p>
    <div class="stats">
      ${stats.map(([n, label], i) => `<div class="stat rv" style="--d:${i * 0.1}s"><span class="stat-n" data-count="${n}">${n}</span><span class="stat-bar" aria-hidden="true"><i></i></span><p>${t(label)}</p></div>`).join('')}
    </div>
  </div>
</section>
<section class="sec sec-dark">
  <div class="wrap two two-c">
    <div>
      ${kick({ ru: 'Чёртова дюжина', en: 'Baker’s dozen' }, 'rv')}
      <h2 class="h2 rvh"><span class="ln"><span>${L('Двенадцать направлений', 'Twelve disciplines')}</span></span><span class="ln"><span class="red">${L('и тринадцатое: всё вместе.', 'and a thirteenth: all of them.')}</span></span></h2>
      <p class="lead rv">${L('Большинству проектов нужны три-четыре направления сразу. Поэтому они собраны в одной команде.', 'Most projects need three or four of these at once. That is why they sit in one team.')}</p>
      <a class="btn btn-red rv" href="${r('services/')}">${L('Смотреть услуги', 'See services')}${arrow}</a>
    </div>
    <div class="orbit rv">${orbitArt}</div>
  </div>
</section>
<section class="sec sec-tools">
  <div class="wrap">${kick({ ru: 'Инструменты', en: 'Toolkit' }, 'rv')}</div>
  <div class="bands">
    ${marquee(tools[0], 'b1')}
    ${marquee(tools[1], 'b2')}
  </div>
</section>`;
  written.push(layout({ path, section: 'about', title: { ru: 'О нас', en: 'About' }, desc: { ru: 'Инжиниринг, софт и рост в одной небольшой команде.', en: 'Engineering, software and growth in one small team.' }, body }));
}

// Contact / Inquiry / Demo -------------------------------------------------
{
  const path = 'contact/';
  const r = rootOf(path);
  const opt = (v, x) => `<option value="${v}" data-i18n-text="${esc(JSON.stringify(x))}">${esc(x.ru)}</option>`;
  const body = `${pageHead({
    r,
    crumbs: [[null, CTA]],
    kicker: { ru: 'Запрос или демонстрация', en: 'Inquiry or demo' },
    title: `<span class="ln"><span>${L('Расскажите', 'Tell us')}</span></span><span class="ln"><span class="red">${L('о задаче.', 'what you need.')}</span></span>`,
    lead: { ru: 'Заполните форму или напишите нам напрямую.', en: 'Fill in the form or message us directly.' },
  })}
<section class="sec sec-light">
  <div class="wrap cgrid">
    <form class="form rv" data-inquiry novalidate>
      <fieldset class="seg">
        <legend class="kick">${L('Тип запроса', 'Request type')}</legend>
        <label><input type="radio" name="type" value="inquiry" checked><span>${L('Запрос проекта', 'Project inquiry')}</span></label>
        <label><input type="radio" name="type" value="demo"><span>${L('Демонстрация', 'Request a demo')}</span></label>
      </fieldset>
      <div class="fgrid">
        <label class="fld"><span class="kick">${L('Имя', 'Name')} *</span><input name="name" type="text" autocomplete="name" required ${ta('placeholder', { ru: 'Как к вам обращаться', en: 'Your name' })}></label>
        <label class="fld"><span class="kick">${L('Компания', 'Company')}</span><input name="company" type="text" autocomplete="organization" ${ta('placeholder', { ru: 'Необязательно', en: 'Optional' })}></label>
        <label class="fld"><span class="kick">${L('Email или телефон', 'Email or phone')} *</span><input name="reply" type="text" autocomplete="email" required ${ta('placeholder', { ru: 'Куда вам ответить', en: 'Where we can reply' })}></label>
        <label class="fld"><span class="kick">${L('Направление', 'Service')}</span><span class="sel"><select name="service">${opt('mix', { ru: 'Несколько направлений', en: 'A mix of these' })}${services.map((s) => opt(s.slug, s.title)).join('')}</select></span></label>
        <label class="fld fld-w"><span class="kick">${L('Сообщение', 'Message')}</span><textarea name="details" rows="5" ${ta('placeholder', { ru: 'Что нужно сделать, сроки, ссылки', en: 'What you need, timelines, links' })}></textarea></label>
      </div>
      <p class="form-err" role="alert" hidden>${L('Укажите имя и контакт для ответа.', 'Please add your name and a way to reply.')}</p>
      <div class="send">
        <span class="kick">${L('Отправить через', 'Send via')}</span>
        <div class="chb-row">
          <button class="chb chb-mail" type="submit" data-via="mail"><span class="chb-i">${icons.mail}</span><span class="chb-t">Gmail</span></button>
          <button class="chb chb-whatsapp" type="submit" data-via="whatsapp"><span class="chb-i">${icons.whatsapp}</span><span class="chb-t">WhatsApp</span></button>
          <button class="chb chb-telegram" type="submit" data-via="telegram"><span class="chb-i">${icons.telegram}</span><span class="chb-t">Telegram</span></button>
        </div>
        <p class="note" data-note>${L('Откроется приложение с готовым сообщением.', 'Opens the app with your message filled in.')}</p>
        <p class="note note-ok" data-tg-note hidden>${L('Текст скопирован. Вставьте его в чат Telegram.', 'Message copied. Paste it into the Telegram chat.')}</p>
      </div>
    </form>
    <aside class="direct rv" style="--d:.12s" data-site="${esc(JSON.stringify({ email: site.email, whatsapp: site.whatsapp, telegram: links.telegram }))}">
      <h2 class="h3">${L('Напрямую', 'Directly')}</h2>
      <a class="drow" href="${esc(links.telegram)}" target="_blank" rel="noopener"><span class="drow-i ch-telegram">${icons.telegram}</span><span><b>Telegram</b><small>${L('Открыть чат', 'Open chat')}</small></span>${arrow}</a>
      <a class="drow" href="${esc(links.whatsapp)}" target="_blank" rel="noopener"><span class="drow-i ch-whatsapp">${icons.whatsapp}</span><span><b>WhatsApp</b><small>${L('Открыть чат', 'Open chat')}</small></span>${arrow}</a>
      <a class="drow" href="${esc(links.mail)}" data-gmail="${esc(site.email)}"><span class="drow-i ch-mail">${icons.mail}</span><span><b>Gmail</b><small>${esc(site.email)}</small></span>${arrow}</a>
      <a class="drow" href="${esc(links.tel)}"><span class="drow-i ch-phone">${icons.phone}</span><span><b>${L('Телефон', 'Phone')}</b><small>${esc(site.phoneDisplay)}</small></span>${arrow}</a>
      <p class="direct-note">${L('Работаем на русском и английском.', 'We work in Russian and English.')}</p>
    </aside>
  </div>
</section>`;
  written.push(layout({ path, section: 'contact', title: CTA, desc: { ru: 'Отправьте запрос проекта или попросите демонстрацию.', en: 'Send a project inquiry or request a demo.' }, body, bodyClass: 'contact-page' }));
}

// 404 ----------------------------------------------------------------------
{
  // GitHub Pages serves 404.html from any depth, so links here must be absolute.
  const base = new URL(site.url).pathname;
  const body = `<section class="phead phead-404"><div class="wrap">
    <span class="kick">404</span>
    <h1 class="h1"><span class="ln"><span>${L('Страница не найдена.', 'Page not found.')}</span></span></h1>
    <div class="ctas"><a class="btn btn-red" href="${base}">${L('На главную', 'Go home')}${arrow}</a><a class="btn btn-ghost" href="${base}contact/">${t(CTA)}</a></div>
  </div></section>`;
  const file = layout({ path: '404.html', desc: { ru: 'Страница не найдена.', en: 'Page not found.' }, title: { ru: '404', en: '404' }, body });
  // Rewrite relative asset and nav links to absolute ones for the 404 page.
  writeFileSync(file, readFileSync(file, 'utf8').replace(/(href|src)="\.\/(?!\/)/g, `$1="${base}`));
  written.push(file);
}

// Stylesheet ---------------------------------------------------------------
{
  const SRC = dirname(fileURLToPath(import.meta.url));
  mkdirSync(join(OUT, 'css'), { recursive: true });
  writeFileSync(join(OUT, 'css', 'site.css'), readFileSync(join(SRC, 'styles.css'), 'utf8') + '\n' + readFileSync(join(SRC, 'illustrations.css'), 'utf8'));
}

// Sitemap and robots -------------------------------------------------------
{
  const urls = ['', 'services/', ...services.map((s) => `services/${s.slug}/`), 'projects/', 'process/', 'about/', 'contact/'];
  writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(site.url + u)}</loc></url>`).join('\n')}\n</urlset>\n`);
  writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}sitemap.xml\n`);
}

console.log(`Built ${written.length} pages (asset version ${VERSION}).`);
