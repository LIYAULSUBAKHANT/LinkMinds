import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  badge?: React.ReactNode;
  onClick?: () => void;
  accentColor?: string;
  isPulsing?: boolean;
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  badge,
  onClick,
  accentColor = '#155eef',
  isPulsing = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={isPulsing ? 'pulse-card' : ''}
      style={{
        backgroundColor: '#ffffff',
        border: isPulsing ? `1.5px solid ${accentColor}` : '1px solid var(--color-border-light)',
        borderRadius: '8px',
        padding: '16px 18px',
        boxShadow: isPulsing ? `0 4px 16px -2px ${accentColor}33` : 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = isPulsing ? `0 4px 16px -2px ${accentColor}33` : 'var(--shadow-sm)';
        }
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: accentColor,
      }} />

      {/* Header row: Title + Icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isPulsing && (
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: accentColor,
                display: 'inline-block',
              }}
              className="pulse-beacon"
            />
          )}
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#475467' }}>
            {title}
          </span>
        </div>
        {icon && (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: 'rgba(21, 94, 239, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor,
          }}>
            {icon}
          </div>
        )}
      </div>

      {/* Main KPI Value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '24px', fontWeight: 700, color: '#001e46', letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {badge}
      </div>

      {/* Subtitle & Trend */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b' }}>
        {subtitle && <span>{subtitle}</span>}
        {trend && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            color: trend.isNeutral ? '#64748b' : trend.isPositive ? '#16a34a' : '#dc2626',
            fontWeight: 600,
          }}>
            {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{trend.value}</span>
          </span>
        )}
      </div>
    </div>
  );
};

