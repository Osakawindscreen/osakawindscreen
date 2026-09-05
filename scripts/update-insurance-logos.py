from pathlib import Path
import re
from collections import deque
from PIL import Image

INDEX = Path('index.html')

LOGOS = [
    ('AIA', 'ins-aia-logo.png'),
    ('AIG', 'ins-aig-logo.png'),
    ('AXA AFFIN', 'ins-axa-logo.png'),
    ('CHUBB', 'ins-chubb-logo.png'),
    ('GENERALI', 'ins-generali-logo.jpg'),
    ('TAKAFUL IKHLAS', 'ins-ikhlas-logo.png'),
    ('KURNIA', 'ins-kurnia-logo.png'),
    ('LIBERTY', 'ins-liberty-logo.png'),
    ('LONPAC', 'ins-lonpac-logo.jpg'),
    ('MSIG', 'ins-msig-logo.png'),
    ('PACIFIC', 'ins-pacific-logo.png'),
    ('P & O', 'ins-pno-logo.png'),
    ('PROGRESIF', 'ins-progresif-logo.png'),
    ('RHB', 'ins-rhb-logo.png'),
    ('TAKAFUL MALAYSIA', 'ins-malaysia-logo.png'),
    ('TOKIO MARINE', 'ins-tokio-logo.png'),
    ('TUNE', 'ins-tune-logo.png'),
    ('ZURICH', 'ins-zurich-logo.png'),
]

# These six logos must follow the user's supplied screenshot, not the
# existing GitHub logo artwork.
SCREENSHOT_REFERENCE_LOGOS = {
    'CHUBB',
    'GENERALI',
    'TAKAFUL IKHLAS',
    'LONPAC',
    'RHB',
    'TAKAFUL MALAYSIA',
}
SCREENSHOT_REFERENCE_SPRITE = 'insurance-screenshot-six-card-q50.jpg'


def colour_distance(a, b):
    return sum((a[i] - b[i]) ** 2 for i in range(3)) ** 0.5


def clean_logo(src_name, dst_name, brand_name):
    """Create a transparent, tightly cropped presentation copy of a logo."""
    src = Path(src_name)
    if not src.exists():
        raise FileNotFoundError(src)

    im = Image.open(src).convert('RGBA')
    w, h = im.size
    px = im.load()

    corners = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    opaque = [c[:3] for c in corners if c[3] > 0]
    bg = tuple(sum(c[i] for c in opaque) // len(opaque) for i in range(3)) if opaque else (255, 255, 255)

    # Remove only matte-coloured pixels connected to an image edge. This keeps
    # enclosed white brand lettering intact and avoids rectangular white mats.
    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        q.append((x, 0)); q.append((x, h - 1))
    for y in range(h):
        q.append((0, y)); q.append((w - 1, y))

    fuzz = 58 if sum(bg) < 210 else 46
    while q:
        x, y = q.popleft()
        idx = y * w + x
        if seen[idx]:
            continue
        seen[idx] = 1
        r, g, b, a = px[x, y]
        if a == 0 or colour_distance((r, g, b), bg) > fuzz:
            continue
        px[x, y] = (0, 0, 0, 0)
        if x > 0: q.append((x - 1, y))
        if x + 1 < w: q.append((x + 1, y))
        if y > 0: q.append((x, y - 1))
        if y + 1 < h: q.append((x, y + 1))

    # Keep the original brand colours for the six reference-sensitive logos.
    if brand_name not in SCREENSHOT_REFERENCE_LOGOS:
        for y in range(h):
            for x in range(w):
                r, g, b, a = px[x, y]
                if a == 0:
                    continue
                mx, mn = max(r, g, b), min(r, g, b)
                sat = 0 if mx == 0 else (mx - mn) / mx
                lum = 0.299 * r + 0.587 * g + 0.114 * b
                if sat < 0.18 and lum < 125:
                    px[x, y] = (255, 255, 255, a)

    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save(dst_name, 'PNG', optimize=True)


clean_files = []
for brand_name, src in LOGOS:
    stem = Path(src).stem
    dst = f'{stem}-clean.png'
    clean_logo(src, dst, brand_name)
    clean_files.append(dst)

html = INDEX.read_text(encoding='utf-8')

cards = []
for (name, _), clean_file in zip(LOGOS, clean_files):
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    src_file = SCREENSHOT_REFERENCE_SPRITE if name in SCREENSHOT_REFERENCE_LOGOS else clean_file
    ref_class = ' reference-logo' if name in SCREENSHOT_REFERENCE_LOGOS else ''
    cards.append(
        f'<div class="insurance-panel-card" title="{name}">'
        f'<img class="insurance-logo insurance-logo-{slug}{ref_class}" src="{src_file}" alt="{name} insurance logo" loading="lazy">'
        f'</div>'
    )

section = '''<section class="insurance-panels" id="insurance-panels">
  <div class="panel-header">
    <div class="insurance-kicker">OUR INSURANCE PARTNERS</div>
    <h2>TRUSTED BY <span>LEADING INSURERS</span></h2>
    <p>We work with Malaysia's most reliable insurance companies to provide you the best coverage and service.</p>
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
/* PREMIUM INSURANCE PARTNER PANEL - SECTION ONLY */
.insurance-panels{padding:88px 30px;background:#090909;text-align:center}
.insurance-panels .panel-header{max-width:900px;margin:0 auto 38px}
.insurance-kicker{display:flex;align-items:center;justify-content:center;gap:14px;color:#c9232d;font-size:14px;font-weight:900;letter-spacing:1.8px;margin-bottom:10px}
.insurance-kicker:before,.insurance-kicker:after{content:"";width:48px;height:2px;background:#c9232d}
.insurance-panels .panel-header h2{font-size:clamp(34px,4.4vw,52px);line-height:1.05;font-weight:900;color:#fff;letter-spacing:-1.2px}
.insurance-panels .panel-header h2 span{color:#c9232d}
.insurance-panels .panel-header h2:after{content:"";display:block;width:34px;height:3px;background:#f4c400;margin:14px auto 12px}
.insurance-panels .panel-header p{color:#aaa;font-size:13px;line-height:1.5}
.insurance-panel-grid{max-width:1180px;margin:auto;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;background:#050505}
.insurance-panel-card{min-width:0;min-height:118px;background:#0d0d0d;border:1px solid #292929;border-radius:4px;display:flex;align-items:center;justify-content:center;padding:16px 14px;position:relative;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.025),0 4px 14px rgba(0,0,0,.18)}
.insurance-panel-card:after{content:"";position:absolute;left:18%;right:18%;bottom:0;height:2px;background:#c9232d;transform:scaleX(.35);transform-origin:center;transition:transform .22s ease}
.insurance-panel-card .insurance-logo{display:block;position:relative;z-index:1;width:100%;max-width:190px;height:76px;object-fit:contain;object-position:center;margin:auto;padding:0;background:transparent;border:0;box-shadow:none;image-rendering:auto}
/* The six screenshot-reference logos use one exact screenshot crop sprite.
   Each class reveals only its matching crop; the panel/card background stays unchanged. */
.insurance-panel-card .reference-logo{width:218px;max-width:none;height:100px;object-fit:none;image-rendering:auto}
.insurance-panel-card .insurance-logo-chubb.reference-logo{object-position:center 36px}
.insurance-panel-card .insurance-logo-generali.reference-logo{object-position:center -36px}
.insurance-panel-card .insurance-logo-lonpac.reference-logo{object-position:center -151px}
.insurance-panel-card .insurance-logo-rhb.reference-logo{object-position:center -240px}
.insurance-panel-card .insurance-logo-takaful-ikhlas.reference-logo{object-position:center -320px}
.insurance-panel-card .insurance-logo-takaful-malaysia.reference-logo{object-position:center -438px}
@media (hover:hover) and (pointer:fine){.insurance-panel-card:hover{transform:translateY(-2px);border-color:#444;box-shadow:0 10px 24px rgba(0,0,0,.35)}.insurance-panel-card:hover:after{transform:scaleX(1)}}
@media(max-width:1000px){.insurance-panel-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.insurance-panel-card{min-height:125px}.insurance-panel-card .insurance-logo{max-width:185px;height:78px}.insurance-panel-card .reference-logo{width:218px;max-width:none;height:100px}}
@media(max-width:700px){.insurance-panels{padding:65px 18px}.insurance-panels .panel-header{margin-bottom:30px}.insurance-kicker{font-size:11px;gap:9px}.insurance-kicker:before,.insurance-kicker:after{width:30px}.insurance-panels .panel-header h2{font-size:clamp(28px,8vw,38px);letter-spacing:-.6px}.insurance-panel-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.insurance-panel-card{min-height:128px;padding:14px 9px}.insurance-panel-card .insurance-logo{max-width:160px;height:72px}.insurance-panel-card .reference-logo{width:190px;max-width:none;height:90px}}
@media(max-width:420px){.insurance-panel-card{min-height:118px}.insurance-panel-card .insurance-logo{max-width:145px;height:65px}.insurance-panel-card .reference-logo{width:170px;max-width:none;height:82px}}
'''

html = re.sub(r'/\* PREMIUM INSURANCE PARTNER PANEL - SECTION ONLY \*/.*?@media\(max-width:420px\)\{.*?\}\n', '', html, flags=re.S)
html = re.sub(r'/\* PREMIUM INSURANCE PANEL LOGOS \*/.*?@media\(max-width:420px\)\{.*?\}\n', '', html, flags=re.S)
html = re.sub(r'/\* INSURANCE PANEL LOGOS \*/.*?@media\(max-width:420px\)\{.*?\}\n', '', html, flags=re.S)
html = html.replace('</style>', css + '</style>', 1)
INDEX.write_text(html, encoding='utf-8')
