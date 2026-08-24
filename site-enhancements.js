/* Osaka Windscreen — mobile navigation, motion, premium insurance logo wall, payment logos and social links */
(() => {
  const init = () => {
    if (window.__osakaPremiumEnhancements) return;
    window.__osakaPremiumEnhancements = true;

    const style = document.createElement('style');
    style.textContent = `
      .osaka-mobile-toggle{display:none;width:44px;height:44px;border:0;border-radius:7px;background:#111;color:#fff;align-items:center;justify-content:center;cursor:pointer;position:relative;z-index:10002;flex:0 0 44px}
      .osaka-mobile-toggle span,.osaka-mobile-toggle span:before,.osaka-mobile-toggle span:after{display:block;width:21px;height:2px;background:#fff;content:"";position:absolute;transition:.25s ease}
      .osaka-mobile-toggle span:before{transform:translateY(-7px)}.osaka-mobile-toggle span:after{transform:translateY(7px)}
      .osaka-mobile-toggle.is-open span{background:transparent}.osaka-mobile-toggle.is-open span:before{transform:rotate(45deg)}.osaka-mobile-toggle.is-open span:after{transform:rotate(-45deg)}
      .osaka-mobile-panel{display:none;position:fixed;top:94px;left:0;right:0;z-index:10001;background:rgba(9,9,9,.98);border-top:1px solid rgba(255,255,255,.12);box-shadow:0 18px 45px rgba(0,0,0,.45);max-height:0;opacity:0;transform:translateY(-8px);pointer-events:none;overflow:hidden;transition:max-height .35s ease,opacity .25s ease,transform .35s ease}
      .osaka-mobile-panel.is-open{max-height:calc(100vh - 94px);opacity:1;transform:none;pointer-events:auto;overflow:auto}
      .osaka-mobile-panel a{display:block;padding:17px 24px;color:#fff;border-bottom:1px solid #292929;font-size:14px;font-weight:900;letter-spacing:.6px;text-align:left}
      .osaka-mobile-panel a:hover{background:#151515;color:#c9232d}.osaka-mobile-panel .mobile-call{background:#fff;color:#111;margin:18px 20px;border:0;border-radius:28px;text-align:center}

      .osaka-reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1);transition-delay:var(--osaka-delay,0ms);will-change:opacity,transform}
      .osaka-reveal.is-visible{opacity:1;transform:none}
      .hero-left{animation:osakaHeroLeft .85s cubic-bezier(.22,.61,.36,1) both}.hero-trust-card{animation:osakaHeroRight .85s .15s cubic-bezier(.22,.61,.36,1) both}.hero-service-strip{animation:osakaHeroStrip .75s .3s cubic-bezier(.22,.61,.36,1) both}
      @keyframes osakaHeroLeft{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}
      @keyframes osakaHeroRight{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}
      @keyframes osakaHeroStrip{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}

      /* PREMIUM INSURANCE PANEL — logo wall, not individual cards */
      .insurance-panels{position:relative;overflow:hidden;background:#090909!important;color:#fff!important;text-align:center!important}
      .insurance-panels:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 42%,rgba(201,35,45,.10),transparent 42%),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px);background-size:auto,80px 80px,80px 80px;opacity:.65}
      .insurance-panels>*{position:relative;z-index:1}
      .insurance-panels .panel-header{max-width:1050px!important;margin:0 auto 42px!important;text-align:center!important}
      .insurance-panels .panel-header h2{font-size:clamp(32px,4vw,48px)!important;line-height:1.05!important;font-weight:900!important;color:#fff!important;letter-spacing:-1.4px!important;margin-bottom:13px!important}
      .insurance-panels .panel-header h2:after{content:""!important;display:block!important;width:58px!important;height:3px!important;background:#c9232d!important;margin:17px auto 0!important}
      .insurance-panels .panel-header p{display:block!important;color:#aaa!important;font-size:clamp(14px,1.4vw,17px)!important;line-height:1.55!important;margin:0 auto!important;max-width:820px!important}
      .insurance-panel-grid{max-width:1180px!important;margin:0 auto!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:0!important;background:rgba(17,17,17,.38)!important;border:1px solid rgba(255,255,255,.08)!important;border-radius:18px!important;overflow:hidden!important;box-shadow:0 25px 70px rgba(0,0,0,.38)!important}
      .insurance-panel-card{min-height:132px!important;background:transparent!important;border:0!important;border-right:1px solid rgba(255,255,255,.075)!important;border-bottom:1px solid rgba(255,255,255,.075)!important;border-radius:0!important;padding:20px 18px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;overflow:hidden!important;box-shadow:none!important;transition:background .25s ease,transform .25s ease!important}
      .insurance-panel-card:nth-child(5n){border-right:0!important}.insurance-panel-card:nth-last-child(-n+5){border-bottom:0!important}
      .insurance-panel-card:before{content:""!important;position:absolute!important;inset:16px!important;border-radius:12px!important;background:radial-gradient(circle,rgba(255,255,255,.055),transparent 68%)!important;opacity:0!important;transition:opacity .25s ease!important;pointer-events:none!important}
      .insurance-panel-card:hover{background:rgba(201,35,45,.055)!important;transform:translateY(-2px)!important}.insurance-panel-card:hover:before{opacity:1!important}
      .insurance-panel-card:after{content:""!important;position:absolute!important;left:50%!important;bottom:0!important;width:0!important;height:2px!important;background:#c9232d!important;transform:translateX(-50%)!important;transition:width .25s ease!important}.insurance-panel-card:hover:after{width:42px!important}
      .insurance-panel-card strong{display:none!important}
      .insurance-panel-card .insurance-logo{position:relative!important;z-index:2!important;display:block!important;width:100%!important;max-width:190px!important;height:82px!important;object-fit:contain!important;object-position:center!important;margin:auto!important;background:transparent!important;border:0!important;padding:0!important;transition:transform .25s ease,opacity .25s ease!important}
      .insurance-panel-card:hover .insurance-logo{transform:scale(1.045)!important}
      .insurance-panel-note{max-width:900px!important;margin:25px auto 0!important;color:#777!important;font-size:12px!important;line-height:1.6!important}

      /* EASY INSTALLMENT — protected logo slots */
      .payment-logos{width:100%!important;max-width:560px!important;margin:0 auto!important;padding:24px!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important;align-items:stretch!important;justify-items:stretch!important;background:#111!important;border:1px solid #303030!important;border-radius:12px!important;box-sizing:border-box!important}
      .payment-logo-card{min-width:0!important;min-height:105px!important;background:#181818!important;border:1px solid #303030!important;border-radius:9px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:12px!important;overflow:hidden!important;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease!important}
      .payment-logo-card:hover{transform:translateY(-3px)!important;border-color:#c9232d!important;box-shadow:0 10px 25px rgba(0,0,0,.35)!important}
      .payment-logo-card img{display:block!important;width:100%!important;max-width:180px!important;height:70px!important;object-fit:contain!important;object-position:center!important;margin:0!important;flex:0 1 auto!important}
      .payment-logo-card:last-child{grid-column:1 / -1;max-width:50%;justify-self:center;width:100%}

      /* FOLLOW US */
      .social{opacity:1!important;transform:none!important}.social a{position:relative!important;z-index:20!important;display:block!important;color:#fff!important;cursor:pointer!important;pointer-events:auto!important}
      .social .social-icon{width:64px!important;height:64px!important;border-radius:14px!important;background:#fff!important;color:#111!important;display:flex!important;align-items:center!important;justify-content:center!important;margin:0 auto 10px!important;box-shadow:0 10px 25px rgba(0,0,0,.28)!important;overflow:hidden!important}.social .social-icon svg{display:block!important;width:38px!important;height:38px!important;fill:#111!important}.social a:hover .social-icon{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,.4)!important}

      @media(max-width:1000px){.insurance-panel-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}.insurance-panel-card:nth-child(5n){border-right:1px solid rgba(255,255,255,.075)!important}.insurance-panel-card:nth-child(4n){border-right:0!important}.insurance-panel-card:nth-last-child(-n+5){border-bottom:1px solid rgba(255,255,255,.075)!important}.insurance-panel-card:nth-last-child(-n+4){border-bottom:0!important}}
      @media(max-width:800px){
        nav{padding:0 14px}.nav-logo{flex:1 1 auto;min-width:0}.nav-menu{display:none!important}.nav-call{display:flex;align-items:center;gap:8px}.nav-call a{padding:10px 15px;font-size:12px}.osaka-mobile-toggle{display:flex}.osaka-mobile-panel{display:block}
        .hero-left,.hero-trust-card,.hero-service-strip{animation:none}.osaka-reveal{transform:translateY(13px);transition-duration:.55s}
        .insurance-panels{padding-left:18px!important;padding-right:18px!important}.insurance-panels .panel-header{margin-bottom:28px!important}.insurance-panels .panel-header h2{font-size:30px!important}.insurance-panels .panel-header p{font-size:14px!important}.insurance-panel-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;border-radius:14px!important}.insurance-panel-card{min-height:104px!important;padding:12px 8px!important}.insurance-panel-card:nth-child(4n){border-right:1px solid rgba(255,255,255,.075)!important}.insurance-panel-card:nth-child(2n){border-right:0!important}.insurance-panel-card:nth-last-child(-n+4){border-bottom:1px solid rgba(255,255,255,.075)!important}.insurance-panel-card:nth-last-child(-n+2){border-bottom:0!important}.insurance-panel-card .insurance-logo{max-width:155px!important;height:60px!important}
        .payment-logos{max-width:430px!important;padding:14px!important;gap:10px!important}.payment-logo-card{min-height:90px!important;padding:8px!important}.payment-logo-card img{max-width:145px!important;height:56px!important}.payment-logo-card:last-child{max-width:100%!important}
      }
      @media(max-width:480px){.payment-logos{grid-template-columns:1fr!important}.payment-logo-card:last-child{grid-column:auto!important;max-width:none!important}.payment-logo-card img{max-width:180px!important}.insurance-panel-card .insurance-logo{max-width:145px!important;height:54px!important}}
      @media(prefers-reduced-motion:reduce){.osaka-reveal,.hero-left,.hero-trust-card,.hero-service-strip{animation:none!important;transition:none!important;transform:none!important;opacity:1!important}.osaka-mobile-panel,.osaka-mobile-toggle span,.osaka-mobile-toggle span:before,.osaka-mobile-toggle span:after{transition:none!important}}
    `;
    document.head.appendChild(style);

    const nav=document.querySelector('nav');
    const menu=document.querySelector('.nav-menu');
    const call=document.querySelector('.nav-call');
    if(nav&&menu&&call&&!document.querySelector('.osaka-mobile-toggle')){
      const toggle=document.createElement('button');
      toggle.className='osaka-mobile-toggle';toggle.type='button';toggle.setAttribute('aria-label','Open navigation');toggle.setAttribute('aria-expanded','false');toggle.innerHTML='<span></span>';
      const panel=document.createElement('div');panel.className='osaka-mobile-panel';panel.setAttribute('aria-hidden','true');
      menu.querySelectorAll('a').forEach(link=>{const item=link.cloneNode(true);item.addEventListener('click',close);panel.appendChild(item)});
      const existingCall=call.querySelector('a');
      if(existingCall){const item=existingCall.cloneNode(true);item.className='mobile-call';item.textContent='CALL US';item.addEventListener('click',close);panel.appendChild(item)}
      nav.appendChild(toggle);document.body.appendChild(panel);
      function open(){toggle.classList.add('is-open');panel.classList.add('is-open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close navigation');panel.setAttribute('aria-hidden','false')}
      function close(){toggle.classList.remove('is-open');panel.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');panel.setAttribute('aria-hidden','true')}
      toggle.addEventListener('click',()=>panel.classList.contains('is-open')?close():open());
      window.addEventListener('resize',()=>{if(innerWidth>800)close()});
    }

    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      const targets=[];
      ['.why-us-card','.service-card','.gallery-item','.review-card','.insurance-panel-card','.about-card','.claim-card','.payment-logo-card','.video-wrap','.atome-content'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>{if(!targets.includes(el))targets.push(el)}));
      targets.forEach((el,i)=>{el.classList.add('osaka-reveal');el.style.setProperty('--osaka-delay',`${(i%5)*70}ms`)});
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});
      targets.forEach(el=>observer.observe(el));
    }

    const logoMap={
      aia:'ins-aia-logo.png',aig:'ins-aig-logo.png','axa affin':'ins-axa-logo.png',axa:'ins-axa-logo.png',chubb:'ins-chubb-logo.png',generali:'ins-generali-logo.jpg',ikhlas:'ins-ikhlas-logo.png','takaful / ikhlas':'ins-ikhlas-logo.png',kurnia:'ins-kurnia-logo.png',liberty:'ins-liberty-logo.png',lonpac:'ins-lonpac-logo.jpg','takaful malaysia':'ins-malaysia-logo.png',msig:'ins-msig-logo.png',pacific:'ins-pacific-logo.png','p&o':'ins-pno-logo.png','p & o':'ins-pno-logo.png',progresif:'ins-progresif-logo.png',progressive:'ins-progresif-logo.png',rhb:'ins-rhb-logo.png','tokio marine':'ins-tokio-logo.png',tokio:'ins-tokio-logo.png',tune:'ins-tune-logo.png',zurich:'ins-zurich-logo.png','syarikat takaful malaysia':'ins-malaysia-logo.png'
    };

    // Convert supplied opaque logo artwork into transparent PNGs in-browser.
    // This specifically fixes black-background/dark-wordmark logos such as Progressive and Tokio Marine.
    function processLogo(img){
      if(!img.complete || !img.naturalWidth){img.addEventListener('load',()=>processLogo(img),{once:true});return}
      if(img.dataset.logoProcessed==='1')return;
      try{
        const w=img.naturalWidth,h=img.naturalHeight;
        const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,w,h);
        const image=ctx.getImageData(0,0,w,h),d=image.data;
        const samples=[[0,0],[w-1,0],[0,h-1],[w-1,h-1],[Math.floor(w/2),0],[Math.floor(w/2),h-1]];
        let br=0,bg=0,bb=0;for(const [x,y] of samples){const i=(y*w+x)*4;br+=d[i];bg+=d[i+1];bb+=d[i+2]}
        br/=samples.length;bg/=samples.length;bb/=samples.length;
        const nearBlack=(br<65&&bg<65&&bb<65),nearWhite=(br>205&&bg>205&&bb>205);
        if(!nearBlack&&!nearWhite){img.dataset.logoProcessed='1';return}
        const seen=new Uint8Array(w*h),queue=[];
        const close=(i)=>{const r=d[i],g=d[i+1],b=d[i+2];if(nearBlack)return r<80&&g<80&&b<80;return r>185&&g>185&&b>185};
        const push=(x,y)=>{if(x<0||x>=w||y<0||y>=h)return;const p=y*w+x;if(seen[p]||!close(p*4))return;seen[p]=1;queue.push(p)};
        for(let x=0;x<w;x++){push(x,0);push(x,h-1)}for(let y=0;y<h;y++){push(0,y);push(w-1,y)}
        for(let q=0;q<queue.length;q++){const p=queue[q],x=p%w,y=Math.floor(p/w),i=p*4;d[i+3]=0;push(x+1,y);push(x-1,y);push(x,y+1);push(x,y-1)}
        for(let p=0;p<w*h;p++){const i=p*4;if(d[i+3]===0)continue;const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),lum=.2126*r+.7152*g+.0722*b;if(mx-mn<38&&lum<105){d[i]=255;d[i+1]=255;d[i+2]=255}}
        ctx.putImageData(image,0,0);img.src=canvas.toDataURL('image/png');img.dataset.logoProcessed='1';
      }catch(e){img.dataset.logoProcessed='1'}
    }

    document.querySelectorAll('.insurance-panel-card').forEach(card=>{
      const strong=card.querySelector('strong');if(!strong)return;
      const text=strong.textContent.replace(/\s+/g,' ').trim().toLowerCase();
      const key=Object.keys(logoMap).sort((a,b)=>b.length-a.length).find(k=>text.includes(k));if(!key)return;
      const old=card.querySelector('.insurance-logo');if(old)old.remove();
      const img=document.createElement('img');img.className='insurance-logo';img.alt='';img.setAttribute('aria-hidden','true');img.loading='eager';img.decoding='async';img.src='./'+logoMap[key]+'?v=8';
      img.addEventListener('load',()=>processLogo(img),{once:true});
      card.appendChild(img);
    });

    const paymentBox=document.querySelector('.payment-logos');
    if(paymentBox){
      const imgs=[...paymentBox.querySelectorAll(':scope > img')];
      imgs.forEach(img=>{if(img.parentElement!==paymentBox)return;const card=document.createElement('div');card.className='payment-logo-card';img.parentNode.insertBefore(card,img);card.appendChild(img)});
    }

    document.querySelectorAll('.social a').forEach(link=>{
      const label=(link.textContent||'').toLowerCase();
      if(label.includes('tiktok')||label.includes('@osakawindscreen')){link.href='https://www.tiktok.com/@osakawindscreen';link.target='_blank';link.rel='noopener noreferrer'}
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
