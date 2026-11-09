import React from 'react';
import { CheckCircle2, ShieldCheck, Activity, Clock, Building2, Database } from 'lucide-react';

interface InstitutionalBatchEvent {
  id: string;
  institution: string;
  aicteCode: string;
  program: string;
  batchInfo: string;
  status: '100% Reconciled' | 'Zero Variance' | 'TEIE Validated' | 'SeatGuard Approved';
  seatsStatus: string;
  timeAgo: string;
}

const LIVE_INSTITUTION_BATCHES: InstitutionalBatchEvent[] = [
  {
    id: 'BATCH-01',
    institution: 'Bannari Amman Inst. of Tech (BIT)',
    aicteCode: 'AICTE: 1-429182741',
    program: 'B.Tech AI & Data Science',
    batchInfo: 'AY 2026-27 • Batch Ingestion #04',
    status: '100% Reconciled',
    seatsStatus: '60/60 Seats Accounted',
    timeAgo: 'Just now',
  },
  {
    id: 'BATCH-02',
    institution: 'Indian Institute of Technology Madras',
    aicteCode: 'AICTE: 1-893021445',
    program: 'B.Tech Computer Science & Engg.',
    batchInfo: 'AY 2026-27 • Batch Ingestion #02',
    status: 'Zero Variance',
    seatsStatus: '180/180 Seats Accounted',
    timeAgo: '2m ago',
  },
  {
    id: 'BATCH-03',
    institution: 'National Institute of Technology Trichy',
    aicteCode: 'AICTE: 1-774019283',
    program: 'B.Tech Electronics & Comm.',
    batchInfo: 'AY 2026-27 • Batch Ingestion #01',
    status: 'TEIE Validated',
    seatsStatus: '120/120 Seats Accounted',
    timeAgo: '4m ago',
  },
  {
    id: 'BATCH-04',
    institution: 'COEP Technological University Pune',
    aicteCode: 'AICTE: 1-610294821',
    program: 'B.Tech Mechanical Engineering',
    batchInfo: 'AY 2026-27 • Batch Ingestion #03',
    status: 'SeatGuard Approved',
    seatsStatus: '120/120 Seats Accounted',
    timeAgo: '6m ago',
  },
  {
    id: 'BATCH-05',
    institution: 'BMS College of Engineering Bengaluru',
    aicteCode: 'AICTE: 1-529018442',
    program: 'B.Tech Information Science',
    batchInfo: 'AY 2026-27 • Batch Ingestion #02',
    status: '100% Reconciled',
    seatsStatus: '180/180 Seats Accounted',
    timeAgo: '9m ago',
  },
  {
    id: 'BATCH-06',
    institution: 'RV College of Engineering',
    aicteCode: 'AICTE: 1-449102837',
    program: 'B.Tech Cybersecurity',
    batchInfo: 'AY 2026-27 • Batch Ingestion #01',
    status: 'Zero Variance',
    seatsStatus: '60/60 Seats Accounted',
    timeAgo: '12m ago',
  },
];

export const LiveAdmissionMarquee: React.FC = () => {
  // Duplicate array for seamless infinite right-to-left marquee scroll
  const marqueeItems = [...LIVE_INSTITUTION_BATCHES, ...LIVE_INSTITUTION_BATCHES];

  return (
    <div style={{
      backgroundColor: '#00152e',
      borderTop: '1px solid rgba(0, 210, 255, 0.25)',
      borderBottom: '1px solid rgba(0, 210, 255, 0.25)',
      padding: '14px 0',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
    }}>
      {/* Live Activity Header Bar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto 10px auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '3px 10px',
            borderRadius: '12px',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block',
            }} className="pulse-beacon" />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#34d399', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Institutional Batch Ingestion Stream
            </span>
          </div>
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#94a3b8' }}>
            Real-time approved intake reconciliations & TEIE cryptographic locks (DPDP Privacy Compliant)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
          <Activity size={14} color="#00d2ff" />
          <span>Synchronized with National Node</span>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Wrapper (Right-to-Left) */}
      <div className="marquee-wrapper">
        <div className="marquee-track" style={{ gap: '16px', padding: '4px 0' }}>
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{
                backgroundColor: 'rgba(10, 37, 88, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 210, 255, 0.25)',
                borderRadius: '10px',
                padding: '12px 18px',
                minWidth: '330px',
                maxWidth: '380px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#00d2ff';
                e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(0, 210, 255, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Top: Institution + Time */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #00d2ff 0%, #155eef 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                    boxShadow: '0 2px 6px rgba(0, 210, 255, 0.4)',
                  }}>
                    <Building2 size={16} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.institution}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#38bdf8', fontFamily: 'monospace' }}>
                      {item.aicteCode}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8', flexShrink: 0 }}>
                  <Clock size={11} />
                  <span>{item.timeAgo}</span>
                </div>
              </div>

              {/* Program and Seats Status */}
              <div style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: 600 }}>
                {item.program}
              </div>

              <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{item.batchInfo}</span>
                <span style={{ color: '#6ee7b7', fontWeight: 600 }}>{item.seatsStatus}</span>
              </div>

              {/* Card Footer: Status Pills */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '6px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                marginTop: '2px',
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10.5px',
                  fontWeight: 700,
                }}>
                  <CheckCircle2 size={11} />
                  <span>{item.status}</span>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#00d2ff',
                  fontSize: '10.5px',
                  fontWeight: 600,
                }}>
                  <ShieldCheck size={12} />
                  <span>TEIE Audit Sealed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
