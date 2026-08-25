/* Osaka Windscreen — restore Easy Instalment payment logos */
(() => {
  const init = () => {
    const box = document.querySelector('.payment-logos');
    if (!box || box.dataset.paymentFixed === '1') return;
    box.dataset.paymentFixed = '1';

    const payments = [
      { src: './grabpay-logo.png?v=2', alt: 'GrabPay Later' },
      { src: './spaylater-logo.png?v=2', alt: 'SPayLater' },
      { src: './atome-logo.png?v=2', alt: 'Atome' }
    ];

    box.innerHTML = '';
    box.classList.add('osaka-payment-fixed');

    payments.forEach((payment) => {
      const card = document.createElement('div');
      card.className = 'payment-logo-card';
      const img = document.createElement('img');
      img.src = payment.src;
      img.alt = payment.alt;
      img.loading = 'eager';
      img.decoding = 'async';
      img.onerror = () => {
        img.style.display = 'none';
        card.classList.add('payment-logo-missing');
      };
      card.appendChild(img);
      box.appendChild(card);
    });

    const style = document.createElement('style');
    style.textContent = `
      .payment-logos.osaka-payment-fixed{width:100%!important;max-width:650px!important;margin:0 auto!important;padding:24px!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:16px!important;align-items:stretch!important;background:#111!important;border:1px solid #303030!important;border-radius:12px!important;box-sizing:border-box!important}
      .payment-logos.osaka-payment-fixed .payment-logo-card{grid-column:auto!important;max-width:none!important;width:auto!important;min-width:0!important;min-height:125px!important;background:#181818!important;border:1px solid #303030!important;border-radius:10px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:14px!important;overflow:hidden!important;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease!important}
      .payment-logos.osaka-payment-fixed .payment-logo-card:hover{transform:translateY(-3px)!important;border-color:#c9232d!important;box-shadow:0 12px 28px rgba(0,0,0,.35)!important}
      .payment-logos.osaka-payment-fixed .payment-logo-card img{display:block!important;width:100%!important;max-width:175px!important;height:78px!important;object-fit:contain!important;object-position:center!important;margin:0!important;flex:none!important}
      @media(max-width:700px){.payment-logos.osaka-payment-fixed{grid-template-columns:repeat(2,minmax(0,1fr))!important;padding:14px!important;gap:10px!important}.payment-logos.osaka-payment-fixed .payment-logo-card{min-height:105px!important;padding:9px!important}.payment-logos.osaka-payment-fixed .payment-logo-card img{max-width:145px!important;height:65px!important}}
      @media(max-width:420px){.payment-logos.osaka-payment-fixed{grid-template-columns:1fr!important}.payment-logos.osaka-payment-fixed .payment-logo-card{min-height:100px!important}}
    `;
    document.head.appendChild(style);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
