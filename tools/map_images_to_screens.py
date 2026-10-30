import glob
import os
import re

files = sorted(glob.glob("reference_extracted/ocr/*.txt"))

def parse_screen(filename, text):
    # Check for known titles
    t = text.lower()
    
    # Check breadcrumb: "dashboard > something" or "home > something"
    m_crumb = re.search(r'(dashboard\s*>\s*[^A-Z\n]{2,30}|home\s*>\s*[^A-Z\n]{2,30})', t)
    
    screens = [
        (1, "Page 01 - Home", "one student. one academic identity"),
        (2, "Page 02 - About Us", "about us"),
        (3, "Page 03 - Features", "our core features"),
        (4, "Page 04 - Resources", "guidelines, templates, documentation"),
        (5, "Page 05 - Login / Register", "welcome to satya-apaar 2.1"),
        (6, "Page 06 - Role Selection", "choose your role"),
        (8, "Page 08 - Institution Dashboard", "institution dashboard"),
        (9, "Page 09 - Data Upload & Mapping", "data upload & mapping"),
        (10, "Page 10 - Preflight Validation Results", "validation results"),
        (11, "Page 11 - Aggregate Reconciliation", "aggregate reconciliation"),
        (12, "Page 12 - Student Records & Search", "student records & search"),
        (15, "Page 15 - SeatGuard - Seat Ledger", "seatguard - seat ledger"),
        (16, "Page 16 - Submission Tracking", "submission tracking"),
        (17, "Page 17 - AICTE Central Dashboard", "aicte central dashboard"),
        (18, "Page 18 - Institution Explorer", "institution explorer"),
        (19, "Page 19 - AICTE Review Queue", "aicte review queue"),
        (20, "Page 20 - Review Case Workspace", "review case workspace"),
        (21, "Page 21 - Integrity Intelligence (AI)", "integrity intelligence"),
        (22, "Page 22 - Policy & Approved Intake Master", "policy & approved intake master"),
        (23, "Page 23 - RecordTrust Audit Centre", "recordtrust - audit centre"),
        (24, "Page 24 - Reports & Analytics", "reports & analytics"),
        (25, "Page 25 - Authorised Verifier Dashboard", "authorised verifier dashboard"),
        (26, "Page 26 - ConsentPass - Credential Issuance & Verification", "consentpass - credential issuance"),
        (27, "Page 27 - System Administration", "system administration"),
        (28, "Page 28 - Integration & System Health", "integration & system health")
    ]
    
    matched = []
    for s_num, s_name, phrase in screens:
        if phrase in t:
            matched.append((s_num, s_name))
            
    return matched

print("Image to Screen Matching:")
for idx, f in enumerate(files):
    name = os.path.basename(f)
    with open(f, "r", encoding="utf-8-sig") as fp:
        t = fp.read()
    matches = parse_screen(name, t)
    print(f"[{idx+1:02d}] {name}: {[m[1] for m in matches]}")

