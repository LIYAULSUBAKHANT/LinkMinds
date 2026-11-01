import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  subtitle?: string;
  showSubtitle?: boolean;
  to?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  subtitle = 'Student Admission Trust & Yield Assurance',
  showSubtitle = true,
  to = '/',
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: { box: 34, icon: 20 },
    md: { box: 42, icon: 24 },
    lg: { box: 50, icon: 30 },
  };

  const titleSizes = {
    sm: '16px',
    md: '19px',
    lg: '24px',
  };

  const subtitleSizes = {
    sm: '10px',
    md: '11px',
    lg: '12.5px',
  };

  const { box } = iconSizes[size];

  const content = (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: size === 'sm' ? '10px' : '14px',
      textDecoration: 'none',
      userSelect: 'none',
    }}>
      {/* Precision Modern Vector Emblem / Crest */}
      <div
        style={{
          width: `${box}px`,
          height: `${box}px`,
          borderRadius: size === 'sm' ? '8px' : '10px',
          background: isDark
            ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)'
            : 'linear-gradient(135deg, #155eef 0%, #002266 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDark
            ? '0 4px 12px rgba(0, 0, 0, 0.4)'
            : '0 4px 12px rgba(21, 94, 239, 0.28)',
          flexShrink: 0,
          position: 'relative',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <svg
          width={iconSizes[size].icon}
          height={iconSizes[size].icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield Outline */}
          <path
            d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22.5C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Internal Academic Verification / Trust Node */}
          <path
            d="M9 12L11 14L15 10"
            stroke="#f59e0b"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Graduation Cap Peak Accent */}
          <path
            d="M12 6.5L16 8.5L12 10.5L8 8.5L12 6.5Z"
            fill="#ffffff"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Typography Hierarchy */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: titleSizes[size],
              fontWeight: 800,
              color: isDark ? '#ffffff' : '#001e46',
              letterSpacing: '-0.025em',
            }}
          >
            SATYA-APAAR
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 6px rgba(16, 185, 129, 0.8)',
            }}
            title="System Active & Online"
          />
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
