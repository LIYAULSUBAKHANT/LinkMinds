import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  AlertTriangle, CheckCircle2, Clock, Eye, Filter, 
  Search, ShieldAlert, ArrowRight, UserCheck 
} from 'lucide-react';

export const ReviewQueuePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'ASSIGNED' | 'APPROVED'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const cases = StorageService.getReviewCases();

  const filtered = cases.filter(c => {
    const matchesTab = activeTab === 'ALL' || c.status === activeTab;
    const matchesPriority = priorityFilter === 'ALL' || c.priority === priorityFilter;
    const matchesSearch = c.caseId.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.institutionName.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesPriority && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
            AICTE Regulatory Review Queue
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Investigate flagged aggregate variances, TEIE temporal collisions, and seat capacity discrepancies.
          </p>
        </div>
      </div>

      {/* 4 KPI Cards matching Screenshot */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="Total Open Cases"
          value={cases.length}
          subtitle="Awaiting administrative action"
          icon={<AlertTriangle size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="High Priority Cases"
          value={cases.filter(c => c.priority === 'HIGH').length}
          subtitle="S5 & S9 variance collisions"
          icon={<ShieldAlert size={18} />}
          accentColor="#dc2626"
        />
        <DashboardStatCard
          title="Assigned to Me"
          value="2"
          subtitle="Under active investigation"
          icon={<UserCheck size={18} />}
          accentColor="#f59e0b"
        />
        <DashboardStatCard
          title="Average Resolution Age"
          value="1.8 days"
          subtitle="Well below 5-day regulatory SLA"
          icon={<Clock size={18} />}
          accentColor="#16a34a"
        />
      </div>

      {/* Queue Filter Bar */}
      <div className="gov-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'ALL', label: 'All Cases' },
              { id: 'PENDING', label: 'Pending Review' },
              { id: 'ASSIGNED', label: 'Assigned' },
              { id: 'APPROVED', label: 'Resolved / Approved' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  border: '1px solid #cbd5e1',
                  background: activeTab === tab.id ? '#001e46' : '#ffffff',
                  color: activeTab === tab.id ? '#ffffff' : '#475467',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="text"
                placeholder="Case ID or college..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '30px', fontSize: '12px' }}
              />
            </div>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '12px', padding: '6px 10px' }}
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High Priority Only</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Review Queue Table */}
      <div className="gov-card">
        <div className="gov-table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Reason Code</th>
                <th>Investigation Title</th>
                <th>Institution</th>
                <th>Priority</th>
                <th>Aging</th>
                <th>Status</th>
                <th>Assigned Officer</th>
                <th style={{ width: '120px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(cs => (
                <tr key={cs.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#001e46' }}>
                    {cs.caseId}
                  </td>
                  <td>
                    <span className="badge badge-warning">{cs.reasonCode}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{cs.title}</td>
                  <td style={{ fontSize: '12.5px' }}>{cs.institutionName}</td>
                  <td>
                    <StatusBadge status={cs.priority} />
                  </td>
                  <td style={{ fontSize: '12px' }}>{cs.agingDays} days ago</td>
                  <td>
                    <StatusBadge status={cs.status} />
                  </td>
                  <td style={{ fontSize: '12px', color: '#475467' }}>
                    {cs.assignedTo || <span style={{ color: '#94a3b8' }}>Unassigned</span>}
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/aicte/review-queue/${cs.caseId}`)}
                      className="btn btn-primary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Eye size={12} />
                      <span>Workspace</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

