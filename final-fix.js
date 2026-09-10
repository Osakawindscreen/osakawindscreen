/* Osaka Windscreen — direct screenshot logo assets */
(() => {
  const refs = {
    AIG: {pos:'center 0px'},
    CHUBB: {pos:'center -100px'},
    LONPAC: {pos:'center -200px'},
    GENERALI: {pos:'center -300px'},
    RHB: {pos:'center -400px'},
    'TAKAFUL IKHLAS': {pos:'center -500px'},
    'TAKAFUL MALAYSIA': {pos:'center -600px'}
  };

  const apply = () => {
    document.querySelectorAll('.insurance-panel-card').forEach(card => {
      const name=(card.getAttribute('title')||'').trim().toUpperCase();
      const ref=refs[name];
      if(!ref) return;
      const img=card.querySelector('.insurance-logo');
      if(!img) return;

      img.dataset.logoProcessed='1';
      img.src='insurance-seven-exact.png?v=direct7';
      img.classList.add('reference-logo');
      img.style.setProperty('display','block','important');
      img.style.setProperty('opacity','1','important');
      img.style.setProperty('visibility','visible','important');
      img.style.setProperty('filter','none','important');
      img.style.setProperty('box-shadow','none','important');
      img.style.setProperty('text-shadow','none','important');
      img.style.setProperty('mix-blend-mode','normal','important');
      img.style.setProperty('background','transparent','important');
      img.style.setProperty('object-fit','none','important');
      img.style.setProperty('object-position',ref.pos,'important');
      img.style.setProperty('width','220px','important');
      img.style.setProperty('max-width','220px','important');
      img.style.setProperty('height','100px','important');
      img.style.setProperty('image-rendering','auto','important');
      card.style.setProperty('box-shadow','none','important');
      card.style.setProperty('transform','none','important');
    });
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
