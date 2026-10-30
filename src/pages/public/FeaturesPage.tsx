import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileSpreadsheet, GitCompare, Clock, ShieldCheck, 
  Fingerprint, Sparkles, FileLock, QrCode, ArrowRight, CheckCircle 
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: 'AI-Powered Data Validation',
      desc: 'Smart data ingestion, fuzzy column mapping, and structural preflight validation to ensure high-quality institutional data submissions with zero schema friction.',
      details: 'Evaluates formats, detects missing required fields, flags malformed APAAR structures, and computes preflight quality scores before data enters the reconciliation pipeline.',
      icon: <FileSpreadsheet size={24} color="#155eef" />,
      link: '/institution/submissions/upload',
      color: '#155eef'
    },
    {
      id: 2,
      title: 'Aggregate-to-Student Reconciliation',
      desc: 'Compares reported aggregate enrolment figures against validated student-level records to surface variances, missing identities, and count mismatches.',
      details: 'Identifies discrepancy scopes down to the specific programme and category. Provides an authorised explanation workflow without inventing fake student identities.',
      icon: <GitCompare size={24} color="#16a34a" />,
      link: '/institution/reconciliation',
      color: '#16a34a'
    },
    {
      id: 3,
      title: 'Temporal Enrolment Integrity (TEIE)',
      desc: 'Time-aware enrolment episode tracking that classifies admissions, sequential transfers, and prolonged overlapping enrolments across multiple institutions.',
      details: 'Distinguishes between valid lateral transfers supported by exit evidence and suspicious multi-institution enrolments that require human regulatory review.',
      icon: <Clock size={24} color="#f59e0b" />,
      link: '/institution/students',
      color: '#f59e0b'
    },
    {
      id: 4,
      title: 'SeatGuard',
      desc: 'Real-time approved seat ledger that enforces AICTE sanctioned intake quotas, separate supernumerary pools, and category-wise utilisation limits.',
      details: 'Tracks active admissions against versioned AICTE policy master tables. Prevents over-admission and generates alerts when institutions approach or breach intake ceilings.',
      icon: <ShieldCheck size={24} color="#0284c7" />,
      link: '/institution/seatguard',
      color: '#0284c7'
    },
    {
      id: 5,
      title: 'APAAR Identity Resolver',
      desc: 'Validates and matches student identities using APAAR registry integration with privacy-preserving matching and structured exception handling.',
      details: 'Features structural Luhn format checking, Fellegi-Sunter candidate matching, and exception workflows for foreign national students and supernumerary candidates.',
      icon: <Fingerprint size={24} color="#8b5cf6" />,
      link: '/institution/identity',
      color: '#8b5cf6'
    },
    {
      id: 6,
      title: 'AI-Assisted Review',
      desc: 'Case workspace for AICTE regulatory officers to inspect flagged discrepancies, examine evidence documents, and record auditable decisions.',
      details: 'Supports Approve, Reject, Return for Correction, and Escalate actions with mandatory justification recording. No single-click permanent adverse actions.',
      icon: <Sparkles size={24} color="#ec4899" />,
      link: '/aicte/review-queue',
      color: '#ec4899'
    },
    {
      id: 7,
      title: 'RecordTrust Audit Centre',
      desc: 'Tamper-evident audit logging using cryptographic SHA-256 hash chains to ensure every submission, review decision, and policy edit is permanently auditable.',
      details: 'Enables browser-side hash-chain verification to validate that no historical records have been modified or deleted. Tamper-evident, reproducible assurance.',
      icon: <FileLock size={24} color="#059669" />,
      link: '/aicte/audit',
      color: '#059669'
    },
    {
      id: 8,
      title: 'ConsentPass Credential & Verification',
      desc: 'Privacy-preserving credential issuance and instant QR verification for employers, universities, and background checking agencies.',
      details: 'Encodes opaque synthetic verification tokens into scannable QR codes without revealing raw APAAR numbers or personal identity data.',
      icon: <QrCode size={24} color="#ea580c" />,
      link: '/verifier/consentpass',
      color: '#ea580c'
    }
  ];

  return (
    <div>
      {/* Banner / Hero */}
      <section style={{
        backgroundColor: '#001e46',
        color: '#ffffff',
        padding: '36px 24px',
        borderBottom: '3px solid #155eef',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '8px', opacity: 0.85 }}>
            <span style={{ fontSize: '12px', color: '#93c5fd' }}>Home &gt; Features</span>
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff' }}>Our Core Features</h1>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '6px', maxWidth: '720px' }}>
            A unified platform for verified admissions, academic identity resolution and trusted seat management across AICTE-approved institutions.
          </p>
        </div>
      </section>

      {/* 8 Feature Cards Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 64px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {features.map((feat) => (
            <div
              key={feat.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #dce5ef',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = feat.color;
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#dce5ef';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: `${feat.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {feat.icon}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46' }}>
                {feat.title}
              </h3>

              <p style={{ fontSize: '13px', color: '#475467', lineHeight: 1.6 }}>
                {feat.desc}
              </p>

              <div style={{
                backgroundColor: '#f8fafc',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                color: '#64748b',
                lineHeight: 1.5,
              }}>
                {feat.details}
              </div>

              <Link
                to={feat.link}
                style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: feat.color,
                  textDecoration: 'none',
                  paddingTop: '6px',
                }}
              >
                <span>Access Module</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

