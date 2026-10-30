import sys

full_spec = []
for i in range(15, 28):
    p = f"reference_extracted/text/page_{i:02d}.txt"
    try:
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()
            full_spec.append(f"\n==================== PAGE {i} ====================\n" + content)
    except Exception as e:
        full_spec.append(f"\n==================== PAGE {i} ERROR ====================\n" + str(e))

with open("reference_extracted/spec_pages_15_to_27.txt", "w", encoding="utf-8") as out:
    out.write("\n".join(full_spec))

print("Saved reference_extracted/spec_pages_15_to_27.txt")

