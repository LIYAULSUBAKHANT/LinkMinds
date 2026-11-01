with open('src/pages/auth/LoginPage.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Add missing Lucide icons
c = c.replace(
    "import { \n  Eye, EyeOff, ShieldCheck, Building2, UserCheck, \n  Settings, Key, AlertCircle, Info, ExternalLink, ArrowRight \n} from 'lucide-react';",
    "import { \n  Eye, EyeOff, ShieldCheck, Building2, UserCheck, \n  Settings, Key, AlertCircle, Info, ExternalLink, ArrowRight, \n  CheckCircle2, GitCompare, ShieldAlert, Database \n} from 'lucide-react';"
)

old_pane = """          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                SATYA-APAAR
              </span>
              
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '24px' }}>
              Student Admission Trust & Yield Assurance for AICTE-approved institutions across India.
            </p>

            <img
              src="/assets/hero/login_campus.png"
              alt="AICTE Approved Institution Campus"
              style={{
                width: '100%',
                maxHeight: '260px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                marginBottom: '20px',
              }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '12px',
              color: '#cbd5e1',
              lineHeight: 1.5,
            }}>
              <div style={{ fontWeight: 700, color: '#fde68a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#f59e0b" />
                <span>Secure Government Portal</span>
              </div>
              This is a secure government verification portal. All submissions are timestamped and cryptographically logged.
            </div>
          </div>"""

new_pane = """          <div>
            <div style={{ marginBottom: '20px' }}>
              <BrandLogo variant="dark" size="md" subtitle="Institutional Verification Portal" to="/" />
            </div>

            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '24px' }}>
              National admission reconciliation, identity assurance, and seat governance platform for approved technical institutions.
            </p>

            {/* 4 Architecture Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '26px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <CheckCircle2 size={16} color="#34d399" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>APAAR Identity Validation</div>
                  <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.4 }}>12-digit lifelong academic ID resolution & demographic validation.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <GitCompare size={16} color="#60a5fa" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Aggregate Reconciliation</div>
                  <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.4 }}>Automated discrepancy detection between counts and student rosters.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <ShieldAlert size={16} color="#fbbf24" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>TEIE™ Collision Protection</div>
                  <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.4 }}>Temporal detection of concurrent multi-institution enrolments.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Database size={16} color="#c084fc" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>RecordTrust™ Ledger</div>
                  <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.4 }}>Cryptographically chained, tamper-evident SHA-256 audit trail.</div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '12px 14px',
              fontSize: '12px',
              color: '#cbd5e1',
              lineHeight: 1.5,
            }}>
              <div style={{ fontWeight: 700, color: '#fde68a', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#f59e0b" />
                <span>Protected Enterprise Gateway</span>
              </div>
              All submission transactions and role authorizations are cryptographically anchored and audited.
            </div>
          </div>"""

import re
c = re.sub(
    r'\{\s*/\*\s*Left Side: Campus Photo.*?\*/\s*\}\s*<div.*?className="login-left-pane">.*?<div style=\{\{\s*marginTop:\s*[\'"]24px[\'"].*?</div>\s*</div>',
    '''        {/* Left Side: Modern Trust Architecture & Brand */}
        <div style={{
          backgroundColor: '#001e46',
          color: '#ffffff',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }} className="login-left-pane">
''' + new_pane + '''
          <div style={{ marginTop: '24px', fontSize: '11px', color: '#94a3b8' }}>
            Smart India Hackathon 2026 | AICTE SIH26263
          </div>
        </div>''',
    c,
    flags=re.DOTALL
)

with open('src/pages/auth/LoginPage.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('Updated LoginPage.tsx left pane successfully')
