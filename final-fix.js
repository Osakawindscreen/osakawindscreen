/* Osaka Windscreen — final insurance logo rendering fix */
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
    document.querySelectorAll('.insurance-panel-card').forEach(card => {
      const name=(card.getAttribute('title')||'').trim().toUpperCase();
      const ref=refs[name];
      if(!ref) return;
      const img=card.querySelector('.insurance-logo');
      if(!img) return;
      img.src=ref.src;
      img.classList.add('reference-logo');
      img.style.setProperty('object-fit',ref.mode==='aig'?'contain':'none','important');
      img.style.setProperty('object-position',ref.pos||'center','important');
      img.style.setProperty('image-rendering','auto','important');
      if(ref.mode==='aig'){
        img.style.setProperty('width','128px','important');
        img.style.setProperty('max-width','128px','important');
        img.style.setProperty('height','78px','important');
      }else{
        img.style.setProperty('width','218px','important');
        img.style.setProperty('max-width','none','important');
        img.style.setProperty('height','100px','important');
      }
    });
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
