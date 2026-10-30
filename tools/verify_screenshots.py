import os
from PIL import Image

# Let's inspect the layout of each image:
# In web dashboards, header is usually in top 15% (y: 0 to 150) and main title is below header (y: 80 to 220)
# Let's crop a banner strip for each image and save to reference_extracted/banners/

os.makedirs("reference_extracted/banners", exist_ok=True)

from create_contact_sheet import screen_map

for screen_num, screen_name, filename in screen_map:
    path = f"reference_extracted/embedded_images/{filename}"
    im = Image.open(path)
    w, h = im.size
    # Crop banner (x: 0 to w, y: 0 to min(h, 250))
    banner = im.crop((0, 0, w, min(h, 240)))
    banner.save(f"reference_extracted/banners/{screen_num:02d}_{filename[:15]}.png")

print("Cropped banner strips for all 25 images.")

