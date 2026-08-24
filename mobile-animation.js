/* Osaka Windscreen — premium motion layer. Loaded without changing desktop layout. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  document.documentElement.classList.add('motion-ready');

  const revealSelectors = [
    'section:not(.hero):not(.hero-section)',
    '.why-card', '.service-card', '.gallery-item', '.review-card',
    '.insurance-panel-card', '.stat-card', '.about-content', '.contact-card'
  ];

  const elements = [];
  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!elements.includes(el)) elements.push(el);
    });
  });

  elements.forEach((el, i) => {
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
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
})();
