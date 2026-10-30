import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'mock' | 'neutral';
  icon?: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant, 
  icon 
}) => {
  // Infer variant if not provided
  let effectiveVariant = variant;
  if (!effectiveVariant) {
    const s = status.toLowerCase();
    if (s.includes('valid') || s.includes('reconciled') || s.includes('verified') || s.includes('active') || s.includes('approved') || s.includes('processed') || s.includes('healthy') || s.includes('normal')) {
      effectiveVariant = 'success';
    } else if (s.includes('pending') || s.includes('review') || s.includes('warning') || s.includes('attention') || s.includes('assigned') || s.includes('near')) {
      effectiveVariant = 'warning';
    } else if (s.includes('error') || s.includes('fail') || s.includes('rejected') || s.includes('flagged') || s.includes('exceeded') || s.includes('revoked') || s.includes('unexplained')) {
      effectiveVariant = 'danger';
    } else if (s.includes('mock') || s.includes('simulated') || s.includes('prototype') || s.includes('demo')) {
      effectiveVariant = 'mock';
    } else {
      effectiveVariant = 'info';
    }
  }

  const styles: Record<string, { bg: string; text: string; border: string }> = {
    success: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
    warning: { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
    danger: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
    info: { bg: '#f0f9ff', text: '#0284c7', border: '#bae6fd' },
    mock: { bg: '#eef2ff', text: '#4f46e5', border: '#c7d2fe' },
    neutral: { bg: '#f8fafc', text: '#475467', border: '#e2e8f0' },
  };

  const current = styles[effectiveVariant] || styles.info;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: 600,
        borderRadius: '4px',
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`,
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <span>{status}</span>
    </span>
  );
};

