import glob
import os

files = sorted(glob.glob("reference_extracted/ocr/*.txt"))

for idx, f in enumerate(files):
    name = os.path.basename(f)
    with open(f, "r", encoding="utf-8-sig") as fp:
        text = fp.read()
    
    # Look for the primary breadcrumb or title
    # Dashboard > ... or Home > ...
    crumbs = []
    for line in text.splitlines():
        if ">" in line:
            crumbs.append(line.strip())
            
    # Also find major headings
    first_chunk = text[:1500]
    print(f"[{idx+1:02d}] {name}:")
    if crumbs:
        print(f"    Breadcrumb: {crumbs[0]}")
    # Print lines that look like main page header (e.g., words followed by description)
    print(f"    Excerpt: {first_chunk[150:400].strip()}\n")

