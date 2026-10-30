import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Building, 
  BarChart3, Clock, Lock, Info, Filter 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const SeatGuardPage: React.FC = () => {
  const { role } = useAuth();
  const [selectedProgramme, setSelectedProgramme] = useState('B.Tech Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('2026-2027');

  const seatEntries = StorageService.getSeatLedger();

  // Synthetic Category Breakdown with Progress Bars
  const categoryData = [
    { category: 'General (Sanctioned)', approved: 120, admitted: 118, remaining: 2, supernumerary: 0, status: 'Normal' },
    { category: 'OBC-NCL (27%)', approved: 65, admitted: 64, remaining: 1, supernumerary: 0, status: 'Near Capacity' },
    { category: 'SC / ST Reservation (22.5%)', approved: 55, admitted: 54, remaining: 1, supernumerary: 0, status: 'Near Capacity' },
    { category: 'EWS Quota (10% Supernumerary)', approved: 24, admitted: 22, remaining: 2, supernumerary: 24, status: 'Normal' },
    { category: 'TFW / PMSSS (Supernumerary)', approved: 12, admitted: 11, remaining: 1, supernumerary: 12, status: 'Normal' },
  ];

  const chartData = [
    { category: 'General', Approved: 120, Admitted: 118 },
    { category: 'OBC-NCL', Approved: 65, Admitted: 64 },
    { category: 'SC/ST', Approved: 55, Admitted: 54 },
    { category: 'EWS', Approved: 24, Admitted: 22 },
    { category: 'TFW/PMSSS', Approved: 12, Admitted: 11 },
  ];

  const ledgerEvents = [
    { txId: 'TX-2026-89102', timestamp: '2026-10-24 14:32', type: 'Seat Allocation', studentRef: 'STU-2026-00184', category: 'General', status: 'Confirmed' },
    { txId: 'TX-2026-89101', timestamp: '2026-10-24 14:30', type: 'Seat Allocation', studentRef: 'STU-2026-00185', category: 'OBC-NCL', status: 'Confirmed' },
    { txId: 'TX-2026-88402', timestamp: '2026-10-18 11:20', type: 'Seat Surrender / Withdrawal', studentRef: 'STU-2026-00172', category: 'General', status: 'Released' },
    { txId: 'TX-2026-87910', timestamp: '2026-10-12 16:48', type: 'Supernumerary Allocation', studentRef: 'STU-2026-00188', category: 'Foreign National', status: 'Allocated' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              SeatGuard — Approved Seat Ledger
            </h1>
            <span className="badge badge-info">AICTE Approved Master Linked</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Real-time approved seat ledger tracking sanctioned ceilings, category quotas, and supernumerary pools.
          </p>
        </div>

        {/* View-Only Indicator for Institution Role */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: role === 'institution_operator' ? '#f8fafc' : '#eff6ff',
          border: '1px solid #cbd5e1',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#334155',
        }}>
          <Lock size={13} color="#64748b" />
          <span>
            {role === 'institution_operator' 
              ? 'Institution Mode: View-Only Approved Master' 
              : 'Regulatory Mode: Authorized Policy Governance'}
          </span>
        </div>
      </div>

      {/* Scope Controls */}
      <div className="gov-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Sanctioned Programme</label>
            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
              <option value="B.Tech Information Technology">B.Tech Information Technology</option>
              <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication</option>
            </select>
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Academic Year</label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="2026-2027">2026–2027 (Active Session)</option>
              <option value="2025-2026">2025–2026 (Historical)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="AICTE Approved Intake"
          value="240"
          subtitle="Sanctioned base capacity"
          icon={<Building size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="Active Admitted Seats"
          value="236"
          subtitle="Verified eligible enrolments"
          icon={<CheckCircle2 size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="Remaining Capacity"
          value="4"
          subtitle="Available for admission"
          icon={<ShieldCheck size={18} />}
          accentColor="#f59e0b"
        />
        <DashboardStatCard
          title="Over-Intake Alerts"
          value="0"
          subtitle="Zero quota violations in scope"
          icon={<AlertTriangle size={18} />}
          accentColor="#16a34a"
        />
      </div>

      {/* Visual Chart & Utilisation Bars Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px',
      }} className="seatguard-grid">
        {/* Recharts Bar Chart */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <BarChart3 size={16} color="#155eef" />
              <span>Seat Allocation Overview: Approved vs Admitted</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>B.Tech CSE</span>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <XAxis dataKey="category" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Approved" fill="#001e46" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Admitted" fill="#155eef" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category-wise Seat Utilisation Table with Progress Bars */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <span>Category Seat Utilisation & Capacity Bars</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Policy Ref: <code>AICTE-APH-2026-CL-4.2</code>
            </span>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Category Quota</th>
                  <th>Approved Intake</th>
                  <th>Active Admitted</th>
                  <th>Utilisation %</th>
                  <th>Remaining</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((cat, idx) => {
                  const pct = Math.round((cat.admitted / cat.approved) * 100);
                  return (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: '#001e46' }}>{cat.category}</td>
                      <td>{cat.approved}</td>
                      <td><strong>{cat.admitted}</strong></td>
                      <td style={{ width: '180px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${pct}%`,
                              height: '100%',
                              backgroundColor: pct > 98 ? '#dc2626' : pct > 90 ? '#f59e0b' : '#16a34a'
                            }} />
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 600, width: '32px' }}>{pct}%</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, color: cat.remaining === 0 ? '#dc2626' : '#155eef' }}>
                        {cat.remaining}
                      </td>
                      <td>
                        <StatusBadge status={cat.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seat Event Ledger Audit Table */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <Clock size={16} color="#155eef" />
              <span>Seat Transaction Ledger (Immutable Chronological Log)</span>
            </h3>
            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
              Append-only state machine ledger
            </span>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Timestamp</th>
                  <th>Event Type</th>
                  <th>Student Reference</th>
                  <th>Quota Category</th>
                  <th>Ledger Status</th>
                </tr>
              </thead>
              <tbody>
                {ledgerEvents.map(evt => (
                  <tr key={evt.txId}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#001e46' }}>
                      {evt.txId}
                    </td>
                    <td style={{ fontSize: '12px' }}>{evt.timestamp}</td>
                    <td><span style={{ fontWeight: 600 }}>{evt.type}</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{evt.studentRef}</td>
                    <td>{evt.category}</td>
                    <td>
                      <StatusBadge status={evt.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

