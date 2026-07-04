/**
 * Navya Sri | Portfolio — shared interactive behaviors
 * Injects theme toggle, scroll progress, back-to-top, sidebar mobile toggle.
 * Auto-highlights active nav link, animates counters, adds 3D tilt to cards.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     Inject UI chrome (theme toggle, scroll bar, back-to-top,
     mobile sidebar toggle, overlay)
     ------------------------------------------------------------ */
  function injectChrome() {
    // Scroll progress bar
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);

    // Theme toggle
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle';
    themeBtn.setAttribute('aria-label', 'Toggle color theme');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i><i class="fas fa-sun"></i>';
    document.body.appendChild(themeBtn);

    // Back to top
    const topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(topBtn);

    // Sidebar mobile toggle + overlay (only if sidebar exists)
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      const toggle = document.createElement('button');
      toggle.className = 'sidebar-toggle';
      toggle.setAttribute('aria-label', 'Toggle navigation');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.appendChild(toggle);

      const overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);

      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
      });
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
      // Close on nav click (mobile)
      sidebar.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
          sidebar.classList.remove('open');
          overlay.classList.remove('active');
        })
      );
    }

    return { bar, themeBtn, topBtn };
  }

  /* ------------------------------------------------------------
     Theme handling (persisted in localStorage)
     ------------------------------------------------------------ */
  function setupTheme(themeBtn) {
    const saved = localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = saved || preferred;
    document.documentElement.setAttribute('data-theme', initial);

    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ------------------------------------------------------------
     Scroll progress + back-to-top visibility
     ------------------------------------------------------------ */
  function setupScrollProgress(bar, topBtn) {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
      topBtn.classList.toggle('visible', scrollTop > 400);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------
     Highlight the active nav item based on current page
     ------------------------------------------------------------ */
  function highlightActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  /* ------------------------------------------------------------
     Animated number counters ([data-count="42"])
     ------------------------------------------------------------ */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.animated) return;
        el.dataset.animated = 'true';

        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          const display = Number.isInteger(target) ? Math.floor(value) : value.toFixed(1);
          el.textContent = display + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));
  }

  /* ------------------------------------------------------------
     3D tilt effect for elements with .tilt-card
     ------------------------------------------------------------ */
  function setupTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateY = ((x - cx) / cx) * 6;
        const rotateX = -((y - cy) / cy) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------
     Scroll-reveal: add .in-view to .fade-in-up / .reveal-stagger
     ------------------------------------------------------------ */
  function setupReveal() {
    const els = document.querySelectorAll('.fade-in-up, .reveal-stagger');
    if (!els.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => observer.observe(el));
  }

  /* ------------------------------------------------------------
     Simple form validation for contact
     ------------------------------------------------------------ */
  function setupFormValidation() {
    const form = document.querySelector('.php-email-form');
    if (!form) return;

    const status = form.querySelector('.form-status') || (() => {
      const s = document.createElement('div');
      s.className = 'form-status';
      form.appendChild(s);
      return s;
    })();

    form.addEventListener('submit', e => {
      let ok = true;
      form.querySelectorAll('[required]').forEach(field => {
        const value = field.value.trim();
        const isEmail = field.type === 'email';
        const valid = value.length > 0 && (!isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        field.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        e.preventDefault();
        status.className = 'form-status error';
        status.textContent = 'Please fill in all fields correctly before sending.';
        return;
      }
      status.className = 'form-status success';
      status.textContent = 'Sending your message…';
    });

    // Clear invalid state as the user fixes it
    form.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('invalid'));
    });
  }

  /* ------------------------------------------------------------
     Boot
     ------------------------------------------------------------ */
  function boot() {
    const { bar, themeBtn, topBtn } = injectChrome();
    setupTheme(themeBtn);
    setupScrollProgress(bar, topBtn);
    highlightActiveNav();
    animateCounters();
    setupTilt();
    setupReveal();
    setupFormValidation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
