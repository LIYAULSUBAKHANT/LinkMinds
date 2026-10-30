from PIL import Image

def sample_point(im_path, x, y):
    im = Image.open(im_path)
    rgb = im.getpixel((x, y))[:3]
    return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"

print("Sampled Colors:")
# Header utility bar
print("Header Utility Bar (Home):", sample_point("reference_extracted/embedded_images/img_p01_01_xref5.png", 50, 10))
# Hero background navy
print("Hero Navy (Home):", sample_point("reference_extracted/embedded_images/img_p01_01_xref5.png", 200, 200))
# Sidebar background (Dashboard)
print("Sidebar Navy (Dashboard):", sample_point("reference_extracted/embedded_images/img_p06_01_xref22.png", 50, 300))
# Page canvas background (Dashboard)
print("Canvas background (Dashboard):", sample_point("reference_extracted/embedded_images/img_p06_01_xref22.png", 400, 300))
# Card background (Dashboard)
print("Card background (Dashboard):", sample_point("reference_extracted/embedded_images/img_p06_01_xref22.png", 350, 250))

