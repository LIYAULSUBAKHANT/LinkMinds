import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, Award, User, CheckCircle2, 
  ArrowRight, ArrowLeft, ShieldCheck, FileCheck, Info 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const InstitutionRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Identity
    institutionName: 'Kongu Engineering College',
    aictePermanentId: '1-284910482',
    yearOfEstablishment: '1984',
    affiliatingUniversity: 'Anna University, Chennai',
    
    // Step 2: Address
    campusAddress: 'Perundurai, Erode',
    state: 'Tamil Nadu',
    district: 'Erode',
    pincode: '638060',
    website: 'https://www.kongu.ac.in',

    // Step 3: Type & Accreditation
    institutionType: 'Autonomous',
    accreditationGrade: 'NAAC A++ / NBA Tier-1',
    sanctionedProgrammesCount: '14',
    totalApprovedIntake: '1440',

    // Step 4: Authorised Operator
    operatorName: 'Dr. S. Kuppuswami',
    operatorDesignation: 'Principal & Head of Admissions',
    operatorEmail: 'principal@kongu.ac.in',
    operatorPhone: '+91 94430 12345',
    declarationAccepted: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1 && (!formData.institutionName || !formData.aictePermanentId)) {
      toast.error('Please fill all mandatory identity fields');
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trackingId = `REG-2026-AICTE-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedId(trackingId);
    toast.success(`Registration Submitted! Tracking ID: ${trackingId}`);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Page Title Banner */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
            Institution Onboarding & Registration
          </h1>
          <span className="badge badge-mock">Page 07 • Design Inferred</span>
        </div>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Onboard new AICTE-approved institutions to SATYA-APAAR to enable aggregate reconciliation and seat utilization tracking.
        </p>
      </div>

      {/* Prototype Notice */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '24px',
        fontSize: '12.5px',
        color: '#1e40af',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <Info size={16} color="#2563eb" style={{ flexShrink: 0 }} />
        <span>
          <strong>Demonstration Environment Notice:</strong> Submissions in this wizard are persisted locally for testing and will not transmit records to live AICTE central servers.
        </span>
      </div>

      {/* Success View */}
      {submittedId ? (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #bbf7d0',
          borderRadius: '10px',
          padding: '40px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#001e46', marginBottom: '8px' }}>
            Registration Submitted Successfully!
          </h2>
          <p style={{ fontSize: '14px', color: '#475467', marginBottom: '18px' }}>
            Your institutional registration docket has been generated.
          </p>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#f8fafc',
            border: '2px dashed #cbd5e1',
            padding: '12px 24px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '18px',
            fontWeight: 700,
            color: '#001e46',
            marginBottom: '24px',
          }}>
            Tracking ID: {submittedId}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/institution/dashboard')}
              className="btn btn-primary"
            >
              <span>Go to Institution Dashboard</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => { setSubmittedId(null); setCurrentStep(1); }}
              className="btn btn-secondary"
            >
              Register Another Institution
            </button>
          </div>
        </div>
      ) : (
        /* Stepper Form */
        <div className="gov-card" style={{ padding: '28px' }}>
          {/* Step Indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '20px',
            overflowX: 'auto',
          }}>
            {[
              { num: 1, label: 'Identity' },
              { num: 2, label: 'Campus Address' },
              { num: 3, label: 'Accreditation' },
              { num: 4, label: 'Authorised Officer' },
              { num: 5, label: 'Review & Submit' },
            ].map(step => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: currentStep === step.num ? '#155eef' : currentStep > step.num ? '#16a34a' : '#94a3b8',
                  fontWeight: currentStep === step.num ? 700 : 500,
                  fontSize: '13px',
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: currentStep === step.num ? '#155eef' : currentStep > step.num ? '#16a34a' : '#e2e8f0',
                  color: currentStep >= step.num ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                }}>
                  {currentStep > step.num ? '✓' : step.num}
                </div>
                <span>{step.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* STEP 1: IDENTITY */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
                  Step 1: Institutional Identity
                </h3>
                <div className="form-group">
                  <label className="form-label">Full Legal Name of Institution *</label>
                  <input
                    type="text"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">AICTE Permanent ID *</label>
                    <input
                      type="text"
                      name="aictePermanentId"
                      value={formData.aictePermanentId}
                      onChange={handleInputChange}
                      placeholder="e.g. 1-429182741"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year of Establishment</label>
                    <input
                      type="text"
                      name="yearOfEstablishment"
                      value={formData.yearOfEstablishment}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Affiliating University / Board *</label>
                  <input
                    type="text"
                    name="affiliatingUniversity"
                    value={formData.affiliatingUniversity}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 2: CAMPUS ADDRESS */}
            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
                  Step 2: Campus Location & Contact
                </h3>
                <div className="form-group">
                  <label className="form-label">Campus Physical Address *</label>
                  <input
                    type="text"
                    name="campusAddress"
                    value={formData.campusAddress}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">State / UT *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Official Website URL</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: ACCREDITATION */}
            {currentStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
                  Step 3: Institution Classification & Approvals
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Institution Category *</label>
                    <select
                      name="institutionType"
                      value={formData.institutionType}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="Autonomous">Autonomous College</option>
                      <option value="State">State University</option>
                      <option value="Central">Central University</option>
                      <option value="Deemed">Deemed-to-be University</option>
                      <option value="Private">Private / Self-Financing</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Accreditation Standing</label>
                    <input
                      type="text"
                      name="accreditationGrade"
                      value={formData.accreditationGrade}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Sanctioned Programmes (Count)</label>
                    <input
                      type="number"
                      name="sanctionedProgrammesCount"
                      value={formData.sanctionedProgrammesCount}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Total Approved Intake (AY 2026-27)</label>
                    <input
                      type="number"
                      name="totalApprovedIntake"
                      value={formData.totalApprovedIntake}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: AUTHORISED OFFICER */}
            {currentStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
                  Step 4: Authorised Operator & Nodal Officer
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name of Operator *</label>
                    <input
                      type="text"
                      name="operatorName"
                      value={formData.operatorName}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Official Designation *</label>
                    <input
                      type="text"
                      name="operatorDesignation"
                      value={formData.operatorDesignation}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Official Email ID *</label>
                    <input
                      type="email"
                      name="operatorEmail"
                      value={formData.operatorEmail}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Contact Number *</label>
                    <input
                      type="tel"
                      name="operatorPhone"
                      value={formData.operatorPhone}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: SUMMARY REVIEW */}
            {currentStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '8px' }}>
                  Step 5: Review & Formal Declaration
                </h3>
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div><strong>Institution:</strong> {formData.institutionName}</div>
                    <div><strong>AICTE Permanent ID:</strong> {formData.aictePermanentId}</div>
                    <div><strong>Category:</strong> {formData.institutionType}</div>
                    <div><strong>Location:</strong> {formData.campusAddress}, {formData.district}, {formData.state}</div>
                    <div><strong>Nodal Officer:</strong> {formData.operatorName} ({formData.operatorDesignation})</div>
                    <div><strong>Official Contact:</strong> {formData.operatorEmail}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '12px' }}>
                  <input
                    type="checkbox"
                    id="declaration"
                    checked={formData.declarationAccepted}
                    onChange={(e) => setFormData(prev => ({ ...prev, declarationAccepted: e.target.checked }))}
                    style={{ marginTop: '3px' }}
                    required
                  />
                  <label htmlFor="declaration" style={{ fontSize: '12.5px', color: '#475467' }}>
                    I hereby declare that I am the duly authorised nodal officer appointed by the institution head. All submitted particulars, approved seat capacities, and affiliations are true, complete, and verifiable.
                  </label>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0',
            }}>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Next Step</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-orange"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Submit Institutional Registration</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

