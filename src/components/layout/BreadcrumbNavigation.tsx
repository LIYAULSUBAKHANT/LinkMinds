import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbNavigationProps {
  items?: BreadcrumbItem[];
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ items }) => {
  const location = useLocation();

  // If items are not passed, generate them from the pathname
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  const crumbs: BreadcrumbItem[] = items || [
    { label: 'Dashboard', path: '/dashboard' },
    ...pathParts.map((part, index) => {
      const url = `/${pathParts.slice(0, index + 1).join('/')}`;
      const formatted = part
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return {
        label: formatted,
        path: index === pathParts.length - 1 ? undefined : url,
      };
    }),
  ];

  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: '#64748b',
        marginBottom: '14px',
        flexWrap: 'wrap',
      }}
    >
      <Link to="/" style={{ color: '#64748b', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Home size={13} />
      </Link>
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={12} color="#94a3b8" />
          {crumb.path ? (
            <Link to={crumb.path} style={{ color: '#155eef', textDecoration: 'none' }}>
              {crumb.label}
            </Link>
          ) : (
            <span style={{ color: '#1e293b', fontWeight: 600 }}>{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

