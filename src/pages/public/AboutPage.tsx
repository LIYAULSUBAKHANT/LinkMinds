import React from 'react';
import { BreadcrumbNavigation } from '../../components/layout/BreadcrumbNavigation';
import { Target, Compass, Award, ShieldCheck, CheckCircle2, Building, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
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
            <span style={{ fontSize: '12px', color: '#93c5fd' }}>Home &gt; About Us</span>
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff' }}>About SATYA-APAAR 2.1</h1>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '6px', maxWidth: '720px' }}>
            A Transparent and Trusted Higher Education Ecosystem for AICTE-approved institutions across India.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px 64px 24px' }}>
        {/* Top Split: Intro & Campus Photography */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          marginBottom: '52px',
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#155eef', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Executive Overview
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46', marginTop: '4px', marginBottom: '16px' }}>
              Pioneering Academic Identity Assurance
            </h2>
            <p style={{ fontSize: '14px', color: '#475467', lineHeight: 1.7, marginBottom: '14px' }}>
              SATYA-APAAR 2.1 (Student Admission Trust & Yield Assurance) is an AI-assisted, auditable platform designed to reconcile institutional admission submissions with individual student records across AICTE-approved institutions.
            </p>
            <p style={{ fontSize: '14px', color: '#475467', lineHeight: 1.7 }}>
              By connecting with APAAR (Automated Permanent Academic Account Registry) and implementing temporal enrolment integrity (TEIE), the platform verifies every admission, monitors approved seat quotas, and prevents ghost batches or duplicate enrolments.
            </p>
          </div>

          <div>
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
          </div>
        </div>

        {/* Problem Statement Card */}
        <div style={{
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '10px',
          padding: '24px',
          marginBottom: '48px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#92400e', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#b45309" />
            <span>Problem Statement (SIH26263)</span>
          </h3>
          <p style={{ fontSize: '13.5px', color: '#78350f', lineHeight: 1.6 }}>
            Student admission data in Indian technical higher education is often fragmented, recorded across disparate institutional ERPs, and difficult to verify nationally in real time. This leads to issues such as unaccounted seat utilization, potential duplicate admissions across states, prolonged manual verification delays, and limited auditability for regulatory bodies. SATYA-APAAR 2.1 solves this by transforming institution-reported data into reconciled, time-aware, and cryptographically auditable records.
          </p>
        </div>

        {/* Vision, Mission, Objectives Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '52px',
        }}>
          {/* Vision */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #dce5ef',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
            borderTop: '4px solid #155eef',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Compass size={22} color="#155eef" />
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46' }}>Our Vision</h3>
            </div>
            <p style={{ fontSize: '13.5px', color: '#475467', lineHeight: 1.6 }}>
              A transparent, trusted, and technology-driven higher education ecosystem where every student’s admission is verifiable, every approved seat is accounted for, and data integrity is maintained across all AICTE-approved institutions nationwide.
            </p>
          </div>

          {/* Mission */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #dce5ef',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
            borderTop: '4px solid #16a34a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Target size={22} color="#16a34a" />
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46' }}>Our Mission</h3>
            </div>
            <ul style={{ fontSize: '13px', color: '#475467', lineHeight: 1.6, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Reconcile institutional admission data with student-level records.</li>
              <li>Ensure verifiable academic identities through APAAR.</li>
              <li>Enable transparent seat monitoring and quota compliance.</li>
              <li>Leverage AI and data analytics for integrity without bias.</li>
              <li>Build a secure, interoperable and auditable platform.</li>
            </ul>
          </div>

          {/* Objectives */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #dce5ef',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
            borderTop: '4px solid #f59e0b',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <ShieldCheck size={22} color="#f59e0b" />
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46' }}>Core Objectives</h3>
            </div>
            <ul style={{ fontSize: '13px', color: '#475467', lineHeight: 1.6, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Verify and validate student identities using APAAR.</li>
              <li>Reconcile aggregate counts against individual admissions.</li>
              <li>Detect and flag temporal anomalies using TEIE rules.</li>
              <li>Provide evidence-based insights and reports for AICTE.</li>
              <li>Guarantee cryptographic immutability using RecordTrust.</li>
            </ul>
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#001e46', textAlign: 'center', marginBottom: '24px' }}>
            Key Platform Benefits
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}>
            {[
              {
                title: 'Transparency',
                desc: 'Complete visibility of student admissions and approved seat utilization across all regions.',
                color: '#155eef',
              },
              {
                title: 'Accountability',
                desc: 'Policy-based seat monitoring, strict intake caps, and verified supernumerary quotas.',
                color: '#16a34a',
              },
              {
                title: 'Integrity',
                desc: 'Evidence-driven decisions, temporal consistency checks, and immutable hash chains.',
                color: '#f59e0b',
              },
              {
                title: 'Better Governance',
                desc: 'Data-backed regulatory insights and early-warning anomaly signals for AICTE leaders.',
                color: '#8b5cf6',
              },
            ].map((b, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #dce5ef',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle2 size={16} color={b.color} />
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#001e46' }}>{b.title}</h4>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.5 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Background */}
        <div style={{
          backgroundColor: '#f1f5f9',
          borderRadius: '10px',
          padding: '28px',
          border: '1px solid #cbd5e1',
        }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46', marginBottom: '10px' }}>
            Project Background & Genesis
          </h3>
          <p style={{ fontSize: '13.5px', color: '#475467', lineHeight: 1.7 }}>
            With the nationwide introduction of APAAR (Automated Permanent Academic Account Registry) under the National Education Policy (NEP 2020), every student in India receives a lifelong 12-digit academic identifier. SATYA-APAAR 2.1 builds directly on top of this foundation, providing the vital assurance and reconciliation layer required by AICTE to ensure that institutional admissions match approved quotas, transfer histories are validated, and verifiable academic credentials can be securely shared with verifiers.
          </p>
        </div>
      </div>
    </div>
  );
};

