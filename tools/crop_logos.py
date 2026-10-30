from PIL import Image
import os

os.makedirs("reference_extracted/logos", exist_ok=True)

# Let's inspect the top header of Page 01 (Home) or Page 05 (Login) or Page 08 (Dashboard)
# In Page 01: Home (1024x1536):
im_home = Image.open("reference_extracted/embedded_images/img_p01_01_xref5.png")
# Let's crop the header row:
# Top utility bar is around y: 0 to 40
# Brand header is around y: 40 to 120
header = im_home.crop((0, 0, 1024, 140))
header.save("reference_extracted/logos/home_header.png")

# Let's crop the Ministry/Emblem logo area (x: 10 to 350, y: 40 to 120)
brand_area = im_home.crop((10, 35, 450, 115))
brand_area.save("reference_extracted/logos/brand_area.png")

# Let's also check Page 05 (Login): img_p05_01_xref18.png (1536x1024)
im_login = Image.open("reference_extracted/embedded_images/img_p05_01_xref18.png")
login_header = im_login.crop((0, 0, 1536, 120))
login_header.save("reference_extracted/logos/login_header.png")

login_brand = im_login.crop((15, 30, 480, 105))
login_brand.save("reference_extracted/logos/login_brand.png")

print("Cropped header and brand areas for inspection.")

