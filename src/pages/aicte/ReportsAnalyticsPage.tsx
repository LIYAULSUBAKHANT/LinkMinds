import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { 
  BarChart3, Download, Printer, Filter, Building, 
  Users, GitCompare, ShieldCheck, FileSpreadsheet 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  Legend, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import toast from 'react-hot-toast';

export const ReportsAnalyticsPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2026-2027');
  const [reportType, setReportType] = useState('reconciliation');

  const admissionsTrend = [
    { programme: 'CSE', Sanctioned: 240, Enrolled: 236 },
    { programme: 'IT', Sanctioned: 120, Enrolled: 120 },
    { programme: 'ECE', Sanctioned: 180, Enrolled: 172 },
    { programme: 'Mech', Sanctioned: 120, Enrolled: 114 },
    { programme: 'Civil', Sanctioned: 60, Enrolled: 68 },
  ];

  const categoryUtilisation = [
    { name: 'General', value: 48, color: '#001e46' },
    { name: 'OBC-NCL', value: 27, color: '#155eef' },
    { name: 'SC/ST', value: 15, color: '#16a34a' },
    { name: 'EWS', value: 10, color: '#f59e0b' },
  ];

  const handleExportCSV = () => {
    let csv = 'Programme,SanctionedIntake,EnrolledCount,UtilisationPercentage\n';
    admissionsTrend.forEach(row => {
      const pct = Math.round((row.Enrolled / row.Sanctioned) * 100);
      csv += `${row.programme},${row.Sanctioned},${row.Enrolled},${pct}%\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aicte_reports_export_${selectedYear}.csv`;
    a.click();
    toast.success('Downloaded report CSV');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
            Reports & Regulatory Analytics
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            National aggregates, admission velocity trends, and seat capacity utilization breakdowns.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} color="#155eef" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={14} />
            <span>Print Report Dossier</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="gov-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Report Dimension</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="reconciliation">Reconciliation & Variance Analysis</option>
              <option value="intake">Seat Intake & Quota Utilisation</option>
              <option value="risk">Institutional Integrity & Risk Indices</option>
            </select>
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Academic Year Scope</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="2026-2027">2026–2027 (Current)</option>
              <option value="2025-2026">2025–2026 (Audited)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="National Sanctioned Seats"
          value="720"
          subtitle="In-scope demo programmes"
          icon={<Building size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="Active Confirmed Admissions"
          value="710"
          subtitle="98.6% overall utilisation"
          icon={<Users size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="Aggregate Variance Gap"
          value="28"
          subtitle="Awaiting candidate KYC"
          icon={<GitCompare size={18} />}
          accentColor="#f59e0b"
        />
        <DashboardStatCard
          title="Over-Capacity Flags"
          value="1"
          subtitle="Apex Civil (+8 excess)"
          icon={<ShieldCheck size={18} />}
          accentColor="#dc2626"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
        gap: '24px',
      }}>
        {/* Chart 1: Admissions vs Sanctioned */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <BarChart3 size={16} color="#155eef" />
              <span>Sanctioned Capacity vs Confirmed Enrolments</span>
            </h3>
          </div>
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionsTrend} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <XAxis dataKey="programme" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Sanctioned" fill="#001e46" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Enrolled" fill="#155eef" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Quota Distribution */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <span>National Quota Breakdown %</span>
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '240px', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryUtilisation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryUtilisation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

