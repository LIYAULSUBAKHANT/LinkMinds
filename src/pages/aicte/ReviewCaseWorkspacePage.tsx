import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { 
  AlertTriangle, CheckCircle2, XCircle, RotateCcw, 
  ArrowLeft, FileText, Clock, Building, ShieldCheck, 
  User, Send, AlertCircle, Sparkles 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ReviewCaseWorkspacePage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();

  const caseItem = StorageService.getReviewCaseById(caseId || 'CASE-2026-9021') || StorageService.getReviewCases()[0];
  const [decisionNotes, setDecisionNotes] = useState('');
  const [pendingAction, setPendingAction] = useState<'APPROVED' | 'REJECTED' | 'RETURNED' | null>(null);

  const handleDecisionConfirm = () => {
    if (!decisionNotes.trim()) {
      toast.error('Please enter justification notes for the regulatory decision');
      return;
    }

    if (pendingAction) {
      StorageService.updateReviewCaseStatus(caseItem.caseId, pendingAction, decisionNotes);
      toast.success(`Case ${caseItem.caseId} updated to ${pendingAction}! Recorded in RecordTrust.`);
      setPendingAction(null);
      setDecisionNotes('');
      navigate('/aicte/review-queue');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Breadcrumb & Return Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/aicte/review-queue" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={14} />
          <span>Back to Review Queue</span>
        </Link>
        <span style={{ fontSize: '12px', color: '#64748b' }}>
          Regulatory Docket: <strong>{caseItem.caseId}</strong>
        </span>
      </div>

      {/* Case Header Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border-light)',
        borderRadius: '8px',
        padding: '20px 24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        borderLeft: '4px solid #f59e0b',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#001e46' }}>
              {caseItem.caseId}: {caseItem.title}
            </h1>
            <span className="badge badge-warning">{caseItem.reasonCode}</span>
            <StatusBadge status={caseItem.priority} />
            <StatusBadge status={caseItem.status} />
          </div>
          <div style={{ fontSize: '12.5px', color: '#64748b', display: 'flex', gap: '16px' }}>
            <span>Institution: <strong>{caseItem.institutionName}</strong></span>
            <span>•</span>
            <span>Age: <strong>{caseItem.agingDays} days</strong></span>
            <span>•</span>
            <span>Assigned Officer: <strong>{caseItem.assignedTo || 'AICTE Regulatory Officer'}</strong></span>
          </div>
        </div>
      </div>

      {/* Two-Column Deep Inspection Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
        gap: '24px',
      }}>
        {/* Left Column: Evidence & Case Particulars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Discrepancy Evidence Box */}
          <div className="gov-card">
            <h3 className="gov-card-title" style={{ marginBottom: '12px' }}>
              <FileText size={16} color="#155eef" />
              <span>Discrepancy Evidence Summary</span>
            </h3>
            <p style={{ fontSize: '13.5px', color: '#1e293b', lineHeight: 1.6, marginBottom: '16px' }}>
              {caseItem.evidenceSummary}
            </p>

            <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12.5px' }}>
              <div style={{ fontWeight: 700, color: '#001e46', marginBottom: '6px' }}>Regulatory Rule Excerpt:</div>
              <div style={{ color: '#475467', fontStyle: 'italic', lineHeight: 1.5 }}>
                "AICTE Process Handbook 2026-27, Section 4.3: Institutions submitting aggregate admissions that deviate by greater than 2% from student-level records must submit individual candidate KYC within 7 working days, failing which unallocated intake shall be remanded."
              </div>
            </div>
          </div>

          {/* AI Explainability Signal Card */}
          <div className="gov-card">
            <h3 className="gov-card-title" style={{ marginBottom: '12px' }}>
              <Sparkles size={16} color="#8b5cf6" />
              <span>AI Anomaly Signals & Explainability</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe', fontSize: '12.5px' }}>
                <strong>Temporal Isolation Forest Flag:</strong> Unusually high ratio of unlinked aggregate entries in CSE department compared to historical peers.
              </div>
              <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12.5px' }}>
                <strong>Intake Cap Protection:</strong> Sanctioned ceiling 240 seats. Active registered students 236. The 28 declared variance entries would exceed sanctioned capacity by 24 seats if all admitted.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Audit Trail & Decision Action Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Audit History Box */}
          <div className="gov-card">
            <h3 className="gov-card-title" style={{ marginBottom: '12px' }}>
              <Clock size={16} color="#16a34a" />
              <span>Docket Audit Trail & Action History</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto' }}>
              {caseItem.auditTrail.map((trail, idx) => (
                <div key={idx} style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>
                    <span>{trail.actor}</span>
                    <span>{trail.timestamp}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: '#001e46' }}>{trail.action}</div>
                  {trail.notes && <div style={{ color: '#475467', marginTop: '2px' }}>{trail.notes}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Decision Action Panel */}
          <div className="gov-card" style={{ borderTop: '4px solid #155eef' }}>
            <h3 className="gov-card-title" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={16} color="#155eef" />
              <span>Authorised Regulatory Decision Panel</span>
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', marginBottom: '14px' }}>
              Execute regulatory determination. All decisions require mandatory justification and create append-only cryptographic hashes.
            </p>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '12px' }}>Regulatory Justification & Notes *</label>
              <textarea
                rows={3}
                placeholder="Enter formal justification for decision..."
                value={decisionNotes}
                onChange={(e) => setDecisionNotes(e.target.value)}
                className="form-control"
                style={{ width: '100%', fontSize: '12.5px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '14px' }}>
              <button
                onClick={() => setPendingAction('APPROVED')}
                className="btn btn-primary btn-sm"
                style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
              >
                <CheckCircle2 size={14} />
                <span>Approve</span>
              </button>
              <button
                onClick={() => setPendingAction('RETURNED')}
                className="btn btn-secondary btn-sm"
                style={{ color: '#d97706', borderColor: '#fde68a', backgroundColor: '#fffbeb' }}
              >
                <RotateCcw size={14} />
                <span>Return for Correction</span>
              </button>
              <button
                onClick={() => setPendingAction('REJECTED')}
                className="btn btn-danger btn-sm"
              >
                <XCircle size={14} />
                <span>Reject / Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!pendingAction}
        title={`Confirm Regulatory Decision: ${pendingAction}`}
        message={`Are you sure you want to record the status '${pendingAction}' for case ${caseItem.caseId}? This action will append to the tamper-evident RecordTrust audit ledger.`}
        confirmLabel={`Confirm ${pendingAction}`}
        variant={pendingAction === 'REJECTED' ? 'danger' : pendingAction === 'APPROVED' ? 'primary' : 'warning'}
        onConfirm={handleDecisionConfirm}
        onCancel={() => setPendingAction(null)}
      >
        <div style={{ marginTop: '10px', padding: '10px', background: '#f8fafc', borderRadius: '4px', fontSize: '12px', border: '1px solid #e2e8f0' }}>
          <strong>Justification to be recorded:</strong> {decisionNotes || '<no notes entered>'}
        </div>
      </ConfirmationModal>
    </div>
  );
};

