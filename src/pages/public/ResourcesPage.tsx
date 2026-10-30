import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Download, Search, Video, HelpCircle, 
  ChevronDown, ChevronUp, BookOpen, ExternalLink, Play, Check 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'templates' | 'api' | 'manuals' | 'policy' | 'tutorials' | 'faqs'>('guidelines');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const guidelines = [
    {
      sno: 1,
      title: 'Institutional Admission Ingestion Manual',
      desc: 'Step-by-step specifications for preparing and uploading admission batches in CSV/Excel formats.',
      version: 'v2.1',
      updated: '15 Oct 2026',
      filename: 'SATYA_APAAR_Ingestion_Manual_v2.1.pdf',
    },
    {
      sno: 2,
      title: 'APAAR Identity Validation Protocol',
      desc: 'Technical criteria for validating 12-digit APAAR format, name matching thresholds, and exception handling.',
      version: 'v1.4',
      updated: '20 Oct 2026',
      filename: 'APAAR_Validation_Protocol_2026.pdf',
    },
    {
      sno: 3,
      title: 'Temporal Enrolment Integrity (TEIE) Rules',
      desc: 'Ordinance and workflow rules governing lateral transfers, simultaneous enrolment detection, and withdrawal NOCs.',
      version: 'v2.0',
      updated: '22 Oct 2026',
      filename: 'TEIE_Regulatory_Framework.pdf',
    },
    {
      sno: 4,
      title: 'SeatGuard Sanctioned Capacity & Quota Compliance',
      desc: 'Procedures for reconciliation of sanctioned intake vs. supernumerary allocations (EWS, TFW, NRI).',
      version: 'v2.1',
      updated: '25 Oct 2026',
      filename: 'SeatGuard_Compliance_Handbook.pdf',
    },
  ];

  const templates = [
    {
      name: 'Admission Data Template',
      format: 'CSV (.csv)',
      desc: 'Standard AICTE column headers including Student Reference, Name, DOB, Gender, APAAR ID, Category, and Programme.',
      filename: 'satya_apaar_admission_template.csv',
      content: 'student_ref,student_name,dob,gender,apaar_id,programme,category,admission_date,academic_year\nSTU-2026-0001,Aarav Patel,2005-04-12,M,9842-4910-8491,B.Tech Computer Science,General,2026-07-15,2026-2027\nSTU-2026-0002,Priya Sundararajan,2005-09-23,F,8492-3829-1934,B.Tech Computer Science,OBC-NCL,2026-07-18,2026-2027\nSTU-2026-0003,Rohan Mehra,2004-11-05,M,7192-5819-4910,B.Tech Information Technology,General,2026-08-01,2026-2027',
    },
    {
      name: 'Column Mapping Definition',
      format: 'JSON / Excel (.csv)',
      desc: 'Pre-configured mapping schema for popular ERP systems (ERPNext, SAP Campus, TCS iON, Samarth e-Gov).',
      filename: 'column_mapping_schema.csv',
      content: 'source_field,target_field,is_required,data_type\nEnrollmentNumber,student_ref,true,string\nCandidateName,student_name,true,string\nDateOfBirth,dob,true,date\nAPAAR_Number,apaar_id,true,string\nBranch,programme,true,string\nReservationCategory,category,true,string',
    },
    {
      name: 'Reconciliation Report Template',
      format: 'CSV (.csv)',
      desc: 'Standard breakdown schema for programme-wise reported aggregate vs student-level record count.',
      filename: 'reconciliation_breakdown_template.csv',
      content: 'programme_code,programme_name,sanctioned_intake,reported_aggregate,verified_students,variance,explanation\nCSE,B.Tech Computer Science,240,240,236,4,Pending document verification\nIT,B.Tech Information Technology,120,120,120,0,Fully reconciled\nECE,B.Tech Electronics,180,180,172,8,8 seats surrendered',
    },
    {
      name: 'Correction Submission Template',
      format: 'CSV (.csv)',
      desc: 'Structured resubmission file to correct preflight validation errors and identity mismatches.',
      filename: 'correction_resubmission_template.csv',
      content: 'record_id,student_ref,field_to_correct,original_value,corrected_value,justification\nREC-4019,STU-2026-00187,apaar_id,INVALID-STRUCT,9842-1049-8491,Corrected typo from admission slip',
    },
  ];

  const faqs = [
    {
      q: 'What is the primary role of SATYA-APAAR 2.1 in the AICTE ecosystem?',
      a: 'SATYA-APAAR 2.1 acts as a centralized admission assurance and reconciliation platform. It transforms institutional admission submissions into time-bounded enrolment records (TEIE), validates APAAR IDs, monitors approved seat quotas, and reconciles reported totals against student-level records.',
    },
    {
      q: 'Does SATYA-APAAR 2.1 replace institutional ERPs or the APAAR registry?',
      a: 'No. SATYA-APAAR 2.1 does not replace institutional ERPs, APAAR, DigiLocker, or the Academic Bank of Credits (ABC). It interfaces with them via secure adapters to provide independent validation, reconciliation, and regulatory transparency.',
    },
    {
      q: 'How does the platform handle foreign national students without an APAAR ID?',
      a: 'Foreign national and NRI supernumerary students are handled through configured exception workflows. Their records are verified against passport/visa credentials without being penalized as invalid APAAR entries.',
    },
    {
      q: 'What happens when an aggregate count does not match student-level records?',
      a: 'The system flags the variance (e.g. 500 reported vs 472 eligible records = 28 variance) and alerts both the institution and AICTE. The institution operator must provide an authorised explanation or submit the missing records before cut-off.',
    },
    {
      q: 'Are audit logs on the platform permanent and tamper-evident?',
      a: 'Yes. Every submission, case decision, and policy update is logged in the RecordTrust Audit Centre using cryptographic SHA-256 hash chains, providing mathematically verifiable immutability.',
    },
  ];

  const handleDownloadFile = (filename: string, content?: string) => {
    const fileContent = content || `SATYA-APAAR 2.1 Official Resource Document\nFilename: ${filename}\nVersion: 2.1 | Academic Year 2026-27\nDownloaded from SATYA-APAAR 2.1 Demonstration Portal\nAICTE Problem Statement SIH26263`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded: ${filename}`);
  };

  const filteredGuidelines = guidelines.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Banner / Hero */}
      <section style={{
        backgroundColor: '#001e46',
        color: '#ffffff',
        padding: '36px 24px',
        borderBottom: '3px solid #155eef',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '8px', opacity: 0.85 }}>
            <span style={{ fontSize: '12px', color: '#93c5fd' }}>Home &gt; Resources</span>
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff' }}>Resources & Documentation</h1>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '6px', maxWidth: '720px' }}>
            Guidelines, templates, API specifications, and support materials for institutions, verifiers, and administrators.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px 64px 24px' }}>
        {/* Navigation Tabs Matching Screenshot */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid #e2e8f0',
          marginBottom: '32px',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}>
          {[
            { id: 'guidelines', label: 'Guidelines' },
            { id: 'templates', label: 'Templates' },
            { id: 'api', label: 'API Documentation' },
            { id: 'manuals', label: 'User Manuals' },
            { id: 'policy', label: 'Policy Documents' },
            { id: 'tutorials', label: 'Video Tutorials' },
            { id: 'faqs', label: 'FAQs' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 18px',
                fontSize: '13.5px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? '#155eef' : '#64748b',
                borderBottom: activeTab === tab.id ? '3px solid #155eef' : '3px solid transparent',
                marginBottom: '-2px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: GUIDELINES */}
        {activeTab === 'guidelines' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#001e46' }}>Guidelines for Institutions</h2>
                <p style={{ fontSize: '12.5px', color: '#64748b' }}>Authoritative regulatory directives for AY 2026-27 admission processing</p>
              </div>
              <div style={{ position: 'relative', width: '280px' }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                <input
                  type="text"
                  placeholder="Search guidelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '34px', fontSize: '12.5px' }}
                />
              </div>
            </div>

            <div className="gov-table-container">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>S.No</th>
                    <th>Title & Specification</th>
                    <th>Description</th>
                    <th style={{ width: '80px' }}>Version</th>
                    <th style={{ width: '110px' }}>Last Updated</th>
                    <th style={{ width: '100px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuidelines.map(g => (
                    <tr key={g.sno}>
                      <td><strong>{g.sno}</strong></td>
                      <td style={{ fontWeight: 600, color: '#001e46' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileText size={16} color="#155eef" />
                          <span>{g.title}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '12.5px' }}>{g.desc}</td>
                      <td><span className="badge badge-info">{g.version}</span></td>
                      <td style={{ fontSize: '12px' }}>{g.updated}</td>
                      <td>
                        <button
                          onClick={() => handleDownloadFile(g.filename)}
                          className="btn btn-secondary btn-sm"
                          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Download size={13} color="#155eef" />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TEMPLATES FOR DATA SUBMISSION */}
        {activeTab === 'templates' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#001e46' }}>Templates for Data Submission</h2>
              <p style={{ fontSize: '12.5px', color: '#64748b' }}>Download standard pre-formatted templates to ensure zero validation errors</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}>
              {templates.map((tpl, tIdx) => (
                <div
                  key={tIdx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #dce5ef',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="badge badge-info">{tpl.format}</span>
                      <FileText size={18} color="#155eef" />
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
                      {tpl.name}
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                      {tpl.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownloadFile(tpl.filename, tpl.content)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Download size={14} />
                    <span>Download Template</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: API DOCUMENTATION */}
        {activeTab === 'api' && (
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #dce5ef' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
              SATYA-APAAR 2.1 REST API Documentation (v2.1)
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              High-throughput JSON REST interfaces for institutional ERP synchronization and verifier queries.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { method: 'POST', endpoint: '/api/v2.1/ingest/batch', desc: 'Uploads and validates candidate admission records asynchronously' },
                { method: 'GET', endpoint: '/api/v2.1/reconciliation/{institution_id}', desc: 'Fetches real-time aggregate vs record reconciliation status' },
                { method: 'GET', endpoint: '/api/v2.1/seatguard/ledger/{programme}', desc: 'Retrieves approved intake capacity and remaining quota balances' },
                { method: 'POST', endpoint: '/api/v2.1/verify/credential', desc: 'Validates ConsentPass digital credential hash with zero student PII disclosure' },
              ].map((api, idx) => (
                <div key={idx} style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <span style={{
                    backgroundColor: api.method === 'POST' ? '#155eef' : '#16a34a',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace'
                  }}>
                    {api.method}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#001e46', fontSize: '13px' }}>
                    {api.endpoint}
                  </span>
                  <span style={{ fontSize: '12.5px', color: '#64748b', marginLeft: 'auto' }}>
                    {api.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: USER MANUALS */}
        {activeTab === 'manuals' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { role: 'Institution Operator', file: 'Institution_Operator_Guide.pdf', desc: 'Complete manual for batch uploading, column mapping, preflight fixes, and aggregate explanation filing.' },
              { role: 'AICTE Administrator', file: 'AICTE_Administrator_Guide.pdf', desc: 'Instructions for reviewing flagged cases, monitoring national reconciliation, and governing intake master policy.' },
              { role: 'Authorised Verifier', file: 'Verifier_Portal_Manual.pdf', desc: 'Guide to privacy-preserving credential verification and instant QR-based status validation.' },
              { role: 'System Administrator', file: 'System_Admin_Guide.pdf', desc: 'Guide to user onboarding, role & permission matrix setup, integration adapter monitoring, and notification rules.' },
            ].map((m, mIdx) => (
              <div key={mIdx} style={{ backgroundColor: '#ffffff', border: '1px solid #dce5ef', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#001e46', marginBottom: '6px' }}>{m.role} Guide</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', marginBottom: '14px' }}>{m.desc}</p>
                <button onClick={() => handleDownloadFile(m.file)} className="btn btn-secondary btn-sm" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  <Download size={13} color="#155eef" />
                  <span>Download Manual</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: POLICY DOCUMENTS */}
        {activeTab === 'policy' && (
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Policy Document</th>
                  <th>Gazette Reference</th>
                  <th>Effective Academic Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: '#001e46' }}>AICTE Approval Process Handbook (APH) 2026-27</td>
                  <td>AICTE/AB/APH/2026-27</td>
                  <td>2026–2027</td>
                  <td>
                    <button onClick={() => handleDownloadFile('AICTE_APH_2026_27.pdf')} className="btn btn-secondary btn-sm">
                      <Download size={13} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#001e46' }}>NEP 2020 National Academic Account Registry Ordinance</td>
                  <td>MHRD/NEP/APAAR/2020</td>
                  <td>Perpetual</td>
                  <td>
                    <button onClick={() => handleDownloadFile('APAAR_National_Ordinance.pdf')} className="btn btn-secondary btn-sm">
                      <Download size={13} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 6: VIDEO TUTORIALS */}
        {activeTab === 'tutorials' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {[
                { title: 'Overview of SATYA-APAAR 2.1 Ingestion', duration: '4:20 mins', speaker: 'Technical Lead' },
                { title: 'Resolving Aggregate Variances & Column Mappings', duration: '6:15 mins', speaker: 'Admission Architect' },
                { title: 'Review Case Decisioning for AICTE Officers', duration: '5:45 mins', speaker: 'Regulatory Officer' },
              ].map((vid, vIdx) => (
                <div key={vIdx} style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #dce5ef', overflow: 'hidden' }}>
                  <div 
                    onClick={() => setActiveVideoModal(vid.title)}
                    style={{
                      height: '140px',
                      backgroundColor: '#001e46',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#ffffff',
                    }}
                  >
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                      <Play size={20} color="#f59e0b" style={{ marginLeft: '3px' }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#cbd5e1' }}>Click to Play Demo Walkthrough</span>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: '11px', color: '#155eef', fontWeight: 600 }}>{vid.duration}</div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#001e46', marginTop: '4px' }}>{vid.title}</h4>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Speaker: {vid.speaker}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video Modal */}
            {activeVideoModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px',
              }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '560px', width: '100%', padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '12px' }}>{activeVideoModal}</h3>
                  <div style={{ height: '240px', backgroundColor: '#0f172a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '13px', textAlign: 'center', padding: '20px' }}>
                    [Interactive Video Simulation: SATYA-APAAR 2.1 Walkthrough. Live recording available in SIH presentation package.]
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => setActiveVideoModal(null)} className="btn btn-secondary btn-sm">Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: FAQS */}
        {activeTab === 'faqs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaqIdx === fIdx;
              return (
                <div
                  key={fIdx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #dce5ef',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#001e46',
                      cursor: 'pointer',
                      backgroundColor: isOpen ? '#f8fafc' : '#ffffff',
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} color="#155eef" /> : <ChevronDown size={16} color="#94a3b8" />}
                  </button>
                  {isOpen && (
                    <div style={{ padding: '16px 20px', fontSize: '13px', color: '#475467', lineHeight: 1.6, borderTop: '1px solid #e2e8f0' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Need Additional Support Section */}
        <div style={{
          marginTop: '48px',
          backgroundColor: '#eff6ff',
          borderRadius: '10px',
          border: '1px solid #bfdbfe',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e40af' }}>Need Additional Technical Assistance?</h3>
            <p style={{ fontSize: '13px', color: '#3b82f6', marginTop: '2px' }}>
              Our dedicated technical support desk is available to assist institution operators with CSV mapping and preflight validation.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/support" className="btn btn-primary btn-sm">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
