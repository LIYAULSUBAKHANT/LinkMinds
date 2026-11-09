import React, { useState } from 'react';
import { 
  Award, Compass, Shuffle, ShieldCheck, CheckCircle2, 
  Sparkles, ExternalLink, QrCode, ArrowRight 
} from 'lucide-react';

interface BenefitItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ReactNode;
  cardHighlight: string;
  mapLocation: string;
}

export const ApaarBenefitsShowcase: React.FC = () => {
  const [activeBenefitId, setActiveBenefitId] = useState<string>('achieve');

  const benefits: BenefitItem[] = [
    {
      id: 'achieve',
      title: 'Recognize learning achievements',
      subtitle: 'Official academic credits, skill micro-credentials, and verifiable achievements mapped across secondary & higher education.',
      tag: 'Academic Bank of Credits',
      icon: <Award size={24} color="#ffffff" />,
      cardHighlight: 'Verifiable Micro-Credentials & NCrF Levels',
      mapLocation: 'National Academic Credit Vault',
    },
    {
      id: 'path',
      title: 'Allows student to choose own learning path',
      subtitle: 'Empowers seamless multidisciplinary entry and exit points as envisioned under the National Education Policy (NEP 2020).',
      tag: 'NEP 2020 Aligned',
      icon: <Compass size={24} color="#ffffff" />,
      cardHighlight: 'Multidisciplinary Elective Pathways Active',
      mapLocation: 'Inter-Institutional Credit Transfer',
    },
    {
      id: 'mobility',
      title: 'Enable student mobility and academic flexibility',
      subtitle: 'Frictionless transfer between universities, states, and affiliated technical institutions with instant record synchronization.',
      tag: 'Zero Paperwork Transfer',
      icon: <Shuffle size={24} color="#ffffff" />,
      cardHighlight: 'Cross-State Migration Sanctioned',
      mapLocation: 'Pan-India Academic Mobility Hub',
    },
    {
      id: 'collision',
      title: 'Automated Multi-Institution Collision Lockout',
      subtitle: 'Prevents fraudulent dual regular enrolments across AICTE institutions in real time using cryptographic temporal locks.',
      tag: 'SIH26263 Core Innovation',
      icon: <ShieldCheck size={24} color="#ffffff" />,
      cardHighlight: 'Collision-Free Verified Status (TEIE Lock)',
      mapLocation: 'AICTE Real-Time Sentinel Mesh',
    },
  ];

  const currentBenefit = benefits.find(b => b.id === activeBenefitId) || benefits[0];

  return (
    <section style={{
      backgroundColor: '#f8fafc',
      padding: '72px 24px',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
    }}>
      {/* Background Soft Ambient Light Blurs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(21, 94, 239, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Section Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#e0f2fe',
            border: '1px solid #bae6fd',
            color: '#0369a1',
            padding: '5px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '12px',
          }}>
            <Sparkles size={14} color="#0284c7" />
            <span>ONE NATION, ONE STUDENT ID ECOSYSTEM</span>
          </div>
          
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 800,
            color: '#001e46',
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            APAAR Benefits
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#64748b',
            marginTop: '8px',
            maxWidth: '620px',
            lineHeight: 1.6,
          }}>
            Automated Permanent Academic Account Registry creates a lifelong digital identity, unlocking trusted mobility, skill credits, and zero duplicate admissions nationwide.
          </p>
        </div>

        {/* Interactive Layout: Left Benefits Selector & Right 3D Visual Stage */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'center',
        }} className="apaar-benefits-grid">
          
          {/* Left Column: Interactive Benefit Selector Pills matching the user screenshot */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {benefits.map((benefit) => {
              const isActive = benefit.id === activeBenefitId;
              return (
                <div
                  key={benefit.id}
                  onClick={() => setActiveBenefitId(benefit.id)}
                  className={`benefit-pill ${isActive ? 'benefit-pill-active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    backgroundColor: isActive ? '#001e46' : '#ffffff',
                    border: isActive ? '2px solid #00d2ff' : '1px solid #e2e8f0',
                    boxShadow: isActive ? '0 12px 30px -6px rgba(0, 210, 255, 0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {/* Teal Circular Icon Button matching reference image */}
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: isActive 
                      ? 'linear-gradient(135deg, #00d2ff 0%, #0284c7 100%)' 
                      : 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isActive ? '0 0 16px rgba(0, 210, 255, 0.6)' : '0 4px 10px rgba(20, 184, 166, 0.3)',
                    transition: 'all 0.3s ease',
                  }}>
                    {benefit.icon}
                  </div>

                  {/* Benefit Text Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                      flexWrap: 'wrap',
                    }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: isActive ? '#ffffff' : '#0f172a',
                        margin: 0,
                      }}>
                        {benefit.title}
                      </h3>
                      {isActive && (
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          backgroundColor: 'rgba(0, 210, 255, 0.2)',
                          color: '#38bdf8',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          border: '1px solid rgba(0, 210, 255, 0.4)',
                        }}>
                          {benefit.tag}
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: '13px',
                      color: isActive ? '#cbd5e1' : '#64748b',
                      margin: 0,
                      lineHeight: 1.5,
                    }}>
                      {benefit.subtitle}
                    </p>
                  </div>

                  {/* Active Indicator Arrow */}
                  <div style={{
                    color: isActive ? '#00d2ff' : '#cbd5e1',
                    transform: isActive ? 'translateX(2px)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}>
                    <ArrowRight size={18} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D APAAR Digital Card + Trajectory Arc + India Map Stage */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '440px',
            padding: '20px 0',
          }}>
            
            {/* Holographic Glowing 3D Digital APAAR ID Card */}
            <div 
              className="animate-float hologram-card"
              style={{
                width: '100%',
                maxWidth: '430px',
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '22px 24px',
                boxShadow: '0 25px 50px -12px rgba(0, 30, 70, 0.25), 0 0 0 1px rgba(226, 232, 240, 0.8)',
                border: '1px solid #e2e8f0',
                position: 'relative',
                zIndex: 3,
              }}
            >
              {/* Card Header: Project Brand Logo + Tiranga Accent + APAAR Wordmark */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f1f5f9',
                paddingBottom: '12px',
                marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src="/assets/logos/linkminds_brand_logo.png"
                    alt="SATYA-APAAR Trust"
                    style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                  />
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 800, color: '#001e46', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      SATYA-APAAR
                    </div>
                    <div style={{ fontSize: '8px', color: '#64748b' }}>
                      Academic Verification Portal
                    </div>
                  </div>
                </div>

                {/* Subtle India Tiranga Graphic Accent */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  width: '28px',
                  alignItems: 'center',
                }}>
                  <div style={{ width: '100%', height: '2px', backgroundColor: '#f97316', borderRadius: '1px' }} />
                  <div style={{ width: '100%', height: '2px', backgroundColor: '#ffffff', borderRadius: '1px', border: '0.5px solid #cbd5e1' }} />
                  <div style={{ width: '100%', height: '2px', backgroundColor: '#16a34a', borderRadius: '1px' }} />
                </div>

                {/* APAAR Wordmark Badge */}
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    color: '#0d9488',
                    textTransform: 'uppercase',
                  }}>
                    APAAR
                  </span>
                  <div style={{ fontSize: '7px', fontWeight: 700, color: '#047857' }}>
                    ONE NATION • ONE STUDENT ID
                  </div>
                </div>
              </div>

              {/* Official Registry Subheading */}
              <div style={{
                textAlign: 'center',
                fontSize: '9px',
                fontWeight: 700,
                color: '#475467',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Automated Permanent Academic Account Registry (APAAR)
              </div>

              {/* Student Details Grid (Photo + Attributes + QR Code) matching screenshot */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 64px',
                gap: '14px',
                alignItems: 'center',
                marginBottom: '20px',
              }}>
                {/* Student Photo with holographic border */}
                <div style={{
                  width: '78px',
                  height: '92px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '2px solid #00d2ff',
                  backgroundColor: '#eff6ff',
                  boxShadow: '0 4px 10px rgba(0, 210, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"
                    alt="Tanvi Sharma"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 30, 70, 0.75)',
                    color: '#ffffff',
                    fontSize: '8px',
                    fontWeight: 700,
                    textAlign: 'center',
                    padding: '1px 0',
                  }}>
                    AICTE-VERIFIED
                  </div>
                </div>

                {/* Student Meta Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                      Student Name
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#001e46' }}>
                      Tanvi Sharma
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '8px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                        Date of Birth
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>
                        2 July 2012
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '8px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                        Gender
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>
                        Female
                      </div>
                    </div>
                  </div>

                  {/* Active Highlight Badge triggered by left pill selection */}
                  <div style={{
                    marginTop: '2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#0284c7',
                    backgroundColor: '#e0f2fe',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>
                    <CheckCircle2 size={11} color="#0284c7" />
                    <span>{currentBenefit.cardHighlight}</span>
                  </div>
                </div>

                {/* QR Code Container */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  }}>
                    <QrCode size={48} color="#001e46" />
                  </div>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: '#64748b' }}>
                    Scan to Verify
                  </span>
                </div>
              </div>

              {/* Large 12-Digit APAAR ID Bar exactly as shown in screenshot */}
              <div style={{
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                padding: '10px 14px',
                textAlign: 'center',
                border: '1px dashed #cbd5e1',
              }}>
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                  12-Digit APAAR Identification Number
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  letterSpacing: '0.18em',
                  color: '#001e46',
                  fontFamily: 'monospace',
                }}>
                  9154 5678 3420
                </div>
              </div>
            </div>

            {/* Dotted Trajectory Flow Arc connecting the Card to the National Stage */}
            <div style={{
              position: 'absolute',
              top: '25%',
              right: '-4%',
              width: '180px',
              height: '120px',
              pointerEvents: 'none',
              zIndex: 4,
            }} className="trajectory-flow-container">
              <svg width="100%" height="100%" viewBox="0 0 180 120" fill="none">
                <path
                  d="M 10 90 Q 90 10 170 40"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="trajectory-flow"
                />
                <circle cx="170" cy="40" r="4" fill="#ef4444" />
              </svg>
            </div>

            {/* India National Map 3D Elevation & NEP Student Avatar */}
            <div style={{
              position: 'absolute',
              right: '-60px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '260px',
              height: '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              opacity: 0.95,
            }} className="india-map-stage">
              
              {/* Stylized SVG Map of India with active glowing zone */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg viewBox="0 0 300 360" width="100%" height="100%" style={{ filter: 'drop-shadow(0 15px 25px rgba(13, 148, 136, 0.25))' }}>
                  {/* Subtle 3D Depth Shadow Layer */}
                  <path
                    d="M 140 30 L 170 60 L 190 90 L 220 120 L 210 160 L 240 180 L 220 230 L 180 290 L 150 330 L 130 290 L 110 230 L 90 190 L 80 150 L 110 110 L 130 60 Z"
                    fill="#0f766e"
                    transform="translate(4, 8)"
                    opacity="0.4"
                  />
                  {/* Base India Silhouette in Teal/Emerald matching screenshot */}
                  <path
                    d="M 140 30 L 170 60 L 190 90 L 220 120 L 210 160 L 240 180 L 220 230 L 180 290 L 150 330 L 130 290 L 110 230 L 90 190 L 80 150 L 110 110 L 130 60 Z"
                    fill="#14b8a6"
                  />
                  {/* Highlighted Yellow/Gold State Region matching reference image */}
                  <path
                    d="M 125 180 L 165 175 L 180 205 L 140 225 L 115 200 Z"
                    fill="#facc15"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Animated NEP Student Avatar standing on India map matching screenshot */}
                <div style={{
                  position: 'absolute',
                  top: '18%',
                  left: '42%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  {/* Cartoon-style student illustration badge */}
                  <div style={{
                    width: '58px',
                    height: '80px',
                    borderRadius: '50px 50px 10px 10px',
                    background: 'linear-gradient(180deg, #fbcfe8 0%, #3b82f6 50%, #047857 100%)',
                    border: '2px solid #ffffff',
                    boxShadow: '0 8px 18px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '4px',
                    position: 'relative',
                  }}>
                    {/* Head / Glasses Avatar */}
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: '#fed7aa',
                      border: '1.5px solid #451a03',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                    }}>
                      🤓
                    </div>
                    {/* Pink Notebook */}
                    <div style={{
                      width: '18px',
                      height: '22px',
                      backgroundColor: '#f43f5e',
                      borderRadius: '3px',
                      marginTop: '6px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }} />
                  </div>

                  {/* Location Pin Marker */}
                  <div style={{
                    marginTop: '4px',
                    backgroundColor: 'rgba(0, 30, 70, 0.9)',
                    color: '#facc15',
                    fontSize: '9px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}>
                    {currentBenefit.mapLocation}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 980px) {
          .apaar-benefits-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        @media (max-width: 768px) {
          .india-map-stage {
            display: none !important;
          }
          .trajectory-flow-container {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
