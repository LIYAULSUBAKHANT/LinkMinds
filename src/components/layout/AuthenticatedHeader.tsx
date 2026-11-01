import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { 
  Bell, User as UserIcon, LogOut, ChevronDown, RotateCcw, 
  ShieldCheck, Building, CheckCircle, AlertTriangle 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { UserRole } from '../../types';

interface AuthenticatedHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({ 
  onToggleSidebar, 
  isSidebarCollapsed 
}) => {
  const { user, role, switchRole, logout, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const notifications = StorageService.getNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setShowRoleMenu(false);
    toast.success(`Switched role to ${formatRoleName(newRole)}`);
    navigate(getDashboardPath(newRole));
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to initial seed state? This will clear local uploads and reviews.')) {
      StorageService.resetAll();
      toast.success('Demo data restored to initial baseline!');
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const formatRoleName = (r: UserRole) => {
    switch (r) {
      case 'aicte_admin': return 'AICTE Administrator';
      case 'institution_operator': return 'Institution Operator';
      case 'authorised_verifier': return 'Authorised Verifier';
      case 'system_admin': return 'System Administrator';
    }
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--color-border-light)',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 80,
      height: '62px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
    }}>
      {/* Left: Brand Identity & Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img 
            src="/assets/logos/govt_aicte_brand.png" 
            alt="AICTE" 
            style={{ height: '38px', objectFit: 'contain' }}
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#001e46' }}>SATYA-APAAR</span>
              <span style={{ background: '#155eef', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px' }}>2.1</span>
            </div>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>AICTE Verification Portal</span>
          </div>
        </Link>
      </div>

      {/* Center/Right: Demo Role Switcher, Reset Demo, Notifications, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Reset Demo Data Button (Clearly labelled demo utility) */}
        <button
          onClick={handleResetData}
          title="Reset Local Demo Storage to Initial State"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '5px',
            padding: '5px 9px',
            fontSize: '11px',
            color: '#475467',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={12} />
          <span>Reset Demo</span>
        </button>

        {/* DEMO ROLE SWITCHER PILL */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#1e40af',
              cursor: 'pointer',
            }}
          >
            <ShieldCheck size={14} color="#2563eb" />
            <span>Role: {formatRoleName(role)}</span>
            <ChevronDown size={13} />
          </button>

          {showRoleMenu && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              width: '240px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid #e2e8f0',
              padding: '6px 0',
              zIndex: 100,
            }}>
              <div style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Quick Demo Role Switcher
              </div>
              <button
                onClick={() => handleRoleSwitch('institution_operator')}
                style={{ width: '100%', padding: '8px 14px', textAlign: 'left', fontSize: '12.5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: role === 'institution_operator' ? '#155eef' : '#1e293b', background: role === 'institution_operator' ? '#f0f9ff' : 'transparent' }}
              >
                <span>Institution Operator</span>
                {role === 'institution_operator' && <CheckCircle size={14} color="#155eef" />}
              </button>
              <button
                onClick={() => handleRoleSwitch('aicte_admin')}
                style={{ width: '100%', padding: '8px 14px', textAlign: 'left', fontSize: '12.5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: role === 'aicte_admin' ? '#155eef' : '#1e293b', background: role === 'aicte_admin' ? '#f0f9ff' : 'transparent' }}
              >
                <span>AICTE Administrator</span>
                {role === 'aicte_admin' && <CheckCircle size={14} color="#155eef" />}
              </button>
              <button
                onClick={() => handleRoleSwitch('authorised_verifier')}
                style={{ width: '100%', padding: '8px 14px', textAlign: 'left', fontSize: '12.5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: role === 'authorised_verifier' ? '#155eef' : '#1e293b', background: role === 'authorised_verifier' ? '#f0f9ff' : 'transparent' }}
              >
                <span>Authorised Verifier</span>
                {role === 'authorised_verifier' && <CheckCircle size={14} color="#155eef" />}
              </button>
              <button
                onClick={() => handleRoleSwitch('system_admin')}
                style={{ width: '100%', padding: '8px 14px', textAlign: 'left', fontSize: '12.5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: role === 'system_admin' ? '#155eef' : '#1e293b', background: role === 'system_admin' ? '#f0f9ff' : 'transparent' }}
              >
                <span>System Administrator</span>
                {role === 'system_admin' && <CheckCircle size={14} color="#155eef" />}
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            style={{
              position: 'relative',
              padding: '8px',
              borderRadius: '50%',
              color: '#475467',
              cursor: 'pointer',
            }}
            title="System Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '16px',
                height: '16px',
                background: '#dc2626',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifMenu && (
            <div style={{
              position: 'absolute',
              top: '115%',
              right: 0,
              width: '320px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid #e2e8f0',
              padding: '12px',
              zIndex: 100,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>Notifications ({unreadCount} new)</span>
                <button 
                  onClick={() => { StorageService.markAllNotificationsRead(); setShowNotifMenu(false); }}
                  style={{ fontSize: '11px', color: '#155eef' }}
                >
                  Mark all read
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    onClick={() => {
                      StorageService.markNotificationRead(n.id);
                      if (n.link) navigate(n.link);
                      setShowNotifMenu(false);
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      background: n.isRead ? '#ffffff' : '#f0f9ff',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{n.title}</div>
                    <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{n.message}</div>
                    <div style={{ color: '#94a3b8', fontSize: '10px', marginTop: '4px' }}>{n.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#001e46',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '12px',
            }}>
              {user?.avatar || 'U'}
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>{user?.name || 'Operator'}</span>
              <span style={{ fontSize: '10px', color: '#64748b' }}>{user?.institutionName ? 'BIT Sathy' : user?.designation || 'Officer'}</span>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '115%',
              right: 0,
              width: '200px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid #e2e8f0',
              padding: '6px 0',
              zIndex: 100,
            }}>
              <div style={{ padding: '8px 14px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{user?.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{user?.email}</div>
              </div>
              <Link 
                to="/profile" 
                onClick={() => setShowUserMenu(false)}
                style={{ display: 'block', padding: '8px 14px', fontSize: '12.5px', color: '#334155', textDecoration: 'none' }}
              >
                My Profile
              </Link>
              <Link 
                to="/support" 
                onClick={() => setShowUserMenu(false)}
                style={{ display: 'block', padding: '8px 14px', fontSize: '12.5px', color: '#334155', textDecoration: 'none' }}
              >
                Help & Support
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  textAlign: 'left',
                  fontSize: '12.5px',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderTop: '1px solid #f1f5f9'
                }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

