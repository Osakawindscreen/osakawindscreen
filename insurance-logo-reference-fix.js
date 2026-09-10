/* Keep the seven requested insurance logos tied to the supplied screenshot reference. */
(() => {
  const refs = {
    AIG: {src:'ins-aig-logo-clean.png', mode:'clean'},
    CHUBB: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center 36px', mode:'sprite'},
    GENERALI: {src:'ins-generali-logo-clean.png', mode:'clean'},
    'TAKAFUL IKHLAS': {src:'ins-ikhlas-logo-clean.png', mode:'clean'},
    LONPAC: {src:'ins-lonpac-logo-clean.png', mode:'clean'},
    RHB: {src:'ins-rhb-logo-clean.png', mode:'clean'},
    'TAKAFUL MALAYSIA': {src:'ins-malaysia-logo-clean.png', mode:'clean'}
  };

  const apply = () => {
    const css = `
      .insurance-panel-card .reference-logo{width:190px!important;max-width:190px!important;height:76px!important;object-fit:contain!important;object-position:center!important;image-rendering:auto!important}
      .insurance-panel-card .insurance-logo-chubb.reference-logo{width:218px!important;max-width:none!important;height:100px!important;object-fit:none!important;object-position:center 36px!important}
      @media(max-width:700px){.insurance-panel-card .reference-logo{width:170px!important;max-width:170px!important;height:70px!important}.insurance-panel-card .insurance-logo-chubb.reference-logo{width:190px!important;height:90px!important}}
      @media(max-width:420px){.insurance-panel-card .reference-logo{width:150px!important;max-width:150px!important;height:64px!important}.insurance-panel-card .insurance-logo-chubb.reference-logo{width:170px!important;height:82px!important}}
    `;
    if (!document.getElementById('insurance-logo-reference-fix')) {
      const style=document.createElement('style');
      style.id='insurance-logo-reference-fix';
      style.textContent=css;
      document.head.appendChild(style);
    }

    document.querySelectorAll('.insurance-panel-card').forEach(card => {
      const name=(card.getAttribute('title')||'').trim().toUpperCase();
      const ref=refs[name];
      if(!ref) return;
      const img=card.querySelector('.insurance-logo');
      if(!img) return;
      img.src=ref.src;
      img.classList.add('reference-logo');
      img.style.setProperty('object-fit',ref.mode==='sprite'?'none':'contain','important');
      img.style.setProperty('object-position',ref.pos||'center','important');
      if(ref.mode==='clean') {
        img.style.setProperty('width','190px','important');
        img.style.setProperty('max-width','190px','important');
        img.style.setProperty('height','76px','important');
      }
    });
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
