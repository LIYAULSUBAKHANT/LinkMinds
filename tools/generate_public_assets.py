import os
from PIL import Image

os.makedirs("public/assets", exist_ok=True)
os.makedirs("public/assets/logos", exist_ok=True)
os.makedirs("public/assets/hero", exist_ok=True)
os.makedirs("public/assets/ecosystem", exist_ok=True)

# 1. From Page 01 Home: img_p01_01_xref5.png (1024x1536)
im_home = Image.open("reference_extracted/embedded_images/img_p01_01_xref5.png")

# Ministry + AICTE branding from header (x: 18, y: 38 to x: 420, y: 84)
im_home.crop((18, 38, 420, 84)).save("public/assets/logos/govt_aicte_brand.png")
# Just the National Emblem + Ministry of Education
im_home.crop((18, 38, 220, 84)).save("public/assets/logos/ministry_education_emblem.png")
# Just AICTE logo
im_home.crop((230, 38, 420, 84)).save("public/assets/logos/aicte_logo.png")

# Hero student image
im_home.crop((560, 95, 1010, 470)).save("public/assets/hero/hero_student.png")

# Supported ecosystem strip
im_home.crop((20, 920, 1004, 1030)).save("public/assets/ecosystem/ecosystem_strip.png")

# 2. From Page 02 About Us: img_p02_01_xref9.png (1024x1536)
im_about = Image.open("reference_extracted/embedded_images/img_p02_01_xref9.png")
# Campus photo: x: 50 to 970, y: 130 to 360
im_about.crop((50, 130, 970, 360)).save("public/assets/hero/campus_about.png")

# 3. From Page 05 Login: img_p05_01_xref18.png (1536x1024)
im_login = Image.open("reference_extracted/embedded_images/img_p05_01_xref18.png")
# Campus photo on left of login card: x: 40, y: 110 to x: 740, y: 940
im_login.crop((40, 110, 740, 940)).save("public/assets/hero/login_campus.png")
# SATYA-APAAR Logo / Wordmark from login
im_login.crop((40, 35, 450, 95)).save("public/assets/logos/satya_apaar_wordmark.png")

print("Generated clean local assets in public/assets/")

