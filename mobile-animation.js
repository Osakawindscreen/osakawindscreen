/* Osaka Windscreen — premium navigation + motion layer.
   Designed to preserve the existing desktop layout. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = `
    /* Premium scroll motion */
    .osaka-reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity .72s cubic-bezier(.22,.61,.36,1), transform .72s cubic-bezier(.22,.61,.36,1);
      transition-delay: var(--reveal-delay, 0ms);
      will-change: opacity, transform;
    }
    .osaka-reveal.is-visible { opacity: 1; transform: none; }
    .hero-left { animation: osakaHeroLeft .85s cubic-bezier(.22,.61,.36,1) both; }
    .hero-trust-card { animation: osakaHeroRight .85s .16s cubic-bezier(.22,.61,.36,1) both; }
    .hero-service-strip { animation: osakaHeroStrip .75s .3s cubic-bezier(.22,.61,.36,1) both; }
    .hero:before { animation: osakaHeroImage 10s ease-out both; }
    .service-card, .why-us-card, .review-card, .insurance-panel-card, .gallery-item, .about-card {
      transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
    }
    .service-card:hover, .why-us-card:hover, .review-card:hover, .insurance-panel-card:hover { transform: translateY(-4px); }
    .gallery-item:hover img { transform: scale(1.035); }
    .gallery-item img { transition: transform .55s cubic-bezier(.22,.61,.36,1); }

    @keyframes osakaHeroLeft { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:none; } }
    @keyframes osakaHeroRight { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:none; } }
    @keyframes osakaHeroStrip { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
    @keyframes osakaHeroImage { from { transform:scale(1.015); } to { transform:scale(1); } }

    /* Mobile corporate navigation */
    .osaka-mobile-toggle {
      display:none;
      width:44px;height:44px;border:0;border-radius:6px;background:#111;color:#fff;
      align-items:center;justify-content:center;cursor:pointer;position:relative;z-index:10002;
    }
    .osaka-mobile-toggle span,.osaka-mobile-toggle span:before,.osaka-mobile-toggle span:after {
      display:block;width:20px;height:2px;background:#fff;content:"";position:absolute;transition:.25s ease;
    }
    .osaka-mobile-toggle span:before { transform:translateY(-7px); }
    .osaka-mobile-toggle span:after { transform:translateY(7px); }
    .osaka-mobile-toggle.is-open span { background:transparent; }
    .osaka-mobile-toggle.is-open span:before { transform:rotate(45deg); }
    .osaka-mobile-toggle.is-open span:after { transform:rotate(-45deg); }

    .osaka-mobile-panel {
      display:none;position:fixed;top:94px;left:0;right:0;z-index:10000;
      background:rgba(9,9,9,.98);border-top:1px solid rgba(255,255,255,.12);
      box-shadow:0 18px 45px rgba(0,0,0,.4);overflow:hidden;
      max-height:0;opacity:0;transform:translateY(-8px);pointer-events:none;
      transition:max-height .35s ease,opacity .25s ease,transform .35s ease;
    }
    .osaka-mobile-panel.is-open { max-height:calc(100vh - 94px);opacity:1;transform:none;pointer-events:auto;overflow:auto; }
    .osaka-mobile-panel a {
      display:block;padding:17px 24px;color:#fff;border-bottom:1px solid #292929;
      font-size:14px;font-weight:900;letter-spacing:.6px;text-align:left;
    }
    .osaka-mobile-panel a:hover { background:#151515;color:var(--red); }
    .osaka-mobile-panel .mobile-call { background:#fff;color:#111;margin:18px 20px;border:0;border-radius:28px;text-align:center; }

    @media (max-width: 800px) {
      nav { padding:0 14px; }
      .nav-logo { flex:1 1 auto;height:94px; }
      .nav-logo img { height:72px;width:185px; }
      .nav-menu { display:none !important; }
      .nav-call { display:flex;align-items:center;gap:8px; }
      .nav-call a { padding:10px 16px;font-size:12px; }
      .osaka-mobile-toggle { display:flex; }
      .osaka-mobile-panel { display:block; }
      .hero-left { animation-name:osakaHeroLeft; }
      .hero-trust-card { animation-name:osakaHeroRight; }
      .hero:before { animation:none; }
      .osaka-reveal { transform:translateY(14px);transition-duration:.55s; }
      .service-card:hover,.why-us-card:hover,.review-card:hover,.insurance-panel-card:hover { transform:none; }
    }

    @media (prefers-reduced-motion: reduce) {
      .osaka-reveal,.hero-left,.hero-trust-card,.hero-service-strip,.hero:before { animation:none !important;transition:none !important;transform:none !important;opacity:1 !important; }
      .osaka-mobile-panel,.osaka-mobile-toggle span,.osaka-mobile-toggle span:before,.osaka-mobile-toggle span:after { transition:none !important; }
    }
  `;

  const injectStyles = () => {
    if (document.getElementById('osaka-motion-mobile-css')) return;
    const style = document.createElement('style');
    style.id = 'osaka-motion-mobile-css';
    style.textContent = css;
    document.head.appendChild(style);
  };

  const setupMobileNav = () => {
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.nav-menu');
    const call = document.querySelector('.nav-call');
    if (!nav || !menu || !call || document.querySelector('.osaka-mobile-toggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'osaka-mobile-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label','Open navigation');
    toggle.setAttribute('aria-expanded','false');
    toggle.innerHTML = '<span></span>';

    const panel = document.createElement('div');
    panel.className = 'osaka-mobile-panel';
    panel.setAttribute('aria-hidden','true');

    menu.querySelectorAll('a').forEach(link => {
      const item = link.cloneNode(true);
      item.addEventListener('click', closeMenu);
      panel.appendChild(item);
    });

    const existingCall = call.querySelector('a');
    if (existingCall) {
      const mobileCall = existingCall.cloneNode(true);
      mobileCall.className = 'mobile-call';
      mobileCall.textContent = 'CALL US';
      mobileCall.addEventListener('click', closeMenu);
      panel.appendChild(mobileCall);
    }

    nav.appendChild(toggle);
    document.body.appendChild(panel);

    function openMenu() {
      toggle.classList.add('is-open');
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-label','Close navigation');
      panel.setAttribute('aria-hidden','false');
      document.body.classList.add('osaka-menu-open');
    }
    function closeMenu() {
      toggle.classList.remove('is-open');
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Open navigation');
      panel.setAttribute('aria-hidden','true');
      document.body.classList.remove('osaka-menu-open');
    }
    toggle.addEventListener('click', () => panel.classList.contains('is-open') ? closeMenu() : openMenu());
    window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
  };

  const setupReveal = () => {
    if (reduceMotion) return;
    document.documentElement.classList.add('motion-ready');
    const selectors = [
      'section:not(.hero):not(.hero-section)',
      '.why-us-card', '.service-card', '.gallery-item', '.review-card',
      '.insurance-panel-card', '.about-card', '.claim-card', '.payment-logos',
      '.video-wrap', '.atome-content', '.contact-column'
    ];
    const elements = [];
    selectors.forEach(selector => document.querySelectorAll(selector).forEach(el => {
      if (!elements.includes(el)) elements.push(el);
    }));
    elements.forEach((el,i) => {
      el.classList.add('osaka-reveal');
      el.style.setProperty('--reveal-delay', `${Math.min(i % 4, 3) * 90}ms`);
    });
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:.12,rootMargin:'0px 0px -45px 0px'});
    elements.forEach(el => observer.observe(el));
  };

  const init = () => {
    injectStyles();
    setupMobileNav();
    setupReveal();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
