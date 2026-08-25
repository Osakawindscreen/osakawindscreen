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
        f'<img src="{filename}" alt="{name} insurance logo" loading="lazy">'
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
.insurance-panel-grid{max-width:1180px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid #292929;border-left:1px solid #292929}
.insurance-panel-card{min-height:145px;background:#0d0d0d;border-right:1px solid #292929;border-bottom:1px solid #292929;display:flex;align-items:center;justify-content:center;padding:18px 20px;position:relative;overflow:hidden;transition:transform .25s ease,background .25s ease,box-shadow .25s ease}
.insurance-panel-card:after{content:"";position:absolute;left:22%;right:22%;bottom:0;height:2px;background:#c9232d;transform:scaleX(.35);transform-origin:center;transition:transform .25s ease}
.insurance-panel-card:hover{transform:translateY(-3px);background:#151515;box-shadow:0 14px 32px rgba(0,0,0,.35)}
.insurance-panel-card:hover:after{transform:scaleX(1)}
.insurance-panel-card img{position:relative;z-index:1;display:block;width:210px;height:92px;object-fit:contain;object-position:center;background:transparent;border:0;border-radius:0;padding:0;box-shadow:none}
.insurance-panel-card.insurance-logo-problem img{width:250px;height:105px}
@media(max-width:1000px){.insurance-panel-grid{grid-template-columns:repeat(3,1fr)}.insurance-panel-card img{width:190px}.insurance-panel-card.insurance-logo-problem img{width:220px}}
@media(max-width:700px){.insurance-panels{padding:65px 18px}.insurance-panel-grid{grid-template-columns:repeat(2,1fr)}.insurance-panel-card{min-height:125px;padding:14px 8px}.insurance-panel-card img{width:150px;height:72px}.insurance-panel-card.insurance-logo-problem img{width:175px;height:78px}}
@media(max-width:420px){.insurance-panel-card{min-height:112px}.insurance-panel-card img{width:135px;height:65px}.insurance-panel-card.insurance-logo-problem img{width:155px;height:70px}}
'''

html = re.sub(r'/\* INSURANCE PANEL LOGOS \*/.*?@media\(max-width:420px\)\{.*?\}\n', '', html, flags=re.S)
html = html.replace('</style>', css + '</style>', 1)

INDEX.write_text(html, encoding='utf-8')
print('Insurance panel updated with real uploaded logos and cleaned Lonpac/MSIG/Progresif/Tokio Marine assets.')
