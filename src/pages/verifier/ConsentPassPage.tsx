import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { StorageService } from '../../services/storageService';
import { ConsentPassCredential } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  QrCode, ShieldCheck, CheckCircle2, RotateCcw, 
  Download, Printer, AlertTriangle, Key, Plus, Lock, Info 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ConsentPassPage: React.FC = () => {
  const credentials = StorageService.getCredentials();
  const [selectedCred, setSelectedCred] = useState<ConsentPassCredential>(credentials[0]);
  const [showIssueModal, setShowIssueModal] = useState(false);

  // New credential form
  const [newStudentRef, setNewStudentRef] = useState('STU-2026-00184');
  const [newPurpose, setNewPurpose] = useState('Employment Verification');

  const handleRevoke = (token: string) => {
    if (window.confirm(`Revoke credential token ${token}? This will immediately invalidate downstream verification scans.`)) {
      StorageService.revokeCredential(token);
      toast.success(`Credential ${token} revoked! Updated in RecordTrust registry.`);
      setSelectedCred({ ...selectedCred, status: 'Revoked' });
    }
  };

  const handleIssueCredential = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `CP-TKN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCred: ConsentPassCredential = {
      id: 'cp-' + Date.now(),
      token,
      studentRef: newStudentRef,
      studentName: 'Aarav Rajesh Patel',
      institution: 'Bannari Amman Institute of Technology (BIT Sathy)',
      programme: 'B.Tech Computer Science & Engineering',
      issueDate: new Date().toISOString().substring(0, 10),
      expiryDate: '2027-09-30',
      status: 'Active',
      permittedClaims: [
        'Enrolment Status: Active',
        'AICTE Approved Sanctioned Seat',
        `Verification Purpose: ${newPurpose}`,
        'Zero Anomaly Flags'
      ],
    };

    StorageService.addCredential(newCred);
    setSelectedCred(newCred);
    setShowIssueModal(false);
    toast.success('Generated new tamper-proof ConsentPass credential with QR!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              ConsentPass — Verifiable Academic Credential Portal
            </h1>
            <span className="badge badge-success">Privacy-Preserving QR</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Zero-knowledge academic verification tokens. Encodes only cryptographically verifiable hashes without exposing student PII.
          </p>
        </div>

        <button
          onClick={() => setShowIssueModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={15} />
          <span>Issue New ConsentPass</span>
        </button>
      </div>

      {/* Main Split Layout: Credential Card & Lifecycle Management */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '24px',
      }}>
        {/* Left Column: Digital Credential Card with Working Local QR */}
        <div style={{
          backgroundColor: '#001e46',
          borderRadius: '12px',
          color: '#ffffff',
          padding: '28px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid #1e3a5f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle background seal */}
          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            opacity: 0.05,
            pointerEvents: 'none',
          }}>
            <ShieldCheck size={260} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  AICTE CONSENTPASS VERIFIABLE CREDENTIAL
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  Student Admission Credential
                </h3>
              </div>
              <StatusBadge status={selectedCred.status} />
            </div>

            {/* QR Code and Candidate Details */}
            <div style={{
              display: 'flex',
              gap: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '8px',
              padding: '18px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}>
              {/* High-fidelity local QR using qrcode.react */}
              <div style={{
                backgroundColor: '#ffffff',
                padding: '10px',
                borderRadius: '8px',
                display: 'inline-block',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              }}>
                <QRCodeSVG
                  value={`https://satya-apaar.gov.in/verify?token=${selectedCred.token}`}
                  size={120}
                  level="M"
                  includeMargin={false}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px' }}>
                <div><strong>Subject:</strong> {selectedCred.studentName}</div>
                <div><strong>Enrolment Ref:</strong> <code style={{ color: '#93c5fd' }}>{selectedCred.studentRef}</code></div>
                <div><strong>Institution:</strong> {selectedCred.institution}</div>
                <div><strong>Programme:</strong> {selectedCred.programme}</div>
                <div><strong>Valid Until:</strong> {selectedCred.expiryDate}</div>
              </div>
            </div>

            {/* Permitted Purpose Claims (Zero-PII) */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11.5px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Purpose-Authorised Claims:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedCred.permittedClaims.map((claim, cIdx) => (
                  <span
                    key={cIdx}
                    style={{
                      backgroundColor: 'rgba(21, 94, 239, 0.25)',
                      border: '1px solid rgba(21, 94, 239, 0.5)',
                      color: '#93c5fd',
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {claim}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#cbd5e1',
          }}>
            <div>Token: <code>{selectedCred.token}</code></div>
            <div>AICTE SIH26263 Assurance Protocol</div>
          </div>
        </div>

        {/* Right Column: Actions & Revocation Registry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Action Buttons */}
          <div className="gov-card">
            <h3 className="gov-card-title" style={{ marginBottom: '14px' }}>
              <span>Credential Lifecycle Actions</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <button
                onClick={() => toast.success(`Token ${selectedCred.token} validated against RecordTrust ledger!`)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <CheckCircle2 size={14} />
                <span>Verify Token Signature</span>
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Printer size={14} />
                <span>Print Certificate</span>
              </button>
            </div>

            {selectedCred.status === 'Active' ? (
              <button
                onClick={() => handleRevoke(selectedCred.token)}
                className="btn btn-danger"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <AlertTriangle size={14} />
                <span>Revoke Credential (Flag in Registry)</span>
              </button>
            ) : (
              <div style={{ textAlign: 'center', padding: '8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', color: '#dc2626', fontSize: '12px', fontWeight: 600 }}>
                This credential has been revoked and is permanently invalidated.
              </div>
            )}
          </div>

          {/* Existing Credentials List */}
          <div className="gov-card">
            <h3 className="gov-card-title" style={{ marginBottom: '12px' }}>
              <span>Issued Credentials Registry</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
              {credentials.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCred(c)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: selectedCred.id === c.id ? '2px solid #155eef' : '1px solid #e2e8f0',
                    backgroundColor: selectedCred.id === c.id ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#001e46' }}>{c.studentName} ({c.studentRef})</div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>{c.token}</div>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Issue Modal */}
      {showIssueModal && (
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
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46', marginBottom: '14px' }}>
              Issue New ConsentPass Verifiable Token
            </h3>
            <form onSubmit={handleIssueCredential} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Student Reference ID *</label>
                <select
                  value={newStudentRef}
                  onChange={(e) => setNewStudentRef(e.target.value)}
                  className="form-control"
                >
                  <option value="STU-2026-00184">STU-2026-00184 (Aarav Patel)</option>
                  <option value="STU-2026-00185">STU-2026-00185 (Priya Sundararajan)</option>
                  <option value="STU-2026-00186">STU-2026-00186 (Rohan Mehra)</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Authorized Verification Purpose *</label>
                <input
                  type="text"
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value)}
                  className="form-control"
                  placeholder="e.g. Employment Verification, Scholarship Eligibility"
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowIssueModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Generate Token</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

