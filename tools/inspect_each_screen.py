from PIL import Image
import os
import glob

# Let's write an inspector that samples key areas of each screenshot
# to see what titles, breadcrumbs, sidebar menus, and components are visible.

images = sorted(glob.glob("reference_extracted/embedded_images/*.png"))
print(f"Total embedded images to inspect: {len(images)}")

for idx, p in enumerate(images):
    im = Image.open(p)
    w, h = im.size
    print(f"[{idx+1:02d}] {os.path.basename(p)}: {w}x{h}")

