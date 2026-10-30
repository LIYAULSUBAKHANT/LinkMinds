import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, ShieldCheck, Mail, Building, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const { user, role } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>My User Profile & Role</h1>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Official credentials and cryptographic session authentication details.
        </p>
      </div>

      <div className="gov-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#001e46',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 800,
          }}>
            {user?.avatar || 'U'}
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#001e46' }}>{user?.name}</h2>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{user?.designation || 'Authorised Officer'}</div>
            <div style={{ marginTop: '6px' }}>
              <span className="badge badge-info">{role.replace('_', ' ').toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '13px' }}>
          <div className="form-group">
            <label className="form-label">Official Email ID</label>
            <input type="text" readOnly value={user?.email || ''} className="form-control" style={{ background: '#f8fafc' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Associated Institution / Office</label>
            <input type="text" readOnly value={user?.institutionName || 'AICTE Central HQ, New Delhi'} className="form-control" style={{ background: '#f8fafc' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Two-Factor Authentication (MFA)</label>
            <input type="text" readOnly value="Hardware Key / TOTP Active" className="form-control" style={{ background: '#f8fafc' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Session Authentication State</label>
            <input type="text" readOnly value="Locally Signed Demo Session" className="form-control" style={{ background: '#f8fafc' }} />
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={() => toast.success('Profile preferences updated')} className="btn btn-primary btn-sm">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

