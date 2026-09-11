/* Osaka Windscreen — clean original insurance logo assets */
(() => {
  const refs = {
    AIA: 'ins-aia-logo-clean.png',
    AIG: 'ins-aig-logo-clean.png',
    'AXA AFFIN': 'ins-axa-logo-clean.png',
    AXA: 'ins-axa-logo-clean.png',
    CHUBB: 'ins-chubb-logo-clean.png',
    GENERALI: 'ins-generali-logo-clean.png',
    'TAKAFUL IKHLAS': 'ins-ikhlas-logo-clean.png',
    KURNIA: 'ins-kurnia-logo-clean.png',
    LIBERTY: 'ins-liberty-logo-clean.png',
    LONPAC: 'ins-lonpac-logo-clean.png',
    MSIG: 'ins-msig-logo-clean.png',
    PACIFIC: 'ins-pacific-logo-clean.png',
    'P & O': 'ins-pno-logo-clean.png',
    'P&O': 'ins-pno-logo-clean.png',
    PROGRESIF: 'ins-progresif-logo-clean.png',
    'PROGRESSIVE INSURANCE BHD': 'ins-progresif-logo-clean.png',
    RHB: 'ins-rhb-logo-clean.png',
    'TAKAFUL MALAYSIA': 'ins-malaysia-logo-clean.png',
    'TOKIO MARINE': 'ins-tokio-logo-clean.png',
    'TOKIO MARINE INSURANCE GROUP': 'ins-tokio-logo-clean.png',
    ZURICH: 'ins-zurich-logo-clean.png'
  };

  const apply = () => {
    document.querySelectorAll('.insurance-panel-card').forEach(card => {
      const name = (card.getAttribute('title') || '').trim().toUpperCase();
      const src = refs[name];
      const img = card.querySelector('.insurance-logo');
      if (!src || !img) return;

      // Mark it processed so site-enhancements.js does not run its
      // background-cleaning/color-changing canvas routine on the asset.
      img.dataset.logoProcessed = '1';
      img.src = src + '?v=clean-original-17';
      img.classList.remove('reference-sprite');
      img.classList.add('reference-logo');

      img.style.setProperty('display', 'block', 'important');
      img.style.setProperty('opacity', '1', 'important');
      img.style.setProperty('visibility', 'visible', 'important');
      img.style.setProperty('filter', 'none', 'important');
      img.style.setProperty('box-shadow', 'none', 'important');
      img.style.setProperty('text-shadow', 'none', 'important');
      img.style.setProperty('mix-blend-mode', 'normal', 'important');
      img.style.setProperty('background', 'transparent', 'important');
      img.style.setProperty('border', '0', 'important');
      img.style.setProperty('image-rendering', 'auto', 'important');
      img.style.setProperty('object-fit', 'contain', 'important');
      img.style.setProperty('object-position', 'center', 'important');
      img.style.setProperty('width', '100%', 'important');
      img.style.setProperty('max-width', '190px', 'important');
      img.style.setProperty('height', '82px', 'important');

      // Keep the seven previously problematic logos especially clean.
      if (['AIG','CHUBB','LONPAC','GENERALI','RHB','TAKAFUL IKHLAS','TAKAFUL MALAYSIA'].includes(name)) {
        img.style.setProperty('filter', 'none', 'important');
        img.style.setProperty('background', 'transparent', 'important');
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
})();
