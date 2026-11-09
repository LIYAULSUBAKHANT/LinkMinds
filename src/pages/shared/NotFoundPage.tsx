import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
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
        backgroundColor: '#eff6ff',
        color: '#155eef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px auto',
      }}>
        <HelpCircle size={36} />
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46', marginBottom: '8px' }}>
        Page Not Found (404)
      </h1>
      <p style={{ fontSize: '13.5px', color: '#475467', lineHeight: 1.6, marginBottom: '24px' }}>
        The requested SATYA-APAAR navigation route does not exist or has been relocated.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <Link
          to="/"
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Home size={14} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

