import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  FileSpreadsheet, CheckCircle2, Clock, AlertTriangle, 
  Search, Filter, Download, Eye, RotateCcw, ArrowRight 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const SubmissionTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const submissions = StorageService.getSubmissions();

  const filtered = submissions.filter(s => {
    const matchesSearch = s.batchNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.programme.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadReceipt = (batchNum: string) => {
    const receipt = `AICTE SATYA-APAAR 2.1 SUBMISSION RECEIPT
Batch ID: ${batchNum}
Institution: Bannari Amman Institute of Technology (BIT Sathy)
Generated At: ${new Date().toISOString()}
Cryptographic Receipt Token: RCPT-2026-${Math.floor(100000 + Math.random() * 900000)}
Status: Ingested into AICTE Regulatory Pipeline
`;
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submission_receipt_${batchNum}.txt`;
    a.click();
    toast.success(`Downloaded official receipt for ${batchNum}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
            Submission Tracking & Batch Lifecycle
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Monitor real-time ingestion progress, review cycles, and batch resubmission history.
          </p>
        </div>

        <button
          onClick={() => navigate('/institution/submissions/upload')}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <span>Upload New Batch</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="Total Submissions"
          value="12"
          subtitle="Cumulative batch uploads"
          icon={<FileSpreadsheet size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="Processed & Ratified"
          value="9"
          subtitle="Fully reconciled batches"
          icon={<CheckCircle2 size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="Under AICTE Review"
          value="2"
          subtitle="Pending case resolution"
          icon={<Clock size={18} />}
          accentColor="#f59e0b"
        />
        <DashboardStatCard
          title="Needs Correction"
          value="1"
          subtitle="Returned with discrepancy findings"
          icon={<AlertTriangle size={18} />}
          accentColor="#dc2626"
        />
      </div>

      {/* Visual Batch Lifecycle Stepper */}
      <div className="gov-card">
        <h3 className="gov-card-title" style={{ marginBottom: '16px' }}>
          <span>Standard AICTE Submission Pipeline Lifecycle</span>
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {[
            { step: '1. Ingestion & Mapping', desc: 'CSV parsed, columns mapped', status: 'Completed' },
            { step: '2. Preflight Validation', desc: 'Luhn & structural format checks', status: 'Completed' },
            { step: '3. Aggregate Reconciliation', desc: 'Tallies matched against intake ledger', status: 'Under Review' },
            { step: '4. RecordTrust Ratification', desc: 'Hashed block created & finalized', status: 'Pending' },
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '14px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#001e46' }}>{item.step}</span>
                <StatusBadge status={item.status} />
              </div>
              <p style={{ fontSize: '12px', color: '#64748b' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and History Table */}
      <div className="gov-card">
        <div className="gov-card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="gov-card-title">
            <span>Institutional Batch History</span>
          </h3>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="text"
                placeholder="Search batch or branch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '30px', fontSize: '12px' }}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '12px', padding: '6px 10px' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="Processed">Processed</option>
              <option value="Under Review">Under Review</option>
              <option value="Needs Correction">Needs Correction</option>
            </select>
          </div>
        </div>

        <div className="gov-table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Sanctioned Programme</th>
                <th>Submission Timestamp</th>
                <th>Record Count</th>
                <th>Status</th>
                <th>Version</th>
                <th style={{ width: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(sub => (
                <tr key={sub.id}>
                  <td style={{ fontWeight: 600, color: '#001e46', fontFamily: 'monospace' }}>
                    {sub.batchNumber}
                  </td>
                  <td>{sub.programme}</td>
                  <td style={{ fontSize: '12px' }}>{sub.submissionDate}</td>
                  <td>
                    <strong>{sub.totalRecords}</strong> ({sub.validRecords} valid)
                  </td>
                  <td>
                    <StatusBadge status={sub.status} />
                  </td>
                  <td><span className="badge badge-neutral">{sub.version}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => navigate('/institution/submissions/validation')}
                        className="btn btn-secondary btn-sm"
                        title="View Validation Details"
                      >
                        <Eye size={12} color="#155eef" />
                      </button>
                      <button
                        onClick={() => handleDownloadReceipt(sub.batchNumber)}
                        className="btn btn-secondary btn-sm"
                        title="Download Ingestion Receipt"
                      >
                        <Download size={12} color="#16a34a" />
                      </button>
                    </div>
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

