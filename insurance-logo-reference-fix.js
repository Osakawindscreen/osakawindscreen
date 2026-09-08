/* Keep the seven requested insurance logos tied to the supplied screenshot reference. */
(() => {
  const refs = {
    AIG: {src:'ins-aig-logo-clean.png', mode:'aig'},
    CHUBB: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center 36px'},
    GENERALI: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -36px'},
    'TAKAFUL IKHLAS': {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -320px'},
    LONPAC: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -151px'},
    RHB: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -240px'},
    'TAKAFUL MALAYSIA': {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -438px'}
  };

  const apply = () => {
    const css = `
      .insurance-panel-card .reference-logo{width:218px!important;max-width:none!important;height:100px!important;object-fit:none!important;object-position:center!important;image-rendering:auto!important}
      .insurance-panel-card .insurance-logo-chubb.reference-logo{object-position:center 36px!important}
      .insurance-panel-card .insurance-logo-generali.reference-logo{object-position:center -36px!important}
      .insurance-panel-card .insurance-logo-lonpac.reference-logo{object-position:center -151px!important}
      .insurance-panel-card .insurance-logo-rhb.reference-logo{object-position:center -240px!important}
      .insurance-panel-card .insurance-logo-takaful-ikhlas.reference-logo{object-position:center -320px!important}
      .insurance-panel-card .insurance-logo-takaful-malaysia.reference-logo{object-position:center -438px!important}
      .insurance-panel-card .insurance-logo-aig.reference-logo{object-fit:contain!important;width:128px!important;max-width:128px!important;height:78px!important}
      @media(max-width:700px){.insurance-panel-card .reference-logo{width:190px!important;height:90px!important}.insurance-panel-card .insurance-logo-aig.reference-logo{width:106px!important;max-width:106px!important;height:55px!important}}
      @media(max-width:420px){.insurance-panel-card .reference-logo{width:170px!important;height:82px!important}.insurance-panel-card .insurance-logo-aig.reference-logo{width:96px!important;max-width:96px!important;height:50px!important}}
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
      if(ref.mode==='aig') img.classList.add('reference-aig');
      img.style.setProperty('object-fit',ref.mode==='aig'?'contain':'none','important');
      img.style.setProperty('object-position',ref.pos||'center','important');
    });
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
