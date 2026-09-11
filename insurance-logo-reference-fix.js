/* Insurance partner presentation fix.
   Uses the existing clean logo assets only; no sprite/screenshot crops, filters,
   white backgrounds, halos, outlines, or logo redraws are applied. */
(() => {
  const partners = [
    ['AIA', 'ins-aia-logo-clean.png', 'AIA insurance logo', 'aia'],
    ['AXA AFFIN', 'ins-axa-logo-clean.png', 'AXA AFFIN insurance logo', 'axa'],
    ['CHUBB', 'ins-chubb-logo-clean.png', 'CHUBB insurance logo', 'chubb'],
    ['LIBERTY', 'ins-liberty-logo-clean.png', 'Liberty Insurance logo', 'liberty'],
    ['LONPAC', 'ins-lonpac-logo-clean.png', 'LONPAC insurance logo', 'lonpac'],
    ['MSIG', 'ins-msig-logo-clean.png', 'MSIG insurance logo', 'msig'],
    ['P & O', 'ins-pno-logo-clean.png', 'P & O insurance logo', 'pno'],
    ['PROGRESSIVE INSURANCE BHD', 'ins-progresif-logo-clean.png', 'Progressive Insurance BHD logo', 'progressive'],
    ['GENERALI', 'ins-generali-logo-clean.png', 'Generali insurance logo', 'generali'],
    ['RHB', 'ins-rhb-logo-clean.png', 'RHB insurance logo', 'rhb'],
    ['TAKAFUL IKHLAS', 'ins-ikhlas-logo-clean.png', 'Takaful Ikhlas logo', 'ikhlas'],
    ['PACIFIC INSURANCE', 'ins-pacific-logo-clean.png', 'Pacific Insurance logo', 'pacific'],
    ['TOKIO MARINE', 'ins-tokio-logo-clean.png', 'Tokio Marine Insurance Group logo', 'tokio'],
    ['ZURICH', 'ins-zurich-logo-clean.png', 'Zurich insurance logo', 'zurich'],
    ['KURNIA', 'ins-kurnia-logo-clean.png', 'Kurnia insurance logo', 'kurnia'],
    ['AIG', 'ins-aig-logo-clean.png', 'AIG insurance logo', 'aig'],
    ['TAKAFUL MALAYSIA', 'ins-malaysia-logo-clean.png', 'Takaful Malaysia logo', 'malaysia']
  ];

  const css = `
    .insurance-panel-grid{max-width:1180px!important;margin:0 auto!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:18px!important;background:transparent!important}
    .insurance-panel-card{min-width:0!important;min-height:118px!important;padding:14px 16px!important;background:#0b0b0b!important;border:1px solid #303030!important;border-top:1px solid #303030!important;border-radius:6px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;overflow:hidden!important;box-shadow:none!important;transform:none!important}
    .insurance-panel-card:before{content:none!important;display:none!important}
    .insurance-panel-card:after{content:""!important;position:absolute!important;left:10%!important;right:10%!important;bottom:0!important;height:2px!important;background:#c9232d!important;transform:none!important}
    .insurance-panel-card .insurance-logo{position:relative!important;z-index:1!important;display:block!important;width:100%!important;max-width:210px!important;height:82px!important;margin:auto!important;padding:0!important;object-fit:contain!important;object-position:center!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;filter:none!important;opacity:1!important;image-rendering:auto!important}
    .insurance-panel-card .insurance-logo-aia{max-width:170px!important}
    .insurance-panel-card .insurance-logo-axa{max-width:170px!important}
    .insurance-panel-card .insurance-logo-chubb{max-width:210px!important}
    .insurance-panel-card .insurance-logo-liberty{max-width:210px!important}
    .insurance-panel-card .insurance-logo-lonpac{max-width:180px!important}
    .insurance-panel-card .insurance-logo-msig{max-width:205px!important}
    .insurance-panel-card .insurance-logo-pno{max-width:190px!important}
    .insurance-panel-card .insurance-logo-progressive{max-width:205px!important}
    .insurance-panel-card .insurance-logo-generali{max-width:205px!important}
    .insurance-panel-card .insurance-logo-rhb{max-width:185px!important}
    .insurance-panel-card .insurance-logo-ikhlas{max-width:175px!important}
    .insurance-panel-card .insurance-logo-pacific{max-width:205px!important}
    .insurance-panel-card .insurance-logo-tokio{max-width:210px!important}
    .insurance-panel-card .insurance-logo-zurich{max-width:195px!important}
    .insurance-panel-card .insurance-logo-kurnia{max-width:205px!important}
    .insurance-panel-card .insurance-logo-aig{max-width:145px!important}
    .insurance-panel-card .insurance-logo-malaysia{max-width:190px!important}
    @media (hover:hover) and (pointer:fine){.insurance-panel-card:hover{border-color:#454545!important;box-shadow:0 10px 24px rgba(0,0,0,.28)!important}}
    @media(max-width:1000px){.insurance-panel-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important}.insurance-panel-card{min-height:120px!important}}
    @media(max-width:700px){.insurance-panel-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}.insurance-panel-card{min-height:118px!important;padding:12px 9px!important}.insurance-panel-card .insurance-logo{max-width:170px!important;height:72px!important}}
    @media(max-width:420px){.insurance-panel-card{min-height:108px!important}.insurance-panel-card .insurance-logo{max-width:150px!important;height:65px!important}}
  `;

  const apply = () => {
    if (!document.getElementById('insurance-logo-reference-fix')) {
      const style = document.createElement('style');
      style.id = 'insurance-logo-reference-fix';
      style.textContent = css;
      document.head.appendChild(style);
    }

    const grid = document.querySelector('.insurance-panel-grid');
    if (!grid) return;

    grid.innerHTML = partners.map(([title, src, alt, cls]) => `
      <div class="insurance-panel-card" title="${title}">
        <img class="insurance-logo insurance-logo-${cls}" src="${src}" alt="${alt}" loading="lazy" decoding="async">
      </div>
    `).join('');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
})();
