import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  CheckCircle2, AlertTriangle, AlertCircle, Download, 
  ArrowRight, Filter, RefreshCw, FileText 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const PreflightValidationPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'Error' | 'Warning' | 'Duplicate'>('ALL');

  const issues = [
    {
      id: 'iss-1',
      rowNumber: 14,
      fieldName: 'apaar_id',
      reasonCode: 'S2 - Invalid Format',
      finding: '12-digit structural checksum failed (Luhn check mismatch)',
      severity: 'Error' as const,
      recommendedAction: 'Verify original APAAR slip with candidate; update via correction submission.',
    },
    {
      id: 'iss-2',
      rowNumber: 28,
      fieldName: 'student_ref',
      reasonCode: 'S3 - Duplicate Ingest',
      finding: 'Same enrolment ref STU-2026-00028 appears twice in batch',
      severity: 'Duplicate' as const,
      recommendedAction: 'Remove duplicate row or verify lateral branch transfer status.',
    },
    {
      id: 'iss-3',
      rowNumber: 45,
      fieldName: 'dob',
      reasonCode: 'S7 - Probabilistic Warning',
      finding: 'DOB format inconsistent (expected YYYY-MM-DD, received DD/MM/YYYY)',
      severity: 'Warning' as const,
      recommendedAction: 'Auto-converted by preflight parser; verify accuracy.',
    },
    {
      id: 'iss-4',
      rowNumber: 92,
      fieldName: 'apaar_id',
      reasonCode: 'S6 - Missing Identity Token',
      finding: 'APAAR absent for Foreign National supernumerary candidate',
      severity: 'Warning' as const,
      recommendedAction: 'Routed to Configured Supernumerary Exception pool; upload passport copy.',
    },
    {
      id: 'iss-5',
      rowNumber: 118,
      fieldName: 'programme',
      reasonCode: 'S8 - Capacity Flag',
      finding: 'Branch allocation approaches 98% of AICTE approved ceiling',
      severity: 'Warning' as const,
      recommendedAction: 'SeatGuard advisory: 4 seats remaining in CSE General.',
    },
  ];

  const filteredIssues = filterSeverity === 'ALL' 
    ? issues 
    : issues.filter(i => i.severity === filterSeverity || (filterSeverity === 'Error' && i.severity === 'Duplicate'));

  const handleDownloadReport = () => {
    const reportContent = `SATYA-APAAR 2.1 PREFLIGHT VALIDATION AUDIT REPORT
Batch ID: BATCH-2026-0042
Institution: Bannari Amman Institute of Technology (BIT Sathy)
Total Records Evaluated: 500
Eligible Valid Records: 472
Validation Errors: 18
Advisory Warnings: 10
Preflight Integrity Index: 94.4%

ROW-LEVEL ISSUES DETECTED:
Row 14 | apaar_id | S2 Invalid Format | Checksum failed
Row 28 | student_ref | S3 Duplicate Entry | Repeated identifier
Row 45 | dob | S7 Format Discrepancy | Date format corrected
Row 92 | apaar_id | S6 Foreign National | Exception configured
Row 118 | programme | S8 Near Capacity | Sanctioned ceiling reached
`;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'preflight_validation_report_BATCH-2026-0042.txt';
    a.click();
    toast.success('Downloaded preflight validation report');
  };

  const handleProceedToReconciliation = () => {
    toast.success('Proceeding to Aggregate Reconciliation with 472 valid records...');
    navigate('/institution/reconciliation');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
            Preflight Validation Results
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Batch BATCH-2026-0042 • B.Tech Computer Science & Engineering (AY 2026-27)
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={14} color="#155eef" />
          <span>Export Validation Report</span>
        </button>
      </div>

      {/* 4 KPI Cards matching Screenshot */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="Total Evaluated Records"
          value="500"
          subtitle="Total rows in submitted batch"
          icon={<FileText size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="Valid Records"
          value="472"
          subtitle="Passed structural & schema rules"
          icon={<CheckCircle2 size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="Row-Level Errors"
          value="18"
          subtitle="Blocked until corrected"
          icon={<AlertCircle size={18} />}
          accentColor="#dc2626"
        />
        <DashboardStatCard
          title="Advisory Warnings"
          value="10"
          subtitle="Non-blocking candidate notices"
          icon={<AlertTriangle size={18} />}
          accentColor="#f59e0b"
        />
      </div>

      {/* Issues Table & Next Steps Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px',
      }}>
        <div className="gov-card">
          <div className="gov-card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 className="gov-card-title">
                <span>Row-Level Discrepancy Findings</span>
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                Filter findings by severity level to investigate issues before submission finalization.
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['ALL', 'Error', 'Warning'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilterSeverity(f)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    border: '1px solid #cbd5e1',
                    background: filterSeverity === f ? '#001e46' : '#ffffff',
                    color: filterSeverity === f ? '#ffffff' : '#475467',
                    cursor: 'pointer',
                  }}
                >
                  {f === 'ALL' ? 'All Issues (28)' : f === 'Error' ? 'Errors (18)' : 'Warnings (10)'}
                </button>
              ))}
            </div>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>Row #</th>
                  <th style={{ width: '130px' }}>Field</th>
                  <th style={{ width: '180px' }}>Reason Code</th>
                  <th>Finding & Anomaly Details</th>
                  <th style={{ width: '100px' }}>Severity</th>
                  <th>Recommended Operator Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map(iss => (
                  <tr key={iss.id}>
                    <td><strong>Row {iss.rowNumber}</strong></td>
                    <td><code>{iss.fieldName}</code></td>
                    <td style={{ fontWeight: 600, color: '#001e46' }}>{iss.reasonCode}</td>
                    <td style={{ fontSize: '12.5px' }}>{iss.finding}</td>
                    <td>
                      <StatusBadge status={iss.severity} />
                    </td>
                    <td style={{ fontSize: '12px', color: '#475467' }}>
                      {iss.recommendedAction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <button
              onClick={() => navigate('/institution/submissions/upload')}
              className="btn btn-secondary"
            >
              Upload Revised Batch
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleProceedToReconciliation}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Proceed to Aggregate Reconciliation (472 Valid)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

