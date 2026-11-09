import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { 
  Building2, ShieldCheck, CheckSquare, Settings, 
  ArrowRight, Info, Shield, CheckCircle2 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, getDashboardPath } = useAuth();

  const roles = [
    {
      id: 'institution_operator' as UserRole,
      title: 'Institution Operator',
      subtitle: 'Colleges & Universities',
      desc: 'Submit admission batches, perform column mappings, verify preflight validation, review seat utilisation, and reconcile aggregate totals.',
      icon: <Building2 size={28} color="#155eef" />,
      color: '#155eef',
      badge: 'Institution Access',
    },
    {
      id: 'aicte_admin' as UserRole,
      title: 'AICTE Administrator',
      subtitle: 'Central Regulatory Oversight',
      desc: 'National admissions command centre, state-wise compliance tracking, discrepancy review queue, anomaly AI signals, and policy master governance.',
      icon: <ShieldCheck size={28} color="#16a34a" />,
      color: '#16a34a',
      badge: 'Full Oversight',
    },
    {
      id: 'authorised_verifier' as UserRole,
      title: 'Authorised Verifier',
      subtitle: 'Employers & Verifiers',
      desc: 'Privacy-preserving credential queries, instant QR code scanning, tamper-proof ConsentPass verification without exposure of raw student PII.',
      icon: <CheckSquare size={28} color="#f59e0b" />,
      color: '#f59e0b',
      badge: 'Zero-PII Verification',
    },
    {
      id: 'system_admin' as UserRole,
      title: 'System Administrator',
      subtitle: 'Technical Platform Admin',
      desc: 'Manage portal user credentials, configure role permission matrices, monitor integration health adapters (APAAR, DigiLocker), and set alert rules.',
      icon: <Settings size={28} color="#8b5cf6" />,
      color: '#8b5cf6',
      badge: 'System Admin',
    },
  ];

  const handleSelectRole = (selectedRole: UserRole) => {
    // Automatically signs into demo session and routes to role dashboard
    login(selectedRole);
    toast.success(`Entered demo as ${selectedRole.replace('_', ' ').toUpperCase()}`);
    navigate(getDashboardPath(selectedRole));
  };

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '48px 24px 64px 24px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#001e46', marginBottom: '8px' }}>
          Choose Your Role
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
          Select your authorized access tier to proceed to the designated SATYA-APAAR portal workspace.
        </p>
      </div>

      {/* 4 Role Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {roles.map((r) => (
          <div
            key={r.id}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #dce5ef',
              borderRadius: '10px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = r.color;
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#dce5ef';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: `${r.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {r.icon}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: `${r.color}15`,
                  color: r.color,
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}>
                  {r.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#001e46', marginBottom: '2px' }}>
                {r.title}
              </h3>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '14px' }}>
                {r.subtitle}
              </div>

              <p style={{ fontSize: '13px', color: '#475467', lineHeight: 1.6, marginBottom: '24px' }}>
                {r.desc}
              </p>
            </div>

            <button
              onClick={() => handleSelectRole(r.id)}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: r.color,
              }}
            >
              <span>Continue as {r.title.split(' ')[0]}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* Information Strip */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        maxWidth: '800px',
        margin: '0 auto 24px auto',
      }}>
        <Info size={20} color="#2563eb" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '12.5px', color: '#1e40af', lineHeight: 1.5 }}>
          <strong>Role-Based Access Control Notice:</strong> SATYA-APAAR strictly segregates capabilities by user role. In this SIH demonstration prototype, choosing a role configures a simulated active session with seeded data.
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        Prefer manual sign-in? <Link to="/login" style={{ color: '#155eef', fontWeight: 600 }}>Login with Username & Password</Link>
      </div>
    </div>
  );
};

