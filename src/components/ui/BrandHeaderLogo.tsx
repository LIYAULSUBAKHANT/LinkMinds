import React from 'react';
import { Link } from 'react-router-dom';

interface BrandHeaderLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  subtitle?: string;
  showSubtitle?: boolean;
  to?: string;
}

export const BrandHeaderLogo: React.FC<BrandHeaderLogoProps> = ({
  variant = 'light',
  size = 'md',
  subtitle = 'Student Admission Trust & Yield Assurance',
  showSubtitle = true,
  to = '/',
}) => {
  const isDark = variant === 'dark';

  const logoHeights = {
    sm: 34,
    md: 40,
    lg: 48,
  };

  const titleSizes = {
    sm: '16px',
    md: '18px',
    lg: '22px',
  };

  const subtitleSizes = {
    sm: '10px',
    md: '11px',
    lg: '12px',
  };

  const height = logoHeights[size];

  const content = (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'sm' ? '12px' : '14px',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {/* Custom LinkMinds Dual-Neural Brand Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          filter: isDark
            ? 'drop-shadow(0 2px 8px rgba(0, 210, 255, 0.4))'
            : 'drop-shadow(0 2px 6px rgba(0, 30, 70, 0.18))',
          transition: 'transform 0.2s ease',
        }}
        className="brand-logo-glow"
      >
        <img
          src="/assets/logos/linkminds_brand_logo.png"
          alt="LinkMinds SATYA-APAAR"
          style={{
            height: `${height}px`,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Brand Title and Subtitle Hierarchy */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1.2,
          borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #dce5ef',
          paddingLeft: size === 'sm' ? '10px' : '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: titleSizes[size],
              fontWeight: 800,
              color: isDark ? '#ffffff' : '#001e46',
              letterSpacing: '-0.02em',
            }}
          >
            SATYA-APAAR
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '1px 6px',
              borderRadius: '4px',
              backgroundColor: isDark ? 'rgba(0, 210, 255, 0.2)' : 'rgba(21, 94, 239, 0.1)',
              border: isDark ? '1px solid rgba(0, 210, 255, 0.4)' : '1px solid rgba(21, 94, 239, 0.25)',
              fontSize: '10px',
              fontWeight: 700,
              color: isDark ? '#38bdf8' : '#155eef',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 6px #10b981',
              }}
            />
            TRUST ENGINE
          </span>
        </div>

        {showSubtitle && (
          <span
            style={{
              fontSize: subtitleSizes[size],
              color: isDark ? '#94a3b8' : '#475467',
              fontWeight: 500,
              letterSpacing: '0.01em',
              marginTop: '2px',
              whiteSpace: 'nowrap',
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
};

