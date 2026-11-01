import re

# Update AboutPage.tsx
with open('src/pages/public/AboutPage.tsx', 'r', encoding='utf-8') as f:
    ac = f.read()

old_about_img = """          <div>
            <img
              src="/assets/hero/campus_about.png"
              alt="Indian Institute Campus"
              style={{
                width: '100%',
                maxHeight: '280px',
                objectFit: 'cover',
                borderRadius: '12px',
                border: '1px solid #dce5ef',
                boxShadow: 'var(--shadow-md)',
              }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>"""

new_about_img = """          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#001e46',
            border: '1px solid #dce5ef',
            boxShadow: 'var(--shadow-md)',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <img
              src="/assets/hero/campus_about.png"
              alt="Institution Campus"
              style={{
                width: '100%',
                height: '260px',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,30,70,0.94) 0%, rgba(0,30,70,0.4) 60%, transparent 100%)',
              padding: '20px 24px 16px 24px',
              color: '#ffffff',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fde68a' }}>
                National Admission Assurance Infrastructure
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                Bridging institutional autonomy with transparent verifiable accountability.
              </div>
            </div>
          </div>"""

if old_about_img in ac:
    ac = ac.replace(old_about_img, new_about_img)
    with open('src/pages/public/AboutPage.tsx', 'w', encoding='utf-8') as f:
        f.write(ac)
    print('Updated AboutPage.tsx')
else:
    print('AboutPage pattern not exact match, doing regex replacement')
    ac = re.sub(r'<div>\s*<img\s+src=[\'"]/assets/hero/campus_about\.png[\'"].*?</div>\s*</div>', new_about_img + '\n        </div>', ac, flags=re.DOTALL)
    with open('src/pages/public/AboutPage.tsx', 'w', encoding='utf-8') as f:
        f.write(ac)
    print('Updated AboutPage.tsx via regex')


# Update HomePage.tsx
with open('src/pages/public/HomePage.tsx', 'r', encoding='utf-8') as f:
    hc = f.read()

new_hero_visual = """          {/* Hero Right Visual: Student Identity & Trust Assurance Card */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 24px 48px rgba(0, 15, 45, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '460px',
              width: '100%',
              background: 'linear-gradient(145deg, #001e46 0%, #00122e 100%)',
              color: '#ffffff',
            }}>
              {/* Photo layer with gradient blend */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src="/assets/hero/hero_student.png"
                  alt="Student Academic Identity"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    opacity: 0.92,
                  }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,30,70,0.1) 0%, rgba(0,18,46,0.95) 100%)',
                }} />

                {/* Floating Verified Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#001e46',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                }}>
                  <CheckCircle2 size={14} color="#16a34a" />
                  <span>APAAR Verified</span>
                </div>
              </div>

              {/* Lower Card: Micro Credentials & Verification */}
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                      Priya R. Sharma
                    </div>
                    <div style={{ fontSize: '11px', color: '#93c5fd', fontFamily: 'monospace' }}>
                      APAAR-2026-8841-9021
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#34d399',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                  }}>
                    Active Enrolment
                  </div>
                </div>

                {/* Micro Metric Badges */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  padding: '12px 10px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '11px',
                  textAlign: 'center',
                }}>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: '10px' }}>Programme</div>
                    <div style={{ fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>B.Tech CSE</div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ color: '#94a3b8', fontSize: '10px' }}>Seat Quota</div>
                    <div style={{ fontWeight: 700, color: '#fde68a', marginTop: '2px' }}>Merit / State</div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: '10px' }}>Audit Proof</div>
                    <div style={{ fontWeight: 700, color: '#60a5fa', marginTop: '2px' }}>SHA-256 ✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>"""

hero_right_pattern = re.compile(
    r'\{\s*/\*\s*Hero Right Visual: Student Image.*?\*/\s*\}\s*<div.*?className="hero-grid">.*?<div style=\{\{\s*position:\s*[\'"]relative[\'"].*?</div>\s*</div>\s*</div>\s*</div>',
    re.DOTALL
)

hc = re.sub(
    r'\{\s*/\*\s*Hero Right Visual: Student Image.*?\*/\s*\}\s*<div style=\{\{\s*position:\s*[\'"]relative[\'"],\s*display:\s*[\'"]flex[\'"].*?</div>\s*</div>\s*</div>',
    new_hero_visual,
    hc,
    flags=re.DOTALL
)

with open('src/pages/public/HomePage.tsx', 'w', encoding='utf-8') as f:
    f.write(hc)
print('Updated HomePage.tsx hero visual')
