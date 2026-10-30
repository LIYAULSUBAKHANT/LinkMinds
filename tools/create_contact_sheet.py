import json
import os

with open("reference_extracted/image_manifest.json") as f:
    manifest = json.load(f)

# Screen names in order
screen_map = [
    (1, "01 Home", "img_p01_01_xref5.png"),
    (2, "02 About Us", "img_p02_01_xref9.png"),
    (3, "03 Features", "img_p03_01_xref12.png"),
    (4, "04 Resources", "img_p04_01_xref15.png"),
    (5, "05 Login / Register", "img_p05_01_xref18.png"),
    (6, "06 Role Selection", "img_p05_02_xref19.png"),
    (8, "08 Institution Dashboard", "img_p06_01_xref22.png"),
    (9, "09 Data Upload & Mapping", "img_p06_02_xref23.png"),
    (10, "10 Preflight Validation Results", "img_p07_01_xref26.png"),
    (11, "11 Aggregate Reconciliation", "img_p07_02_xref27.png"),
    (12, "12 Student Records & Search", "img_p08_01_xref30.png"),
    (15, "15 SeatGuard - Seat Ledger", "img_p08_02_xref31.png"),
    (16, "16 Submission Tracking", "img_p09_01_xref34.png"),
    (17, "17 AICTE Central Dashboard", "img_p09_02_xref35.png"),
    (18, "18 Institution Explorer", "img_p10_01_xref38.png"),
    (19, "19 AICTE Review Queue", "img_p10_02_xref39.png"),
    (20, "20 Review Case Workspace", "img_p11_01_xref42.png"),
    (21, "21 Integrity Intelligence (AI)", "img_p11_02_xref43.png"),
    (22, "22 Policy & Approved Intake Master", "img_p12_01_xref46.png"),
    (23, "23 RecordTrust Audit Centre", "img_p12_02_xref47.png"),
    (24, "24 Reports & Analytics", "img_p13_01_xref50.png"),
    (25, "25 Authorised Verifier Dashboard", "img_p13_02_xref51.png"),
    (26, "26 ConsentPass - Credential Issuance & Verification", "img_p14_01_xref54.png"),
    (27, "27 System Administration", "img_p14_02_xref55.png"),
    (28, "28 Integration & System Health", "img_p15_01_xref59.png"),
]

html = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>SATYA-APAAR 2.1 — Reference Contact Sheet</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b132b; color: #fff; margin: 0; padding: 20px; }
h1 { text-align: center; color: #48cae4; }
.missing-box { background: #1c2541; border: 2px dashed #f59e0b; padding: 15px; border-radius: 8px; margin: 15px 0; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 20px; }
.card { background: #1c2541; border-radius: 8px; overflow: hidden; border: 1px solid #3a506b; }
.card-header { padding: 10px 15px; background: #001e46; font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
.card-body { padding: 10px; text-align: center; }
.card img { max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
.badge { background: #155eef; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px; }
.missing { background: #d97706; }
</style>
</head>
<body>
<h1>SATYA-APAAR 2.1 Visual Reference Contact Sheet (25 Screenshots + 4 Inferred)</h1>
<div class="missing-box">
<h3>Screens with No Dedicated Screenshot (To Be Inferred from Design System):</h3>
<ul>
<li><strong>Page 07:</strong> Institution Registration</li>
<li><strong>Page 13:</strong> TEIE Enrolment Timeline (reference explicitly noted as pending)</li>
<li><strong>Page 14:</strong> APAAR Identity Resolution</li>
<li><strong>Page 29:</strong> Notifications, User Management & Settings</li>
</ul>
</div>
<div class="grid">
"""

for screen_num, screen_name, filename in screen_map:
    path = f"embedded_images/{filename}"
    html += f"""
    <div class="card">
        <div class="card-header">
            <span>{screen_name}</span>
            <span class="badge">Screen {screen_num:02d}</span>
        </div>
        <div class="card-body">
            <a href="{path}" target="_blank">
                <img src="{path}" alt="{screen_name}" loading="lazy"/>
            </a>
            <div style="font-size: 12px; color: #94a3b8; margin-top: 6px;">{filename}</div>
        </div>
    </div>
    """

html += """
</div>
</body>
</html>
"""

with open("reference_extracted/contact_sheet.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Saved reference_extracted/contact_sheet.html")

