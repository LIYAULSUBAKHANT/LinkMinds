export type UserRole = 
  | 'aicte_admin' 
  | 'institution_operator' 
  | 'authorised_verifier' 
  | 'system_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionId?: string;
  institutionName?: string;
  designation?: string;
  avatar?: string;
}

export interface Institution {
  id: string;
  permanentId: string;
  name: string;
  state: string;
  city: string;
  type: 'Central' | 'State' | 'Deemed' | 'Private' | 'Autonomous';
  approvedIntake: number;
  admittedCount: number;
  reconciliationRate: number;
  dataQualityScore: number;
  riskPriority: 'LOW' | 'MEDIUM' | 'HIGH';
  contactPerson: string;
  email: string;
}

export interface StudentRecord {
  id: string;
  studentRef: string;
  maskedApaar: string;
  fullName: string;
  dob: string;
  gender: 'M' | 'F' | 'O';
  programme: string;
  academicYear: string;
  category: 'General' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS' | 'Supernumerary';
  admissionDate: string;
  identityStatus: 'Verified' | 'Pending' | 'Exception' | 'Flagged';
  enrolmentStatus: 'Active' | 'Transferred' | 'Withdrawn' | 'Under Review';
  institutionId: string;
  institutionName: string;
}

export type TEIEClassification = 
  | 'New Enrolment'
  | 'Sequential Transfer'
  | 'Transition Overlap'
  | 'Policy-Based Exception'
  | 'Unexplained Overlap'
  | 'Potential Duplicate Data Entry'
  | 'Duplicate Submission';

export interface TEIEEvent {
  id: string;
  studentId: string;
  eventType: 'Admission' | 'Withdrawal' | 'Transfer' | 'Cancellation' | 'Correction';
  institution: string;
  programme: string;
  academicYear: string;
  effectiveDate: string;
  recordedDate: string;
  status: string;
  studyMode: 'Full-time' | 'Part-time' | 'Distance';
  evidenceRef: string;
  classification: TEIEClassification;
  notes?: string;
}

export interface SubmissionBatch {
  id: string;
  batchNumber: string;
  institutionId: string;
  institutionName: string;
  programme: string;
  academicYear: string;
  submissionDate: string;
  totalRecords: number;
  validRecords: number;
  errorCount: number;
  warningCount: number;
  status: 'Draft' | 'Preflight Validated' | 'Under Review' | 'Processed' | 'Needs Correction';
  version: string;
  uploadedBy: string;
}

export interface PreflightIssue {
  id: string;
  rowNumber: number;
  fieldName: string;
  reasonCode: string;
  description: string;
  severity: 'Error' | 'Warning' | 'Duplicate';
  recommendedAction: string;
}

export interface ReconciliationScope {
  institutionId: string;
  programme: string;
  academicYear: string;
  category: string;
}

export type ReconciliationOutcome = 
  | 'Reconciled'
  | 'Variance — Detail Missing'
  | 'Variance — Count Mismatch'
  | 'Scope Mismatch'
  | 'Aggregate-only'
  | 'Partially Reconciled';

export interface ReconciliationItem {
  id: string;
  programme: string;
  academicYear: string;
  reportedAggregate: number;
  studentRecordsCount: number;
  variance: number;
  outcome: ReconciliationOutcome;
  categoryBreakdown: {
    category: string;
    reported: number;
    actual: number;
    variance: number;
  }[];
  explanation?: string;
  lastUpdated: string;
}

export interface SeatLedgerEntry {
  id: string;
  programme: string;
  academicYear: string;
  category: string;
  approvedIntake: number;
  activeAdmissions: number;
  remainingCapacity: number;
  supernumeraryQuota: number;
  status: 'Normal' | 'Near Capacity' | 'Cap Exceeded';
  policyReference: string;
}

export interface ReviewCase {
  id: string;
  caseId: string;
  reasonCode: 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9' | 'S10' | 'S11' | 'S12';
  title: string;
  institutionId: string;
  institutionName: string;
  studentRef?: string;
  studentName?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'ASSIGNED' | 'APPROVED' | 'REJECTED' | 'RETURNED';
  assignedTo?: string;
  createdDate: string;
  agingDays: number;
  evidenceSummary: string;
  auditTrail: {
    timestamp: string;
    actor: string;
    action: string;
    notes?: string;
  }[];
}

export interface AuditEvent {
  id: string;
  eventId: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  entityTarget: string;
  reason: string;
  previousHash: string;
  currentHash: string;
}

export interface ConsentPassCredential {
  id: string;
  token: string;
  studentRef: string;
  studentName: string;
  institution: string;
  programme: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Revoked' | 'Pending';
  permittedClaims: string[];
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  timestamp: string;
  isRead: boolean;
  category: string;
  link?: string;
}

