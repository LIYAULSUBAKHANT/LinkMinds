with open("reference_extracted/solution_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

pages = text.split("--- PAGE ")
for p in pages[1:]:
    lines = [l.strip() for l in p.split("\n") if l.strip()]
    header = lines[0] if len(lines) > 0 else ""
    sub = lines[1:4]
    print(f"Page {header[:30]} | {sub}")

