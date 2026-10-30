import glob
import os

files = sorted(glob.glob("reference_extracted/ocr/*.txt"))

for f in files:
    name = os.path.basename(f)
    with open(f, "r", encoding="utf-8-sig") as fp:
        lines = [l.strip() for l in fp.readlines() if l.strip()]
        text = " ".join(lines)
        
    print(f"=== {name} ===")
    # Print lines that look like page titles or breadcrumbs
    for line in lines:
        if any(keyword in line.lower() for keyword in ["dashboard", "upload", "validation", "reconciliation", "student", "timeline", "seat", "tracking", "explorer", "queue", "case", "workspace", "integrity", "policy", "intake", "audit", "recordtrust", "report", "verifier", "consentpass", "system", "health", "notification"]):
            print(f"   MATCH: {line}")
    print()

