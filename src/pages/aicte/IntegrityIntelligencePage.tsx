import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Cpu, AlertTriangle, ShieldCheck, Share2, 
  BarChart2, Info, ArrowRight, CheckCircle2, Building 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';

export const IntegrityIntelligencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signals' | 'graph' | 'benchmarking'>('signals');

  const anomalySignals = [
    {
      id: 'sig-1',
      signal: 'Concurrent Multi-Institution Enrolment Collision',
      ruleCode: 'TEIE-ANOM-04',
      riskScore: 92,
      confidence: '96% (Deterministically Verified)',
      peerGroup: 'Autonomous Engineering Institutions',
      finding: 'Candidate STU-2026-00189 enrolled simultaneously in BIT Sathy and Apex Institute for >90 days.',
      status: 'Flagged for Review',
    },
    {
      id: 'sig-2',
      signal: 'Aggregate-to-Student Record Variance Divergence',
      ruleCode: 'REC-VAR-09',
      riskScore: 84,
      confidence: '98% (Record Audit Check)',
      peerGroup: 'Tamil Nadu Region Technical Colleges',
      finding: 'Declared aggregate total 500 deviates by 28 records from submitted student records in CSE.',
      status: 'Under Review',
    },
    {
      id: 'sig-3',
      signal: 'Rapid Supernumerary Allocation Spike',
      ruleCode: 'SEAT-QUOTA-02',
      riskScore: 68,
      confidence: '82% (Statistical Outlier)',
      peerGroup: 'Private Technical Institutes (Rajasthan)',
      finding: 'Civil branch allocated 113% of approved intake within 48 hours of cut-off.',
      status: 'Advisory Alert',
    },
  ];

  const benchmarkData = [
    { metric: 'Reconciliation Rate', CurrentInstitution: 98.2, PeerAverage: 94.6 },
    { metric: 'Preflight Error Rate', CurrentInstitution: 3.6, PeerAverage: 5.2 },
    { metric: 'Variance %', CurrentInstitution: 5.6, PeerAverage: 2.1 },
    { metric: 'TEIE Transfer Regularity', CurrentInstitution: 99.1, PeerAverage: 96.0 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              Integrity Intelligence (AI & Rule Engine)
            </h1>
            <span className="badge badge-info">Explainable AI • Active Model</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Transparent anomaly detection, peer benchmarking, and enrolment relationship graph analysis.
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '11.5px',
          color: '#1e40af',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Info size={14} />
          <span>Risk Scores (0-100) are for Review Prioritization, NOT Proof of Fraud</span>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        <DashboardStatCard
          title="National Risk Index"
          value="18.4"
          subtitle="Low system-wide anomaly index"
          icon={<ShieldCheck size={18} />}
          accentColor="#16a34a"
        />
        <DashboardStatCard
          title="Active Anomaly Signals"
          value="3"
          subtitle="Rule-based detections in scope"
          icon={<AlertTriangle size={18} />}
          accentColor="#f59e0b"
        />
        <DashboardStatCard
          title="Model Precision Rate"
          value="98.2%"
          subtitle="Benchmarked on synthetic sets"
          icon={<Cpu size={18} />}
          accentColor="#155eef"
        />
        <DashboardStatCard
          title="Explainability Score"
          value="100%"
          subtitle="Zero black-box decisions"
          icon={<CheckCircle2 size={18} />}
          accentColor="#0284c7"
        />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('signals')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'signals' ? 700 : 500,
            color: activeTab === 'signals' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'signals' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Explainable Risk Signals (SHAP)
        </button>
        <button
          onClick={() => setActiveTab('graph')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'graph' ? 700 : 500,
            color: activeTab === 'graph' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'graph' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Enrolment Relationship Graph
        </button>
        <button
          onClick={() => setActiveTab('benchmarking')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'benchmarking' ? 700 : 500,
            color: activeTab === 'benchmarking' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'benchmarking' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Peer Group Benchmarking
        </button>
      </div>

      {/* TAB 1: EXPLAINABLE RISK SIGNALS */}
      {activeTab === 'signals' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <Cpu size={16} color="#155eef" />
              <span>Prioritized Anomaly Findings & Feature Contributions</span>
            </h3>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Signal & Rule Code</th>
                  <th>Risk Score (0-100)</th>
                  <th>Model Confidence</th>
                  <th>Peer Group Reference</th>
                  <th>Explanatory Context & Finding</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {anomalySignals.map(sig => (
                  <tr key={sig.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#001e46' }}>{sig.signal}</div>
                      <code>{sig.ruleCode}</code>
                    </td>
                    <td>
                      <span style={{
                        fontWeight: 800,
                        fontSize: '14px',
                        color: sig.riskScore > 85 ? '#dc2626' : '#f59e0b',
                      }}>
                        {sig.riskScore}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#155eef', fontWeight: 600 }}>{sig.confidence}</td>
                    <td style={{ fontSize: '12px' }}>{sig.peerGroup}</td>
                    <td style={{ fontSize: '12.5px', color: '#334155' }}>{sig.finding}</td>
                    <td><StatusBadge status={sig.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE ENROLMENT GRAPH */}
      {activeTab === 'graph' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <Share2 size={16} color="#8b5cf6" />
              <span>Interactive Multi-Institutional Enrolment Graph</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              NetworkX Topology Visualization
            </span>
          </div>

          <div style={{
            height: '320px',
            backgroundColor: '#001e46',
            borderRadius: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            padding: '24px',
          }}>
            {/* Visual Node Diagram */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Institution 1 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#155eef', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', border: '3px solid #60a5fa' }}>
                  <Building size={26} color="#fff" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '12px' }}>BIT Sathy</div>
                <div style={{ fontSize: '10px', color: '#93c5fd' }}>Node: Inst-1</div>
              </div>

              {/* Edge Connecting with Transfer Indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, background: 'rgba(22, 163, 74, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                  Valid Transfer (NOC)
                </span>
                <div style={{ width: '120px', height: '2px', background: '#16a34a' }} />
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>Student: STU-2026-00186</span>
              </div>

              {/* Institution 2 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', border: '3px solid #cbd5e1' }}>
                  <Building size={26} color="#fff" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '12px' }}>DTU Delhi</div>
                <div style={{ fontSize: '10px', color: '#cbd5e1' }}>Node: Inst-2</div>
              </div>

              {/* Collision Edge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: 700, background: 'rgba(220, 38, 38, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                  Concurrent Overlap (S5)
                </span>
                <div style={{ width: '120px', height: '2px', background: '#dc2626', borderStyle: 'dashed' }} />
                <span style={{ fontSize: '10px', color: '#fca5a5' }}>Student: STU-2026-00189</span>
              </div>

              {/* Institution 3 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', border: '3px solid #f87171' }}>
                  <Building size={26} color="#fff" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '12px' }}>Apex Institute</div>
                <div style={{ fontSize: '10px', color: '#fca5a5' }}>Node: Inst-5 (Flagged)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PEER GROUP BENCHMARKING */}
      {activeTab === 'benchmarking' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <BarChart2 size={16} color="#155eef" />
              <span>Peer Group Comparison: Bannari Amman vs AICTE Autonomous Average</span>
            </h3>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <XAxis dataKey="metric" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="CurrentInstitution" fill="#155eef" radius={[4, 4, 0, 0]} />
                <Bar dataKey="PeerAverage" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
