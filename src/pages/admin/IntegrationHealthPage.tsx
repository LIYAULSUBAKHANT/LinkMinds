import React, { useState } from 'react';
import { DashboardStatCard } from '../../components/ui/DashboardStatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Activity, Server, RotateCcw, AlertTriangle, CheckCircle2, 
  Clock, ArrowRight, Download, Filter, Search, Info 
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import toast from 'react-hot-toast';

export const IntegrationHealthPage: React.FC = () => {
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const [failedRequests, setFailedRequests] = useState([
    {
      id: 'REQ-2026-7834',
      service: 'Institution ERP Connector',
      endpoint: '/api/v1/student-sync',
      error: '504 Gateway Timeout',
      retries: '2/3',
      nextRetry: '10:35 AM',
      status: 'Retry Scheduled',
    },
    {
      id: 'REQ-2026-7833',
      service: 'APAAR Registry Adapter',
      endpoint: '/verify/apaar-checksum',
      error: 'Rate Limit Throttling (Simulated)',
      retries: '1/3',
      nextRetry: '10:40 AM',
      status: 'Retry Scheduled',
    },
  ]);

  const latencyTrend = [
    { time: '00:00', APAAR: 210, DigiLocker: 320, MasterData: 450 },
    { time: '04:00', APAAR: 195, DigiLocker: 310, MasterData: 440 },
    { time: '08:00', APAAR: 240, DigiLocker: 350, MasterData: 460 },
    { time: '12:00', APAAR: 220, DigiLocker: 330, MasterData: 455 },
    { time: '16:00', APAAR: 210, DigiLocker: 320, MasterData: 450 },
  ];

  const handleTriggerRetry = (id: string) => {
    setRetryingId(id);
    setTimeout(() => {
      setFailedRequests(prev => prev.filter(r => r.id !== id));
      setRetryingId(null);
      toast.success(`Request ${id} re-dispatched and resolved successfully!`);
    }, 700);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              Integration & System Health
            </h1>
            <span className="badge badge-mock">Simulated Adapter Telemetry</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Monitor external API connectivity, latency benchmarks, failed requests, and retry queue dispatchers.
          </p>
        </div>

        {/* Prototype Environment Notice */}
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
          <span>External Integrations shown as connected are prototype/demo services</span>
        </div>
      </div>

      {/* 4 External Connection Cards matching Screenshot */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
      }}>
        <div className="gov-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#001e46' }}>APAAR Registry Adapter</h4>
            <span className="badge badge-success">Connected</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>Last Sync: <strong>Today, 10:30 AM</strong></div>
            <div>Response Time: <strong>210 ms</strong> (Mock Service)</div>
            <div>Mode: Sandbox Simulated Connector</div>
          </div>
        </div>

        <div className="gov-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#001e46' }}>DigiLocker Adapter</h4>
            <span className="badge badge-success">Connected</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>Last Sync: <strong>Today, 09:45 AM</strong></div>
            <div>Response Time: <strong>320 ms</strong></div>
            <div>Mode: Mock e-Governance Relay</div>
          </div>
        </div>

        <div className="gov-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#001e46' }}>AICTE Master Data</h4>
            <span className="badge badge-success">Connected</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>Last Sync: <strong>Today, 09:20 AM</strong></div>
            <div>Response Time: <strong>450 ms</strong></div>
            <div>Mode: Internal Policy Cache</div>
          </div>
        </div>

        <div className="gov-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#001e46' }}>Institution ERP Gateway</h4>
            <span className="badge badge-warning">Degraded</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>Last Sync: <strong>Today, 08:15 AM</strong></div>
            <div>Response Time: <strong>1.2 s</strong></div>
            <div>Mode: Webhook Dispatcher</div>
          </div>
        </div>
      </div>

      {/* Latency Trend Chart */}
      <div className="gov-card">
        <div className="gov-card-header">
          <h3 className="gov-card-title">
            <Activity size={16} color="#155eef" />
            <span>API Response Time Trends (Last 24 Hours)</span>
          </h3>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>
            99.2% Overall Platform Uptime
          </span>
        </div>

        <div style={{ width: '100%', height: '220px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={latencyTrend} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <XAxis dataKey="time" fontSize={11} />
              <YAxis fontSize={11} unit="ms" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="APAAR" stroke="#155eef" strokeWidth={2} />
              <Line type="monotone" dataKey="DigiLocker" stroke="#16a34a" strokeWidth={2} />
              <Line type="monotone" dataKey="MasterData" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Failed Requests & Retry Queue Table */}
      <div className="gov-card">
        <div className="gov-card-header">
          <h3 className="gov-card-title">
            <AlertTriangle size={16} color="#dc2626" />
            <span>Failed Requests & Retry Queue</span>
          </h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            {failedRequests.length} pending retry events
          </span>
        </div>

        {failedRequests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: '#16a34a', fontSize: '13px' }}>
            <CheckCircle2 size={24} style={{ margin: '0 auto 6px auto' }} />
            All failed requests successfully dispatched! Retry queue empty.
          </div>
        ) : (
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Request Reference</th>
                  <th>Service Destination</th>
                  <th>Target Endpoint</th>
                  <th>Error Description</th>
                  <th>Retry Attempts</th>
                  <th>Next Scheduled Retry</th>
                  <th style={{ width: '130px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {failedRequests.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#001e46' }}>
                      {req.id}
                    </td>
                    <td style={{ fontWeight: 600 }}>{req.service}</td>
                    <td><code>{req.endpoint}</code></td>
                    <td>
                      <span className="badge badge-danger">{req.error}</span>
                    </td>
                    <td>{req.retries}</td>
                    <td style={{ fontSize: '12px' }}>{req.nextRetry}</td>
                    <td>
                      <button
                        onClick={() => handleTriggerRetry(req.id)}
                        disabled={retryingId === req.id}
                        className="btn btn-primary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <RotateCcw size={12} />
                        <span>{retryingId === req.id ? 'Retrying...' : 'Trigger Retry'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

