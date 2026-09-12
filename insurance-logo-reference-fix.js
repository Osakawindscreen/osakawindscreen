/* Insurance partner presentation fix: remove only raster white-background/isolated-white artifacts. */
(() => {
  const partners = [
    ['AIA', 'ins-aia-logo-clean.png', 'AIA insurance logo', 'aia'],
    ['AXA AFFIN', 'ins-axa-logo-clean.png', 'AXA AFFIN insurance logo', 'axa'],
    ['CHUBB', 'ins-chubb-logo-clean.png', 'CHUBB insurance logo', 'chubb'],
    ['LIBERTY', 'ins-liberty-logo-clean.png', 'Liberty Insurance logo', 'liberty'],
    ['LONPAC', 'ins-lonpac-logo-clean.png', 'LONPAC insurance logo', 'lonpac'],
    ['MSIG', 'ins-msig-logo-clean.png', 'MSIG insurance logo', 'msig'],
    ['P & O', 'ins-pno-logo-clean.png', 'P & O insurance logo', 'pno'],
    ['PROGRESSIVE INSURANCE BHD', 'ins-progresif-logo-clean.png', 'Progressive Insurance BHD logo', 'progressive'],
    ['GENERALI', 'ins-generali-logo-clean.png', 'Generali insurance logo', 'generali'],
    ['RHB', 'ins-rhb-logo-clean.png', 'RHB insurance logo', 'rhb'],
    ['TAKAFUL IKHLAS', 'ins-ikhlas-logo-clean.png', 'Takaful Ikhlas logo', 'ikhlas'],
    ['PACIFIC INSURANCE', 'ins-pacific-logo-clean.png', 'Pacific Insurance logo', 'pacific'],
    ['TOKIO MARINE', 'ins-tokio-logo-clean.png', 'Tokio Marine Insurance Group logo', 'tokio'],
    ['ZURICH', 'ins-zurich-logo-clean.png', 'Zurich insurance logo', 'zurich'],
    ['KURNIA', 'ins-kurnia-logo-clean.png', 'Kurnia insurance logo', 'kurnia'],
    ['AIG', 'ins-aig-logo-clean.png', 'AIG insurance logo', 'aig'],
    ['TAKAFUL MALAYSIA', 'ins-malaysia-logo-clean.png', 'Takaful Malaysia logo', 'malaysia']
  ];

  const css = `
    .insurance-panel-grid{max-width:1180px!important;margin:0 auto!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:18px!important;background:transparent!important}
    .insurance-panel-card{min-width:0!important;min-height:118px!important;padding:14px 16px!important;background:#0b0b0b!important;border:1px solid #303030!important;border-radius:6px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;overflow:hidden!important;box-shadow:none!important;transform:none!important}
    .insurance-panel-card:before{content:none!important;display:none!important}
    .insurance-panel-card:after{content:""!important;position:absolute!important;left:10%!important;right:10%!important;bottom:0!important;height:2px!important;background:#c9232d!important}
    .insurance-panel-card .insurance-logo{position:relative!important;z-index:1!important;display:block!important;width:100%!important;max-width:210px!important;height:82px!important;margin:auto!important;padding:0!important;object-fit:contain!important;object-position:center!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;filter:none!important;opacity:1!important;image-rendering:auto!important}
    .insurance-panel-card .insurance-logo-aia{max-width:170px!important}.insurance-panel-card .insurance-logo-axa{max-width:170px!important}.insurance-panel-card .insurance-logo-chubb{max-width:210px!important}.insurance-panel-card .insurance-logo-liberty{max-width:210px!important}.insurance-panel-card .insurance-logo-lonpac{max-width:180px!important}.insurance-panel-card .insurance-logo-msig{max-width:205px!important}.insurance-panel-card .insurance-logo-pno{max-width:190px!important}.insurance-panel-card .insurance-logo-progressive{max-width:205px!important}.insurance-panel-card .insurance-logo-generali{max-width:205px!important}.insurance-panel-card .insurance-logo-rhb{max-width:185px!important}.insurance-panel-card .insurance-logo-ikhlas{max-width:175px!important}.insurance-panel-card .insurance-logo-pacific{max-width:205px!important}.insurance-panel-card .insurance-logo-tokio{max-width:210px!important}.insurance-panel-card .insurance-logo-zurich{max-width:195px!important}.insurance-panel-card .insurance-logo-kurnia{max-width:205px!important}.insurance-panel-card .insurance-logo-aig{max-width:145px!important}.insurance-panel-card .insurance-logo-malaysia{max-width:190px!important}
    @media (hover:hover) and (pointer:fine){.insurance-panel-card:hover{border-color:#454545!important;box-shadow:0 10px 24px rgba(0,0,0,.28)!important}}
    @media(max-width:1000px){.insurance-panel-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important}.insurance-panel-card{min-height:120px!important}}
    @media(max-width:700px){.insurance-panel-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}.insurance-panel-card{min-height:118px!important;padding:12px 9px!important}.insurance-panel-card .insurance-logo{max-width:170px!important;height:72px!important}}
    @media(max-width:420px){.insurance-panel-card{min-height:108px!important}.insurance-panel-card .insurance-logo{max-width:150px!important;height:65px!important}}
  `;

  const isWhite = (r,g,b,a) => a > 8 && r > 242 && g > 242 && b > 242;

  // Remove only obvious raster artifacts: a white background/halo component,
  // or tiny isolated white specks. Large connected white logo elements remain.
  function cleanRaster(img) {
    const w=img.naturalWidth, h=img.naturalHeight;
    if(!w || !h) return img.src;
    const c=document.createElement('canvas'); c.width=w; c.height=h;
    const x=c.getContext('2d',{willReadFrequently:true}); x.drawImage(img,0,0,w,h);
    const d=x.getImageData(0,0,w,h), p=d.data, n=w*h;
    const white=new Uint8Array(n), seen=new Uint8Array(n);
    let whiteCount=0;
    for(let i=0,j=0;i<n;i++,j+=4){ if(isWhite(p[j],p[j+1],p[j+2],p[j+3])){white[i]=1;whiteCount++;} }
    if(!whiteCount) return img.src;
    const bgLike = whiteCount > n*0.45;
    const dirs=[-1,1,-w,w,-w-1,-w+1,w-1,w+1];
    const queue=new Int32Array(n); let changed=false;
    for(let s=0;s<n;s++){
      if(!white[s]||seen[s]) continue;
      let qh=0,qt=0,size=0,minX=w,minY=h,maxX=0,maxY=0; queue[qt++]=s; seen[s]=1;
      while(qh<qt){
        const idx=queue[qh++], yy=Math.floor(idx/w), xx=idx-yy*w; size++; if(xx<minX)minX=xx;if(xx>maxX)maxX=xx;if(yy<minY)minY=yy;if(yy>maxY)maxY=yy;
        for(const off of dirs){ const ni=idx+off; if(ni<0||ni>=n||seen[ni]||!white[ni]) continue; const ny=Math.floor(ni/w), nx=ni-ny*w; if(Math.abs(nx-xx)>1||Math.abs(ny-yy)>1) continue; seen[ni]=1; queue[qt++]=ni; }
      }
      const box=(maxX-minX+1)*(maxY-minY+1); const thin=size/box<0.22;
      const remove = (bgLike && size>n*0.08) || size < Math.max(12, n*0.00008) || (thin && size < n*0.003);
      if(remove){ for(let k=0;k<qt;k++){ const idx=queue[k]; p[idx*4+3]=0; } changed=true; }
    }
    if(!changed) return img.src;
    x.putImageData(d,0,0); return c.toDataURL('image/png');
  }

  const apply = () => {
    if (!document.getElementById('insurance-logo-reference-fix')) { const style=document.createElement('style'); style.id='insurance-logo-reference-fix'; style.textContent=css; document.head.appendChild(style); }
    const grid=document.querySelector('.insurance-panel-grid'); if(!grid) return;
    grid.innerHTML=partners.map(([title,src,alt,cls])=>`<div class="insurance-panel-card" title="${title}"><img class="insurance-logo insurance-logo-${cls}" src="${src}" alt="${alt}" loading="eager" decoding="async"></div>`).join('');
    grid.querySelectorAll('img.insurance-logo').forEach(img=>{
      const finish=()=>{ try{ const cleaned=cleanRaster(img); if(cleaned && cleaned!==img.src) img.src=cleaned; }catch(e){} };
      if(img.complete) finish(); else img.addEventListener('load',finish,{once:true});
    });
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
})();
