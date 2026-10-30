import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Institution } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Building2, Search, Filter, Download, Eye, 
  MapPin, ShieldAlert, Award, X, ExternalLink 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const InstitutionExplorerPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);

  const institutions = StorageService.getInstitutions();

  const filtered = institutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.permanentId.toLowerCase().includes(search.toLowerCase()) ||
      inst.city.toLowerCase().includes(search.toLowerCase());
    const matchesState = stateFilter === 'ALL' || inst.state === stateFilter;
    const matchesType = typeFilter === 'ALL' || inst.type === typeFilter;

    return matchesSearch && matchesState && matchesType;
  });

  const handleExportInstitutions = () => {
    let csv = 'PermanentID,InstitutionName,State,City,Type,ApprovedIntake,AdmittedCount,ReconciliationRate,RiskPriority\n';
    filtered.forEach(i => {
      csv += `"${i.permanentId}","${i.name}","${i.state}","${i.city}","${i.type}",${i.approvedIntake},${i.admittedCount},${i.reconciliationRate}%,${i.riskPriority}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aicte_institutions_directory.csv';
    a.click();
    toast.success('Downloaded AICTE institutions directory (CSV)');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
            AICTE Approved Institution Explorer
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            National registry of AICTE-approved colleges, intake capacities, and aggregate reconciliation compliance.
          </p>
        </div>

        <button
          onClick={handleExportInstitutions}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={14} color="#155eef" />
          <span>Export Institutions (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="gov-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Search Directory</label>
            <div style={{ position: 'relative' }}>
              <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="text"
                placeholder="Institution Name, Permanent ID, City..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '32px', fontSize: '12.5px' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>State / Region</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="ALL">All States (National Scope)</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Haryana">Haryana</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Institution Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="ALL">All Categories</option>
              <option value="Autonomous">Autonomous College</option>
              <option value="State">State University</option>
              <option value="Central">Central University</option>
              <option value="Private">Private / Self-Financing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Institutions Table */}
      <div className="gov-card">
        <div className="gov-card-header">
          <h3 className="gov-card-title">
            <span>Approved Institutions ({filtered.length} matching)</span>
          </h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Academic Year 2026–2027
          </span>
        </div>

        <div className="gov-table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Permanent ID</th>
                <th>Institution Name</th>
                <th>Location</th>
                <th>Category</th>
                <th>Approved Intake</th>
                <th>Admitted</th>
                <th>Reconciliation %</th>
                <th>Risk Priority</th>
                <th style={{ width: '100px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inst => (
                <tr key={inst.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#001e46' }}>
                    {inst.permanentId}
                  </td>
                  <td style={{ fontWeight: 600 }}>{inst.name}</td>
                  <td style={{ fontSize: '12.5px' }}>{inst.city}, {inst.state}</td>
                  <td><span className="badge badge-neutral">{inst.type}</span></td>
                  <td><strong>{inst.approvedIntake}</strong></td>
                  <td>{inst.admittedCount}</td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: inst.reconciliationRate > 95 ? '#16a34a' : inst.reconciliationRate > 85 ? '#f59e0b' : '#dc2626'
                    }}>
                      {inst.reconciliationRate}%
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={inst.riskPriority} />
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedInst(inst)}
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Eye size={12} color="#155eef" />
                      <span>Dossier</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institution Dossier Drawer */}
      {selectedInst && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '460px',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid #cbd5e1',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46' }}>Institutional Dossier</h3>
            <button onClick={() => setSelectedInst(null)} style={{ cursor: 'pointer', color: '#64748b' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#eff6ff', color: '#155eef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46' }}>{selectedInst.name}</h4>
                <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>AICTE ID: {selectedInst.permanentId}</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Category:</strong> {selectedInst.type}</div>
              <div><strong>Campus Location:</strong> {selectedInst.city}, {selectedInst.state}</div>
              <div><strong>Total Sanctioned Intake:</strong> {selectedInst.approvedIntake} seats</div>
              <div><strong>Admitted Students:</strong> {selectedInst.admittedCount} students</div>
              <div><strong>Reconciliation Progress:</strong> <span style={{ fontWeight: 700, color: '#16a34a' }}>{selectedInst.reconciliationRate}%</span></div>
              <div><strong>Data Quality Score:</strong> {selectedInst.dataQualityScore}%</div>
              <div><strong>Regulatory Risk Flag:</strong> <StatusBadge status={selectedInst.riskPriority} /></div>
              <div><strong>Authorised Contact:</strong> {selectedInst.contactPerson} ({selectedInst.email})</div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => { setSelectedInst(null); toast.success('Filtered review cases for ' + selectedInst.name); }}
                className="btn btn-primary"
              >
                Inspect Associated Review Cases
              </button>
              <button
                onClick={() => setSelectedInst(null)}
                className="btn btn-secondary"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

