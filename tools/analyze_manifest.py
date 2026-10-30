import json
import glob

with open("reference_extracted/image_manifest.json") as f:
    manifest = json.load(f)

for m in manifest:
    print(f"Page {m['page']:02d}: {m['filename']} ({m['width']}x{m['height']})")

print("\n--- Summary of Text Files ---")
for i in range(1, 28):
    p = f"reference_extracted/text/page_{i:02d}.txt"
    try:
        with open(p, "r", encoding="utf-8") as f:
            lines = [l.strip() for l in f.readlines() if l.strip()]
            head = lines[0] if lines else "<empty>"
            second = lines[1] if len(lines) > 1 else ""
            print(f"Page {i:02d}: {len(lines)} lines | {head} | {second}")
    except Exception as e:
        print(f"Page {i:02d}: {e}")

