/* Final visual fixes: TikTok official mark + reliable insurance logo rendering */
(() => {
  function installStyles(){
    if(document.getElementById('osaka-final-fix-style')) return;
    const s=document.createElement('style'); s.id='osaka-final-fix-style';
    s.textContent=`
      .osaka-tiktok-link{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:8px!important;color:#fff!important;text-align:center!important;margin:20px auto!important;font-weight:800!important}
      .osaka-tiktok-icon{width:68px!important;height:68px!important;border-radius:16px!important;background:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 10px 28px rgba(0,0,0,.32)!important;transition:transform .22s ease,box-shadow .22s ease!important}
      .osaka-tiktok-icon svg{width:39px!important;height:39px!important;display:block!important}
      .osaka-tiktok-link:hover .osaka-tiktok-icon{transform:translateY(-4px)!important;box-shadow:0 16px 34px rgba(0,0,0,.42)!important}
      .osaka-tiktok-handle{font-size:15px!important;letter-spacing:.2px!important;color:#fff!important}
      .insurance-panel-card .insurance-logo{opacity:1!important;visibility:visible!important;max-width:230px!important;height:92px!important;object-fit:contain!important;object-position:center!important}
      .insurance-panel-card.insurance-special-logo .insurance-logo{max-width:270px!important;height:108px!important}
      @media(max-width:800px){.insurance-panel-card .insurance-logo{max-width:175px!important;height:68px!important}.insurance-panel-card.insurance-special-logo .insurance-logo{max-width:205px!important;height:78px!important}}
    `; document.head.appendChild(s);
  }

  function makeTikTok(){
    const social=document.querySelector('.social'); if(!social) return;
    const old=[...social.querySelectorAll('a')];
    const t=old.find(a=>/tiktok/i.test(a.textContent)||/@osakawindscreen/i.test(a.textContent));
    if(!t) return;
    if(t.classList.contains('osaka-tiktok-link')) return;
    const a=document.createElement('a');
    a.className='osaka-tiktok-link';
    a.href='https://www.tiktok.com/@osakawindscreen'; a.target='_blank'; a.rel='noopener noreferrer';
    a.innerHTML=`<span class="osaka-tiktok-icon" aria-label="TikTok"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#111" d="M31.8 8.2c1.6 2.7 4.1 4.5 7.2 4.9v5.5c-2.9-.1-5.5-1-7.8-2.5v12.7c0 6.2-5 11.1-11.2 11.1-6.1 0-10.9-4.7-10.9-10.7 0-6.1 5-10.9 11.1-10.9.6 0 1.3.1 1.9.2v5.6c-.6-.2-1.2-.3-1.9-.3-3.1 0-5.6 2.4-5.6 5.4s2.4 5.3 5.4 5.3c3.1 0 5.7-2.5 5.7-5.7V8.2h6.1z"/></svg></span><span class="osaka-tiktok-handle">@osakawindscreen</span>`;
    old.forEach(x=>x.remove());
    social.appendChild(a);
  }

  function cleanImage(img){
    if(!img || img.dataset.finalClean==='1') return;
    const run=()=>{
      if(!img.naturalWidth) return;
      try{
        const w=img.naturalWidth,h=img.naturalHeight,c=document.createElement('canvas'); c.width=w;c.height=h;
        const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);
        const im=ctx.getImageData(0,0,w,h),d=im.data;
        const sample=[]; [[0,0],[w-1,0],[0,h-1],[w-1,h-1],[Math.floor(w/2),0],[Math.floor(w/2),h-1]].forEach(([x,y])=>{const i=(y*w+x)*4;sample.push([d[i],d[i+1],d[i+2]])});
        const bg=sample.reduce((a,v)=>[a[0]+v[0],a[1]+v[1],a[2]+v[2]],[0,0,0]).map(v=>v/sample.length);
        const dist=(r,g,b)=>Math.hypot(r-bg[0],g-bg[1],b-bg[2]);
        const bgLight=(bg[0]+bg[1]+bg[2])/3>150;
        const seen=new Uint8Array(w*h),q=[];
        const canRemove=(i)=>{const r=d[i],g=d[i+1],b=d[i+2];return dist(r,g,b)<78 || (bgLight&&r>205&&g>205&&b>205) || (!bgLight&&r<75&&g<75&&b<75)};
        const push=(x,y)=>{if(x<0||y<0||x>=w||y>=h)return;const p=y*w+x;if(seen[p])return;const i=p*4;if(canRemove(i)){seen[p]=1;q.push(p)}};
        for(let x=0;x<w;x++){push(x,0);push(x,h-1)}for(let y=0;y<h;y++){push(0,y);push(w-1,y)}
        for(let n=0;n<q.length;n++){const p=q[n],x=p%w,y=(p-x)/w;d[p*4+3]=0;push(x+1,y);push(x-1,y);push(x,y+1);push(x,y-1)}
        // Dark neutral wordmarks become white so they remain readable on the black site.
        for(let p=0;p<w*h;p++){const i=p*4;if(d[i+3]===0)continue;const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),lum=.299*r+.587*g+.114*b;if(mx-mn<45&&lum<135){d[i]=255;d[i+1]=255;d[i+2]=255}}
        ctx.putImageData(im,0,0); img.src=c.toDataURL('image/png'); img.dataset.finalClean='1';
      }catch(e){img.dataset.finalClean='1'}
    };
    if(img.complete) run(); else img.addEventListener('load',run,{once:true});
  }

  function fixInsurance(){
    const map={lonpac:'ins-lonpac-logo.jpg',msig:'ins-msig-logo.png',progresif:'ins-progresif-logo.png',progressive:'ins-progresif-logo.png','tokio marine':'ins-tokio-logo.png',tokio:'ins-tokio-logo.png'};
    document.querySelectorAll('.insurance-panel-card').forEach(card=>{
      const strong=card.querySelector('strong');if(!strong)return;
      const text=strong.textContent.toLowerCase();
      const key=Object.keys(map).find(k=>text.includes(k));if(!key)return;
      card.classList.add('insurance-special-logo');
      let img=card.querySelector('.insurance-logo');
      if(!img){img=document.createElement('img');img.className='insurance-logo';card.appendChild(img)}
      img.alt=strong.textContent.trim()+' insurance logo';img.src='./'+map[key]+'?final=3';
      cleanImage(img);
    });
  }

  function init(){installStyles();makeTikTok();fixInsurance();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  setTimeout(init,700);
  setTimeout(init,1800);
})();
