import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { 
  Eye, EyeOff, ShieldCheck, Building2, UserCheck, 
  Settings, Key, AlertCircle, Info, ExternalLink, ArrowRight 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const { login, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Role selection state (defaults to Institution or from location state)
  const initialRole = (location.state as any)?.selectedRole as UserRole || 'institution_operator';
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  
  const [username, setUsername] = useState('operator@bitsathy.ac.in');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  // Modals
  const [showSsoModal, setShowSsoModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Quick preset accounts for the 4 roles
  const demoAccounts = {
    institution_operator: { email: 'operator@bitsathy.ac.in', title: 'Institution Operator', desc: 'BIT Sathy (Autonomous)' },
    aicte_admin: { email: 'admin.aicte@satya-apaar.gov.in', title: 'AICTE Administrator', desc: 'Central Regulatory Oversight' },
    authorised_verifier: { email: 'verifier@tcs-check.com', title: 'Authorised Verifier', desc: 'Credential Verification Agency' },
    system_admin: { email: 'sysadmin@satya-apaar.gov.in', title: 'System Administrator', desc: 'User & System Health Admin' },
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setUsername(demoAccounts[role].email);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error('Please enter username and password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(selectedRole, username);
      toast.success(`Signed in as ${demoAccounts[selectedRole].title}`);
      navigate(getDashboardPath(selectedRole));
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 100px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: '#f8fbfe',
    }}>
      <div style={{
        maxWidth: '1040px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid #dce5ef',
        display: 'grid',
        gridTemplateColumns: '1fr',
        overflow: 'hidden',
      }} className="login-container">
        
        {/* Left Side: Campus Photo & Project Brand */}
        <div style={{
          backgroundColor: '#001e46',
          color: '#ffffff',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }} className="login-left-pane">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
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
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '24px' }}>
              Student Admission Trust & Yield Assurance for AICTE-approved institutions across India.
            </p>

            <img
              src="/assets/hero/login_campus.png"
              alt="AICTE Approved Institution Campus"
              style={{
                width: '100%',
                maxHeight: '260px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                marginBottom: '20px',
              }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '12px',
              color: '#cbd5e1',
              lineHeight: 1.5,
            }}>
              <div style={{ fontWeight: 700, color: '#fde68a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#f59e0b" />
                <span>Secure Government Portal</span>
              </div>
              This is a secure government verification portal. All submissions are timestamped and cryptographically logged.
            </div>
          </div>

          <div style={{ marginTop: '24px', fontSize: '11px', color: '#94a3b8' }}>
            Smart India Hackathon 2026 | AICTE SIH26263
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#001e46', marginBottom: '6px' }}>
              Welcome to SATYA-APAAR 2.1
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Sign in to access your dashboard and manage student admission data securely.
            </p>
          </div>

          {/* Quick Demo Access Bar */}
          <div style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            padding: '12px 14px',
            marginBottom: '20px',
            fontSize: '12px',
          }}>
            <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Key size={14} color="#2563eb" />
              <span>SIH Demo Access (One-Click Credentials):</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {(Object.keys(demoAccounts) as UserRole[]).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleChange(r)}
                  style={{
                    textAlign: 'left',
                    padding: '5px 8px',
                    borderRadius: '4px',
                    background: selectedRole === r ? '#155eef' : '#ffffff',
                    color: selectedRole === r ? '#ffffff' : '#1e293b',
                    border: '1px solid #cbd5e1',
                    fontSize: '11px',
                    fontWeight: selectedRole === r ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {demoAccounts[r].title}
                </button>
              ))}
            </div>
          </div>

          {/* Role Selection Chips */}
          <div style={{ marginBottom: '18px' }}>
            <label className="form-label" style={{ marginBottom: '8px' }}>Select Your Role</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { role: 'institution_operator' as UserRole, label: 'Institution' },
                { role: 'aicte_admin' as UserRole, label: 'AICTE' },
                { role: 'authorised_verifier' as UserRole, label: 'Verifier' },
                { role: 'system_admin' as UserRole, label: 'Admin' },
              ].map(item => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleChange(item.role)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '6px',
                    border: selectedRole === item.role ? '2px solid #155eef' : '1px solid #dce5ef',
                    backgroundColor: selectedRole === item.role ? '#eff6ff' : '#ffffff',
                    color: selectedRole === item.role ? '#155eef' : '#475467',
                    fontWeight: selectedRole === item.role ? 700 : 500,
                    fontSize: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Username / Email ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or email address"
                className="form-control"
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{ fontSize: '12px', color: '#155eef', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-control"
                  style={{ paddingRight: '36px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '9px',
                    color: '#94a3b8',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475467' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="rememberMe" style={{ cursor: 'pointer' }}>Remember this device</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                fontWeight: 600,
                marginTop: '4px',
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            <div style={{ textAlign: 'center', margin: '6px 0', fontSize: '12px', color: '#94a3b8' }}>
              Or continue with
            </div>

            {/* Government SSO (NIC) Button */}
            <button
              type="button"
              onClick={() => setShowSsoModal(true)}
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '9px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: '#001e46',
                borderColor: '#cbd5e1',
              }}
            >
              <img src="/assets/logos/govt_aicte_brand.png" alt="Gov" style={{ height: '16px' }} onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
              <span>Government SSO (NIC Parichay)</span>
            </button>
          </form>

          {/* Bottom Security / Registration note */}
          <div style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9',
            fontSize: '12px',
            color: '#64748b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>New institution?</span>
            <Link to="/institution/registration" style={{ color: '#155eef', fontWeight: 600 }}>
              Register Institution
            </Link>
          </div>
        </div>
      </div>

      {/* SSO Simulation Modal */}
      {showSsoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px',
        }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '440px', width: '100%', padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#155eef', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              <Info size={24} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
              Government SSO (NIC Parichay)
            </h3>
            <p style={{ fontSize: '13px', color: '#475467', lineHeight: 1.6, marginBottom: '20px' }}>
              External Government SSO (NIC Jan Parichay) integration is simulated in this prototype environment. Production government SSO endpoints require authorized ministry IP-whitelisting and VPN tunnels. Please use the demo role sign-in options.
            </p>
            <button onClick={() => setShowSsoModal(false)} className="btn btn-primary" style={{ width: '100%' }}>
              Return to Demo Sign In
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px',
        }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '440px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
              Reset Password
            </h3>
            <p style={{ fontSize: '13px', color: '#475467', lineHeight: 1.6, marginBottom: '16px' }}>
              In this prototype demonstration environment, password resets are simulated. All demo accounts use the standard password: <strong>demo1234</strong>.
            </p>
            <button onClick={() => setShowForgotModal(false)} className="btn btn-primary" style={{ width: '100%' }}>
              Got It
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 840px) {
          .login-container {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

