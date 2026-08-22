from pathlib import Path
import re

INDEX = Path('index.html')
html = INDEX.read_text(encoding='utf-8')

logos = [
    ('AIA', 'https://www.aia.com.my/'),
    ('AXA AFFIN', 'https://www.axa.com/'),
    ('CHUBB', 'https://www.chubb.com/my-en/'),
    ('LIBERTY', 'https://www.libertyinsurance.com.my/'),
    ('LONPAC', 'https://www.lonpac.com/'),
    ('MSIG', 'https://www.msig.com.my/'),
    ('P & O', 'https://www.pacific-orient.com/'),
    ('PROGRESIF', 'https://www.progresif.com/'),
    ('GENERALI', 'https://www.generali.com.my/'),
    ('RHB', 'https://www.rhbinsurance.com.my/'),
    ('TAKAFUL IKHLAS', 'https://www.takaful-ikhlas.com.my/'),
    ('THE PACIFIC', 'https://www.pacificinsurance.com.my/'),
    ('TOKIO MARINE', 'https://www.tokiomarine.com/my/en/'),
    ('ZURICH', 'https://www.zurich.com.my/'),
    ('KURNIA', 'https://www.kurnia.com/'),
    ('AIG', 'https://www.aig.com/'),
    ('TAKAFUL MALAYSIA', 'https://www.takaful-malaysia.com.my/'),
]

cards = []
for name, domain in logos:
    cards.append(f'''<div class="insurance-panel-card" title="{name}"><img src="https://www.google.com/s2/favicons?domain={domain}&sz=128" alt="{name} logo" loading="lazy"><span>{name}</span></div>''')

section = '''<section class="insurance-panels" id="insurance-panels">
  <div class="panel-header">
    <h2>OUR INSURANCE PANELS</h2>
    <p>Recognised insurance &amp; takaful panels for windscreen claim assistance.</p>
  </div>
  <div class="insurance-panel-grid">
    %s
  </div>
  <p class="insurance-panel-note"><b>Need to claim?</b> Send us your insurance details on WhatsApp and we will help you check the latest claim procedure and required documents.</p>
</section>''' % '\n    '.join(cards)

html, count = re.subn(r'<section class="insurance-panels" id="insurance-panels">.*?</section>', section, html, count=1, flags=re.S)
if count != 1:
    raise SystemExit('insurance-panels section not found')

css = '''
/* INSURANCE PANEL LOGOS */
.insurance-panel-grid{max-width:1180px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.insurance-panel-card{min-height:150px;background:#111;border:1px solid #292929;border-top:2px solid #c9232d;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;padding:20px 14px;position:relative;overflow:hidden;transition:.25s}
.insurance-panel-card:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,35,45,.10),transparent 60%);pointer-events:none}
.insurance-panel-card:hover{transform:translateY(-4px);border-color:#c9232d;box-shadow:0 14px 32px rgba(0,0,0,.4)}
.insurance-panel-card img{position:relative;z-index:1;width:76px;height:76px;object-fit:contain;background:#fff;border-radius:14px;padding:10px;box-shadow:0 8px 22px rgba(0,0,0,.25)}
.insurance-panel-card span{position:relative;z-index:1;color:#888;font-size:9px;font-weight:900;letter-spacing:1px;text-transform:uppercase}
@media(max-width:1000px){.insurance-panel-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:700px){.insurance-panels{padding:65px 18px}.insurance-panel-grid{grid-template-columns:repeat(2,1fr);gap:10px}.insurance-panel-card{min-height:125px;padding:14px 8px}.insurance-panel-card img{width:64px;height:64px;padding:8px}.insurance-panel-card span{font-size:8px}}
@media(max-width:420px){.insurance-panel-grid{grid-template-columns:1fr 1fr}.insurance-panel-card{min-height:112px}.insurance-panel-card img{width:58px;height:58px}}
'''

if '/* INSURANCE PANEL LOGOS */' not in html:
    html = html.replace('</style>', css + '</style>', 1)

INDEX.write_text(html, encoding='utf-8')
print('Insurance panel logos updated.')