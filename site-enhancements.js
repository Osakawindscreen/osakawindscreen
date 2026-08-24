/* Osaka Windscreen — mobile navigation, premium motion, insurance logo presentation */
(() => {
  const init = () => {
    if (window.__osakaEnhancementsReady) return;
    window.__osakaEnhancementsReady = true;

    const style = document.createElement('style');
    style.id = 'osaka-enhancements-css';
    style.textContent = `
      .osaka-mobile-toggle{display:none;width:44px;height:44px;border:0;border-radius:7px;background:#111;color:#fff;align-items:center;justify-content:center;cursor:pointer;position:relative;z-index:10002;flex:0 0 44px}
      .osaka-mobile-toggle span,.osaka-mobile-toggle span:before,.osaka-mobile-toggle span:after{display:block;width:21px;height:2px;background:#fff;content:"";position:absolute;transition:.25s ease}
      .osaka-mobile-toggle span:before{transform:translateY(-7px)}.osaka-mobile-toggle span:after{transform:translateY(7px)}
      .osaka-mobile-toggle.is-open span{background:transparent}.osaka-mobile-toggle.is-open span:before{transform:rotate(45deg)}.osaka-mobile-toggle.is-open span:after{transform:rotate(-45deg)}
      .osaka-mobile-panel{display:none;position:fixed;top:94px;left:0;right:0;z-index:10000;background:rgba(9,9,9,.98);border-top:1px solid rgba(255,255,255,.12);box-shadow:0 18px 45px rgba(0,0,0,.45);max-height:0;opacity:0;transform:translateY(-8px);pointer-events:none;overflow:hidden;transition:max-height .35s ease,opacity .25s ease,transform .35s ease}
      .osaka-mobile-panel.is-open{max-height:calc(100vh - 94px);opacity:1;transform:none;pointer-events:auto;overflow:auto}
      .osaka-mobile-panel a{display:block;padding:17px 24px;color:#fff;border-bottom:1px solid #292929;font-size:14px;font-weight:900;letter-spacing:.6px;text-align:left}
      .osaka-mobile-panel a:hover{background:#151515;color:#c9232d}.osaka-mobile-panel .mobile-call{background:#fff;color:#111;margin:18px 20px;border:0;border-radius:28px;text-align:center}
      .osaka-reveal{opacity:0;transform:translateY(20px);transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1);transition-delay:var(--osaka-delay,0ms);will-change:opacity,transform}.osaka-reveal.is-visible{opacity:1;transform:none}
      .hero-left{animation:osakaHeroLeft .85s cubic-bezier(.22,.61,.36,1) both}.hero-trust-card{animation:osakaHeroRight .85s .15s cubic-bezier(.22,.61,.36,1) both}.hero-service-strip{animation:osakaHeroStrip .75s .3s cubic-bezier(.22,.61,.36,1) both}
      @keyframes osakaHeroLeft{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}@keyframes osakaHeroRight{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}@keyframes osakaHeroStrip{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      .insurance-panel-card{transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease}.insurance-panel-card:hover{transform:translateY(-4px);border-color:#c9232d;box-shadow:0 14px 32px rgba(0,0,0,.35)}
      .insurance-panel-card .insurance-logo{position:relative;z-index:2;display:block;width:100%;max-width:190px;height:62px;object-fit:contain;margin:auto;background:#fff;padding:8px 14px;border-radius:4px}
      .gallery-item img{transition:transform .55s cubic-bezier(.22,.61,.36,1)}.gallery-item:hover img{transform:scale(1.035)}
      @media(max-width:800px){nav{padding:0 14px}.nav-logo{flex:1 1 auto;min-width:0;height:94px}.nav-logo img{height:72px;width:185px}.nav-menu{display:none!important}.nav-call{display:flex;align-items:center;gap:8px}.nav-call a{padding:10px 15px;font-size:12px}.osaka-mobile-toggle{display:flex}.osaka-mobile-panel{display:block}.hero-left,.hero-trust-card,.hero-service-strip{animation:none}.osaka-reveal{transform:translateY(13px);transition-duration:.55s}.insurance-panel-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}.insurance-panel-card{min-height:92px}.insurance-panel-card .insurance-logo{max-width:155px;height:52px;padding:7px 10px}}
      @media(prefers-reduced-motion:reduce){.osaka-reveal,.hero-left,.hero-trust-card,.hero-service-strip{animation:none!important;transition:none!important;transform:none!important;opacity:1!important}.osaka-mobile-panel,.osaka-mobile-toggle span,.osaka-mobile-toggle span:before,.osaka-mobile-toggle span:after{transition:none!important}}
    `;
    document.head.appendChild(style);

    const nav=document.querySelector('nav');
    const menu=document.querySelector('.nav-menu');
    const call=document.querySelector('.nav-call');
    if(nav&&menu&&call&&!document.querySelector('.osaka-mobile-toggle')){
      const toggle=document.createElement('button');toggle.className='osaka-mobile-toggle';toggle.type='button';toggle.setAttribute('aria-label','Open navigation');toggle.setAttribute('aria-expanded','false');toggle.innerHTML='<span></span>';
      const panel=document.createElement('div');panel.className='osaka-mobile-panel';panel.setAttribute('aria-hidden','true');
      menu.querySelectorAll('a').forEach(link=>{const item=link.cloneNode(true);item.addEventListener('click',close);panel.appendChild(item)});
      const existingCall=call.querySelector('a');if(existingCall){const item=existingCall.cloneNode(true);item.className='mobile-call';item.textContent='CALL US';item.addEventListener('click',close);panel.appendChild(item)}
      nav.appendChild(toggle);document.body.appendChild(panel);
      function open(){toggle.classList.add('is-open');panel.classList.add('is-open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close navigation');panel.setAttribute('aria-hidden','false')}
      function close(){toggle.classList.remove('is-open');panel.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');panel.setAttribute('aria-hidden','true')}
      toggle.addEventListener('click',()=>panel.classList.contains('is-open')?close():open());window.addEventListener('resize',()=>{if(innerWidth>800)close()});
    }

    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      const targets=[];['.why-us-card','.service-card','.gallery-item','.review-card','.insurance-panel-card','.about-card','.claim-card','.payment-logos','.video-wrap','.atome-content','.contact-column'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>{if(!targets.includes(el))targets.push(el)}));
      targets.forEach((el,i)=>{el.classList.add('osaka-reveal');el.style.setProperty('--osaka-delay',`${(i%4)*80}ms`)});
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});targets.forEach(el=>observer.observe(el));
    }

    const logoMap={
      'aia':'ins-aia-logo.png','aig':'ins-aig-logo.jpg','axa':'ins-axa-logo.png','chubb':'ins-chubb-logo.png','takaful ikhlas':'ins-ikhlas-logo.png','ikhlas':'ins-ikhlas-logo.png','kurnia':'ins-kurnia-logo.png','liberty':'ins-liberty-logo.png','lonpac':'ins-lonpac-logo.jpg','takaful malaysia':'ins-malaysia-logo.png','mpi':'ins-mpi-logo.jpg','msig':'ins-msig-logo.png','pacific':'ins-pacific-logo.png','p&o':'ins-pno-logo.png','pno':'ins-pno-logo.png','progressive':'ins-progressive-logo.png','rhb':'ins-rhb-logo.png','tokio marine':'ins-tokio-logo.png','tokio':'ins-tokio-logo.png','tune':'ins-tune-logo.png','zurich':'ins-zurich-logo.png'
    };
    document.querySelectorAll('.insurance-panel-card').forEach(card=>{
      if(card.querySelector('.insurance-logo'))return;
      const strong=card.querySelector('strong');if(!strong)return;
      const text=strong.textContent.trim().toLowerCase();
      const key=Object.keys(logoMap).find(k=>text.includes(k));if(!key)return;
      const img=document.createElement('img');img.className='insurance-logo';img.alt=strong.textContent.trim();img.src=logoMap[key];
      img.onerror=()=>{img.remove();strong.style.display='block'};strong.style.display='none';card.appendChild(img);
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
