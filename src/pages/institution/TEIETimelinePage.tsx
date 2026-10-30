import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { TEIEClassification } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Clock, ArrowRight, ArrowLeft, ShieldCheck, AlertTriangle, 
  CheckCircle2, FileText, Building, Calendar, User, Search 
} from 'lucide-react';

export const TEIETimelinePage: React.FC = () => {
  const { studentId } = useParams<{ studentId?: string }>();
  
  // Available demo students for quick selection
  const allStudents = StorageService.getStudents();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(studentId || 'std-3');

  const student = StorageService.getStudentById(selectedStudentId) || allStudents[0];
  const events = StorageService.getTEIEEvents(student?.id);

  const getClassificationBadge = (cls: TEIEClassification) => {
    switch (cls) {
      case 'Sequential Transfer':
      case 'New Enrolment':
        return <span className="badge badge-success">{cls}</span>;
      case 'Transition Overlap':
      case 'Policy-Based Exception':
        return <span className="badge badge-info">{cls}</span>;
      case 'Unexplained Overlap':
      case 'Potential Duplicate Data Entry':
        return <span className="badge badge-danger">{cls}</span>;
      default:
        return <span className="badge badge-warning">{cls}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              TEIE Enrolment Timeline
            </h1>
            <span className="badge badge-mock">Page 13 • Design Inferred</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Temporal Enrolment Integrity Engine: Track chronological admissions, valid sequential transfers, and concurrent collisions.
          </p>
        </div>

        <Link to="/institution/students" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={14} />
          <span>Back to Student Registry</span>
        </Link>
      </div>

      {/* Student Selector & Dossier Card */}
      <div className="gov-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#155eef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#001e46' }}>{student.fullName}</h3>
                <StatusBadge status={student.identityStatus} />
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                Enrolment Ref: {student.studentRef} • Masked APAAR: {student.maskedApaar}
              </div>
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#475467' }}>Inspect Candidate:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="form-control"
              style={{ fontSize: '12px', padding: '6px 10px' }}
            >
              {allStudents.map(s => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.studentRef})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Regulatory Summary Bar */}
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '12px 16px',
          display: 'flex',
          gap: '24px',
          fontSize: '12.5px',
          flexWrap: 'wrap',
        }}>
          <div><strong>Current Programme:</strong> {student.programme}</div>
          <div><strong>Admission Category:</strong> {student.category}</div>
          <div><strong>Registered Institution:</strong> {student.institutionName}</div>
          <div><strong>Active Enrolment:</strong> <StatusBadge status={student.enrolmentStatus} /></div>
        </div>
      </div>

      {/* Chronological Timeline Stream */}
      <div className="gov-card">
        <div className="gov-card-header">
          <h3 className="gov-card-title">
            <Clock size={16} color="#155eef" />
            <span>Chronological Enrolment Episodes & Evidence Trail</span>
          </h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Evaluated by TEIE Engine
          </span>
        </div>

        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontSize: '13px' }}>
            No secondary migration or withdrawal events recorded for this candidate. Initial admission remains active.
          </div>
        ) : (
          <div style={{ position: 'relative', paddingLeft: '32px', paddingTop: '10px', paddingBottom: '10px' }}>
            {/* Timeline vertical rule */}
            <div style={{
              position: 'absolute',
              top: '16px',
              bottom: '16px',
              left: '12px',
              width: '2px',
              backgroundColor: '#cbd5e1',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {events.map((evt, idx) => (
                <div key={evt.id} style={{ position: 'relative' }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-26px',
                    top: '4px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: evt.classification.includes('Overlap') ? '#dc2626' : '#155eef',
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 1px #cbd5e1',
                  }} />

                  {/* Event Content Card */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #dce5ef',
                    borderRadius: '8px',
                    padding: '16px 18px',
                    boxShadow: 'var(--shadow-sm)',
                    borderLeft: evt.classification.includes('Overlap') ? '4px solid #dc2626' : '4px solid #155eef',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 700, fontSize: '14px', color: '#001e46' }}>
                          Episode {idx + 1}: {evt.eventType} — {evt.institution}
                        </span>
                        {getClassificationBadge(evt.classification)}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} />
                        <span>Effective: <strong>{evt.effectiveDate}</strong></span>
                        <span style={{ color: '#cbd5e1' }}>•</span>
                        <span>Recorded: {evt.recordedDate}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '12.5px', color: '#475467', marginBottom: '10px' }}>
                      <div><strong>Programme:</strong> {evt.programme}</div>
                      <div><strong>Study Mode:</strong> {evt.studyMode}</div>
                      <div><strong>Ordinance Status:</strong> {evt.status}</div>
                      <div><strong>Evidence Reference:</strong> <code>{evt.evidenceRef}</code></div>
                    </div>

                    {evt.notes && (
                      <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#475467',
                        borderLeft: '3px solid #cbd5e1',
                      }}>
                        <strong>Regulatory Note:</strong> {evt.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TEIE Policy Grounding Note */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '16px 20px',
        fontSize: '12.5px',
        color: '#1e40af',
        lineHeight: 1.6,
      }}>
        <strong>TEIE Classification Principle:</strong> Sequential lateral transfers require preceding withdrawal or migration clearance evidence from the former institution (Clause 8, AICTE Admission Ordinance). Prolonged overlapping enrolments without formal exit certificates are automatically flagged for human review on the AICTE Review Queue without declaring premature fraud verdicts.
      </div>
    </div>
  );
};

