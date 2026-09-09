// Turner Fenton DECA shared motion & page-transition system
(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function spawnEmbers(container, count) {
    for (var i = 0; i < count; i++) {
      var ember = document.createElement('div');
      ember.className = 'ember';
      var size = 4 + Math.random() * 9;
      ember.style.left = (Math.random() * 100) + '%';
      ember.style.bottom = (-20 - Math.random() * 60) + 'px';
      ember.style.width = size + 'px';
      ember.style.height = size + 'px';
      ember.style.animationDuration = (6 + Math.random() * 5) + 's';
      ember.style.animationDelay = (Math.random() * 8) + 's';
      container.appendChild(ember);
    }
  }

  // ---- Mobile nav toggle ----
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Hero ember particles (home hero only) ----
  var heroEmbers = document.getElementById('heroEmbers');
  if (heroEmbers && !prefersReduced) spawnEmbers(heroEmbers, 16);

  // ---- Hero / page-hero text entrance (load-triggered, staggered) ----
  var heroTextTargets = document.querySelectorAll(
    '.hero .eyebrow, .hero h1, .hero p.lede, .hero-ctas, ' +
    '.page-hero .eyebrow, .page-hero h1, .page-hero p'
  );
  if (heroTextTargets.length && !prefersReduced) {
    heroTextTargets.forEach(function (el, i) {
      el.classList.add('reveal-init');
      el.style.transitionDelay = (i * 110) + 'ms';
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        heroTextTargets.forEach(function (el) { el.classList.add('in'); });
      });
    });
  }

  // ---- Scroll reveal: cards, section heads, timeline ----
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    function revealGroup(containerSel, itemSel, stagger) {
      document.querySelectorAll(containerSel).forEach(function (container) {
        var items = container.querySelectorAll(itemSel);
        items.forEach(function (el, i) {
          el.classList.add('reveal-init');
          el.style.transitionDelay = (i * stagger) + 'ms';
          revealObserver.observe(el);
        });
      });
    }

    revealGroup('.stats-grid', '.stat-card', 70);
    revealGroup('.highlight-row', '.hl-card', 70);
    revealGroup('.path-grid', '.card', 70);
    revealGroup('.exec-grid', '.exec-card', 60);
    revealGroup('.news-grid', '.card', 70);
    revealGroup('.timeline', '.timeline-item', 80);
    revealGroup('.contact-grid > div', '.card', 70);
    revealGroup('.photo-strip', '.card', 80);
    revealGroup('.collage', '.card', 60);
    revealGroup('.resource-grid', '.card', 70);
    revealGroup('.rp-clusters', '.rp-cluster-btn', 60);

    document.querySelectorAll('.wrap > .event-block').forEach(function (el, i) {
      el.classList.add('reveal-init');
      el.style.transitionDelay = (i * 70) + 'ms';
      revealObserver.observe(el);
    });
    document.querySelectorAll('.section-head, .news-empty, .tier-image-card, .exec-intro-frame').forEach(function (el) {
      el.classList.add('reveal-init');
      revealObserver.observe(el);
    });
  }

  // ---- Stat count-up ----
  var statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      // leave the static final text already in the markup
    } else {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        });
      }, { threshold: 0.4 });
      statNums.forEach(function (el) { countObserver.observe(el); });
    }
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  }

  // ---- Full-screen page transition ----
  var overlay = document.getElementById('pageTransitionOverlay');
  if (!overlay) return;

  if (prefersReduced) {
    overlay.parentNode.removeChild(overlay);
    return;
  }

  var ptLogo = overlay.querySelector('.pt-logo');
  var ptEmbers = overlay.querySelector('.pt-embers');
  if (ptEmbers) spawnEmbers(ptEmbers, 10);

  var HOLD = 500;
  var FADE = 400;

  function playEntrance() {
    overlay.classList.remove('hidden', 'closing');
    void overlay.offsetWidth;
    ptLogo.classList.remove('in');
    void ptLogo.offsetWidth;
    requestAnimationFrame(function () { ptLogo.classList.add('in'); });
  }

  function playExit() {
    overlay.classList.add('closing');
    setTimeout(function () {
      overlay.classList.add('hidden');
      ptLogo.classList.remove('in');
    }, FADE);
  }

  // initial page-load sequence: overlay is already visible via CSS default state
  playEntrance();
  var settled = false;
  function settle() {
    if (settled) return;
    settled = true;
    setTimeout(playExit, HOLD);
  }
  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle);
  setTimeout(settle, 2000); // safety net if load stalls

  // intercept same-site internal link clicks
  document.addEventListener('click', function (ev) {
    var link = ev.target.closest('a[href]');
    if (!link) return;
    if (ev.defaultPrevented || ev.button !== 0) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

    var url;
    try { url = new URL(href, window.location.href); } catch (e) { return; }
    if (url.origin !== window.location.origin) return;
    if (url.href.split('#')[0] === window.location.href.split('#')[0]) return;

    ev.preventDefault();
    playEntrance();
    setTimeout(function () { window.location.href = url.href; }, HOLD);
  });

  // bfcache restore safety
  window.addEventListener('pageshow', function (ev) {
    if (ev.persisted) {
      overlay.classList.add('hidden');
      ptLogo.classList.remove('in');
    }
  });
})();
