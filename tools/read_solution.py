with open("reference_extracted/solution_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

print("Length of solution text:", len(text))
print("First 2000 chars:\n")
print(text[:2000])

