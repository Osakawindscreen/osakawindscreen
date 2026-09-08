/* Keep screenshot-reference insurance logos from being scaled as a sprite. */
(() => {
  const css = `
    .insurance-panel-card .reference-logo{
      width:218px!important;
      max-width:none!important;
      height:100px!important;
      object-fit:none!important;
      object-position:center!important;
      image-rendering:auto!important;
    }
    .insurance-panel-card .insurance-logo-chubb.reference-logo{object-position:center 36px!important}
    .insurance-panel-card .insurance-logo-generali.reference-logo{object-position:center -36px!important}
    .insurance-panel-card .insurance-logo-lonpac.reference-logo{object-position:center -151px!important}
    .insurance-panel-card .insurance-logo-rhb.reference-logo{object-position:center -240px!important}
    .insurance-panel-card .insurance-logo-takaful-ikhlas.reference-logo{object-position:center -320px!important}
    .insurance-panel-card .insurance-logo-takaful-malaysia.reference-logo{object-position:center -438px!important}
    .insurance-panel-card .insurance-logo-aig{object-fit:contain!important}
    @media(max-width:700px){.insurance-panel-card .reference-logo{width:190px!important;height:90px!important}}
    @media(max-width:420px){.insurance-panel-card .reference-logo{width:170px!important;height:82px!important}}
  `;
  const apply = () => {
    if (document.getElementById('insurance-logo-reference-fix')) return;
    const style = document.createElement('style');
    style.id = 'insurance-logo-reference-fix';
    style.textContent = css;
    document.head.appendChild(style);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
})();
