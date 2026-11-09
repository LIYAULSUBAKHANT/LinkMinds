import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Building2, UserCheck, GitCompare, Shield, FileCheck, 
  ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, 
  AlertCircle, ExternalLink, Award, Sparkles, Database 
} from 'lucide-react';
import { LiveAdmissionMarquee } from '../../components/home/LiveAdmissionMarquee';
import { ApaarBenefitsShowcase } from '../../components/home/ApaarBenefitsShowcase';
import { EcosystemMarquee } from '../../components/home/EcosystemMarquee';

export const HomePage: React.FC = () => {
  const { isAuthenticated, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const [activeNoticeIdx, setActiveNoticeIdx] = useState(0);

  const notices = [
    {
      title: 'AICTE Guidelines & Updates',
      desc: 'Latest guidelines for student data submission, reconciliation cut-offs, and batch ingestion schedules for AY 2026-27.',
      badge: 'Academic Year 2026-27',
      date: '28 Oct 2026',
      link: '/resources'
    },
    {
      title: 'Aggregate Reconciliation Protocol',
      desc: 'Instructions on submitting aggregate enrolment tallies and resolving student-level variance flags before regulatory deadlines.',
      badge: 'Reconciliation Update',
      date: '25 Oct 2026',
      link: '/resources'
    },
    {
      title: 'Institution Submission Notices',
      desc: 'Important notifications for AICTE-approved institutions on SeatGuard capacity validation and NRI supernumerary intake.',
      badge: 'Urgent Notice',
      date: '20 Oct 2026',
      link: '/resources'
    }
  ];

  const handlePortalAccess = () => {
    if (isAuthenticated) {
      navigate(getDashboardPath());
    } else {
      navigate('/select-role');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HERO SECTION: Dark Navy / Royal Blue with Technical Grid Texture */}
      <section style={{
        background: 'linear-gradient(135deg, #001e46 0%, #001533 50%, #0a2558 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '56px 24px 64px 24px',
      }}>
        {/* Background dotted / grid pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          position: 'relative',
          zIndex: 2,
        }} className="hero-grid">
          {/* Hero Left Content */}
          <div style={{ maxWidth: '680px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fde68a',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '20px',
            }}>
              <Sparkles size={14} color="#f59e0b" />
              <span>SIH 2026 | Problem Statement SIH26263</span>
            </div>

            {/* Headline Hierarchy Matching Screenshot Exactly */}
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '18px',
              letterSpacing: '-0.02em',
            }}>
              One Student.<br />
              <span style={{ color: '#60a5fa' }}>One Academic Identity.</span><br />
              Every Admission Traceable.<br />
              <span style={{ color: '#f59e0b' }}>Every Approved Seat Accounted For.</span>
            </h1>

            <p style={{
              fontSize: '15px',
              color: '#cbd5e1',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}>
              A unified platform to reconcile student admissions, verify APAAR identities, monitor approved seat utilisation, and maintain transparent, auditable enrolment records across AICTE-approved institutions.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={handlePortalAccess}
                className="btn btn-orange"
                style={{
                  padding: '12px 26px',
                  fontSize: '14px',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                }}
              >
                <span>Access Portal</span>
                <ArrowRight size={16} />
              </button>
              <Link
                to="/features"
                className="btn btn-secondary"
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                <span>Explore Platform</span>
              </Link>
            </div>
          </div>

          {/* Hero Right Visual: Clean, high-tech student identity glass showcase */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div 
              className="animate-float"
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px -15px rgba(0, 210, 255, 0.35), 0 0 0 1px rgba(0, 210, 255, 0.4)',
                maxWidth: '450px',
                width: '100%',
                backgroundColor: '#001e46',
              }}
            >
              {/* Top Holographic Glass Bar */}
              <div style={{
                backgroundColor: 'rgba(0, 21, 51, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0, 210, 255, 0.25)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00d2ff' }} className="pulse-beacon" />
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#00d2ff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Admission Trust Command
                  </span>
                </div>
                <span style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: 'monospace' }}>
                  AICTE-TEIE ACTIVE
                </span>
              </div>

              {/* Natural Aspect Ratio Image with no clipping */}
              <img
                src="/assets/hero/hero_student.png"
                alt="SATYA-APAAR Student Admission Integrity"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '450 / 375',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .hero-grid {
              grid-template-columns: 1.2fr 0.8fr !important;
              align-items: center;
            }
          }
        `}</style>
      </section>

      {/* Real-time Ingestion Stream: Continuous Right-to-Left Marquee Ticker (DPDP Compliant) */}
      <LiveAdmissionMarquee />

      {/* 2. FIVE CORE SERVICE TILES: Responsive 5-Column High-Tech Grid */}
      <section style={{
        maxWidth: '1280px',
        margin: '36px auto 56px auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 5,
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div className="service-tiles-grid">
          {[
            {
              title: 'Institution Onboarding',
              desc: 'Register and submit institutional admission data securely.',
              icon: <Building2 size={24} color="#155eef" />,
              link: '/institution/registration',
              accent: '#155eef',
              badge: 'Step 1',
            },
            {
              title: 'Student Verification',
              desc: 'APAAR-based academic identity resolution & verification.',
              icon: <UserCheck size={24} color="#16a34a" />,
              link: '/features',
              accent: '#16a34a',
              badge: 'Step 2',
            },
            {
              title: 'Data Reconciliation',
              desc: 'Aggregate and student-level mapping and discrepancy analysis.',
              icon: <GitCompare size={24} color="#f59e0b" />,
              link: '/features',
              accent: '#f59e0b',
              badge: 'Step 3',
            },
            {
              title: 'Seat Monitoring',
              desc: 'Track approved intake, quotas and supernumerary utilisation.',
              icon: <Shield size={24} color="#8b5cf6" />,
              link: '/features',
              accent: '#8b5cf6',
              badge: 'Step 4',
            },
            {
              title: 'Audit & Review',
              desc: 'Transparent, evidence-based review decisions & tamper-evident logs.',
              icon: <FileCheck size={24} color="#0284c7" />,
              link: '/features',
              accent: '#0284c7',
              badge: 'Step 5',
            },
          ].map((tile, idx) => (
            <Link
              key={idx}
              to={tile.link}
              className="service-card-interactive"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #dce5ef',
                borderRadius: '12px',
                padding: '22px 18px',
                boxShadow: '0 4px 14px rgba(0, 30, 70, 0.05)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Top Color Accent Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                backgroundColor: tile.accent,
              }} />

              {/* Step Badge & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: `${tile.accent}14`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 2px 8px ${tile.accent}22`,
                }}>
                  {tile.icon}
                </div>
                <span style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: tile.accent,
                  backgroundColor: `${tile.accent}12`,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}>
                  {tile.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: '#001e46', margin: 0, lineHeight: 1.3 }}>
                {tile.title}
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                {tile.desc}
              </p>
              <div style={{
                marginTop: 'auto',
                paddingTop: '6px',
                fontSize: '12.5px',
                color: tile.accent,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span>Explore</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        <style>{`
          .service-tiles-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 16px;
            width: 100%;
          }
          @media (max-width: 1100px) {
            .service-tiles-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
          @media (max-width: 680px) {
            .service-tiles-grid {
              grid-template-columns: 1fr !important;
            }
          }
          .service-card-interactive:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 16px 32px -8px rgba(0, 30, 70, 0.12), 0 0 0 1px rgba(21, 94, 239, 0.3) !important;
          }
        `}</style>
      </section>

      {/* 3. PLATFORM AT A GLANCE (4 METRIC CARDS) */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto 56px auto',
        padding: '0 24px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '24px', color: '#001e46', fontWeight: 800 }}>Platform at a Glance</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            Illustrative prototype metrics (Synthetic demonstration values, not official national statistics)
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '20px',
        }}>
          {[
            {
              label: 'Institutions Onboarded',
              value: '120+',
              desc: 'AICTE-approved institutions on the platform',
              color: '#155eef',
            },
            {
              label: 'Student Records Processed',
              value: '10K+',
              desc: 'Student-level records ingested and validated',
              color: '#16a34a',
            },
            {
              label: 'Reconciliation Coverage',
              value: '95%',
              desc: 'Programmes with aggregate & student mapping',
              color: '#f59e0b',
            },
            {
              label: 'Pending Review Cases',
              value: '28',
              desc: 'Records under AICTE review and variance scrutiny',
              color: '#dc2626',
            },
          ].map((stat, sIdx) => (
            <div
              key={sIdx}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #dce5ef',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                borderTop: `4px solid ${stat.color}`,
              }}
            >
              <div style={{ fontSize: '32px', fontWeight: 800, color: stat.color, marginBottom: '6px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#001e46', marginBottom: '4px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APAAR Interactive Benefits Showcase (One Nation One Student ID & Holographic Card) */}
      <ApaarBenefitsShowcase />

      {/* 4. WHAT'S NEW SECTION (CAROUSEL / NOTICES) */}
      <section style={{
        backgroundColor: '#eef7fe',
        padding: '48px 24px',
        borderTop: '1px solid #dce5ef',
        borderBottom: '1px solid #dce5ef',
        marginBottom: '56px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '22px', color: '#001e46', fontWeight: 800 }}>What's New</h2>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Latest updates, AICTE circulars, and reconciliation notices</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveNoticeIdx((prev) => (prev > 0 ? prev - 1 : notices.length - 1))}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActiveNoticeIdx((prev) => (prev < notices.length - 1 ? prev + 1 : 0))}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {notices.map((notice, nIdx) => (
              <div
                key={nIdx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #dce5ef',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: '#eff6ff',
                    color: '#155eef',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}>
                    {notice.badge}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{notice.date}</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46' }}>
                  {notice.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#475467', lineHeight: 1.5 }}>
                  {notice.desc}
                </p>
                <Link
                  to={notice.link}
                  style={{
                    marginTop: 'auto',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#155eef',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Read Notice</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUPPORTED ACADEMIC ECOSYSTEM & CONTINUOUS VERIFICATION NETWORK */}
      <EcosystemMarquee />

      {/* 6. ABOUT SATYA-APAAR SPLIT SECTION WITH 4 BENEFIT CARDS */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto 64px auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{ fontSize: '26px', color: '#001e46', fontWeight: 800, marginBottom: '14px' }}>
              About SATYA-APAAR
            </h2>
            <p style={{ fontSize: '14px', color: '#475467', lineHeight: 1.7, marginBottom: '16px' }}>
              SATYA-APAAR is an AI-assisted and auditable platform designed to reconcile student admissions, verify APAAR identities, monitor approved seat utilisation, and ensure zero unallocated or duplicate enrolments across AICTE-approved institutions nationwide.
            </p>
            <p style={{ fontSize: '14px', color: '#475467', lineHeight: 1.7, marginBottom: '24px' }}>
              By connecting institutional data with APAAR registries and applying transparent temporal integrity rules (TEIE), the platform empowers regulatory authorities with real-time, tamper-evident oversight.
            </p>
            <Link to="/about" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
              <span>Learn More About the Solution</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4 Benefit Cards Grid: Transparency, Accountability, Integrity, Better Governance */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}>
            {[
              {
                title: 'Transparency',
                desc: 'Complete visibility of student admissions and approved seat utilization.',
                color: '#155eef',
              },
              {
                title: 'Accountability',
                desc: 'Policy-based seat monitoring and verified institutional quotas.',
                color: '#16a34a',
              },
              {
                title: 'Integrity',
                desc: 'Evidence-driven decisions and cryptographic audit logs.',
                color: '#f59e0b',
              },
              {
                title: 'Better Governance',
                desc: 'Data-backed insights and anomaly detection for AICTE oversight.',
                color: '#8b5cf6',
              },
            ].map((card, cIdx) => (
              <div
                key={cIdx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #dce5ef',
                  borderRadius: '8px',
                  padding: '18px 14px',
                  boxShadow: 'var(--shadow-sm)',
                  borderLeft: `4px solid ${card.color}`,
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#001e46', marginBottom: '6px' }}>
                  {card.title}
                </h4>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

