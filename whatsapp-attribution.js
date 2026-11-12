(() => {
  const params = new URLSearchParams(window.location.search);
  const medium = (params.get('utm_medium') || '').toLowerCase();
  const source = (params.get('utm_source') || '').toLowerCase();
  const hasGoogleAdClickId = ['gclid', 'gbraid', 'wbraid'].some((key) => params.has(key));
  const hasGooglePaidUtm = source === 'google' && /^(cpc|ppc|paid|paid_search)$/.test(medium);
  const fromGoogleAds = hasGoogleAdClickId || hasGooglePaidUtm || sessionStorage.getItem('osaka_google_ads_visit') === '1';

  if (hasGoogleAdClickId || hasGooglePaidUtm) {
    sessionStorage.setItem('osaka_google_ads_visit', '1');
  }

  document.querySelectorAll('a[href*="wa.me/60103209929"]').forEach((link) => {
    const whatsappUrl = new URL(link.href);
    whatsappUrl.searchParams.set('text', 'Hi, I would like to change windscreen.');
    link.href = whatsappUrl.toString();

    link.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_click',
        whatsapp_source: fromGoogleAds ? 'google_ads' : 'not_google_ads',
        whatsapp_button: link.textContent.trim(),
      });
    });
  });
})();
