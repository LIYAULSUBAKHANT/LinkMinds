import os
from PIL import Image
import glob

os.makedirs("reference_extracted/titles", exist_ok=True)
images = sorted(glob.glob("reference_extracted/embedded_images/*.png"))

for idx, p in enumerate(images):
    im = Image.open(p)
    w, h = im.size
    # For public pages (idx 0 to 3), title is in hero (y: 60 to 350)
    if idx < 4:
        crop_box = (0, 0, min(w, 800), min(h, 300))
    else:
        # Dashboard pages: sidebar is on left, title is at x: 200 to 900, y: 40 to 180
        crop_box = (min(w, 200), min(h, 40), min(w, 1000), min(h, 200))
    cropped = im.crop(crop_box)
    cropped.save(f"reference_extracted/titles/title_{idx+1:02d}_{os.path.basename(p)}")

print("Extracted title crops for all 25 images.")

