import glob
import os
import re

files = sorted(glob.glob("reference_extracted/ocr/*.txt"))

screen_info = []

for f in files:
    name = os.path.basename(f)
    with open(f, "r", encoding="utf-8-sig") as fp:
        text = fp.read()
        
    # Search for characteristic titles or words
    # Screen detection heuristics
    detected = "Unknown"
    if "One Student" in text or "Every Admission Traceable" in text or "Platform at a Glance" in text:
        detected = "Page 01 - Home"
    elif "About SATYA-APAAR 2.1" in text or "Problem Statement" in text and "Vision" in text and "About Us" in text:
        detected = "Page 02 - About Us"
    elif "Our Core Features" in text or "AI-Powered Data Validation" in text or "Aggregate-to-Student Reconciliation" in text:
        detected = "Page 03 - Features"
    elif "Resources" in text and ("Guidelines for Institutions" in text or "Templates for Data Submission" in text):
        detected = "Page 04 - Resources"
    elif "Welcome to SATYA-APAAR 2.1" in text and "Sign In" in text:
        detected = "Page 05 - Login / Register"
    elif "Choose Your Role" in text or "Select Your Role" in text and "Institution Operator" in text:
        detected = "Page 06 - Role Selection"
    elif "Institution Registration" in text:
        detected = "Page 07 - Institution Registration"
    elif "Institution Dashboard" in text or "Recent Submissions" in text and "Total Records Submitted" in text:
        detected = "Page 08 - Institution Dashboard"
    elif "Data Upload & Mapping" in text or "Column Mapping" in text or "Upload File" in text:
        detected = "Page 09 - Data Upload & Mapping"
    elif "Validation Results" in text or "Preflight Validation" in text or "Valid Records" in text and "Errors" in text:
        detected = "Page 10 - Preflight Validation Results"
    elif "Aggregate Reconciliation" in text or "Reconciliation Status" in text and "Variance" in text:
        detected = "Page 11 - Aggregate Reconciliation"
    elif "Student Records & Search" in text or "Student Records" in text and ("APAAR ID" in text or "Search by Name" in text):
        detected = "Page 12 - Student Records & Search"
    elif "TEIE" in text or "Enrolment Timeline" in text:
        detected = "Page 13 - TEIE Enrolment Timeline"
    elif "APAAR Identity Resolution" in text or "Identity Resolver" in text:
        detected = "Page 14 - APAAR Identity Resolution"
    elif "SeatGuard" in text or "Seat Ledger" in text:
        detected = "Page 15 - SeatGuard - Seat Ledger"
    elif "Submission Tracking" in text or "Track Submissions" in text:
        detected = "Page 16 - Submission Tracking"
    elif "AICTE Central Dashboard" in text or "National Overview" in text or "Institution Coverage" in text:
        detected = "Page 17 - AICTE Central Dashboard"
    elif "Institution Explorer" in text or "Explore Institutions" in text:
        detected = "Page 18 - Institution Explorer"
    elif "Review Queue" in text or "AICTE Review Queue" in text:
        detected = "Page 19 - AICTE Review Queue"
    elif "Review Case Workspace" in text or "Case Details" in text or "Case #" in text:
        detected = "Page 20 - Review Case Workspace"
    elif "Integrity Intelligence" in text or "AI Risk Analysis" in text or "Risk Score" in text:
        detected = "Page 21 - Integrity Intelligence (AI)"
    elif "Policy & Approved Intake Master" in text or "Policy Master" in text or "Approved Intake" in text and "Category Allocation" in text:
        detected = "Page 22 - Policy & Approved Intake Master"
    elif "RecordTrust" in text or "Audit Centre" in text or "Hash Chain" in text:
        detected = "Page 23 - RecordTrust Audit Centre"
    elif "Reports & Analytics" in text or "Analytics & Reports" in text:
        detected = "Page 24 - Reports & Analytics"
    elif "Authorised Verifier Dashboard" in text or "Verifier Dashboard" in text:
        detected = "Page 25 - Authorised Verifier Dashboard"
    elif "ConsentPass" in text or "Credential Issuance" in text:
        detected = "Page 26 - ConsentPass - Credential Issuance & Verification"
    elif "System Administration" in text or "User Management & Roles" in text:
        detected = "Page 27 - System Administration"
    elif "Integration & System Health" in text or "API Request Logs" in text:
        detected = "Page 28 - Integration & System Health"
    elif "Notifications & Settings" in text:
        detected = "Page 29 - Notifications & Settings"
        
    screen_info.append((name, detected, text))

for name, det, text in screen_info:
    print(f"{name} -> {det}")

