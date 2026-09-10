/* Osaka Windscreen — final insurance logo rendering fix */
(() => {
  const refs = {
    AIA: {src:'ins-aia-logo.png', mode:'aia'},
    AIG: {src:'ins-aig-logo-clean.png', mode:'aig'},
    CHUBB: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center 36px', sprite:true},
    GENERALI: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -36px', sprite:true},
    'TAKAFUL IKHLAS': {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -320px', sprite:true},
    LONPAC: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -151px', sprite:true},
    RHB: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -240px', sprite:true},
    'TAKAFUL MALAYSIA': {src:'insurance-screenshot-six-card-q50.jpg', pos:'center -438px', sprite:true}
  };

  const apply = () => {
    document.querySelectorAll('.insurance-panel-card').forEach(card => {
      const name=(card.getAttribute('title')||'').trim().toUpperCase();
      const ref=refs[name];
      if(!ref) return;
      const img=card.querySelector('.insurance-logo');
      if(!img) return;

      img.dataset.logoProcessed='1';
      img.src=ref.src;
      img.classList.add('reference-logo');
      img.style.setProperty('display','block','important');
      img.style.setProperty('opacity','1','important');
      img.style.setProperty('visibility','visible','important');
      img.style.setProperty('image-rendering','auto','important');

      if(ref.sprite){
        img.style.setProperty('object-fit','none','important');
        img.style.setProperty('object-position',ref.pos,'important');
        img.style.setProperty('width','218px','important');
        img.style.setProperty('max-width','none','important');
        img.style.setProperty('height','100px','important');
      }else if(ref.mode==='aia'){
        img.style.setProperty('object-fit','contain','important');
        img.style.setProperty('object-position','center','important');
        img.style.setProperty('width','150px','important');
        img.style.setProperty('max-width','150px','important');
        img.style.setProperty('height','70px','important');
      }else{
        img.style.setProperty('object-fit','contain','important');
        img.style.setProperty('object-position','center','important');
        img.style.setProperty('width','108px','important');
        img.style.setProperty('max-width','108px','important');
        img.style.setProperty('height','65px','important');
      }
    });
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
