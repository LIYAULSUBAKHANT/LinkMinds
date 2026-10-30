import glob
import os
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob("reference_extracted/ocr/*.txt"))
print(f"Total OCR files: {len(files)}")

results = []

for f in files:
    name = os.path.basename(f)
    with open(f, "r", encoding="utf-8-sig") as fp:
        lines = [line.strip() for line in fp.readlines() if line.strip()]
        # The OCR result text from PowerShell Out-File has lines joined or in array
        full_text = " ".join(lines)
        results.append((name, len(lines), full_text))
        print(f"{name}: {len(lines)} lines | {full_text[:120]}")

with open("reference_extracted/ocr_summary.txt", "w", encoding="utf-8") as out:
    for name, line_count, text in results:
        out.write(f"=== {name} ({line_count} lines) ===\n{text}\n\n")

print("Saved reference_extracted/ocr_summary.txt")
