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
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border-light)',
        borderRadius: '8px',
        padding: '16px 18px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        position: 'relative',
        overflow: 'hidden',
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
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#475467' }}>
          {title}
        </span>
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

