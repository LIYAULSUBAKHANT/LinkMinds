import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Phone, HelpCircle, Globe, ChevronDown } from 'lucide-react';

export const GovernmentUtilityBar: React.FC = () => {
  const { fontSize, setFontSize, language, setLanguage, skipToMain } = useAccessibility();

  return (
    <div style={{
      backgroundColor: '#001e46',
      color: '#ffffff',
      fontSize: '12px',
      padding: '4px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      minHeight: '34px',
      zIndex: 100,
    }}>
      {/* Left: National Admission Assurance Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Mini Tricolour indicator */}
          <div style={{
            width: '16px',
            height: '11px',
            background: 'linear-gradient(to bottom, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
            borderRadius: '2px',
            border: '1px solid rgba(255,255,255,0.4)'
          }} />
          <span style={{ fontWeight: 700, letterSpacing: '0.03em', fontSize: '11.5px' }}>NATIONAL ADMISSION ASSURANCE PLATFORM</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
        <button
          onClick={skipToMain}
          style={{
            color: '#93c5fd',
            fontSize: '11px',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
        >
          Skip to Main Content
        </button>
      </div>

      {/* Right: Accessibility & Helpline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Font resize controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', padding: '2px 6px' }}>
          <button
            onClick={() => setFontSize('sm')}
            style={{
              color: fontSize === 'sm' ? '#f59e0b' : '#ffffff',
              fontWeight: fontSize === 'sm' ? 'bold' : 'normal',
              padding: '0 4px',
              fontSize: '11px'
            }}
            title="Decrease text size"
          >
            A-
          </button>
          <button
            onClick={() => setFontSize('md')}
            style={{
              color: fontSize === 'md' ? '#f59e0b' : '#ffffff',
              fontWeight: fontSize === 'md' ? 'bold' : 'normal',
              padding: '0 4px',
              fontSize: '12px'
            }}
            title="Default text size"
          >
            A
          </button>
          <button
            onClick={() => setFontSize('lg')}
            style={{
              color: fontSize === 'lg' ? '#f59e0b' : '#ffffff',
              fontWeight: fontSize === 'lg' ? 'bold' : 'normal',
              padding: '0 4px',
              fontSize: '13px'
            }}
            title="Increase text size"
          >
            A+
          </button>
        </div>

        {/* Helpline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Phone size={12} color="#f59e0b" />
          <span>Helpline: <strong>1800 123 4567</strong></span>
          <span style={{ fontSize: '10px', color: '#94a3b8' }}>(Demo)</span>
        </div>

        {/* Get Support */}
        <a 
          href="/support"
          style={{ 
            color: '#ffffff', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            textDecoration: 'none'
          }}
        >
          <HelpCircle size={12} />
          <span>Get Support</span>
        </a>

        {/* Language selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <Globe size={12} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: 'none',
              fontSize: '11px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="English" style={{ color: '#000' }}>English</option>
            <option value="Hindi" style={{ color: '#000' }}>हिन्दी (Demo)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

