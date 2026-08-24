(() => {
  const initContactEnhancements = () => {
    if (window.__osakaContactEnhancements) return;
    window.__osakaContactEnhancements = true;

    const style = document.createElement('style');
    style.textContent = `
      .contact-item.email-contact h3{display:flex;align-items:center;justify-content:center;gap:9px}
      .contact-item.email-contact .email-logo{font-size:27px;line-height:1;display:inline-flex;align-items:center;justify-content:center;transform:translateY(-1px)}
      .tiktok-follow-link{display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:9px;margin:28px 0!important;color:#fff!important;font-size:16px!important;font-weight:800!important}
      .tiktok-follow-link .tiktok-logo{width:72px;height:72px;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(0,0,0,.28);transition:transform .25s ease,box-shadow .25s ease;overflow:hidden}
      .tiktok-follow-link .tiktok-logo img{display:block;width:45px;height:45px;object-fit:contain}
      .tiktok-follow-link:hover .tiktok-logo{transform:translateY(-3px) scale(1.04);box-shadow:0 14px 30px rgba(0,0,0,.4)}
      @media(max-width:600px){.contact-item.email-contact .email-logo{font-size:24px}.tiktok-follow-link .tiktok-logo{width:64px;height:64px}.tiktok-follow-link .tiktok-logo img{width:40px;height:40px}}
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
      link.innerHTML = '<span class="tiktok-logo"><img src="https://cdn.simpleicons.org/tiktok/000000" alt="TikTok"></span><span>@osakawindscreen</span>';
      social.appendChild(link);
    }
  };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initContactEnhancements,{once:true});
  else initContactEnhancements();
})();
