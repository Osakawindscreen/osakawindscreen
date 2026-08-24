/* Osaka Windscreen — mobile navigation, premium motion, premium insurance logo grid */
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

      /* Premium insurance-logo section — dark corporate partner wall */
      .insurance-panels{background:#090909!important;color:#fff!important;padding:88px 30px 92px!important;text-align:center!important}
      .insurance-panels .panel-header{max-width:1050px!important;margin:0 auto 46px!important;text-align:center!important}
      .insurance-panels .panel-header h2{font-size:clamp(32px,4vw,48px)!important;line-height:1.05!important;font-weight:900!important;color:#fff!important;letter-spacing:-1.4px!important;margin-bottom:13px!important}
      .insurance-panels .panel-header h2:after{content:""!important;display:block!important;width:58px!important;height:3px!important;background:#c9232d!important;margin:17px auto 0!important}
      .insurance-panels .panel-header p{display:block!important;color:#aaa!important;font-size:clamp(14px,1.4vw,17px)!important;line-height:1.55!important;margin:0 auto!important;max-width:820px!important}
      .insurance-panel-grid{max-width:1180px!important;margin:0 auto!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:12px!important;background:transparent!important;border:0!important;align-items:stretch!important}
      .insurance-panel-card{min-height:118px!important;background:#111!important;border:1px solid #292929!important;border-top:2px solid #292929!important;border-radius:6px!important;padding:18px 14px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;overflow:hidden!important;box-shadow:0 10px 28px rgba(0,0,0,.22)!important;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease!important}
      .insurance-panel-card:before{content:""!important;display:block!important;position:absolute!important;inset:0!important;background:linear-gradient(135deg,rgba(201,35,45,.09),transparent 48%,rgba(244,196,0,.035))!important;pointer-events:none!important}
      .insurance-panel-card:hover{transform:translateY(-4px)!important;border-color:#c9232d!important;border-top-color:#c9232d!important;box-shadow:0 16px 36px rgba(0,0,0,.4)!important}
      .insurance-panel-card strong{display:none!important}
      .insurance-panel-card .insurance-logo{position:relative!important;z-index:2!important;display:block!important;width:100%!important;max-width:175px!important;height:72px!important;object-fit:contain!important;margin:auto!important;background:transparent!important;padding:0!important;border-radius:0!important;filter:none!important}
      .insurance-panel-note{max-width:900px!important;margin:30px auto 0!important;color:#777!important;font-size:12px!important;line-height:1.6!important}
      .insurance-panel-note b{color:#f4c400!important}

      .gallery-item img{transition:transform .55s cubic-bezier(.22,.61,.36,1)}.gallery-item:hover img{transform:scale(1.035)}
      @media(max-width:800px){
        nav{padding:0 14px}.nav-logo{flex:1 1 auto;min-width:0;height:94px}.nav-logo img{height:72px;width:185px}.nav-menu{display:none!important}.nav-call{display:flex;align-items:center;gap:8px}.nav-call a{padding:10px 15px;font-size:12px}.osaka-mobile-toggle{display:flex}.osaka-mobile-panel{display:block}.hero-left,.hero-trust-card,.hero-service-strip{animation:none}.osaka-reveal{transform:translateY(13px);transition-duration:.55s}
        .insurance-panels{padding:64px 18px 72px!important}.insurance-panels .panel-header{margin-bottom:28px!important}.insurance-panels .panel-header h2{font-size:30px!important;line-height:1.08!important;letter-spacing:-.7px!important}.insurance-panels .panel-header p{font-size:14px!important;line-height:1.5!important}.insurance-panel-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}.insurance-panel-card{min-height:92px!important;padding:12px 8px!important}.insurance-panel-card .insurance-logo{max-width:145px!important;height:55px!important}
      }
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

    const panelHeading=document.querySelector('.insurance-panels .panel-header h2');
    const panelSubheading=document.querySelector('.insurance-panels .panel-header p');
    if(panelHeading)panelHeading.textContent='Insurance Panel';
    if(panelSubheading)panelSubheading.textContent='We Provide Hassle Free Windscreen Claim Services to the Following Insurance Companies.';

    const logoMap={
      'aia':'ins-aia-logo.png','aig':'ins-aig-logo.jpg','axa':'ins-axa-logo.png','chubb':'ins-chubb-logo.png','generali':'ins-generali-logo.jpg','takaful ikhlas':'ins-ikhlas-logo.png','ikhlas':'ins-ikhlas-logo.png','kurnia':'ins-kurnia-logo.png','liberty':'ins-liberty-logo.png','lonpac':'ins-lonpac-logo.jpg','takaful malaysia':'ins-malaysia-logo.png','msig':'ins-msig-logo.png','pacific':'ins-pacific-logo.png','p&o':'ins-pno-logo.png','pno':'ins-pno-logo.png','progresif':'ins-progresif-logo.png','progressive':'ins-progresif-logo.png','rhb':'ins-rhb-logo.png','tokio marine':'ins-tokio-logo.png','tokio':'ins-tokio-logo.png','tune':'ins-tune-logo.png','zurich':'ins-zurich-logo.png'
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
