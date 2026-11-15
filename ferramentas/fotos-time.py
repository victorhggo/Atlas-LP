# Rodada 2, item 17: fotos do time em cor natural, mesmo recorte e mesmo tratamento.
# Fonte: Downloads/LinkedIn/adriano.png e victor.png (800x800).
# - Recorte 4:5 com o rosto na mesma proporção e na mesma altura nas duas fotos.
# - Elipse suave em volta do rosto: fora dela a foto desfoca e é puxada para o mesmo tom claro azulado do site, para as duas parecerem da mesma sessão.
# - Cor da pele preservada; só um balanço de branco leve na foto mais quente.
# Saída: img/time/{nome}-{240,480}.{webp,avif}
import sys
from pathlib import Path
import numpy as np
import cv2
from PIL import Image

ORIG = Path(r"C:\Users\VK\Downloads\LinkedIn")
DEST = Path(__file__).resolve().parent.parent / "img" / "time"
TOM = np.array([243, 238, 233], np.float32)  # BGR de #E9EEF3: fundo claro azulado

# centro do rosto (x, y), largura do rosto (bochecha a bochecha) medidos à mão nas fontes
PESSOAS = {
    "adriano": dict(cx=362, cy=322, rosto=162, quente=True),
    "victor": dict(cx=396, cy=300, rosto=292, quente=False),
}
FRAC = 0.46      # largura do rosto / largura do recorte
OLHO_Y = 0.40    # centro do rosto a 40% da altura


def recortar(im, p):
    w = p["rosto"] / FRAC
    h = w * 5 / 4
    H, W = im.shape[:2]
    if h > H:
        h = H; w = h * 4 / 5
    x0 = int(round(p["cx"] - w / 2)); y0 = int(round(p["cy"] - h * OLHO_Y))
    x0 = max(0, min(W - int(w), x0)); y0 = max(0, min(H - int(h), y0))
    return im[y0:y0 + int(h), x0:x0 + int(w)]


def mascara(h, w):
    # elipse suave em volta do rosto e dos ombros (sem recorte de cabelo: nada de borda serrilhada)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    cx, cy = w * .5, h * (OLHO_Y + .10)
    d = np.sqrt(((xx - cx) / (w * .40)) ** 2 + ((yy - cy) / (h * .50)) ** 2)
    return np.clip((1.25 - d) / .55, 0, 1) ** 1.6


def tratar(nome, p):
    im = cv2.imread(str(ORIG / f"{nome}.png"), cv2.IMREAD_COLOR)
    im = recortar(im, p)
    im = cv2.resize(im, (480, 600), interpolation=cv2.INTER_LANCZOS4 if im.shape[1] < 480 else cv2.INTER_AREA)
    f = im.astype(np.float32)
    if p["quente"]:
        # balanço de branco parcial (metade do caminho até o cinza neutro)
        med = f.reshape(-1, 3).mean(0); alvo = med.mean()
        f = f * (1 + .5 * (alvo / med - 1))
    a = mascara(*f.shape[:2])[..., None]
    fundo = cv2.GaussianBlur(f, (0, 0), 14)
    # o tom claro entra mais nas partes claras (fundo) e quase nada nas escuras (roupa)
    lum = cv2.cvtColor(np.clip(fundo, 0, 255).astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)[..., None] / 255
    k = .34 * lum ** 1.5
    fundo = fundo * (1 - k) + TOM * k
    # leve luz de cima, a mesma nas duas
    grad = np.linspace(1.03, .97, f.shape[0], dtype=np.float32)[:, None, None]
    out = (f * a + fundo * (1 - a)) * grad
    out = np.clip(out, 0, 255).astype(np.uint8)
    rgb = Image.fromarray(cv2.cvtColor(out, cv2.COLOR_BGR2RGB))
    DEST.mkdir(parents=True, exist_ok=True)
    for lado in (480, 240):
        r = rgb.resize((lado, lado * 5 // 4), Image.LANCZOS)
        r.save(DEST / f"{nome}-{lado}.webp", quality=82, method=6)
        r.save(DEST / f"{nome}-{lado}.avif", quality=60)
    cv2.imwrite(str(Path(sys.argv[1]) / f"{nome}-mascara.png") if len(sys.argv) > 1 else "nul", (a[..., 0] * 255).astype(np.uint8))


for n, p in PESSOAS.items():
    tratar(n, p)
print("ok", sorted(x.name for x in DEST.iterdir()))
