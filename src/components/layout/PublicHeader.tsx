import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, LogIn } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

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
      height: '68px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}>
        {/* Seamless High-Fidelity Modern Brand Logo */}
        <BrandLogo size="md" subtitle="Student Admission Trust & Yield Assurance" />

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
              padding: '8px 2px',
              borderBottom: isActive ? '2px solid #155eef' : '2px solid transparent',
              transition: 'all 0.15s ease',
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
              padding: '8px 2px',
              borderBottom: isActive ? '2px solid #155eef' : '2px solid transparent',
              transition: 'all 0.15s ease',
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
              padding: '8px 2px',
              borderBottom: isActive ? '2px solid #155eef' : '2px solid transparent',
              transition: 'all 0.15s ease',
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
              padding: '8px 2px',
              borderBottom: isActive ? '2px solid #155eef' : '2px solid transparent',
              transition: 'all 0.15s ease',
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
              padding: '8px 2px',
              borderBottom: '2px solid transparent',
              transition: 'all 0.15s ease',
            }}
          >
            Dashboard
          </a>

          {/* Highlighted Orange Login/Register CTA */}
          <Link
            to="/login"
            className="btn btn-orange"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 18px',
              borderRadius: '6px',
              fontSize: '13.5px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(245, 158, 11, 0.25)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
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
          position: 'absolute',
          top: '68px',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--color-border-light)',
          boxShadow: 'var(--shadow-md)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 100,
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
