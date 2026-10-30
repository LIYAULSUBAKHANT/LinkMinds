for fname in ["img_p06_02_xref23.txt", "img_p08_01_xref30.txt", "img_p12_02_xref47.txt"]:
    with open(f"reference_extracted/ocr/{fname}", "r", encoding="utf-8-sig") as f:
        t = f.read()
        print(f"=== {fname} ===")
        print(t[:500])
        print("\n")

