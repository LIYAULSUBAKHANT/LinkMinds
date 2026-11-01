import os, re

# 1. Update AuthenticatedHeader.tsx
auth_path = 'src/components/layout/AuthenticatedHeader.tsx'
with open(auth_path, 'r', encoding='utf-8') as f:
    c = f.read()

if 'import { BrandLogo }' not in c:
    c = c.replace("import { UserRole } from '../../types';", "import { UserRole } from '../../types';\nimport { BrandLogo } from '../ui/BrandLogo';")

new_logo = '''      {/* Left: Brand Identity & Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <BrandLogo size="sm" subtitle="Admission Trust & Verification Portal" to="/dashboard" />
      </div>'''

# Replace the old logo block
c = re.sub(
    r'\{\s*/\*\s*Left: Brand Identity.*?\*/\s*\}\s*<div style=\{\{\s*display:\s*[\'"]flex[\'"].*?</div>\s*</Link>\s*</div>',
    new_logo,
    c,
    flags=re.DOTALL
)

with open(auth_path, 'w', encoding='utf-8') as f:
    f.write(c)
print('Updated AuthenticatedHeader.tsx')

# 2. Update Footer.tsx
footer_path = 'src/components/layout/Footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    fc = f.read()

if 'import { BrandLogo }' not in fc:
    fc = fc.replace("import { Mail, Phone, MapPin, ExternalLink, Shield } from 'lucide-react';", "import { Mail, Phone, MapPin, ExternalLink, Shield } from 'lucide-react';\nimport { BrandLogo } from '../ui/BrandLogo';")

# In column 1, replace SATYA-APAAR plain text with BrandLogo
old_col1_header = re.compile(r'<div style=\{\{\s*display:\s*[\'"]flex[\'"],\s*alignItems:\s*[\'"]center[\'"],\s*gap:\s*[\'"]8px[\'"].*?</span>\s*</div>', re.DOTALL)
new_col1_header = '<div style={{ marginBottom: "16px" }}><BrandLogo variant="dark" size="sm" subtitle="Student Admission Trust & Yield Assurance" to="/" /></div>'
fc = old_col1_header.sub(new_col1_header, fc)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(fc)
print('Updated Footer.tsx')

# 3. Update LoginPage.tsx
login_path = 'src/pages/auth/LoginPage.tsx'
with open(login_path, 'r', encoding='utf-8') as f:
    lc = f.read()

# Replace govt_aicte_brand.png in SSO button
lc = re.sub(
    r'<img\s+src=[\'"]/assets/logos/govt_aicte_brand\.png[\'"].*?/>',
    '<ShieldCheck size={16} color="#155eef" />',
    lc
)

# Enhance left pane in LoginPage to use BrandLogo and rich trust card
if 'import { BrandLogo }' not in lc:
    lc = lc.replace("import { \n  ShieldCheck, Lock, Mail", "import { BrandLogo } from '../../components/ui/BrandLogo';\nimport { \n  ShieldCheck, Lock, Mail")
    if 'import { BrandLogo }' not in lc:
        lc = "import { BrandLogo } from '../../components/ui/BrandLogo';\n" + lc

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(lc)
print('Updated LoginPage.tsx')

# 4. Update RoleBasedSidebar.tsx sticky top alignment
sidebar_path = 'src/components/layout/RoleBasedSidebar.tsx'
with open(sidebar_path, 'r', encoding='utf-8') as f:
    sc = f.read()

# Fix top and height to match GovernmentUtilityBar (34px) + AuthenticatedHeader (62px) = 96px
sc = sc.replace("height: 'calc(100vh - 62px)',", "height: 'calc(100vh - 96px)',")
sc = sc.replace("top: '62px',", "top: '96px',")

with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(sc)
print('Updated RoleBasedSidebar.tsx')
