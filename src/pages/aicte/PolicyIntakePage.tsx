import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { 
  BookOpen, Building, ShieldCheck, CheckCircle2, 
  Edit3, History, Plus, Lock, FileText, ArrowRight 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const PolicyIntakePage: React.FC = () => {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState<'programmes' | 'versions' | 'history'>('programmes');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProg, setEditingProg] = useState<any>(null);

  const [programmes, setProgrammes] = useState([
    {
      id: 'p-1',
      code: 'CSE',
      name: 'B.Tech Computer Science & Engineering',
      approvedIntake: 240,
      ewsQuota: 24,
      tfwQuota: 12,
      nriQuota: 12,
      effectiveFrom: '2026-07-01',
      policyRef: 'AICTE-APH-2026-CL-4.2',
    },
    {
      id: 'p-2',
      code: 'IT',
      name: 'B.Tech Information Technology',
      approvedIntake: 120,
      ewsQuota: 12,
      tfwQuota: 6,
      nriQuota: 6,
      effectiveFrom: '2026-07-01',
      policyRef: 'AICTE-APH-2026-CL-4.2',
    },
    {
      id: 'p-3',
      code: 'ECE',
      name: 'B.Tech Electronics & Communication',
      approvedIntake: 180,
      ewsQuota: 18,
      tfwQuota: 9,
      nriQuota: 9,
      effectiveFrom: '2026-07-01',
      policyRef: 'AICTE-APH-2026-CL-4.2',
    },
  ]);

  const handleEditClick = (prog: any) => {
    if (role !== 'aicte_admin' && role !== 'system_admin') {
      toast.error('Only AICTE Regulatory Administrators can modify approved seat policy.');
      return;
    }
    setEditingProg({ ...prog });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setProgrammes(prev => prev.map(p => p.id === editingProg.id ? editingProg : p));
    setShowEditModal(false);
    toast.success(`Ratified new sanctioned intake for ${editingProg.code} in Master Policy!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              Policy & Approved Intake Master
            </h1>
            <span className="badge badge-success">Master Authority</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Authoritative regulatory repository for sanctioned program quotas, supernumerary allowances, and gazette versions.
          </p>
        </div>

        {role === 'aicte_admin' ? (
          <button
            onClick={() => toast.success('New policy version draft initialized')}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={14} />
            <span>Create Policy Revision</span>
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
            <Lock size={14} />
            <span>Read-Only Mode (Operator Role)</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('programmes')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'programmes' ? 700 : 500,
            color: activeTab === 'programmes' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'programmes' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Programme-Wise Intake Master
        </button>
        <button
          onClick={() => setActiveTab('versions')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'versions' ? 700 : 500,
            color: activeTab === 'versions' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'versions' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Versioned Policy Snapshots
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'history' ? 700 : 500,
            color: activeTab === 'history' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'history' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Seat Change History
        </button>
      </div>

      {/* TAB 1: PROGRAMME INTAKE MASTER */}
      {activeTab === 'programmes' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <BookOpen size={16} color="#155eef" />
              <span>Sanctioned Intake Master (Bannari Amman Institute of Technology)</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Permanent AICTE ID: 1-429182741
            </span>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Branch Code</th>
                  <th>Programme Name</th>
                  <th>Sanctioned Base Intake</th>
                  <th>EWS (10%)</th>
                  <th>TFW (5%)</th>
                  <th>NRI (5%)</th>
                  <th>Total Cap</th>
                  <th>Governing Policy Ref</th>
                  <th style={{ width: '90px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {programmes.map(prog => (
                  <tr key={prog.id}>
                    <td style={{ fontWeight: 700, color: '#001e46' }}>{prog.code}</td>
                    <td style={{ fontWeight: 600 }}>{prog.name}</td>
                    <td><strong>{prog.approvedIntake}</strong></td>
                    <td>{prog.ewsQuota}</td>
                    <td>{prog.tfwQuota}</td>
                    <td>{prog.nriQuota}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#155eef' }}>
                        {prog.approvedIntake + prog.ewsQuota + prog.tfwQuota + prog.nriQuota}
                      </span>
                    </td>
                    <td><code>{prog.policyRef}</code></td>
                    <td>
                      <button
                        onClick={() => handleEditClick(prog)}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Edit3 size={12} color="#155eef" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: VERSIONED POLICY SNAPSHOTS */}
      {activeTab === 'versions' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <span>Ratified Policy Snapshots & Gazette Notifications</span>
            </h3>
          </div>
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Snapshot ID</th>
                  <th>Gazette Reference</th>
                  <th>Ratification Date</th>
                  <th>Effective Academic Year</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: '#001e46', fontFamily: 'monospace' }}>AICTE-APH-2026-V2.1</td>
                  <td>Gazette of India Ext. Part III, Sec. 4</td>
                  <td>26 Oct 2026</td>
                  <td>2026–2027</td>
                  <td><span className="badge badge-success">Active Master</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#001e46', fontFamily: 'monospace' }}>AICTE-APH-2025-V1.0</td>
                  <td>Gazette of India Ext. Part III, Sec. 4</td>
                  <td>14 May 2025</td>
                  <td>2025–2026</td>
                  <td><span className="badge badge-neutral">Archived</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SEAT CHANGE HISTORY */}
      {activeTab === 'history' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <History size={16} color="#155eef" />
              <span>Historical Intake Amendment Log</span>
            </h3>
          </div>
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Amendment ID</th>
                  <th>Date & Time</th>
                  <th>Authorised AICTE Officer</th>
                  <th>Programme</th>
                  <th>Intake Modification</th>
                  <th>Reason / Order Reference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>AMD-2026-0814</td>
                  <td>26 Oct 2026, 11:15 AM</td>
                  <td>Dr. Ramesh Sharma (aicte_admin)</td>
                  <td>B.Tech Computer Science</td>
                  <td>180 seats → 240 seats (+60)</td>
                  <td>NBA Tier-1 Accreditation Expansion Order #849</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingProg && (
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
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '480px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '14px' }}>
              Edit Approved Intake: {editingProg.code}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Sanctioned Base Intake *</label>
                <input
                  type="number"
                  value={editingProg.approvedIntake}
                  onChange={(e) => setEditingProg({ ...editingProg, approvedIntake: Number(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">EWS Quota Seats (10%)</label>
                <input
                  type="number"
                  value={editingProg.ewsQuota}
                  onChange={(e) => setEditingProg({ ...editingProg, ewsQuota: Number(e.target.value) })}
                  className="form-control"
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowEditModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
              <button onClick={handleSaveEdit} className="btn btn-primary btn-sm">Save Ratification</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

