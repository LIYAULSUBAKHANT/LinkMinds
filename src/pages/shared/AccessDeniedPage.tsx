import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();
  const { role, getDashboardPath } = useAuth();

  return (
    <div style={{
      maxWidth: '560px',
      margin: '60px auto',
      textAlign: 'center',
      padding: '40px 24px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #dce5ef',
      boxShadow: 'var(--shadow-md)',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px auto',
      }}>
        <ShieldAlert size={36} />
      </div>

      <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#001e46', marginBottom: '8px' }}>
        Access Restricted (403)
      </h1>
      <p style={{ fontSize: '13.5px', color: '#475467', lineHeight: 1.6, marginBottom: '24px' }}>
        Your active role (<strong>{role.replace('_', ' ').toUpperCase()}</strong>) does not have regulatory permissions to access this administrative module.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button
          onClick={() => navigate(getDashboardPath())}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Home size={14} />
          <span>Go to Authorized Dashboard</span>
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={14} />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

