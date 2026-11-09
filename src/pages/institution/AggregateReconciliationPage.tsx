import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  GitCompare, AlertTriangle, CheckCircle2, RotateCcw, 
  Send, FileText, Info, Building, Filter 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AggregateReconciliationPage: React.FC = () => {
  const [selectedProgramme, setSelectedProgramme] = useState('B.Tech Computer Science & Engineering');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [explanationText, setExplanationText] = useState(
    '28 student admissions pending document verification at local center; records will be uploaded in Batch 0043.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reconciliations = StorageService.getReconciliation();
  const activeItem = reconciliations.find(r => r.programme === selectedProgramme) || reconciliations[0];

  const handleSaveExplanation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      StorageService.updateReconciliationExplanation(activeItem.id, explanationText);
      toast.success('Authorised explanation recorded in reconciliation ledger!');
      setIsSubmitting(false);
    }, 400);
  };

  const handleRerunReconciliation = () => {
    toast.success('Re-running aggregate matching engine against updated student registry...');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
            Aggregate Reconciliation Engine
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Compare institution-reported aggregate enrolment tallies against submitted student-level records.
          </p>
        </div>

        <button
          onClick={handleRerunReconciliation}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RotateCcw size={14} color="#155eef" />
          <span>Re-run Reconciliation Engine</span>
        </button>
      </div>

      {/* Scope Controls Strip */}
      <div className="gov-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Filter size={15} color="#155eef" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#001e46' }}>Reconciliation Scope Parameters</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Programme</label>
            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              {reconciliations.map(r => (
                <option key={r.id} value={r.programme}>{r.programme}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Category Scope</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="ALL">All Categories Combined</option>
              <option value="General">General</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="SC/ST">SC / ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Cut-off Reporting Period</label>
            <input
              type="text"
              readOnly
              value="AY 2026-27 (Cut-off: 31 Oct 2026)"
              className="form-control"
              style={{ backgroundColor: '#f8fafc', fontSize: '12.5px' }}
            />
          </div>
        </div>
      </div>

      {/* 4 Summary Cards matching Screenshot (Illustrative 500 vs 472 = 28 Variance) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="Reported Aggregate Total"
          value={activeItem.reportedAggregate}
          subtitle="Institution head declared tally"
          icon={<Building size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="Student Records Eligible"
          value={activeItem.studentRecordsCount}
          subtitle="Verified APAAR linked records"
          icon={<CheckCircle2 size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="Reconciliation Variance"
          value={activeItem.variance > 0 ? `-${activeItem.variance}` : '0'}
          subtitle={activeItem.variance > 0 ? '28 student identities missing' : 'Zero discrepancy'}
          icon={<AlertTriangle size={18} />}
          accentColor={activeItem.variance > 0 ? '#dc2626' : '#16a34a'}
          isPulsing={activeItem.variance > 0}
        />
        <DashboardStatCard
          title="Reconciliation Outcome"
          value={activeItem.outcome.split('—')[0].trim()}
          subtitle={activeItem.outcome}
          badge={<StatusBadge status={activeItem.outcome} />}
          accentColor={activeItem.variance > 0 ? '#f59e0b' : '#16a34a'}
        />
      </div>

      {/* Variance Explanation Alert */}
      {activeItem.variance > 0 && (
        <div style={{
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '8px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.6 }}>
            <strong>Regulatory Variance Flag:</strong> Institution reported an aggregate enrolment of <strong>{activeItem.reportedAggregate}</strong> students, but provided only <strong>{activeItem.studentRecordsCount}</strong> valid student records (Variance: <strong>{activeItem.variance}</strong>). Pursuant to AICTE Reconciliation Protocol, the system will not fabricate student identities. Please provide an authorised explanation or submit missing batch records.
          </div>
        </div>
      )}

      {/* Programme Category Breakdown Table */}
      <div className="gov-card">
        <div className="gov-card-header">
          <h3 className="gov-card-title">
            <span>Category-Wise Reconciliation Breakdown</span>
          </h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Academic Year 2026–2027
          </span>
        </div>

        <div className="gov-table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Reservation Category</th>
                <th>Reported Aggregate Tally</th>
                <th>Student Records Ingested</th>
                <th>Category Variance</th>
                <th>Utilisation Status</th>
              </tr>
            </thead>
            <tbody>
              {activeItem.categoryBreakdown.map((cat, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: '#001e46' }}>{cat.category}</td>
                  <td>{cat.reported}</td>
                  <td><strong>{cat.actual}</strong></td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: cat.variance > 0 ? '#dc2626' : '#16a34a',
                    }}>
                      {cat.variance > 0 ? `-${cat.variance}` : 'Reconciled'}
                    </span>
                  </td>
                  <td>
                    {cat.variance > 0 ? (
                      <span className="badge badge-warning">Pending Details</span>
                    ) : (
                      <span className="badge badge-success">Fully Matched</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authorised Explanation Panel */}
      <div className="gov-card">
        <h3 className="gov-card-title" style={{ marginBottom: '12px' }}>
          <FileText size={16} color="#155eef" />
          <span>Authorised Institutional Explanation & Evidence Docket</span>
        </h3>
        <p style={{ fontSize: '12.5px', color: '#64748b', marginBottom: '14px' }}>
          Document the institutional rationale for any unresolved variances. This explanation is appended directly to the AICTE Review Case docket and cryptographically hashed in RecordTrust.
        </p>

        <textarea
          rows={3}
          value={explanationText}
          onChange={(e) => setExplanationText(e.target.value)}
          className="form-control"
          style={{ width: '100%', marginBottom: '14px', fontSize: '13px' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={handleSaveExplanation}
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Send size={14} />
            <span>{isSubmitting ? 'Recording...' : 'Save Authorised Explanation'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

