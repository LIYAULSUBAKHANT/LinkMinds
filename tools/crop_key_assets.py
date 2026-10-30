from PIL import Image
import os

os.makedirs("reference_extracted/crops", exist_ok=True)

# 1. On Home page img_p01_01_xref5.png (1024x1536)
im_home = Image.open("reference_extracted/embedded_images/img_p01_01_xref5.png")

# Let's crop the Ministry of Education & AICTE logo in header (approx x: 10 to 400, y: 35 to 85)
im_home.crop((15, 36, 420, 85)).save("reference_extracted/crops/header_logos.png")

# Let's crop the Hero image of student on right (approx x: 600 to 1000, y: 100 to 450)
im_home.crop((600, 100, 1000, 440)).save("reference_extracted/crops/hero_student.png")

# Let's crop the Supported Academic Ecosystem logos (approx y: 920 to 1050)
im_home.crop((20, 920, 1004, 1050)).save("reference_extracted/crops/ecosystem_logos.png")

# Let's crop individual ecosystem logos from the strip if possible
# Let's also check login page img_p05_01_xref18.png (1536x1024)
im_login = Image.open("reference_extracted/embedded_images/img_p05_01_xref18.png")
# Left side photo: x: 30 to 740, y: 100 to 950
im_login.crop((30, 100, 740, 950)).save("reference_extracted/crops/login_photo.png")

# Header logos on login:
im_login.crop((20, 30, 520, 95)).save("reference_extracted/crops/login_logos.png")

print("Cropped header logos, hero student, ecosystem logos, and login photo!")

