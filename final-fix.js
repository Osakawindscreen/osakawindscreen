/* Osaka Windscreen — final insurance logo rendering fix */
(() => {
  const refs = {
    AIG: {src:'ins-aig-logo-clean.png'},
    CHUBB: {src:'insurance-screenshot-six-card-q50.jpg', pos:'center 36px', sprite:true},
    GENERALI: {src:'ins-generali-logo-clean.png'},
    'TAKAFUL IKHLAS': {src:'ins-ikhlas-logo-clean.png'},
    LONPAC: {src:'ins-lonpac-logo-clean.png'},
    RHB: {src:'ins-rhb-logo-clean.png'},
    'TAKAFUL MALAYSIA': {src:'ins-malaysia-logo-clean.png'}
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
      img.style.setProperty('image-rendering','auto','important');

      if(ref.sprite){
        img.style.setProperty('object-fit','none','important');
        img.style.setProperty('object-position',ref.pos,'important');
        img.style.setProperty('width','218px','important');
        img.style.setProperty('max-width','none','important');
        img.style.setProperty('height','100px','important');
      }else{
        img.style.setProperty('object-fit','contain','important');
        img.style.setProperty('object-position','center','important');
        img.style.setProperty('width','190px','important');
        img.style.setProperty('max-width','190px','important');
        img.style.setProperty('height','76px','important');
      }
    });
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
