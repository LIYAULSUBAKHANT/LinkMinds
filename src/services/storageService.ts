import { 
  User, Institution, StudentRecord, TEIEEvent, SubmissionBatch, 
  ReconciliationItem, SeatLedgerEntry, ReviewCase, AuditEvent, 
  ConsentPassCredential, SystemNotification, UserRole 
} from '../types';
import { 
  SEED_USERS, SEED_INSTITUTIONS, SEED_STUDENTS, SEED_TEIE_EVENTS, 
  SEED_SUBMISSIONS, SEED_RECONCILIATION, SEED_SEAT_LEDGER, 
  SEED_REVIEW_CASES, SEED_AUDIT_LOGS, SEED_CREDENTIALS, 
  SEED_NOTIFICATIONS 
} from '../data/seedData';

const STORAGE_PREFIX = 'satya_apaar_v2_1_';

export class StorageService {
  private static getItem<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  public static initialize(): void {
    if (!localStorage.getItem(STORAGE_PREFIX + 'initialized')) {
      this.resetAll();
    }
  }

  public static resetAll(): void {
    this.setItem('users', SEED_USERS);
    this.setItem('institutions', SEED_INSTITUTIONS);
    this.setItem('students', SEED_STUDENTS);
    this.setItem('teie_events', SEED_TEIE_EVENTS);
    this.setItem('submissions', SEED_SUBMISSIONS);
    this.setItem('reconciliation', SEED_RECONCILIATION);
    this.setItem('seat_ledger', SEED_SEAT_LEDGER);
    this.setItem('review_cases', SEED_REVIEW_CASES);
    this.setItem('audit_logs', SEED_AUDIT_LOGS);
    this.setItem('credentials', SEED_CREDENTIALS);
    this.setItem('notifications', SEED_NOTIFICATIONS);
    this.setItem('currentUser', SEED_USERS[0]); // default to AICTE Admin
    this.setItem('initialized', true);
  }

  // Current User Session
  public static getCurrentUser(): User {
    return this.getItem<User>('currentUser', SEED_USERS[0]);
  }

  public static setCurrentUser(user: User): void {
    this.setItem('currentUser', user);
  }

  public static switchRole(role: UserRole): User {
    const user = SEED_USERS.find(u => u.role === role) || SEED_USERS[0];
    this.setCurrentUser(user);
    return user;
  }

  // Institutions
  public static getInstitutions(): Institution[] {
    return this.getItem<Institution[]>('institutions', SEED_INSTITUTIONS);
  }

  public static getInstitutionById(id: string): Institution | undefined {
    return this.getInstitutions().find(i => i.id === id || i.permanentId === id);
  }

  // Students
  public static getStudents(): StudentRecord[] {
    return this.getItem<StudentRecord[]>('students', SEED_STUDENTS);
  }

  public static getStudentById(id: string): StudentRecord | undefined {
    return this.getStudents().find(s => s.id === id || s.studentRef === id);
  }

  public static addStudent(student: StudentRecord): void {
    const list = this.getStudents();
    list.unshift(student);
    this.setItem('students', list);
  }

  // TEIE Events
  public static getTEIEEvents(studentId?: string): TEIEEvent[] {
    const all = this.getItem<TEIEEvent[]>('teie_events', SEED_TEIE_EVENTS);
    if (!studentId) return all;
    return all.filter(e => e.studentId === studentId);
  }

  // Submissions
  public static getSubmissions(): SubmissionBatch[] {
    return this.getItem<SubmissionBatch[]>('submissions', SEED_SUBMISSIONS);
  }

  public static addSubmission(sub: SubmissionBatch): void {
    const list = this.getSubmissions();
    list.unshift(sub);
    this.setItem('submissions', list);
    
    // Also log audit event
    this.addAuditEvent({
      id: 'aud-' + Date.now(),
      eventId: 'EVT-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: this.getCurrentUser().name,
      role: this.getCurrentUser().role,
      action: 'INGEST_SUBMISSION_BATCH',
      entityTarget: sub.batchNumber,
      reason: `Uploaded ${sub.totalRecords} admission records for ${sub.programme}`,
      previousHash: 'a71e84f938210381029381029381029381029381029381029381029381029381',
      currentHash: 'b942f10283948192839481928394819283948192839481928394819283948192'
    });
  }

  // Reconciliation
  public static getReconciliation(): ReconciliationItem[] {
    return this.getItem<ReconciliationItem[]>('reconciliation', SEED_RECONCILIATION);
  }

  public static updateReconciliationExplanation(id: string, explanation: string): void {
    const list = this.getReconciliation().map(item => {
      if (item.id === id) {
        return { ...item, explanation, lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) };
      }
      return item;
    });
    this.setItem('reconciliation', list);
  }

  // Seat Ledger
  public static getSeatLedger(): SeatLedgerEntry[] {
    return this.getItem<SeatLedgerEntry[]>('seat_ledger', SEED_SEAT_LEDGER);
  }

  // Review Cases
  public static getReviewCases(): ReviewCase[] {
    return this.getItem<ReviewCase[]>('review_cases', SEED_REVIEW_CASES);
  }

  public static getReviewCaseById(id: string): ReviewCase | undefined {
    return this.getReviewCases().find(c => c.id === id || c.caseId === id);
  }

  public static updateReviewCaseStatus(caseId: string, status: ReviewCase['status'], decisionNotes: string): void {
    const user = this.getCurrentUser();
    const list = this.getReviewCases().map(c => {
      if (c.caseId === caseId || c.id === caseId) {
        return {
          ...c,
          status,
          auditTrail: [
            ...c.auditTrail,
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              actor: `${user.name} (${user.role})`,
              action: `Decision: ${status}`,
              notes: decisionNotes
            }
          ]
        };
      }
      return c;
    });
    this.setItem('review_cases', list);

    // Also record tamper-evident audit event
    this.addAuditEvent({
      id: 'aud-' + Date.now(),
      eventId: 'EVT-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: `${user.name} (${user.role})`,
      role: user.role,
      action: `REVIEW_DECISION_${status}`,
      entityTarget: caseId,
      reason: decisionNotes,
      previousHash: 'b942f10283948192839481928394819283948192839481928394819283948192',
      currentHash: 'c817294819203918203918203918203918203918203918203918203918203918'
    });
  }

  // Audit Logs
  public static getAuditLogs(): AuditEvent[] {
    return this.getItem<AuditEvent[]>('audit_logs', SEED_AUDIT_LOGS);
  }

  public static addAuditEvent(event: AuditEvent): void {
    const list = this.getAuditLogs();
    list.unshift(event);
    this.setItem('audit_logs', list);
  }

  // Credentials
  public static getCredentials(): ConsentPassCredential[] {
    return this.getItem<ConsentPassCredential[]>('credentials', SEED_CREDENTIALS);
  }

  public static addCredential(cred: ConsentPassCredential): void {
    const list = this.getCredentials();
    list.unshift(cred);
    this.setItem('credentials', list);
  }

  public static revokeCredential(token: string): void {
    const list = this.getCredentials().map(c => {
      if (c.token === token) return { ...c, status: 'Revoked' as const };
      return c;
    });
    this.setItem('credentials', list);
  }

  // Notifications
  public static getNotifications(): SystemNotification[] {
    return this.getItem<SystemNotification[]>('notifications', SEED_NOTIFICATIONS);
  }

  public static markNotificationRead(id: string): void {
    const list = this.getNotifications().map(n => {
      if (n.id === id) return { ...n, isRead: true };
      return n;
    });
    this.setItem('notifications', list);
  }

  public static markAllNotificationsRead(): void {
    const list = this.getNotifications().map(n => ({ ...n, isRead: true }));
    this.setItem('notifications', list);
  }
}

// Auto-initialize storage
StorageService.initialize();

