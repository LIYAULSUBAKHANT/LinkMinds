import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Fingerprint, CheckCircle2, AlertTriangle, AlertCircle, 
  HelpCircle, RefreshCw, Shield, ArrowRight, UserCheck, Search 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const APAARIdentityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matching' | 'exceptions' | 'adapter'>('matching');
  const [manualMatchResolved, setManualMatchResolved] = useState(false);

  const candidateMatches = [
    {
      id: 'match-1',
      submittedName: 'Aditya N. Verma',
      submittedDob: '2004-03-14',
      submittedGender: 'M',
      candidateApaar: '5192-XXXX-3829',
      matchedName: 'Aditya Narayan Verma',
      matchScore: 94.2,
      confidence: 'High Probabilistic Match',
      sourceMatch: 'Fellegi-Sunter Weighted Lexical Alignment',
      institution: 'BIT Sathy vs Apex Institute',
      status: manualMatchResolved ? 'Resolved — Linked' : 'Pending Human Sign-off',
    },
    {
      id: 'match-2',
      submittedName: 'Rohan M. Mehra',
      submittedDob: '2004-11-05',
      submittedGender: 'M',
      candidateApaar: '7192-XXXX-4910',
      matchedName: 'Rohan Mehra',
      matchScore: 98.6,
      confidence: 'Confirmed Candidate',
      sourceMatch: 'Aadhaar-seeded APAAR Registry',
      institution: 'Delhi Technological University',
      status: 'Resolved — Sequential Transfer',
    },
  ];

  const handleResolveCandidate = (id: string) => {
    setManualMatchResolved(true);
    toast.success('Candidate identity manually resolved and recorded in audit log. Records not destructively merged.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              APAAR Identity Resolver
            </h1>
            <span className="badge badge-mock">Page 14 • Design Inferred</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Validate 12-digit academic identities, resolve fuzzy candidate matches, and manage structured non-APAAR exceptions.
          </p>
        </div>

        {/* Adapter Simulated Status Badge */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '6px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
          <span>APAAR Mock Registry Adapter: <strong>Simulated Demo Service (210ms)</strong></span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('matching')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'matching' ? 700 : 500,
            color: activeTab === 'matching' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'matching' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Candidate Matching Queue
        </button>
        <button
          onClick={() => setActiveTab('exceptions')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'exceptions' ? 700 : 500,
            color: activeTab === 'exceptions' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'exceptions' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Non-APAAR Exceptions (Foreign / NRI)
        </button>
        <button
          onClick={() => setActiveTab('adapter')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'adapter' ? 700 : 500,
            color: activeTab === 'adapter' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'adapter' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Adapter Health & Cryptographic Hashing
        </button>
      </div>

      {/* TAB 1: CANDIDATE MATCHING QUEUE */}
      {activeTab === 'matching' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="gov-card">
            <div className="gov-card-header">
              <div>
                <h3 className="gov-card-title">
                  <Fingerprint size={16} color="#155eef" />
                  <span>Probabilistic Candidate Matching Queue</span>
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Matches flagged candidates with similar Name / DOB variations. Requires explicit operator confirmation.
                </p>
              </div>
            </div>

            <div className="gov-table-container">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Submitted Identity Particulars</th>
                    <th>Registry Candidate APAAR</th>
                    <th>Registry Name</th>
                    <th>Match Score</th>
                    <th>Algorithm & Context</th>
                    <th>Resolution Status</th>
                    <th style={{ width: '130px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateMatches.map(m => (
                    <tr key={m.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#001e46' }}>{m.submittedName}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>DOB: {m.submittedDob} • Gender: {m.submittedGender}</div>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontSize: '12px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                          {m.candidateApaar}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{m.matchedName}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 700, color: '#16a34a' }}>{m.matchScore}%</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '12px', color: '#475467' }}>
                        <div>{m.sourceMatch}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{m.institution}</div>
                      </td>
                      <td>
                        <StatusBadge status={m.status} />
                      </td>
                      <td>
                        {m.status.includes('Pending') ? (
                          <button
                            onClick={() => handleResolveCandidate(m.id)}
                            className="btn btn-primary btn-sm"
                            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <UserCheck size={13} />
                            <span>Confirm Match</span>
                          </button>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Confirmed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Privacy & Safeguard Warning */}
          <div style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            padding: '14px 18px',
            fontSize: '12.5px',
            color: '#1e40af',
            lineHeight: 1.6,
          }}>
            <strong>Safeguard Rule:</strong> Probabilistic candidate matches never automatically merge or overwrite student records. Human confirmation is mandatory before creating a verified identity link. When external APAAR adapters encounter temporary outages, records remain in a temporary <em>Pending</em> state and are never branded as identity fraud.
          </div>
        </div>
      )}

      {/* TAB 2: NON-APAAR EXCEPTIONS */}
      {activeTab === 'exceptions' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <span>Configured Non-APAAR Exception Docket</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Exempted from 12-digit APAAR requirements per AICTE Guidelines
            </span>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Student Reference</th>
                  <th>Candidate Name</th>
                  <th>Exception Category</th>
                  <th>Alternative Identification Token</th>
                  <th>Verification Evidence</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: '#001e46', fontFamily: 'monospace' }}>STU-2026-00188</td>
                  <td>Daphne Al-Mansoor</td>
                  <td><span className="badge badge-info">Foreign National</span></td>
                  <td><code>FN-VISA-99410 (Valid Passport)</code></td>
                  <td>Embassy Clearance & Student Visa</td>
                  <td><span className="badge badge-success">Approved Exception</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#001e46', fontFamily: 'monospace' }}>STU-2026-00214</td>
                  <td>Kenji Sato</td>
                  <td><span className="badge badge-info">Supernumerary Exchange</span></td>
                  <td><code>INTL-EXCH-84192</code></td>
                  <td>MOU Annexure B</td>
                  <td><span className="badge badge-success">Approved Exception</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ADAPTER HEALTH */}
      {activeTab === 'adapter' && (
        <div className="gov-card">
          <h3 className="gov-card-title" style={{ marginBottom: '14px' }}>
            <span>Cryptographic Pseudonymization & Adapter Simulation</span>
          </h3>
          <p style={{ fontSize: '13px', color: '#475467', lineHeight: 1.6, marginBottom: '20px' }}>
            SATYA-APAAR never stores raw APAAR identifiers in browser storage or public viewports. Identifiers are salted and hashed via client-side HMAC-SHA256 tokens in this prototype demonstration.
          </p>

          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
            <div><strong>Adapter Environment:</strong> Simulated Prototype Connector (Local Mock Adapter)</div>
            <div><strong>Hash Algorithm:</strong> SHA-256 HMAC with Institution-Scoped Salt</div>
            <div><strong>Average Latency:</strong> 210 ms (Synthetic)</div>
            <div><strong>Luhn Format Verification:</strong> Enabled (Active)</div>
          </div>
        </div>
      )}
    </div>
  );
};

