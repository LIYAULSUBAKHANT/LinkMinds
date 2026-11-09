import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Building2, UploadCloud, GitCompare, Users, ArrowRight, 
  Clock, CheckCircle, AlertTriangle, FileSpreadsheet, Eye 
} from 'lucide-react';

export const InstitutionDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [academicYear, setAcademicYear] = useState('2026-2027');

  const submissions = StorageService.getSubmissions();
  const reconciliations = StorageService.getReconciliation();
  const students = StorageService.getStudents();

  // Synthetic KPI calculations
  const totalSubmitted = 472;
  const acceptedSubmissions = 450;
  const pendingReview = 18;
  const dataQualityScore = '98.2%';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Institution Header & Metadata */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border-light)',
        borderRadius: '8px',
        padding: '20px 24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: '#eff6ff',
            color: '#155eef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Building2 size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#001e46' }}>
                Bannari Amman Institute of Technology (BIT Sathy)
              </h1>
              <span className="badge badge-success">Accredited • Autonomous</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '14px', marginTop: '4px' }}>
              <span>AICTE Permanent ID: <strong>1-429182741</strong></span>
              <span>•</span>
              <span>Sathyamangalam, Tamil Nadu</span>
              <span>•</span>
              <span>Last Synchronised: <strong>Today, 10:45 AM</strong></span>
            </div>
          </div>
        </div>

        {/* Academic Year Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#475467' }}>Academic Year:</label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="form-control"
            style={{ padding: '6px 12px', fontSize: '13px', fontWeight: 600 }}
          >
            <option value="2026-2027">2026–2027 (Active)</option>
            <option value="2025-2026">2025–2026 (Audited)</option>
          </select>
        </div>
      </div>

      {/* 4 KPI Summary Cards matching Screenshot */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="Total Records Submitted"
          value={totalSubmitted}
          subtitle="Active student admissions ingested"
          icon={<FileSpreadsheet size={18} />}
          trend={{ value: '+12% vs last batch', isPositive: true }}
          accentColor="#155eef"
          onClick={() => navigate('/institution/students')}
        />
        <DashboardStatCard
          title="Accepted Submissions"
          value={acceptedSubmissions}
          subtitle="Validated & matched with APAAR"
          icon={<CheckCircle size={18} />}
          accentColor="#16a34a"
          onClick={() => navigate('/institution/submissions/tracking')}
        />
        <DashboardStatCard
          title="Pending Review"
          value={pendingReview}
          subtitle="S9 count & format exceptions"
          icon={<AlertTriangle size={18} />}
          trend={{ value: '18 records require review', isNeutral: true }}
          accentColor="#f59e0b"
          isPulsing={true}
          onClick={() => navigate('/institution/submissions/validation')}
        />
        <DashboardStatCard
          title="Data Quality Status"
          value={dataQualityScore}
          subtitle="Compliance integrity index"
          icon={<Building2 size={18} />}
          accentColor="#8b5cf6"
          onClick={() => navigate('/institution/reconciliation')}
        />
      </div>

      {/* 3 Action Shortcut Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        <div className="gov-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <UploadCloud size={20} color="#155eef" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#001e46' }}>Upload Admission Data</h3>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
              Upload new CSV or XLSX batches, perform automatic column header mapping, and review preflight issues.
            </p>
          </div>
          <Link to="/institution/submissions/upload" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>
            <span>Upload Batch</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="gov-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <GitCompare size={20} color="#16a34a" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#001e46' }}>View Reconciliation</h3>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
              Review aggregate reported admissions vs individual student records. Explain variances before cut-off.
            </p>
          </div>
          <Link to="/institution/reconciliation" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
            <span>Reconciliation Engine</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="gov-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Users size={20} color="#f59e0b" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#001e46' }}>Manage Student Records</h3>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
              Search student records, inspect masked APAAR IDs, and review chronological TEIE enrolment timelines.
            </p>
          </div>
          <Link to="/institution/students" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
            <span>Browse Records</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Main Tables Row: Recent Submissions & Reconciliation Status */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px',
      }} className="dashboard-tables-grid">
        {/* Table 1: Recent Submissions */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <FileSpreadsheet size={16} color="#155eef" />
              <span>Recent Submissions</span>
            </h3>
            <Link to="/institution/submissions/tracking" style={{ fontSize: '12px', fontWeight: 600 }}>
              View All Submissions
            </Link>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Programme</th>
                  <th>Date & Time</th>
                  <th>Total Records</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.slice(0, 3).map(sub => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: 600, color: '#001e46' }}>{sub.batchNumber}</td>
                    <td>{sub.programme}</td>
                    <td style={{ fontSize: '12px' }}>{sub.submissionDate}</td>
                    <td><strong>{sub.totalRecords}</strong> ({sub.validRecords} valid)</td>
                    <td>
                      <StatusBadge status={sub.status} />
                    </td>
                    <td>
                      <Link
                        to="/institution/submissions/validation"
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Eye size={12} />
                        <span>Preflight</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Reconciliation Status */}
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <GitCompare size={16} color="#16a34a" />
              <span>Programme Reconciliation Status</span>
            </h3>
            <Link to="/institution/reconciliation" style={{ fontSize: '12px', fontWeight: 600 }}>
              Open Reconciliation
            </Link>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Reported Count</th>
                  <th>Student Records</th>
                  <th>Variance</th>
                  <th>Outcome Status</th>
                </tr>
              </thead>
              <tbody>
                {reconciliations.map(rec => (
                  <tr key={rec.id}>
                    <td style={{ fontWeight: 600, color: '#001e46' }}>{rec.programme}</td>
                    <td>{rec.reportedAggregate}</td>
                    <td>{rec.studentRecordsCount}</td>
                    <td>
                      <span style={{
                        fontWeight: 700,
                        color: rec.variance > 0 ? '#dc2626' : '#16a34a',
                      }}>
                        {rec.variance > 0 ? `-${rec.variance}` : '0'}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={rec.outcome} />
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

