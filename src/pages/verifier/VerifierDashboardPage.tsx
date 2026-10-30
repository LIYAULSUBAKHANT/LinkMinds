import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  CheckSquare, QrCode, ShieldCheck, Search, Filter, 
  Eye, CheckCircle2, AlertTriangle, FileText, ArrowRight 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const VerifierDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const requests = [
    {
      id: 'vr-1',
      reqId: 'REQ-2026-9481',
      verifierOrg: 'Tata Consultancy Services (Background Screening)',
      studentRef: 'STU-2026-00184',
      candidateName: 'Aarav R. P.',
      purpose: 'Employment Background Verification',
      claimsVerified: 'Enrolment Status (Active), Degree Programme, Sanctioned Seat',
      date: '28 Oct 2026, 11:30 AM',
      status: 'Verified Pass',
    },
    {
      id: 'vr-2',
      reqId: 'REQ-2026-9480',
      verifierOrg: 'National Scholarship Portal (Ministry of Social Justice)',
      studentRef: 'STU-2026-00185',
      candidateName: 'Priya S.',
      purpose: 'Scholarship Eligibility Verification',
      claimsVerified: 'Category (OBC-NCL), Enrolment Status, Approved Intake',
      date: '27 Oct 2026, 04:15 PM',
      status: 'Verified Pass',
    },
    {
      id: 'vr-3',
      reqId: 'REQ-2026-9478',
      verifierOrg: 'Infosys Campus Hiring',
      studentRef: 'STU-2026-00187',
      candidateName: 'Vikramaditya S.',
      purpose: 'Graduate Engineering Onboarding',
      claimsVerified: 'Enrolment Status',
      date: '25 Oct 2026, 09:20 AM',
      status: 'Under Review',
    },
  ];

  const filtered = requests.filter(r => {
    const matchesSearch = r.reqId.toLowerCase().includes(search.toLowerCase()) ||
      r.studentRef.toLowerCase().includes(search.toLowerCase()) ||
      r.verifierOrg.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status.includes(statusFilter);
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              Authorised Verifier Dashboard
            </h1>
            <span className="badge badge-success">Zero-PII Disclosure Tier</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Privacy-preserving verification portal for employers, background checking agencies, and higher education boards.
          </p>
        </div>

        <button
          onClick={() => navigate('/verifier/consentpass')}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <QrCode size={15} />
          <span>Issue / Scan ConsentPass Credential</span>
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="Total Verification Queries"
          value="142"
          subtitle="Processed in AY 2026-27"
          icon={<CheckSquare size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="Verified Pass"
          value="128"
          subtitle="Cryptographically validated"
          icon={<CheckCircle2 size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="Pending Resolution"
          value="12"
          subtitle="Awaiting student consent"
          icon={<AlertTriangle size={18} />}
          accentColor="#f59e0b"
        />
        <DashboardStatCard
          title="Exceptions / Revoked"
          value="2"
          subtitle="Invalidated credentials"
          icon={<ShieldCheck size={18} />}
          accentColor="#dc2626"
        />
      </div>

      {/* Privacy Guarantee Banner */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <ShieldCheck size={24} color="#2563eb" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: '#1e40af', lineHeight: 1.5 }}>
          <strong>Minimal Disclosure Principle:</strong> Authorised Verifiers only receive purpose-limited claims (e.g. Enrolment Status = Active; Sanctioned Seat = Verified). Raw 12-digit APAAR numbers, Aadhaar seeds, and personal biometrics are permanently redacted.
        </div>
      </div>

      {/* Verification Query History Table */}
      <div className="gov-card">
        <div className="gov-card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="gov-card-title">
            <span>Recent Verification Requests & Audit Receipts</span>
          </h3>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="text"
                placeholder="Query ID or Student Ref..."
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
              <option value="Pass">Verified Pass</option>
              <option value="Review">Under Review</option>
            </select>
          </div>
        </div>

        <div className="gov-table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Query Ref</th>
                <th>Requesting Organisation</th>
                <th>Subject Reference</th>
                <th>Verification Purpose</th>
                <th>Authorised Claims Disclosed</th>
                <th>Timestamp</th>
                <th>Outcome Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(req => (
                <tr key={req.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#001e46' }}>
                    {req.reqId}
                  </td>
                  <td style={{ fontWeight: 600 }}>{req.verifierOrg}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                    {req.studentRef} ({req.candidateName})
                  </td>
                  <td style={{ fontSize: '12.5px' }}>{req.purpose}</td>
                  <td style={{ fontSize: '12px', color: '#475467' }}>
                    <span className="badge badge-info">{req.claimsVerified}</span>
                  </td>
                  <td style={{ fontSize: '12px' }}>{req.date}</td>
                  <td>
                    <StatusBadge status={req.status} />
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

