import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Building, Users, GitCompare, AlertTriangle, ShieldCheck, 
  Search, Filter, ArrowRight, Eye, AlertCircle, TrendingUp, CheckCircle2 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  Legend, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

export const CentralDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('ALL');
  const [academicYear, setAcademicYear] = useState('2026-2027');

  const institutions = StorageService.getInstitutions();
  const reviewCases = StorageService.getReviewCases();

  // Synthetic National Trend Data
  const trendData = [
    { month: 'Jun', Submissions: 1200, Reconciled: 1150 },
    { month: 'Jul', Submissions: 3400, Reconciled: 3220 },
    { month: 'Aug', Submissions: 8900, Reconciled: 8450 },
    { month: 'Sep', Submissions: 10200, Reconciled: 9800 },
    { month: 'Oct', Submissions: 10480, Reconciled: 9920 },
  ];

  const stateData = [
    { state: 'Tamil Nadu', Institutions: 520, Rate: '98.2%' },
    { state: 'Maharashtra', Institutions: 610, Rate: '97.4%' },
    { state: 'Delhi NCR', Institutions: 240, Rate: '96.5%' },
    { state: 'Karnataka', Institutions: 480, Rate: '95.8%' },
    { state: 'Rajasthan', Institutions: 310, Rate: '84.1%' },
  ];

  const riskDistribution = [
    { name: 'Low Priority (Healthy)', value: 88, color: '#16a34a' },
    { name: 'Medium Advisory', value: 9, color: '#f59e0b' },
    { name: 'High Priority (Review Queue)', value: 3, color: '#dc2626' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#001e46',
        borderRadius: '8px',
        padding: '24px',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        borderLeft: '4px solid #f59e0b',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
              AICTE National Central Command & Monitoring
            </h1>
            <span style={{ backgroundColor: '#155eef', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
              HQ Regulatory Suite
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#cbd5e1' }}>
            All India Council for Technical Education • Nelson Mandela Marg, New Delhi • Real-Time National Ingestion & Assurance
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/aicte/review-queue')}
            className="btn btn-orange btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <AlertCircle size={15} />
            <span>Open Review Queue (28 Active)</span>
          </button>
        </div>
      </div>

      {/* 4 National KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="Total AICTE Institutions"
          value="10,480"
          subtitle="99.4% onboarded on portal"
          icon={<Building size={18} />}
          trend={{ value: '+42 new this week', isPositive: true }}
          accentColor="#155eef"
          onClick={() => navigate('/aicte/institutions')}
        />
        <DashboardStatCard
          title="Student Records Processed"
          value="4.2M"
          subtitle="Seeded with 12-digit APAAR"
          icon={<Users size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="National Reconciliation Rate"
          value="94.6%"
          subtitle="Aggregate vs student records"
          icon={<GitCompare size={18} />}
          trend={{ value: 'Target: 98% by Nov', isNeutral: true }}
          accentColor="#0284c7"
          onClick={() => navigate('/institution/reconciliation')}
        />
        <DashboardStatCard
          title="Urgent Review Cases"
          value="28"
          subtitle="S5 & S9 variance investigations"
          icon={<AlertTriangle size={18} />}
          accentColor="#dc2626"
          onClick={() => navigate('/aicte/review-queue')}
        />
      </div>

      {/* National Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
        gap: '24px',
      }}>
        {/* Trend Chart */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <TrendingUp size={16} color="#155eef" />
              <span>National Ingestion & Reconciliation Trend (AY 2026-27)</span>
            </h3>
          </div>
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="Submissions" stroke="#001e46" strokeWidth={2} />
                <Line type="monotone" dataKey="Reconciled" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <ShieldCheck size={16} color="#16a34a" />
              <span>Institutional Compliance Risk Classification</span>
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '240px', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* State-Wise Table & Urgent Review Queue */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
        gap: '24px',
      }}>
        {/* Table 1: State Compliance */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <span>State-Wise Monitoring Tally</span>
            </h3>
            <Link to="/aicte/institutions" style={{ fontSize: '12px', fontWeight: 600 }}>
              Explore All States
            </Link>
          </div>
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>State / Territory</th>
                  <th>Institutions</th>
                  <th>Reconciliation %</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map(st => (
                  <tr key={st.state}>
                    <td style={{ fontWeight: 600, color: '#001e46' }}>{st.state}</td>
                    <td>{st.Institutions}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#16a34a' }}>{st.Rate}</span>
                    </td>
                    <td>
                      <Link to="/aicte/institutions" className="btn btn-secondary btn-sm">
                        <span>Inspect</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Urgent Review Queue */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <AlertTriangle size={16} color="#dc2626" />
              <span>Urgent Discrepancy Queue (Pending Review)</span>
            </h3>
            <Link to="/aicte/review-queue" style={{ fontSize: '12px', fontWeight: 600 }}>
              View All 28 Cases
            </Link>
          </div>
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Reason</th>
                  <th>Institution</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviewCases.slice(0, 3).map(cs => (
                  <tr key={cs.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#001e46' }}>
                      {cs.caseId}
                    </td>
                    <td><span className="badge badge-warning">{cs.reasonCode}</span></td>
                    <td style={{ fontSize: '12px' }}>{cs.institutionName.split('(')[0]}</td>
                    <td><StatusBadge status={cs.priority} /></td>
                    <td>
                      <Link
                        to={`/aicte/review-queue/${cs.caseId}`}
                        className="btn btn-primary btn-sm"
                      >
                        <Eye size={12} />
                        <span>Workspace</span>
                      </Link>
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

