(() => {
  const initContactEnhancements = () => {
    if (window.__osakaContactEnhancements) return;
    window.__osakaContactEnhancements = true;

    const style = document.createElement('style');
    style.textContent = `
      .contact-item.email-contact h3{display:flex;align-items:center;justify-content:center;gap:10px}
      .contact-item.email-contact .email-logo{font-size:30px;line-height:1;display:inline-flex;align-items:center;justify-content:center;transform:translateY(-1px)}
      .tiktok-follow-link{display:flex!important;width:100%;flex-direction:column;align-items:center;justify-content:flex-start;gap:7px;margin:28px 0!important;color:#fff!important;font-size:16px!important;font-weight:800!important;text-align:center}
      .tiktok-follow-link .tiktok-logo{width:68px;height:68px;flex:0 0 auto;margin:0 auto;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(0,0,0,.28);transition:transform .25s ease,box-shadow .25s ease;overflow:hidden}
      .tiktok-follow-link .tiktok-logo svg{width:43px;height:43px;display:block}
      .tiktok-follow-link .tiktok-handle{display:block;width:100%;text-align:center}
      .tiktok-follow-link:hover .tiktok-logo{transform:translateY(-3px) scale(1.04);box-shadow:0 14px 30px rgba(0,0,0,.4)}
      @media(max-width:600px){.contact-item.email-contact .email-logo{font-size:26px}.tiktok-follow-link .tiktok-logo{width:62px;height:62px}.tiktok-follow-link .tiktok-logo svg{width:39px;height:39px}}
    `;
    document.head.appendChild(style);

    const emailHeading = Array.from(document.querySelectorAll('.contact-item h3')).find(el => /EMAIL/i.test(el.textContent || ''));
    if(emailHeading){
      const item = emailHeading.closest('.contact-item');
      item.classList.add('email-contact');
      emailHeading.innerHTML = '<span class="email-logo" aria-hidden="true">✉</span><span>EMAIL</span>';
    }

    const social = document.querySelector('.contact .social');
    if(social){
      social.querySelectorAll('a').forEach(a => a.remove());
      const link = document.createElement('a');
      link.className = 'tiktok-follow-link';
      link.href = 'https://www.tiktok.com/@osakawindscreen';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label','Osaka Windscreen on TikTok');
      link.innerHTML = '<span class="tiktok-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#111" d="M16.5 3c.4 1.8 1.4 3.1 3.2 3.8v3.1c-1.5-.1-2.8-.6-4-1.4v6.8c0 4.1-2.7 6.7-6.4 6.7-3.2 0-5.8-2.3-5.8-5.4 0-3.3 2.8-5.6 6.2-5.6.4 0 .8 0 1.2.1v3.1c-.4-.1-.8-.2-1.2-.2-1.5 0-2.8 1-2.8 2.5 0 1.3 1.1 2.4 2.5 2.4 1.8 0 2.8-1.2 2.8-3.4V3h4.3z"/></svg></span><span class="tiktok-handle">@osakawindscreen</span>';
      social.appendChild(link);
    }

    // Direct Google Maps destination for both the location CTA and the Google rating CTA.
    // This is the known Osaka Auto Windscreen listing in Klang, so customers land on the
    // business listing directly instead of having to search/select it manually.
    const googleMapsDirect = 'https://goo.gl/maps/SvesNAt1qWMs38aP7';
    const normalize = s => (s || '').replace(/\s+/g,' ').trim().toLowerCase();
    document.querySelectorAll('a').forEach(a => {
      const label = normalize(a.textContent);
      if (label.includes('google map location') || label.includes('google maps location') || label === 'view map' || label.includes('view google map')) {
        a.href = googleMapsDirect;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      if (label.includes('view more google rating') || label.includes('google rating')) {
        a.href = googleMapsDirect;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
    });
  };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initContactEnhancements,{once:true});
  else initContactEnhancements();
})();
