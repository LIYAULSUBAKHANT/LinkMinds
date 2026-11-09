import React from 'react';
import { Database, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';

interface Partner {
  name: string;
  category: 'National Infrastructure' | 'Apex Institute' | 'Verification Node';
  acronym: string;
}

const PARTNERS: Partner[] = [
  { name: 'Automated Permanent Academic Account Registry', category: 'National Infrastructure', acronym: 'APAAR' },
  { name: 'DigiLocker Digital Credentials', category: 'National Infrastructure', acronym: 'DigiLocker' },
  { name: 'Academic Bank of Credits', category: 'National Infrastructure', acronym: 'ABC Portal' },
  { name: 'Bannari Amman Institute of Tech (BIT)', category: 'Apex Institute', acronym: 'BIT Sathy' },
  { name: 'Indian Institute of Technology Madras', category: 'Apex Institute', acronym: 'IIT Madras' },
  { name: 'National Institute of Technology Tiruchirappalli', category: 'Apex Institute', acronym: 'NIT Trichy' },
  { name: 'National Academic Depository', category: 'National Infrastructure', acronym: 'NAD' },
  { name: 'COEP Technological University', category: 'Apex Institute', acronym: 'COEP Pune' },
  { name: 'BMS College of Engineering', category: 'Apex Institute', acronym: 'BMS Bengaluru' },
  { name: 'RV College of Engineering', category: 'Apex Institute', acronym: 'RVCE' },
  { name: 'Samarth eGov Technical Framework', category: 'Verification Node', acronym: 'Samarth' },
  { name: 'National Council for Vocational Education', category: 'National Infrastructure', acronym: 'NCVET' },
];

export const EcosystemMarquee: React.FC = () => {
  const marqueePartners = [...PARTNERS, ...PARTNERS];

  return (
    <section style={{
      maxWidth: '1280px',
      margin: '0 auto 64px auto',
      padding: '0 24px',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '13px',
          fontWeight: 800,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '6px',
        }}>
          Supported Academic Ecosystem & Verification Network
        </h3>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
          Continuous integration with national digital registries, credential vaults, and accredited higher education institutions.
        </p>
      </div>

      {/* Outer Card with Marquee Track inside */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #dce5ef',
        padding: '24px 0',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Soft edge masking */}
        <div className="marquee-wrapper">
          <div className="marquee-track" style={{ gap: '16px', padding: '4px 0' }}>
            {marqueePartners.map((item, idx) => (
              <div
                key={`${item.acronym}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.borderColor = '#93c5fd';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#155eef',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                  {item.category === 'Apex Institute' ? (
                    <Building2 size={16} color="#155eef" />
                  ) : item.category === 'National Infrastructure' ? (
                    <Database size={16} color="#0d9488" />
                  ) : (
                    <ShieldCheck size={16} color="#7c3aed" />
                  )}
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#001e46' }}>
                      {item.acronym}
                    </span>
                    <CheckCircle2 size={12} color="#16a34a" />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

