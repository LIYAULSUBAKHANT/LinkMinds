import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { SystemNotification } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Bell, Settings, Sliders, Mail, MessageSquare, 
  Users, Check, ArrowRight, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const NotificationsSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'preferences' | 'thresholds' | 'templates'>('notifications');
  const [notifications, setNotifications] = useState<SystemNotification[]>(StorageService.getNotifications());
  
  // Notification Preferences State
  const [preferences, setPreferences] = useState({
    emailDiscrepancy: true,
    smsUrgentReview: true,
    inAppBatchIngestion: true,
    dailyDigest: false,
  });

  // Alert Rules & Thresholds State
  const [thresholds, setThresholds] = useState({
    varianceAlertThreshold: 5, // %
    seatUtilisationAlertThreshold: 98, // %
    duplicateIngestAutoReview: true,
    foreignNationalExceptionApproval: true,
  });

  const handleMarkRead = (id: string) => {
    StorageService.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    toast.success('Marked notification as read');
  };

  const handleMarkAllRead = () => {
    StorageService.markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleSaveThresholds = () => {
    toast.success('Updated alert rules & anomaly trigger thresholds!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
              Notifications, Alert Rules & Settings
            </h1>
            <span className="badge badge-mock">Page 29 • Design Inferred</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Manage administrative notification channels, regulatory alert thresholds, and operational dispatch settings.
          </p>
        </div>
      </div>

      {/* Mandatory Shortcut Banner to Canonical Page 27 User Management */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#155eef', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#001e46', fontSize: '13.5px' }}>
              User Provisioning & Role Administration
            </div>
            <div style={{ fontSize: '12px', color: '#1e40af' }}>
              User accounts and role permission matrices are canonically governed on Page 27 (System Administration).
            </div>
          </div>
        </div>

        <Link to="/admin/users" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Open User Management (Page 27)</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('notifications')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'notifications' ? 700 : 500,
            color: activeTab === 'notifications' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'notifications' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Notifications Centre ({notifications.filter(n => !n.isRead).length} new)
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'preferences' ? 700 : 500,
            color: activeTab === 'preferences' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'preferences' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Channel Preferences
        </button>
        <button
          onClick={() => setActiveTab('thresholds')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'thresholds' ? 700 : 500,
            color: activeTab === 'thresholds' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'thresholds' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Alert Rules & Thresholds
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'templates' ? 700 : 500,
            color: activeTab === 'templates' ? '#155eef' : '#64748b',
            borderBottom: activeTab === 'templates' ? '3px solid #155eef' : '3px solid transparent',
            marginBottom: '-2px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          Notification Templates
        </button>
      </div>

      {/* TAB 1: NOTIFICATIONS CENTRE */}
      {activeTab === 'notifications' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <Bell size={16} color="#155eef" />
              <span>System & Regulatory Alerts</span>
            </h3>
            <button onClick={handleMarkAllRead} className="btn btn-secondary btn-sm">
              Mark All as Read
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notifications.map(n => (
              <div
                key={n.id}
                style={{
                  padding: '14px 18px',
                  borderRadius: '8px',
                  border: '1px solid #dce5ef',
                  backgroundColor: n.isRead ? '#ffffff' : '#f0f9ff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 700, color: '#001e46', fontSize: '13.5px' }}>{n.title}</span>
                    <span className="badge badge-info">{n.category}</span>
                    {!n.isRead && <span className="badge badge-warning">Unread</span>}
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#475467', lineHeight: 1.5 }}>{n.message}</p>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{n.timestamp}</span>
                </div>

                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ flexShrink: 0 }}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CHANNEL PREFERENCES */}
      {activeTab === 'preferences' && (
        <div className="gov-card">
          <h3 className="gov-card-title" style={{ marginBottom: '16px' }}>
            <Sliders size={16} color="#155eef" />
            <span>Delivery Channel Routing</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#001e46' }}>Email Discrepancy Alerts</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Dispatch instant email to Institution Nodal Officer when aggregate variance exceeds threshold</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.emailDiscrepancy}
                onChange={(e) => setPreferences({ ...preferences, emailDiscrepancy: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#001e46' }}>SMS Urgent Notices</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Send critical SMS alerts for high-priority S5 collisions or over-intake breaches</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.smsUrgentReview}
                onChange={(e) => setPreferences({ ...preferences, smsUrgentReview: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#001e46' }}>In-App Ingestion Notifications</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Show toast messages and bell counter updates for preflight validation results</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.inAppBatchIngestion}
                onChange={(e) => setPreferences({ ...preferences, inAppBatchIngestion: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALERT RULES & THRESHOLDS */}
      {activeTab === 'thresholds' && (
        <div className="gov-card">
          <div className="gov-card-header">
            <h3 className="gov-card-title">
              <Sliders size={16} color="#155eef" />
              <span>Regulatory Anomaly Trigger Thresholds</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">
                Aggregate Variance Trigger Threshold: <strong>{thresholds.varianceAlertThreshold}%</strong>
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={thresholds.varianceAlertThreshold}
                onChange={(e) => setThresholds({ ...thresholds, varianceAlertThreshold: Number(e.target.value) })}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                Automatically routes batch to AICTE Review Queue when student records deviate by more than {thresholds.varianceAlertThreshold}% from aggregate tally.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">
                SeatGuard Near-Capacity Advisory Threshold: <strong>{thresholds.seatUtilisationAlertThreshold}%</strong>
              </label>
              <input
                type="range"
                min="80"
                max="100"
                value={thresholds.seatUtilisationAlertThreshold}
                onChange={(e) => setThresholds({ ...thresholds, seatUtilisationAlertThreshold: Number(e.target.value) })}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                Generates early-warning capacity notice when active admissions reach {thresholds.seatUtilisationAlertThreshold}% of sanctioned intake.
              </span>
            </div>

            <button
              onClick={handleSaveThresholds}
              className="btn btn-primary btn-sm"
              style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Check size={14} />
              <span>Save Trigger Thresholds</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="gov-card">
          <h3 className="gov-card-title" style={{ marginBottom: '14px' }}>
            <span>Regulatory Dispatch Notification Templates</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { code: 'TMPL-REC-NOTICE', name: 'Notice of Unreconciled Variance', preview: 'Dear Nodal Officer, Your submission for [Programme] contains an unresolved variance of [Count] records...' },
              { code: 'TMPL-SEAT-ALERT', name: 'SeatGuard Capacity Breach Advisory', preview: 'Attention Registrar, Active admissions have reached [Percent]% of sanctioned intake under AICTE Gazette Ref...' },
            ].map(t => (
              <div key={t.code} style={{ padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: '#001e46', fontSize: '13px' }}>{t.name}</span>
                  <code>{t.code}</code>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>"{t.preview}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

