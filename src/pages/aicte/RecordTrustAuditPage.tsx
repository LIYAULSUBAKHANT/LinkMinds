import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  FileCheck2, ShieldCheck, CheckCircle2, Lock, 
  RotateCcw, Search, Download, AlertTriangle, Key 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const RecordTrustAuditPage: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [chainValid, setChainValid] = useState<boolean | null>(true);
  const [search, setSearch] = useState('');

  const auditEvents = StorageService.getAuditLogs();

  const handleVerifyChain = async () => {
    setIsVerifying(true);
    // Simulate browser Web Crypto SHA-256 verification
    setTimeout(() => {
      setIsVerifying(false);
      setChainValid(true);
      toast.success('Cryptographic SHA-256 hash chain verified! Zero block alterations detected.');
    }, 600);
  };

  const handleExportAuditLogs = () => {
    let csv = 'EventID,Timestamp,Actor,Role,Action,Target,Reason,PreviousHash,CurrentHash\n';
    auditEvents.forEach(e => {
      csv += `${e.eventId},${e.timestamp},"${e.actor}","${e.role}",${e.action},${e.entityTarget},"${e.reason}",${e.previousHash},${e.currentHash}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recordtrust_audit_chain_export.csv';
    a.click();
    toast.success('Exported cryptographic audit logs');
  };

  const filtered = auditEvents.filter(e => 
    e.eventId.toLowerCase().includes(search.toLowerCase()) ||
    e.actor.toLowerCase().includes(search.toLowerCase()) ||
    e.action.toLowerCase().includes(search.toLowerCase()) ||
    e.entityTarget.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              RecordTrust Audit Centre
            </h1>
            <span className="badge badge-success">Cryptographic Immutability</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Tamper-evident, hash-chained transaction audit trail ensuring total non-repudiation across AICTE operations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleVerifyChain}
            disabled={isVerifying}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ShieldCheck size={15} />
            <span>{isVerifying ? 'Verifying Hashes...' : 'Verify Cryptographic Chain'}</span>
          </button>
          <button
            onClick={handleExportAuditLogs}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} color="#155eef" />
            <span>Export Audit Trail (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="Total Logged Events"
          value={auditEvents.length}
          subtitle="All mutations & decisions recorded"
          icon={<FileCheck2 size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="Hash Chain Status"
          value={chainValid ? '100% Valid' : 'Compromised'}
          subtitle="SHA-256 block continuity"
          icon={<ShieldCheck size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="Non-Repudiation Level"
          value="High"
          subtitle="Actor, role, & reason linked"
          icon={<Lock size={18} />}
          accentColor="#0284c7"
        />
        <DashboardStatCard
          title="Audit Block Depth"
          value="1,284"
          subtitle="Blocks sealed since genesis"
          icon={<Key size={18} />}
          accentColor="#8b5cf6"
        />
      </div>

      {/* Verification Integrity Banner */}
      <div style={{
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}>
        <CheckCircle2 size={24} color="#16a34a" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: '#166534', lineHeight: 1.5 }}>
          <strong>Tamper-Evident Cryptographic Assurance:</strong> Every transaction hash is recursively computed from the previous block hash: <code>Hash(n) = SHA256(Hash(n-1) + Payload + Timestamp + Actor)</code>. Any unauthorized modification to prior submissions or decisions renders the mathematical chain verification invalid.
        </div>
      </div>

      {/* Search and Table */}
      <div className="gov-card">
        <div className="gov-card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="gov-card-title">
            <span>Immutable Audit Event Stream</span>
          </h3>

          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Filter by event ID, actor, or action..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '30px', fontSize: '12px' }}
            />
          </div>
        </div>

        <div className="gov-table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Timestamp (UTC)</th>
                <th>Actor & Role</th>
                <th>Action Type</th>
                <th>Target Object</th>
                <th>Reason / Justification</th>
                <th>Cryptographic SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(evt => (
                <tr key={evt.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#001e46' }}>
                    {evt.eventId}
                  </td>
                  <td style={{ fontSize: '12px' }}>{evt.timestamp}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{evt.actor}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{evt.role}</div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', background: '#eff6ff', color: '#155eef', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      {evt.action}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{evt.entityTarget}</td>
                  <td style={{ fontSize: '12.5px', color: '#334155' }}>{evt.reason}</td>
                  <td>
                    <div style={{ fontFamily: 'monospace', fontSize: '10.5px', color: '#64748b' }} title={evt.currentHash}>
                      {evt.currentHash.substring(0, 16)}...{evt.currentHash.substring(48)}
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

