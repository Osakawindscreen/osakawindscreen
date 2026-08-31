from pathlib import Path
import re
from collections import deque
from PIL import Image

INDEX = Path('index.html')

# Use the actual logo files uploaded to the repository instead of favicon images.
LOGOS = [
    ('AIA', 'ins-aia-logo.png'),
    ('AIG', 'ins-aig-logo.png'),
    ('AXA AFFIN', 'ins-axa-logo.png'),
    ('CHUBB', 'ins-chubb-logo.png'),
    ('GENERALI', 'ins-generali-logo.jpg'),
    ('TAKAFUL IKHLAS', 'ins-ikhlas-logo.png'),
    ('KURNIA', 'ins-kurnia-logo.png'),
    ('LIBERTY', 'ins-liberty-logo.png'),
    ('LONPAC', 'ins-lonpac-logo-clean.png'),
    ('MSIG', 'ins-msig-logo-clean.png'),
    ('PACIFIC', 'ins-pacific-logo.png'),
    ('P & O', 'ins-pno-logo.png'),
    ('PROGRESIF', 'ins-progresif-logo-clean.png'),
    ('RHB', 'ins-rhb-logo.png'),
    ('TAKAFUL MALAYSIA', 'ins-malaysia-logo.png'),
    ('TOKIO MARINE', 'ins-tokio-logo-clean.png'),
    ('TUNE', 'ins-tune-logo.png'),
    ('ZURICH', 'ins-zurich-logo.png'),
]

PROBLEM_LOGOS = {
    'LONPAC': ('ins-lonpac-logo.jpg', 'ins-lonpac-logo-clean.png'),
    'MSIG': ('ins-msig-logo.png', 'ins-msig-logo-clean.png'),
    'PROGRESIF': ('ins-progresif-logo.png', 'ins-progresif-logo-clean.png'),
    'TOKIO MARINE': ('ins-tokio-logo.png', 'ins-tokio-logo-clean.png'),
}


def colour_distance(a, b):
    return sum((a[i] - b[i]) ** 2 for i in range(3)) ** 0.5


def clean_problem_logo(src_name, dst_name):
    """Remove the supplied matte and brighten dark neutral wording."""
    src = Path(src_name)
    if not src.exists():
        raise FileNotFoundError(src)

    im = Image.open(src).convert('RGBA')
    px = im.load()
    w, h = im.size

    corners = [px[0, 0][:3], px[w - 1, 0][:3], px[0, h - 1][:3], px[w - 1, h - 1][:3]]
    bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))

    # Remove only background-coloured pixels connected to an edge.
    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        q.append((x, 0)); q.append((x, h - 1))
    for y in range(h):
        q.append((0, y)); q.append((w - 1, y))

    fuzz = 52 if sum(bg) < 180 else 42
    while q:
        x, y = q.popleft()
        idx = y * w + x
        if seen[idx]:
            continue
        seen[idx] = 1
        if colour_distance(px[x, y][:3], bg) > fuzz:
            continue
        px[x, y] = (0, 0, 0, 0)
        if x > 0: q.append((x - 1, y))
        if x + 1 < w: q.append((x + 1, y))
        if y > 0: q.append((x, y - 1))
        if y + 1 < h: q.append((x, y + 1))

    # The supplied files use dark neutral lettering. Make that lettering white,
    # while leaving saturated brand colours untouched.
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            sat = 0 if mx == 0 else (mx - mn) / mx
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if sat < 0.22 and lum < 145:
                px[x, y] = (255, 255, 255, a)

    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save(dst_name, 'PNG', optimize=True)


for _, (src, dst) in PROBLEM_LOGOS.items():
    clean_problem_logo(src, dst)

html = INDEX.read_text(encoding='utf-8')

cards = []
for name, filename in LOGOS:
    cls = ' insurance-logo-problem' if name in PROBLEM_LOGOS else ''
    cards.append(
        f'<div class="insurance-panel-card{cls}" title="{name}">'
        f'<img class="insurance-logo" src="{filename}" alt="{name} insurance logo" loading="lazy">'
        f'</div>'
    )

section = '''<section class="insurance-panels" id="insurance-panels">
  <div class="panel-header">
    <h2>INSURANCE PANEL</h2>
    <p>We Provide Hassle Free Windscreen Claim Services to the Following Insurance Companies.</p>
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
/* PREMIUM INSURANCE PANEL LOGOS */
.insurance-panel-grid{max-width:1180px;margin:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border:1px solid #292929;border-radius:14px;overflow:hidden;background:#0d0d0d;box-shadow:0 18px 45px rgba(0,0,0,.28)}
.insurance-panel-card{min-width:0;min-height:150px;background:#111;border-right:1px solid #292929;border-bottom:1px solid #292929;display:flex;align-items:center;justify-content:center;padding:26px 24px;position:relative;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.018);transition:transform .22s ease,background .22s ease,box-shadow .22s ease,border-color .22s ease}
.insurance-panel-card:nth-child(4n){border-right:0}
.insurance-panel-card:nth-last-child(-n+4){border-bottom:0}
.insurance-panel-card:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,35,45,.055),transparent 58%);opacity:0;pointer-events:none;transition:opacity .22s ease}
.insurance-panel-card:after{content:"";position:absolute;left:50%;bottom:0;width:0;height:2px;background:#c9232d;transform:translateX(-50%);transition:width .22s ease}
.insurance-panel-card .insurance-logo{position:relative;z-index:1;display:block;width:100%;max-width:210px;height:88px;object-fit:contain;object-position:center;margin:auto;padding:0;background:transparent;border:0;border-radius:0;box-shadow:none;transition:transform .22s ease}
.insurance-panel-card.insurance-logo-problem .insurance-logo{max-width:240px;height:98px}
@media (hover:hover) and (pointer:fine){.insurance-panel-card:hover{transform:translateY(-3px);background:#151515;border-color:#3a3a3a;box-shadow:0 14px 30px rgba(0,0,0,.28)}.insurance-panel-card:hover:before{opacity:1}.insurance-panel-card:hover:after{width:44px}.insurance-panel-card:hover .insurance-logo{transform:scale(1.035)}}
@media(max-width:1000px){.insurance-panel-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.insurance-panel-card:nth-child(4n){border-right:1px solid #292929}.insurance-panel-card:nth-child(3n){border-right:0}.insurance-panel-card:nth-last-child(-n+4){border-bottom:1px solid #292929}.insurance-panel-card:nth-last-child(-n+3){border-bottom:0}.insurance-panel-card{min-height:145px;padding:24px 18px}.insurance-panel-card .insurance-logo{max-width:190px;height:82px}.insurance-panel-card.insurance-logo-problem .insurance-logo{max-width:220px;height:92px}}
@media(max-width:700px){.insurance-panels{padding-left:18px;padding-right:18px}.insurance-panel-grid{grid-template-columns:repeat(2,minmax(0,1fr));border-radius:12px}.insurance-panel-card{min-height:138px;padding:22px 14px}.insurance-panel-card:nth-child(3n){border-right:1px solid #292929}.insurance-panel-card:nth-child(2n){border-right:0}.insurance-panel-card:nth-last-child(-n+3){border-bottom:1px solid #292929}.insurance-panel-card:nth-last-child(-n+2){border-bottom:0}.insurance-panel-card .insurance-logo{max-width:165px;height:72px}.insurance-panel-card.insurance-logo-problem .insurance-logo{max-width:185px;height:80px}}
@media(max-width:420px){.insurance-panel-card{min-height:128px;padding:20px 10px}.insurance-panel-card .insurance-logo{max-width:150px;height:66px}.insurance-panel-card.insurance-logo-problem .insurance-logo{max-width:170px;height:74px}}
'''

# Remove prior insurance-panel CSS blocks generated by this script, then add one canonical block.
html = re.sub(r'/\* PREMIUM INSURANCE PANEL LOGOS \*/.*?@media\(max-width:420px\)\{.*?\}\n', '', html, flags=re.S)
html = re.sub(r'/\* INSURANCE PANEL LOGOS \*/.*?@media\(max-width:420px\)\{.*?\}\n', '', html, flags=re.S)
html = html.replace('</style>', css + '</style>', 1)

INDEX.write_text(html, encoding='utf-8')
print('Insurance panel updated with real uploaded logos, consistent contain-based logo slots, and responsive premium cards.')
