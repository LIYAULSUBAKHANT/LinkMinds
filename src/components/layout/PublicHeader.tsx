import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, ArrowRight, ShieldCheck, LogIn } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate(getDashboardPath());
    } else {
      navigate('/login');
    }
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--color-border-light)',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 90,
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Ministry & AICTE Wordmark */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
          <img 
            src="/assets/logos/govt_aicte_brand.png" 
            alt="Ministry of Education & AICTE" 
            style={{ height: '46px', objectFit: 'contain' }}
            onError={(e) => {
              // Fallback styling if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '2px solid #e2e8f0',
            paddingLeft: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#001e46',
                letterSpacing: '-0.02em',
              }}>
                SATYA-APAAR
              </span>
              <span style={{
                backgroundColor: '#155eef',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
              }}>
                2.1
              </span>
            </div>
            <span style={{
              fontSize: '10.5px',
              color: '#475467',
              fontWeight: 500,
              maxWidth: '340px',
              lineHeight: 1.2,
            }}>
              Student Admission Trust & Yield Assurance | AICTE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation: Exactly 5 links + Separate Login/Register CTA */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? '#155eef' : '#334155',
              fontWeight: isActive ? 600 : 500,
              fontSize: '14px',
              textDecoration: 'none',
              padding: '6px 2px',
              borderBottom: isActive ? '2px solid #155eef' : '2px solid transparent',
            })}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            style={({ isActive }) => ({
              color: isActive ? '#155eef' : '#334155',
              fontWeight: isActive ? 600 : 500,
              fontSize: '14px',
              textDecoration: 'none',
              padding: '6px 2px',
              borderBottom: isActive ? '2px solid #155eef' : '2px solid transparent',
            })}
          >
            About Us
          </NavLink>
          <NavLink 
            to="/features" 
            style={({ isActive }) => ({
              color: isActive ? '#155eef' : '#334155',
              fontWeight: isActive ? 600 : 500,
              fontSize: '14px',
              textDecoration: 'none',
              padding: '6px 2px',
              borderBottom: isActive ? '2px solid #155eef' : '2px solid transparent',
            })}
          >
            Features
          </NavLink>
          <NavLink 
            to="/resources" 
            style={({ isActive }) => ({
              color: isActive ? '#155eef' : '#334155',
              fontWeight: isActive ? 600 : 500,
              fontSize: '14px',
              textDecoration: 'none',
              padding: '6px 2px',
              borderBottom: isActive ? '2px solid #155eef' : '2px solid transparent',
            })}
          >
            Resources
          </NavLink>
          <a 
            href="/dashboard"
            onClick={handleDashboardClick}
            style={{
              color: '#334155',
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'none',
              padding: '6px 2px',
            }}
          >
            Dashboard
          </a>

          {/* Separate Orange Login/Register CTA */}
          <Link
            to="/login"
            className="btn btn-orange"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              textDecoration: 'none',
              boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)',
            }}
          >
            <LogIn size={15} />
            <span>Login / Register</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            color: '#001e46',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--color-border-light)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', color: '#1e293b', fontWeight: 500 }}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', color: '#1e293b', fontWeight: 500 }}>About Us</Link>
          <Link to="/features" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', color: '#1e293b', fontWeight: 500 }}>Features</Link>
          <Link to="/resources" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', color: '#1e293b', fontWeight: 500 }}>Resources</Link>
          <a href="/dashboard" onClick={(e) => { handleDashboardClick(e); setMobileMenuOpen(false); }} style={{ padding: '8px 0', color: '#1e293b', fontWeight: 500 }}>Dashboard</a>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-orange" style={{ textAlign: 'center', marginTop: '8px' }}>
            Login / Register
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};

