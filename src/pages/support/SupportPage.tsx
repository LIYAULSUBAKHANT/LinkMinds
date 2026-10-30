import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export const SupportPage: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [category, setCategory] = useState('Ingestion Issue');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      toast.error('Please fill in both subject and description');
      return;
    }

    const tId = `TKT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedTicket(tId);
    toast.success(`Support query logged! Ticket ID: ${tId}`);
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '10px 0 40px 0' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
          Help & Support Desk
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Technical guidance, grievance registration, and query resolution for institutions and verifiers.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {/* Left Column: Official Contact Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="gov-card">
            <h3 className="gov-card-title" style={{ marginBottom: '14px' }}>
              <Phone size={16} color="#155eef" />
              <span>AICTE Central Assistance Channels</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#475467' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#001e46' }}>National Toll-Free Helpline:</div>
                  <div>1800 123 4567 <span style={{ fontSize: '11px', color: '#94a3b8' }}>(9:00 AM – 6:00 PM IST)</span></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Mail size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#001e46' }}>Email Support:</div>
                  <div>support@satya-apaar.gov.in</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#001e46' }}>AICTE Headquarters:</div>
                  <div>Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '12.5px',
            color: '#1e40af',
            lineHeight: 1.5,
          }}>
            <strong>Demonstration Support Notice:</strong> In this prototype deployment, support tickets are tracked locally in browser state.
          </div>
        </div>

        {/* Right Column: Raise a Support Query Form */}
        <div className="gov-card">
          <h3 className="gov-card-title" style={{ marginBottom: '14px' }}>
            <MessageSquare size={16} color="#155eef" />
            <span>Raise a Support Query / Ticket</span>
          </h3>

          {submittedTicket ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <CheckCircle2 size={40} color="#16a34a" style={{ margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '6px' }}>Query Submitted!</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                Your ticket has been logged under docket ID: <strong>{submittedTicket}</strong>
              </p>
              <button onClick={() => setSubmittedTicket(null)} className="btn btn-secondary btn-sm">
                Submit Another Query
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Query Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '12.5px' }}
                >
                  <option value="Ingestion Issue">Batch Ingestion & File Parsing</option>
                  <option value="Reconciliation Discrepancy">Aggregate Variance & Evidence</option>
                  <option value="APAAR Resolution">APAAR Format & Exception Request</option>
                  <option value="SeatGuard Capacity">Approved Intake Quota Clarification</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Subject Summary *</label>
                <input
                  type="text"
                  placeholder="Brief summary of query..."
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '12.5px' }}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Detailed Description *</label>
                <textarea
                  rows={4}
                  placeholder="Provide batch ID, candidate reference, or ordinance clause..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '12.5px' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Send size={14} />
                <span>Submit Query to AICTE Desk</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

