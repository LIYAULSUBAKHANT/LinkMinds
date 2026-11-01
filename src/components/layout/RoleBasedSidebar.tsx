import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Building2, UploadCloud, GitCompare, Users, Fingerprint, 
  ShieldCheck, LayoutDashboard, AlertCircle, Cpu, BookOpen, 
  FileCheck2, BarChart3, CheckSquare, Settings, ChevronDown, 
  ChevronRight, ExternalLink, HelpCircle, LogOut, ChevronLeft 
} from 'lucide-react';
import { UserRole } from '../../types';

interface SubmenuItem {
  title: string;
  path: string;
  pageNumber?: string;
}

interface ParentGroup {
  id: string;
  letter: string;
  title: string;
  icon: React.ReactNode;
  allowedRoles: UserRole[];
  submenus: SubmenuItem[];
}

export const RoleBasedSidebar: React.FC = () => {
  const { role, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({});

  const PARENT_GROUPS: ParentGroup[] = [
    {
      id: 'grp-inst',
      letter: 'A',
      title: 'Institution Portal',
      icon: <Building2 size={18} />,
      allowedRoles: ['institution_operator'],
      submenus: [
        { title: 'Institution Registration', path: '/institution/registration', pageNumber: 'P07' },
        { title: 'Institution Dashboard', path: '/institution/dashboard', pageNumber: 'P08' },
      ],
    },
    {
      id: 'grp-submissions',
      letter: 'B',
      title: 'Submissions',
      icon: <UploadCloud size={18} />,
      allowedRoles: ['institution_operator', 'aicte_admin'],
      submenus: [
        { title: 'Data Upload & Mapping', path: '/institution/submissions/upload', pageNumber: 'P09' },
        { title: 'Preflight Validation', path: '/institution/submissions/validation', pageNumber: 'P10' },
        { title: 'Submission Tracking', path: '/institution/submissions/tracking', pageNumber: 'P16' },
      ],
    },
    {
      id: 'grp-reconciliation',
      letter: 'C',
      title: 'Reconciliation',
      icon: <GitCompare size={18} />,
      allowedRoles: ['institution_operator', 'aicte_admin'],
      submenus: [
        { title: 'Aggregate Reconciliation', path: '/institution/reconciliation', pageNumber: 'P11' },
      ],
    },
    {
      id: 'grp-students',
      letter: 'D',
      title: 'Student Records',
      icon: <Users size={18} />,
      allowedRoles: ['institution_operator', 'aicte_admin'],
      submenus: [
        { title: 'Student Records & Search', path: '/institution/students', pageNumber: 'P12' },
        { title: 'TEIE Enrolment Timeline', path: '/institution/students/timeline', pageNumber: 'P13' },
      ],
    },
    {
      id: 'grp-identity',
      letter: 'E',
      title: 'Identity Resolution',
      icon: <Fingerprint size={18} />,
      allowedRoles: ['institution_operator', 'aicte_admin'],
      submenus: [
        { title: 'APAAR Identity Resolver', path: '/institution/identity', pageNumber: 'P14' },
      ],
    },
    {
      id: 'grp-seatguard',
      letter: 'F',
      title: 'SeatGuard',
      icon: <ShieldCheck size={18} />,
      allowedRoles: ['institution_operator', 'aicte_admin'],
      submenus: [
        { title: 'Seat Ledger & Quotas', path: '/institution/seatguard', pageNumber: 'P15' },
      ],
    },
    {
      id: 'grp-aicte-admin',
      letter: 'G',
      title: 'AICTE Administration',
      icon: <LayoutDashboard size={18} />,
      allowedRoles: ['aicte_admin'],
      submenus: [
        { title: 'AICTE Central Dashboard', path: '/aicte/dashboard', pageNumber: 'P17' },
        { title: 'Institution Explorer', path: '/aicte/institutions', pageNumber: 'P18' },
      ],
    },
    {
      id: 'grp-reviews',
      letter: 'H',
      title: 'Review & Compliance',
      icon: <AlertCircle size={18} />,
      allowedRoles: ['aicte_admin'],
      submenus: [
        { title: 'AICTE Review Queue', path: '/aicte/review-queue', pageNumber: 'P19' },
        { title: 'Review Case Workspace', path: '/aicte/case-workspace', pageNumber: 'P20' },
      ],
    },
    {
      id: 'grp-integrity',
      letter: 'I',
      title: 'Integrity Intelligence',
      icon: <Cpu size={18} />,
      allowedRoles: ['aicte_admin'],
      submenus: [
        { title: 'AI Risk Analysis & Signals', path: '/aicte/integrity', pageNumber: 'P21' },
      ],
    },
    {
      id: 'grp-policy',
      letter: 'J',
      title: 'Policy & Intake',
      icon: <BookOpen size={18} />,
      allowedRoles: ['aicte_admin'],
      submenus: [
        { title: 'Policy & Approved Intake', path: '/aicte/policy-intake', pageNumber: 'P22' },
      ],
    },
    {
      id: 'grp-recordtrust',
      letter: 'K',
      title: 'RecordTrust',
      icon: <FileCheck2 size={18} />,
      allowedRoles: ['aicte_admin', 'system_admin'],
      submenus: [
        { title: 'Audit Centre & Hash Logs', path: '/aicte/audit', pageNumber: 'P23' },
      ],
    },
    {
      id: 'grp-reports',
      letter: 'L',
      title: 'Analytics & Reports',
      icon: <BarChart3 size={18} />,
      allowedRoles: ['aicte_admin'],
      submenus: [
        { title: 'Reports & Analytics', path: '/aicte/reports', pageNumber: 'P24' },
      ],
    },
    {
      id: 'grp-verifier',
      letter: 'M',
      title: 'Verification',
      icon: <CheckSquare size={18} />,
      allowedRoles: ['authorised_verifier'],
      submenus: [
        { title: 'Verifier Dashboard', path: '/verifier/dashboard', pageNumber: 'P25' },
        { title: 'ConsentPass Issuance', path: '/verifier/consentpass', pageNumber: 'P26' },
      ],
    },
    {
      id: 'grp-admin',
      letter: 'N',
      title: 'System Administration',
      icon: <Settings size={18} />,
      allowedRoles: ['system_admin'],
      submenus: [
        { title: 'User Management & Roles', path: '/admin/users', pageNumber: 'P27' },
        { title: 'Integration & System Health', path: '/admin/integrations', pageNumber: 'P28' },
        { title: 'Notifications & Settings', path: '/admin/notifications', pageNumber: 'P29' },
      ],
    },
  ];

  // Filter groups by user's active role
  const visibleGroups = PARENT_GROUPS.filter(g => g.allowedRoles.includes(role));

  // Auto-expand the parent group containing the current route
  useEffect(() => {
    const currentPath = location.pathname;
    const parent = visibleGroups.find(g => 
      g.submenus.some(s => currentPath === s.path.split('?')[0])
    );
    if (parent) {
      setOpenParents(prev => ({ ...prev, [parent.id]: true }));
    }
  }, [location.pathname, role]);

  const toggleParent = (id: string) => {
    setOpenParents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <aside style={{
      width: collapsed ? '68px' : '260px',
      backgroundColor: '#1a2f4c',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 96px)',
      position: 'sticky',
      top: '96px',
      zIndex: 70,
      transition: 'width 0.2s ease',
      borderRight: '1px solid #001e46',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      {/* Sidebar Header with Collapse Toggle */}
      <div style={{
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: '#001e46',
      }}>
        {!collapsed && (
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Navigation Modules
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            color: '#cbd5e1',
            padding: '4px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Accordion Menu Area (Pushes content down, never overlaps content!) */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '10px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        {visibleGroups.map((group) => {
          const isOpen = !!openParents[group.id];
          const hasActiveChild = group.submenus.some(s => location.pathname === s.path.split('?')[0]);

          return (
            <div key={group.id} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Parent Group Header Button */}
              <button
                onClick={() => {
                  if (collapsed) setCollapsed(false);
                  toggleParent(group.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  backgroundColor: hasActiveChild ? 'rgba(21, 94, 239, 0.25)' : 'transparent',
                  color: hasActiveChild ? '#ffffff' : '#cbd5e1',
                  border: hasActiveChild ? '1px solid rgba(21, 94, 239, 0.4)' : '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease',
                  fontSize: '13px',
                  fontWeight: hasActiveChild ? 600 : 500,
                }}
                title={collapsed ? group.title : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: hasActiveChild ? '#60a5fa' : '#94a3b8' }}>{group.icon}</span>
                  {!collapsed && (
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {group.title}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <span style={{ color: '#94a3b8' }}>
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                )}
              </button>

              {/* Submenu Accordion Container - Expands INSIDE sidebar */}
              {!collapsed && isOpen && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '28px',
                  paddingTop: '3px',
                  paddingBottom: '5px',
                  gap: '2px',
                  borderLeft: '2px solid rgba(255,255,255,0.1)',
                  marginLeft: '18px',
                  marginTop: '2px',
                }}>
                  {group.submenus.map((sub, sIdx) => {
                    const isChildActive = location.pathname === sub.path.split('?')[0];

                    return (
                      <NavLink
                        key={sIdx}
                        to={sub.path}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          color: isChildActive ? '#ffffff' : '#94a3b8',
                          backgroundColor: isChildActive ? '#155eef' : 'transparent',
                          fontWeight: isChildActive ? 600 : 400,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background-color 0.1s ease',
                        }}
                      >
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sub.title}
                        </span>
                        {sub.pageNumber && (
                          <span style={{
                            fontSize: '9px',
                            background: isChildActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                            padding: '1px 4px',
                            borderRadius: '3px',
                            color: isChildActive ? '#ffffff' : '#cbd5e1',
                            fontFamily: 'monospace'
                          }}>
                            {sub.pageNumber}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Common Support Actions */}
      <div style={{
        padding: '10px 12px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <NavLink
          to="/support"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#cbd5e1',
            fontSize: '12px',
            padding: '6px 8px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          <HelpCircle size={15} />
          {!collapsed && <span>Help & Support</span>}
        </NavLink>
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#f87171',
            fontSize: '12px',
            padding: '6px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <LogOut size={15} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

