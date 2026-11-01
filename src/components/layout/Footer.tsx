import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, Shield } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#001e46',
      color: '#ffffff',
      paddingTop: '48px',
      paddingBottom: '24px',
      marginTop: 'auto',
      borderTop: '3px solid #f59e0b',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
        }}>
          {/* Column 1: Organization & Identity */}
          <div>
            <div style={{ marginBottom: "16px" }}><BrandLogo variant="dark" size="sm" subtitle="Student Admission Trust & Yield Assurance" to="/" /></div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>
              Student Admission Trust & Yield Assurance for AICTE-approved institutions.
              A unified platform to reconcile admissions, verify APAAR identities, and ensure zero unallocated seats.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '4px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#fde68a',
            }}>
              <Shield size={12} />
              <span>Smart India Hackathon 2026 | SIH26263</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '14px', marginBottom: '16px', fontWeight: 600, borderLeft: '3px solid #155eef', paddingLeft: '8px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/about" style={{ color: '#cbd5e1', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link to="/features" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Our Features</Link></li>
              <li><Link to="/resources" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Resources & Guidelines</Link></li>
              <li><Link to="/select-role" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Role Selection</Link></li>
              <li><Link to="/login" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Portal Login</Link></li>
            </ul>
          </div>

          {/* Column 3: Ecosystem Partners */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '14px', marginBottom: '16px', fontWeight: 600, borderLeft: '3px solid #155eef', paddingLeft: '8px' }}>
              Supported Ecosystem
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li style={{ color: '#cbd5e1' }}>All India Council for Technical Education (AICTE)</li>
              <li style={{ color: '#cbd5e1' }}>Automated Permanent Academic Account Registry (APAAR)</li>
              <li style={{ color: '#cbd5e1' }}>DigiLocker Ecosystem (National e-Governance)</li>
              <li style={{ color: '#cbd5e1' }}>Academic Bank of Credits (ABC)</li>
              <li style={{ color: '#cbd5e1' }}>National Council for Vocational Education (NCVET)</li>
              <li style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>*Integrations simulated in prototype demonstration</li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '14px', marginBottom: '16px', fontWeight: 600, borderLeft: '3px solid #155eef', paddingLeft: '8px' }}>
              Contact AICTE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070</span>
              </div>
              <div style={{ marginBottom: "16px" }}><BrandLogo variant="dark" size="sm" subtitle="Student Admission Trust & Yield Assurance" to="/" /></div>
              <div style={{ marginBottom: "16px" }}><BrandLogo variant="dark" size="sm" subtitle="Student Admission Trust & Yield Assurance" to="/" /></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '12px',
          color: '#94a3b8',
        }}>
          <div>
            © 2026 SATYA-APAAR — All Rights Reserved. All India Council for Technical Education (AICTE).
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#94a3b8' }}>Privacy Policy</span>
            <span style={{ color: '#94a3b8' }}>Terms of Use</span>
            <span style={{ color: '#94a3b8' }}>Accessibility Statement</span>
            <span style={{ color: '#94a3b8' }}>Sitemap</span>
          </div>
        </div>

        {/* Prototype Environment Notice */}
        <div style={{
          marginTop: '16px',
          padding: '8px 12px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '4px',
          fontSize: '11px',
          color: '#cbd5e1',
          textAlign: 'center',
          border: '1px dashed rgba(255, 255, 255, 0.15)',
        }}>
          <strong>Prototype / Demonstration Environment:</strong> This interface is an interactive software demonstration developed for SIH 2026. All institutional statistics, student records, and integration states are simulated synthetic data.
        </div>
      </div>
    </footer>
  );
};

