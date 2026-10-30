import glob
import os

files = sorted(glob.glob("reference_extracted/ocr/*.txt"))

def get_title(text):
    for line in text.splitlines():
        line = line.strip()
        # Find lines with Dashboard > or Home > or main titles
        if "Dashboard >" in line or "Home >" in line:
            return line
    return None

def get_h1(text):
    for line in text.splitlines():
        line = line.strip()
        if any(h in line for h in [
            "Welcome to SATYA-APAAR", "Choose Your Role", "Select Your Role",
            "Institution Dashboard", "Data Upload & Mapping", "Preflight Validation",
            "Aggregate Reconciliation", "Student Records", "SeatGuard", "Submission Tracking",
            "AICTE Central Dashboard", "Institution Explorer", "Review Queue",
            "Review Case Workspace", "Integrity Intelligence", "Policy & Approved Intake",
            "RecordTrust Audit Centre", "Reports & Analytics", "Authorised Verifier Dashboard",
            "ConsentPass", "System Administration", "Integration & System Health",
            "One Student. One Academic Identity", "Our Core Features", "Resources"
        ]):
            return line
    return "Not found"

for idx, f in enumerate(files):
    name = os.path.basename(f)
    with open(f, "r", encoding="utf-8-sig") as fp:
        t = fp.read()
    print(f"[{idx+1:02d}] {name} => Breadcrumb: {get_title(t)} | Title match: {get_h1(t)}")

