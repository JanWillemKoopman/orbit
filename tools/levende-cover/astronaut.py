"""Maakt de hulpbeelden voor de bewegende cover van de astronaut (components/LevendeCover.tsx).

    pip install pillow numpy rembg onnxruntime
    python3 tools/levende-cover/astronaut.py

Leest public/images/cover-astronaut.webp en schrijft naar public/images/cover-astronaut/:
  masker.png  rood = het raam (de ruimte, zonder de astronaut en de lijst), groen = gloed rond de
              limegroene lampjes, blauw = de lampjes zelf. Halve resolutie van de foto.
  rotsen.png  vier rotsblokken uit de foto als losse sprites (boven scherp, onder met bewegingsonscherpte).
Draai dit opnieuw als de foto verandert; de coördinaten hieronder horen bij deze foto (1774 x 887).
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parents[2]
UIT = ROOT / 'public/images/cover-astronaut'
foto = Image.open(ROOT / 'public/images/cover-astronaut.webp').convert('RGB')
W, H = foto.size

# --- Raam: de omtrek van het glas, min de astronaut --------------------------------------------
RAAM = [(962, 110), (1000, 80), (1150, 62), (1290, 38), (1335, 0), (1642, 0), (1700, 110), (1728, 200), (1748, 300),
        (1758, 400), (1750, 500), (1722, 560), (1685, 592), (1640, 600), (1600, 592), (1500, 572), (1400, 550),
        (1300, 527), (1200, 507), (1100, 487), (1000, 470), (962, 420)]
persoon = remove(foto, session=new_session('u2net_human_seg'), only_mask=True).convert('L')
persoon = np.asarray(persoon.filter(ImageFilter.MaxFilter(9)), dtype=float) / 255
glas = Image.new('L', (W, H), 0)
ImageDraw.Draw(glas).polygon(RAAM, fill=255)
raam = np.asarray(glas, dtype=float) / 255 * (1 - np.clip(persoon * 1.5, 0, 1))
raam = Image.fromarray((raam * 255).astype('uint8')).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(5))

# --- Lampjes: alles wat fel limegroen is in een verder zwart-witte foto ---------------------------
px = np.asarray(foto, dtype=float) / 255
lamp = ((px[..., 1] - px[..., 2] > 0.3) & (px[..., 1] > 0.55)).astype('uint8') * 255
lamp = Image.fromarray(lamp)
gloed = np.asarray(lamp.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(14)), dtype=float)
gloed = Image.fromarray(np.clip(gloed * 2.2, 0, 255).astype('uint8'))
lamp = lamp.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1.5))

Image.merge('RGB', [raam, gloed, lamp]).resize((W // 2, H // 2), Image.LANCZOS).save(UIT / 'masker.png', optimize=True)

# --- Rotsblokken: vier stenen uit het raam, uitgesneden met een zachte rand ---------------------
ROTSEN = [
    [(1016, 238), (1020, 222), (1032, 208), (1048, 203), (1060, 205), (1072, 212), (1080, 222), (1082, 240), (1076, 254), (1062, 260), (1040, 260), (1024, 254)],
    [(1030, 362), (1040, 348), (1060, 341), (1085, 343), (1105, 352), (1118, 366), (1114, 384), (1100, 394), (1075, 398), (1050, 394), (1034, 382)],
    [(1106, 290), (1112, 278), (1126, 273), (1140, 275), (1150, 284), (1150, 298), (1140, 306), (1122, 306), (1110, 300)],
    [(1096, 418), (1104, 402), (1122, 392), (1146, 394), (1164, 404), (1170, 420), (1162, 438), (1140, 446), (1114, 444), (1100, 434)],
]
CEL, VAAG = 128, 30
atlas = np.zeros((CEL * 2, CEL * len(ROTSEN), 4), dtype=float)
for i, punten in enumerate(ROTSEN):
    xs, ys = [p[0] for p in punten], [p[1] for p in punten]
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
    schaal = 66 / max(max(xs) - min(xs), max(ys) - min(ys))  # elke steen even groot in zijn cel
    half = CEL / 2 / schaal
    vak = (cx - half, cy - half, cx + half, cy + half)
    kleur = foto.crop(tuple(round(v) for v in vak)).resize((CEL, CEL), Image.LANCZOS)
    alfa = Image.new('L', (CEL * 4, CEL * 4), 0)
    ImageDraw.Draw(alfa).polygon([((x - vak[0]) * schaal * 4, (y - vak[1]) * schaal * 4) for x, y in punten], fill=255)
    alfa = alfa.filter(ImageFilter.GaussianBlur(10)).resize((CEL, CEL), Image.LANCZOS)
    rgba = np.dstack([np.asarray(kleur, dtype=float), np.asarray(alfa, dtype=float)]) / 255
    atlas[:CEL, i * CEL:(i + 1) * CEL] = rgba
    # Bewegingsonscherpte langs de x-as, op voorvermenigvuldigde kleur zodat de rand niet donker uitloopt.
    voor = rgba.copy()
    voor[..., :3] *= voor[..., 3:]
    kern = np.ones(VAAG) / VAAG
    vaag = np.apply_along_axis(lambda rij: np.convolve(rij, kern, mode='same'), 1, voor)
    vaag[..., :3] = np.where(vaag[..., 3:] > 1e-4, vaag[..., :3] / np.maximum(vaag[..., 3:], 1e-4), rgba[..., :3])
    atlas[CEL:, i * CEL:(i + 1) * CEL] = vaag
Image.fromarray((np.clip(atlas, 0, 1) * 255).astype('uint8'), 'RGBA').save(UIT / 'rotsen.png', optimize=True)
print('klaar:', [(p.name, p.stat().st_size) for p in sorted(UIT.iterdir())])
