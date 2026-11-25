/* Site behaviour: language switch, navigation, contact links, scroll effects,
   the hero animation, the projects filter and the inquiry form.
   Plain JavaScript, no dependencies. Every page works without it. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var mq = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var finePointer = mq('(pointer: fine)');
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));
  var lang = function () { return doc.classList.contains('lang-en') ? 'en' : 'ru'; };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ------------------------------------------------------------ Language */
  function applyLang() {
    var L = lang();
    doc.lang = L;
    try { var tt = JSON.parse(document.body.getAttribute('data-title')); document.title = tt[L]; } catch (e) {}
    ['placeholder', 'aria-label', 'title'].forEach(function (attr) {
      $$('[data-i18n-' + attr + ']').forEach(function (el) {
        try { el.setAttribute(attr, JSON.parse(el.getAttribute('data-i18n-' + attr))[L]); } catch (e) {}
      });
    });
    $$('[data-i18n-text]').forEach(function (el) {
      try { el.textContent = JSON.parse(el.getAttribute('data-i18n-text'))[L]; } catch (e) {}
    });
  }
  $$('.lang').forEach(function (b) {
    b.addEventListener('click', function () {
      doc.classList.toggle('lang-en');
      try { localStorage.setItem('lang', lang()); } catch (e) {}
      applyLang();
      document.dispatchEvent(new Event('langchange'));
    });
  });
  applyLang();

  /* ------------------------------------------------------------ Contact links */
  // On desktop, the Gmail buttons open Gmail's compose window; on phones they use
  // mailto:, which opens the mail app (Gmail when it is the default).
  function gmailUrl(to, subject, body) {
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
      (subject ? '&su=' + encodeURIComponent(subject) : '') + (body ? '&body=' + encodeURIComponent(body) : '');
  }
  if (!isMobile) {
    $$('a[data-gmail]').forEach(function (a) {
      a.href = gmailUrl(a.getAttribute('data-gmail'));
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  /* ------------------------------------------------------------ Navigation */
  var nav = $('.nav');
  var burger = $('.burger');
  var menu = $('#menu');
  function setMenu(open) {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    var lbl = open ? { ru: 'Закрыть меню', en: 'Close menu' } : { ru: 'Открыть меню', en: 'Open menu' };
    burger.setAttribute('data-i18n-aria-label', JSON.stringify(lbl));
    burger.setAttribute('aria-label', lbl[lang()]);
    if (open) nav.classList.remove('hide');
  }
  if (burger) burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 980) setMenu(false); });

  /* ------------------------------------------------------------ Scroll-driven bits */
  var rail = $('.rail');
  var footCta = $('.foot-cta');
  var isHome = document.body.classList.contains('home');
  var prog = $('.prog');
  var stepsEl = $('[data-steps]');
  var mani = $('[data-mani]');
  var lastY = window.scrollY;
  var ticking = false;
  var footVisible = false;

  if (footCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (ents) { footVisible = ents[0].isIntersecting; onScroll(); }, { threshold: 0.2 }).observe(footCta);
  }

  function onScroll() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    var max = Math.max(1, document.documentElement.scrollHeight - vh);
    if (prog) prog.style.setProperty('--sp', (y / max).toFixed(4));
    if (nav) {
      nav.classList.toggle('scrolled', y > 24);
      if (!document.body.classList.contains('menu-open')) {
        if (y > 320 && y > lastY + 4) nav.classList.add('hide');
        else if (y < lastY - 4 || y <= 320) nav.classList.remove('hide');
      }
    }
    if (rail) rail.classList.toggle('on', (!isHome || y > vh * 0.5) && !footVisible);
    if (stepsEl) {
      var r = stepsEl.getBoundingClientRect();
      stepsEl.style.setProperty('--pp', clamp((vh * 0.6 - r.top) / Math.max(1, r.height), 0, 1).toFixed(3));
    }
    if (mani) {
      var m = mani.getBoundingClientRect();
      mani.style.setProperty('--mp', (clamp((vh * 0.85 - m.top) / (m.height + vh * 0.25), 0, 1) * 100).toFixed(1) + '%');
    }
    lastY = y;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  if (reduce) { if (stepsEl) stepsEl.style.setProperty('--pp', 1); }
  onScroll();

  /* ------------------------------------------------------------ Reveal and counters */
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduce || !to) { el.textContent = String(to); return; }
    var t0 = performance.now(), dur = 1800;
    (function step(t) {
      var q = Math.min(1, (t - t0) / dur);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - q, 3))));
      if (q < 1) requestAnimationFrame(step);
    })(t0);
  }
  var revealEls = $$('.rv, .rvh, .step');
  var countEls = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
    var io2 = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        io2.unobserve(en.target);
        countUp(en.target);
      });
    }, { threshold: 0.6 });
    countEls.forEach(function (el) { el.textContent = '0'; io2.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ------------------------------------------------------------ Tile highlight */
  if (finePointer && !reduce) {
    document.addEventListener('pointermove', function (e) {
      var tile = e.target.closest && e.target.closest('.tile');
      if (!tile) return;
      var r = tile.getBoundingClientRect();
      tile.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      tile.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }, { passive: true });
  }

  /* ------------------------------------------------------------ Hero animation */
  // Twelve clusters of particles on a ring (the "dozen"), over a star field.
  // It sits behind the name; the pointer pushes particles away, holding scatters
  // them, and scrolling flies through the ring.
  (function hero() {
    var cv = $('.hero-cv');
    var heroEl = $('[data-hero]');
    if (!cv || !heroEl || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var W = 0, H = 0, stars = [], P = [], rot = 0, press = 0, visible = true;
    var mouse = { x: -1e4, y: -1e4, inside: false, down: false };
    var COLS = ['#FFFFFF', '#FF5A4A', '#6E9BFF'];

    function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }
    function size() {
      var w = cv.clientWidth, h = cv.clientHeight;
      if (!w || !h || (w === W && h === H)) return;
      W = w; H = h;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(520, W * H / 2600));
      stars = [];
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: 0.05 + Math.random() * 0.95, s: Math.random() });
      var per = W < 700 ? 16 : 28, spread = W < 700 ? 9 : 15;
      if (!P.length) {
        for (var k = 0; k < 12; k++) {
          var col = k % 3 === 0 ? (k % 6 === 0 ? 2 : 1) : 0;
          for (var j = 0; j < per; j++) {
            P.push({ k: k, ox: gauss() * spread, oy: gauss() * spread, x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, c: j < per * 0.75 ? col : (Math.random() < 0.5 ? 0 : col), s: 0.9 + Math.random() * 1.6, b: 0.45 + Math.random() * 0.55 });
          }
        }
      }
    }
    function geom() {
      var rx = Math.min(W * 0.42, 660), ry = Math.min(H * 0.34, rx * 0.62);
      if (W < 700) { rx = W * 0.44; ry = Math.min(H * 0.3, rx * 1.05); }
      return { cx: W / 2, cy: H * 0.5, rx: rx, ry: ry };
    }

    heroEl.addEventListener('pointermove', function (e) {
      var r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.inside = true;
    }, { passive: true });
    heroEl.addEventListener('pointerleave', function () { mouse.inside = false; mouse.down = false; });
    heroEl.addEventListener('pointerdown', function (e) {
      if (e.target.closest('a,button')) return;
      mouse.down = true;
      var r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      P.forEach(function (p) {
        var dx = p.x - x, dy = p.y - y, d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < 320) { var f = (1 - d / 320) * 18; p.vx += dx / d * f; p.vy += dy / d * f; }
      });
    }, { passive: true });
    window.addEventListener('pointerup', function () { mouse.down = false; });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ents) { visible = ents[0].isIntersecting; }).observe(heroEl);
    }

    function draw(still) {
      size();
      if (!W) return;
      var g = geom();
      var fly = clamp(window.scrollY / Math.max(1, H), 0, 1);
      press += ((mouse.down ? 1 : 0) - press) * 0.06;
      ctx.clearRect(0, 0, W, H);

      // Stars
      var sp = still ? 0 : 0.0012 + fly * 0.016 + press * 0.004;
      ctx.fillStyle = '#FFFFFF';
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        st.z -= sp * (0.55 + st.s);
        if (st.z < 0.04) { st.x = Math.random() * 2 - 1; st.y = Math.random() * 2 - 1; st.z = 1; }
        var kz = 1 / st.z;
        var x = g.cx + st.x * g.cx * kz, y = g.cy + st.y * H * 0.55 * kz;
        if (x < -4 || x > W + 4 || y < -4 || y > H + 4) { st.x = Math.random() * 2 - 1; st.y = Math.random() * 2 - 1; st.z = 1; continue; }
        var nz = 1 - st.z;
        ctx.globalAlpha = Math.min(1, 0.08 + nz * 1.1) * (0.3 + st.s * 0.6);
        var rr = 0.6 + nz * 1.8;
        ctx.fillRect(x, y, rr, rr);
      }

      // Ring
      if (!still) rot += 0.0011 + press * 0.004;
      var zoom = 1 + fly * fly * 2.6, fade = Math.max(0, 1 - fly * 1.25);
      var rx = g.rx * zoom, ry = g.ry * zoom;
      ctx.globalAlpha = 0.09 * fade;
      ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(g.cx, g.cy, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();

      var ks = still ? 1 : 0.024 * (1 - press * 0.9), damp = 0.86;
      var R = Math.max(80, Math.min(160, W * 0.1)), R2 = R * R;
      var nodes = [];
      for (var k = 0; k < 12; k++) {
        var a = k / 12 * Math.PI * 2 - Math.PI / 2 + rot;
        nodes.push([g.cx + Math.cos(a) * rx, g.cy + Math.sin(a) * ry]);
      }
      for (var c = 0; c < 3; c++) {
        ctx.fillStyle = COLS[c];
        for (var q = 0; q < P.length; q++) {
          var p = P[q];
          if (c === 0) {
            var tx = nodes[p.k][0] + p.ox * zoom, ty = nodes[p.k][1] + p.oy * zoom;
            if (still) { p.x = tx; p.y = ty; }
            else {
              var ax = (tx - p.x) * ks, ay = (ty - p.y) * ks;
              if (press > 0.02) { ax += (Math.random() - 0.5) * press * 1.4; ay += (Math.random() - 0.5) * press * 1.4; }
              if (mouse.inside) {
                var dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
                if (d2 < R2 && d2 > 0.01) { var d = Math.sqrt(d2), f = (1 - d / R) * 3.2; ax += dx / d * f; ay += dy / d * f; }
              }
              p.vx = (p.vx + ax) * damp; p.vy = (p.vy + ay) * damp;
              p.x += p.vx; p.y += p.vy;
            }
          }
          if (p.c !== c) continue;
          ctx.globalAlpha = p.b * fade;
          var z = p.s * (1 + fly * 1.6);
          ctx.fillRect(p.x, p.y, z, z);
        }
      }
      // Cluster cores, coloured like the logo
      for (k = 0; k < 12; k++) {
        var colr = k % 3 === 0 ? (k % 6 === 0 ? COLS[2] : COLS[1]) : COLS[0];
        ctx.globalAlpha = (k % 3 === 0 ? 0.95 : 0.55) * fade;
        ctx.fillStyle = colr;
        ctx.beginPath(); ctx.arc(nodes[k][0], nodes[k][1], (k % 3 === 0 ? 4.2 : 2.6) * (1 + fly), 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    if (reduce) {
      draw(true);
      window.addEventListener('resize', function () { W = 0; draw(true); });
      return;
    }
    (function loop() {
      if (visible && !document.hidden) draw(false);
      requestAnimationFrame(loop);
    })();
  })();

  /* ------------------------------------------------------------ Projects filter */
  (function projectsPage() {
    var tabs = $$('.tab[data-cat]');
    if (!tabs.length) return;
    var rows = $$('.prow');
    function pick(cat, animate) {
      tabs.forEach(function (t) { var on = t.getAttribute('data-cat') === cat; t.classList.toggle('on', on); t.setAttribute('aria-pressed', String(on)); });
      rows.forEach(function (r, i) {
        var show = cat === 'all' || r.getAttribute('data-cat') === cat;
        r.hidden = !show;
        r.classList.remove('show');
        if (show && animate && !reduce) { r.style.animationDelay = (Math.min(i, 12) * 0.03) + 's'; void r.offsetWidth; r.classList.add('show'); }
      });
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var cat = t.getAttribute('data-cat');
        pick(cat, true);
        try { history.replaceState(null, '', cat === 'all' ? location.pathname : '?cat=' + cat); } catch (e) {}
      });
    });
    var q = new URLSearchParams(location.search).get('cat');
    if (q && tabs.some(function (t) { return t.getAttribute('data-cat') === q; })) pick(q, false);
    function openHash() {
      var id = decodeURIComponent(location.hash.slice(1));
      var el = id && document.getElementById(id);
      if (el && el.classList.contains('prow')) {
        if (el.hidden) pick('all', false);
        el.open = true;
        setTimeout(function () { el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); }, 60);
      }
    }
    window.addEventListener('hashchange', openHash);
    openHash();
  })();

  /* ------------------------------------------------------------ Inquiry form */
  (function inquiry() {
    var form = $('[data-inquiry]');
    if (!form) return;
    var F = function (n) { return form.elements.namedItem(n); };
    var cfg = {};
    try { cfg = JSON.parse($('.direct').getAttribute('data-site')); } catch (e) {}
    var params = new URLSearchParams(location.search);
    var svc = params.get('service');
    if (svc && F('service').querySelector('option[value="' + svc.replace(/[^a-z-]/g, '') + '"]')) F('service').value = svc;
    if (params.get('type') === 'demo') form.querySelector('input[name="type"][value="demo"]').checked = true;
    var err = $('.form-err', form), tgNote = $('[data-tg-note]', form);
    var via = 'mail';
    $$('button[data-via]', form).forEach(function (b) { b.addEventListener('click', function () { via = b.getAttribute('data-via'); }); });

    function compose() {
      var en = lang() === 'en';
      var type = form.querySelector('input[name="type"]:checked').value;
      var svcName = F('service').options[F('service').selectedIndex].textContent;
      var name = F('name').value.trim(), company = F('company').value.trim(), reply = F('reply').value.trim(), details = F('details').value.trim();
      var subject = en
        ? (type === 'demo' ? 'Demo request: ' : 'Project inquiry: ') + svcName
        : (type === 'demo' ? 'Запрос демонстрации: ' : 'Запрос проекта: ') + svcName;
      var lines = en
        ? ['Hello! My name is ' + name + (company ? ', from ' + company : '') + '.',
           (type === 'demo' ? 'I would like a demo. Area: ' : 'I have a project. Area: ') + svcName + '.']
        : ['Здравствуйте! Меня зовут ' + name + (company ? ', компания ' + company : '') + '.',
           (type === 'demo' ? 'Хочу посмотреть демонстрацию. Направление: ' : 'Есть задача. Направление: ') + svcName + '.'];
      if (details) lines.push('', details);
      lines.push('', (en ? 'Reply to: ' : 'Ответить: ') + reply);
      return { subject: subject, body: lines.join('\n') };
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (e.submitter && e.submitter.getAttribute('data-via')) via = e.submitter.getAttribute('data-via');
      var bad = [];
      [F('name'), F('reply')].forEach(function (f) { var ok = !!f.value.trim(); f.classList.toggle('bad', !ok); if (!ok) bad.push(f); });
      err.hidden = !bad.length;
      if (bad.length) { bad[0].focus(); return; }
      var m = compose();
      tgNote.hidden = true;
      if (via === 'whatsapp') {
        window.open('https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(m.subject + '\n\n' + m.body), '_blank', 'noopener');
      } else if (via === 'telegram') {
        // Telegram links cannot carry a pre-filled message to a person, so copy it first.
        var text = m.subject + '\n\n' + m.body;
        var open = function () { tgNote.hidden = false; window.open(cfg.telegram, '_blank', 'noopener'); };
        try { navigator.clipboard.writeText(text).then(open, open); } catch (x) { open(); }
      } else if (isMobile) {
        location.href = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.body);
      } else {
        window.open(gmailUrl(cfg.email, m.subject, m.body), '_blank', 'noopener');
      }
    });
    [F('name'), F('reply')].forEach(function (f) { f.addEventListener('input', function () { if (f.value.trim()) f.classList.remove('bad'); }); });
  })();
})();
