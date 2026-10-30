import json
from PIL import Image

with open("reference_extracted/image_manifest.json") as f:
    manifest = json.load(f)

for idx, m in enumerate(manifest):
    path = f"reference_extracted/embedded_images/{m['filename']}"
    im = Image.open(path)
    print(f"[{idx+1:02d}] Page {m['page']:02d}: {m['filename']} | Size: {im.size} | Mode: {im.mode}")

