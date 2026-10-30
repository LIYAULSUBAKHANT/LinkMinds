import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { User, UserRole } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { 
  Settings, Users, ShieldCheck, Key, Lock, 
  Plus, Edit2, UserX, CheckCircle2, AlertTriangle, Save 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const UserManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'matrix' | 'config'>('users');
  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'Dr. Ramesh Sharma', email: 'admin.aicte@satya-apaar.gov.in', role: 'aicte_admin', designation: 'Chief Regulatory Officer' },
    { id: 'u2', name: 'Prof. K. Venkatesh', email: 'operator@bitsathy.ac.in', role: 'institution_operator', institutionName: 'Bannari Amman Institute', designation: 'Dean Admissions' },
    { id: 'u3', name: 'Ananya Deshmukh', email: 'verifier@tcs-check.com', role: 'authorised_verifier', designation: 'Verification Lead' },
    { id: 'u4', name: 'Suresh Kumar', email: 'sysadmin@satya-apaar.gov.in', role: 'system_admin', designation: 'Systems Architect' },
  ]);

  const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'institution_operator' as UserRole });

  const permissionsMatrix = [
    { module: 'Institution Portal & Registration', InstOp: true, AicteAdmin: false, Verifier: false, SysAdmin: false },
    { module: 'Admission Ingestion & Mapping', InstOp: true, AicteAdmin: true, Verifier: false, SysAdmin: false },
    { module: 'Preflight Validation & Fixes', InstOp: true, AicteAdmin: true, Verifier: false, SysAdmin: false },
    { module: 'Aggregate Reconciliation', InstOp: true, AicteAdmin: true, Verifier: false, SysAdmin: false },
    { module: 'Student Records & TEIE Timeline', InstOp: true, AicteAdmin: true, Verifier: false, SysAdmin: false },
    { module: 'SeatGuard Approved Ledger', InstOp: false, AicteAdmin: true, Verifier: false, SysAdmin: false },
    { module: 'AICTE Review Queue & Decisions', InstOp: false, AicteAdmin: true, Verifier: false, SysAdmin: false },
    { module: 'Integrity Intelligence AI Signals', InstOp: false, AicteAdmin: true, Verifier: false, SysAdmin: false },
    { module: 'Policy & Approved Intake Master', InstOp: false, AicteAdmin: true, Verifier: false, SysAdmin: false },
    { module: 'RecordTrust Audit Hash Chain', InstOp: false, AicteAdmin: true, Verifier: false, SysAdmin: true },
    { module: 'ConsentPass Minimal Credential Check', InstOp: false, AicteAdmin: false, Verifier: true, SysAdmin: false },
    { module: 'User Management & Role Assignment', InstOp: false, AicteAdmin: false, Verifier: false, SysAdmin: true },
  ];

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      toast.error('Please enter name and email');
      return;
    }
    const created: User = {
      id: 'u-' + Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      designation: 'Nodal Officer',
    };
    setUsers([...users, created]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'institution_operator' });
    toast.success(`User ${created.name} onboarded!`);
  };

  const handleConfirmDeactivate = () => {
    if (deactivatingUser) {
      setUsers(users.filter(u => u.id !== deactivatingUser.id));
      toast.success(`Deactivated user ${deactivatingUser.name}`);
      setDeactivatingUser(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              System Administration & Access Control
            </h1>
            <span className="badge badge-danger">Canonical User Administration</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Sole authoritative control centre for user provisioning, granular RBAC permissions, and system parameters.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={15} />
          <span>Onboard New System User</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'users' ? 700 : 500,
            color: activeTab === 'users' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'users' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Canonical User Registry ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'matrix' ? 700 : 500,
            color: activeTab === 'matrix' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'matrix' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Role & Permission Matrix
        </button>
        <button
          onClick={() => setActiveTab('config')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'config' ? 700 : 500,
            color: activeTab === 'config' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'config' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          System Configuration & Policies
        </button>
      </div>

      {/* TAB 1: CANONICAL USER REGISTRY */}
      {activeTab === 'users' && (
        <div className="gov-card">
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Email ID</th>
                  <th>Assigned Role</th>
                  <th>Designation / Organisation</th>
                  <th>MFA Status</th>
                  <th style={{ width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#001e46' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>ID: {u.id}</div>
                    </td>
                    <td style={{ fontSize: '12.5px' }}>{u.email}</td>
                    <td>
                      <span className="badge badge-info">{u.role.replace('_', ' ').toUpperCase()}</span>
                    </td>
                    <td style={{ fontSize: '12px' }}>{u.designation}</td>
                    <td>
                      <span className="badge badge-success">MFA Active</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => toast.success(`Password reset link dispatched to ${u.email}`)}
                          className="btn btn-secondary btn-sm"
                          title="Reset Password"
                        >
                          <Key size={12} color="#155eef" />
                        </button>
                        <button
                          onClick={() => setDeactivatingUser(u)}
                          className="btn btn-secondary btn-sm"
                          title="Deactivate User"
                        >
                          <UserX size={12} color="#dc2626" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ROLE & PERMISSION MATRIX */}
      {activeTab === 'matrix' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <ShieldCheck size={16} color="#155eef" />
              <span>Granular Role-Based Access Control (RBAC) Matrix</span>
            </h3>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Functional Module Scope</th>
                  <th style={{ textAlign: 'center' }}>Institution Operator</th>
                  <th style={{ textAlign: 'center' }}>AICTE Administrator</th>
                  <th style={{ textAlign: 'center' }}>Authorised Verifier</th>
                  <th style={{ textAlign: 'center' }}>System Admin</th>
                </tr>
              </thead>
              <tbody>
                {permissionsMatrix.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: '#001e46' }}>{row.module}</td>
                    <td style={{ textAlign: 'center' }}>{row.InstOp ? '✓ Allowed' : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{row.AicteAdmin ? '✓ Allowed' : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{row.Verifier ? '✓ Allowed' : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{row.SysAdmin ? '✓ Allowed' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM CONFIGURATION */}
      {activeTab === 'config' && (
        <div className="gov-card">
          <h3 className="gov-card-title" style={{ marginBottom: '16px' }}>
            <span>Portal Operational Parameters</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Active Academic Year</label>
              <input type="text" readOnly value="2026–2027 (Current Active Cycle)" className="form-control" style={{ background: '#f8fafc' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Session Idle Timeout</label>
              <input type="text" readOnly value="30 Minutes (Auto-Logout)" className="form-control" style={{ background: '#f8fafc' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Batch Upload File Limit</label>
              <input type="text" readOnly value="15 MB (CSV, XLSX, XLS)" className="form-control" style={{ background: '#f8fafc' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Password Policy Standard</label>
              <input type="text" readOnly value="Strict (12+ Chars, Alphanumeric + Symbols)" className="form-control" style={{ background: '#f8fafc' }} />
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deactivatingUser}
        title="Confirm User Account Deactivation"
        message={`Are you sure you want to deactivate ${deactivatingUser?.name} (${deactivatingUser?.email})? They will immediately lose access to the portal.`}
        confirmLabel="Deactivate User"
        variant="danger"
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setDeactivatingUser(null)}
      />

      {/* Add User Modal */}
      {showAddModal && (
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
          zIndex: 1000,
          padding: '20px',
        }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '440px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46', marginBottom: '14px' }}>
              Onboard System User
            </h3>
            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Email ID *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Assigned Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                  className="form-control"
                >
                  <option value="institution_operator">Institution Operator</option>
                  <option value="aicte_admin">AICTE Administrator</option>
                  <option value="authorised_verifier">Authorised Verifier</option>
                  <option value="system_admin">System Administrator</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
