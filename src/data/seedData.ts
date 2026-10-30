import { 
  User, Institution, StudentRecord, TEIEEvent, SubmissionBatch, 
  ReconciliationItem, SeatLedgerEntry, ReviewCase, AuditEvent, 
  ConsentPassCredential, SystemNotification 
} from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'user-aicte-1',
    name: 'Dr. Ramesh Sharma',
    email: 'admin.aicte@satya-apaar.gov.in',
    role: 'aicte_admin',
    designation: 'Chief Regulatory Officer, AICTE HQ',
    avatar: 'RS'
  },
  {
    id: 'user-inst-1',
    name: 'Prof. K. Venkatesh',
    email: 'operator@bitsathy.ac.in',
    role: 'institution_operator',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology (BIT Sathy)',
    designation: 'Dean of Admissions',
    avatar: 'KV'
  },
  {
    id: 'user-verifier-1',
    name: 'Ananya Deshmukh',
    email: 'verifier@tcs-backgroundcheck.com',
    role: 'authorised_verifier',
    designation: 'Credential Verification Lead',
    avatar: 'AD'
  },
  {
    id: 'user-admin-1',
    name: 'Suresh Kumar',
    email: 'sysadmin@satya-apaar.gov.in',
    role: 'system_admin',
    designation: 'Principal Systems Architect',
    avatar: 'SK'
  }
];

export const SEED_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-1',
    permanentId: '1-429182741',
    name: 'Bannari Amman Institute of Technology (BIT Sathy)',
    state: 'Tamil Nadu',
    city: 'Sathyamangalam',
    type: 'Autonomous',
    approvedIntake: 1200,
    admittedCount: 1180,
    reconciliationRate: 98.2,
    dataQualityScore: 99.1,
    riskPriority: 'LOW',
    contactPerson: 'Prof. K. Venkatesh',
    email: 'admissions@bitsathy.ac.in'
  },
  {
    id: 'inst-2',
    permanentId: '1-849102831',
    name: 'Delhi Technological University (DTU)',
    state: 'Delhi',
    city: 'New Delhi',
    type: 'State',
    approvedIntake: 2400,
    admittedCount: 2390,
    reconciliationRate: 96.5,
    dataQualityScore: 97.4,
    riskPriority: 'LOW',
    contactPerson: 'Dr. Rajiv Grover',
    email: 'registrar@dtu.ac.in'
  },
  {
    id: 'inst-3',
    permanentId: '1-382910482',
    name: 'College of Engineering, Pune (COEP Tech)',
    state: 'Maharashtra',
    city: 'Pune',
    type: 'State',
    approvedIntake: 980,
    admittedCount: 975,
    reconciliationRate: 99.0,
    dataQualityScore: 98.8,
    riskPriority: 'LOW',
    contactPerson: 'Dr. M. S. Joshi',
    email: 'admissions@coep.ac.in'
  },
  {
    id: 'inst-4',
    permanentId: '1-749201948',
    name: 'Vellore Institute of Technology (VIT Bhopal)',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    type: 'Private',
    approvedIntake: 1500,
    admittedCount: 1520,
    reconciliationRate: 92.4,
    dataQualityScore: 94.0,
    riskPriority: 'MEDIUM',
    contactPerson: 'Dr. P. R. Pillai',
    email: 'dean.acad@vitbhopal.ac.in'
  },
  {
    id: 'inst-5',
    permanentId: '1-592819381',
    name: 'Apex Institute of Engineering & Technology',
    state: 'Rajasthan',
    city: 'Jaipur',
    type: 'Private',
    approvedIntake: 300,
    admittedCount: 328,
    reconciliationRate: 84.1,
    dataQualityScore: 81.5,
    riskPriority: 'HIGH',
    contactPerson: 'Vikas Sharma',
    email: 'info@apexiet.edu.in'
  },
  {
    id: 'inst-6',
    permanentId: '1-992817264',
    name: 'National Institute of Technology, Kurukshetra',
    state: 'Haryana',
    city: 'Kurukshetra',
    type: 'Central',
    approvedIntake: 1100,
    admittedCount: 0,
    reconciliationRate: 0.0,
    dataQualityScore: 0.0,
    riskPriority: 'LOW',
    contactPerson: 'Prof. A. K. Singla',
    email: 'dean@nitkkr.ac.in'
  }
];

export const SEED_STUDENTS: StudentRecord[] = [
  {
    id: 'std-1',
    studentRef: 'STU-2026-00184',
    maskedApaar: '9842-XXXX-8491',
    fullName: 'Aarav Rajesh Patel',
    dob: '2005-04-12',
    gender: 'M',
    programme: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-2027',
    category: 'General',
    admissionDate: '2026-07-15',
    identityStatus: 'Verified',
    enrolmentStatus: 'Active',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology'
  },
  {
    id: 'std-2',
    studentRef: 'STU-2026-00185',
    maskedApaar: '8492-XXXX-1934',
    fullName: 'Priya Sundararajan',
    dob: '2005-09-23',
    gender: 'F',
    programme: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-2027',
    category: 'OBC-NCL',
    admissionDate: '2026-07-18',
    identityStatus: 'Verified',
    enrolmentStatus: 'Active',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology'
  },
  {
    id: 'std-3',
    studentRef: 'STU-2026-00186',
    maskedApaar: '7192-XXXX-4910',
    fullName: 'Rohan Mehra',
    dob: '2004-11-05',
    gender: 'M',
    programme: 'B.Tech Information Technology',
    academicYear: '2026-2027',
    category: 'General',
    admissionDate: '2026-08-01',
    identityStatus: 'Verified',
    enrolmentStatus: 'Transferred',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology'
  },
  {
    id: 'std-4',
    studentRef: 'STU-2026-00187',
    maskedApaar: 'INVALID-STRUCT',
    fullName: 'Vikramaditya Sengupta',
    dob: '2005-01-30',
    gender: 'M',
    programme: 'B.Tech Electronics & Communication',
    academicYear: '2026-2027',
    category: 'SC',
    admissionDate: '2026-07-20',
    identityStatus: 'Flagged',
    enrolmentStatus: 'Under Review',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology'
  },
  {
    id: 'std-5',
    studentRef: 'STU-2026-00188',
    maskedApaar: 'FN-VISA-99410',
    fullName: 'Daphne Al-Mansoor',
    dob: '2005-06-18',
    gender: 'F',
    programme: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-2027',
    category: 'Supernumerary',
    admissionDate: '2026-08-10',
    identityStatus: 'Exception',
    enrolmentStatus: 'Active',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology'
  },
  {
    id: 'std-6',
    studentRef: 'STU-2026-00189',
    maskedApaar: '5192-XXXX-3829',
    fullName: 'Aditya Narayan Verma',
    dob: '2004-03-14',
    gender: 'M',
    programme: 'B.Tech Mechanical Engineering',
    academicYear: '2026-2027',
    category: 'EWS',
    admissionDate: '2026-07-25',
    identityStatus: 'Verified',
    enrolmentStatus: 'Under Review',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology'
  }
];

export const SEED_TEIE_EVENTS: TEIEEvent[] = [
  {
    id: 'teie-1',
    studentId: 'std-3',
    eventType: 'Admission',
    institution: 'Delhi Technological University (DTU)',
    programme: 'B.Tech Information Technology',
    academicYear: '2025-2026',
    effectiveDate: '2025-08-01',
    recordedDate: '2025-08-02',
    status: 'Withdrawn',
    studyMode: 'Full-time',
    evidenceRef: 'DTU/ADM/2025/8491',
    classification: 'New Enrolment',
    notes: 'Initial admission completed in Semester 1'
  },
  {
    id: 'teie-2',
    studentId: 'std-3',
    eventType: 'Withdrawal',
    institution: 'Delhi Technological University (DTU)',
    programme: 'B.Tech Information Technology',
    academicYear: '2025-2026',
    effectiveDate: '2026-06-15',
    recordedDate: '2026-06-16',
    status: 'Completed',
    studyMode: 'Full-time',
    evidenceRef: 'DTU/NOC/2026/0418',
    classification: 'Sequential Transfer',
    notes: 'Formal transfer clearance and NOC granted by registrar'
  },
  {
    id: 'teie-3',
    studentId: 'std-3',
    eventType: 'Admission',
    institution: 'Bannari Amman Institute of Technology (BIT Sathy)',
    programme: 'B.Tech Information Technology',
    academicYear: '2026-2027',
    effectiveDate: '2026-08-01',
    recordedDate: '2026-08-01',
    status: 'Active',
    studyMode: 'Full-time',
    evidenceRef: 'BIT/LAT/2026/019',
    classification: 'Sequential Transfer',
    notes: 'Lateral entry admission regularised with valid prior exit proof'
  },
  {
    id: 'teie-4',
    studentId: 'std-6',
    eventType: 'Admission',
    institution: 'Apex Institute of Engineering & Technology',
    programme: 'B.Tech Mechanical Engineering',
    academicYear: '2026-2027',
    effectiveDate: '2026-07-10',
    recordedDate: '2026-07-11',
    status: 'Active',
    studyMode: 'Full-time',
    evidenceRef: 'APX/2026/9102',
    classification: 'Unexplained Overlap',
    notes: 'Concurrent admission detected without withdrawal evidence from prior institution'
  }
];

export const SEED_SUBMISSIONS: SubmissionBatch[] = [
  {
    id: 'sub-1',
    batchNumber: 'BATCH-2026-0042',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology',
    programme: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-2027',
    submissionDate: '2026-10-24 14:30',
    totalRecords: 500,
    validRecords: 472,
    errorCount: 18,
    warningCount: 10,
    status: 'Under Review',
    version: 'v1.0',
    uploadedBy: 'Prof. K. Venkatesh'
  },
  {
    id: 'sub-2',
    batchNumber: 'BATCH-2026-0038',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology',
    programme: 'B.Tech Information Technology',
    academicYear: '2026-2027',
    submissionDate: '2026-10-18 11:15',
    totalRecords: 120,
    validRecords: 120,
    errorCount: 0,
    warningCount: 0,
    status: 'Processed',
    version: 'v1.0',
    uploadedBy: 'Prof. K. Venkatesh'
  },
  {
    id: 'sub-3',
    batchNumber: 'BATCH-2026-0035',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology',
    programme: 'B.Tech Electronics & Communication',
    academicYear: '2026-2027',
    submissionDate: '2026-10-12 16:45',
    totalRecords: 180,
    validRecords: 172,
    errorCount: 8,
    warningCount: 4,
    status: 'Needs Correction',
    version: 'v1.1',
    uploadedBy: 'Prof. K. Venkatesh'
  }
];

export const SEED_RECONCILIATION: ReconciliationItem[] = [
  {
    id: 'rec-1',
    programme: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-2027',
    reportedAggregate: 500,
    studentRecordsCount: 472,
    variance: 28,
    outcome: 'Variance — Detail Missing',
    categoryBreakdown: [
      { category: 'General', reported: 250, actual: 236, variance: 14 },
      { category: 'OBC-NCL', reported: 135, actual: 128, variance: 7 },
      { category: 'SC/ST', reported: 65, actual: 62, variance: 3 },
      { category: 'EWS', reported: 50, actual: 46, variance: 4 }
    ],
    explanation: '28 student admissions pending document verification at local center; records will be uploaded in Batch 0043.',
    lastUpdated: '2026-10-28 10:30'
  },
  {
    id: 'rec-2',
    programme: 'B.Tech Information Technology',
    academicYear: '2026-2027',
    reportedAggregate: 120,
    studentRecordsCount: 120,
    variance: 0,
    outcome: 'Reconciled',
    categoryBreakdown: [
      { category: 'General', reported: 60, actual: 60, variance: 0 },
      { category: 'OBC-NCL', reported: 32, actual: 32, variance: 0 },
      { category: 'SC/ST', reported: 16, actual: 16, variance: 0 },
      { category: 'EWS', reported: 12, actual: 12, variance: 0 }
    ],
    lastUpdated: '2026-10-25 15:40'
  },
  {
    id: 'rec-3',
    programme: 'B.Tech Electronics & Communication',
    academicYear: '2026-2027',
    reportedAggregate: 180,
    studentRecordsCount: 172,
    variance: 8,
    outcome: 'Variance — Count Mismatch',
    categoryBreakdown: [
      { category: 'General', reported: 90, actual: 86, variance: 4 },
      { category: 'OBC-NCL', reported: 48, actual: 46, variance: 2 },
      { category: 'SC/ST', reported: 24, actual: 23, variance: 1 },
      { category: 'EWS', reported: 18, actual: 17, variance: 1 }
    ],
    explanation: '8 candidate seats surrendered before cut-off date.',
    lastUpdated: '2026-10-20 09:15'
  }
];

export const SEED_SEAT_LEDGER: SeatLedgerEntry[] = [
  {
    id: 'seat-1',
    programme: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-2027',
    category: 'General (Sanctioned)',
    approvedIntake: 240,
    activeAdmissions: 236,
    remainingCapacity: 4,
    supernumeraryQuota: 24,
    status: 'Normal',
    policyReference: 'AICTE-APH-2026-CL-4.2'
  },
  {
    id: 'seat-2',
    programme: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-2027',
    category: 'OBC-NCL',
    approvedIntake: 130,
    activeAdmissions: 128,
    remainingCapacity: 2,
    supernumeraryQuota: 0,
    status: 'Near Capacity',
    policyReference: 'AICTE-APH-2026-CL-4.2'
  },
  {
    id: 'seat-3',
    programme: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-2027',
    category: 'EWS Quota (Supernumerary)',
    approvedIntake: 50,
    activeAdmissions: 46,
    remainingCapacity: 4,
    supernumeraryQuota: 50,
    status: 'Normal',
    policyReference: 'MHRD-OM-2019-EWS-10'
  },
  {
    id: 'seat-4',
    programme: 'B.Tech Information Technology',
    academicYear: '2026-2027',
    category: 'Total Approved Intake',
    approvedIntake: 120,
    activeAdmissions: 120,
    remainingCapacity: 0,
    supernumeraryQuota: 12,
    status: 'Near Capacity',
    policyReference: 'AICTE-APH-2026-CL-4.2'
  },
  {
    id: 'seat-5',
    programme: 'B.Tech Civil Engineering (Apex Institute)',
    academicYear: '2026-2027',
    category: 'Total Approved Intake',
    approvedIntake: 60,
    activeAdmissions: 68,
    remainingCapacity: 0,
    supernumeraryQuota: 6,
    status: 'Cap Exceeded',
    policyReference: 'AICTE-APH-2026-CL-4.2'
  }
];

export const SEED_REVIEW_CASES: ReviewCase[] = [
  {
    id: 'case-1',
    caseId: 'CASE-2026-9021',
    reasonCode: 'S9',
    title: 'Aggregate to Student Record Variance (28 unmapped)',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology (BIT Sathy)',
    studentRef: 'BATCH-2026-0042',
    priority: 'HIGH',
    status: 'PENDING',
    createdDate: '2026-10-25',
    agingDays: 3,
    evidenceSummary: 'Institution reported 500 aggregate enrolments in CSE, but provided only 472 valid student records. 28 records remain unmapped.',
    auditTrail: [
      { timestamp: '2026-10-25 14:35', actor: 'Automated System (Reconciliation Engine)', action: 'Case Created', notes: 'Triggered by S9 Threshold > 5%' }
    ]
  },
  {
    id: 'case-2',
    caseId: 'CASE-2026-8940',
    reasonCode: 'S5',
    title: 'Prolonged Overlapping Enrolments Across Two Colleges',
    institutionId: 'inst-5',
    institutionName: 'Apex Institute of Engineering & Technology',
    studentRef: 'STU-2026-00189',
    studentName: 'Aditya Narayan Verma',
    priority: 'HIGH',
    status: 'ASSIGNED',
    assignedTo: 'Dr. Ramesh Sharma',
    createdDate: '2026-10-22',
    agingDays: 6,
    evidenceSummary: 'Candidate enrolled simultaneously in BIT Sathy and Apex Institute for over 90 days with no formal withdrawal certificate lodged.',
    auditTrail: [
      { timestamp: '2026-10-22 09:10', actor: 'TEIE Engine', action: 'Case Flagged', notes: 'S5 Temporal Collision' },
      { timestamp: '2026-10-23 11:00', actor: 'Dr. Ramesh Sharma', action: 'Assigned to Self', notes: 'Notices issued to both Registrars' }
    ]
  },
  {
    id: 'case-3',
    caseId: 'CASE-2026-8712',
    reasonCode: 'S8',
    title: 'Admissions Exceeding Approved AICTE Capacity',
    institutionId: 'inst-5',
    institutionName: 'Apex Institute of Engineering & Technology',
    priority: 'HIGH',
    status: 'PENDING',
    createdDate: '2026-10-19',
    agingDays: 9,
    evidenceSummary: 'Civil Engineering programme admitted 68 students against sanctioned intake of 60 regular + 6 supernumerary seats. 2 seats unexplained.',
    auditTrail: [
      { timestamp: '2026-10-19 16:00', actor: 'SeatGuard Ledger Engine', action: 'Capacity Alert Tripped', notes: 'S8 Over-Intake Violation' }
    ]
  },
  {
    id: 'case-4',
    caseId: 'CASE-2026-8501',
    reasonCode: 'S4',
    title: 'Sequential Transfer Verification (College A to B)',
    institutionId: 'inst-1',
    institutionName: 'Bannari Amman Institute of Technology',
    studentRef: 'STU-2026-00186',
    studentName: 'Rohan Mehra',
    priority: 'LOW',
    status: 'APPROVED',
    assignedTo: 'Dr. Ramesh Sharma',
    createdDate: '2026-10-15',
    agingDays: 13,
    evidenceSummary: 'DTU withdrawal verified; BIT lateral admission approved pursuant to AICTE Migration Ordinance Clause 8.',
    auditTrail: [
      { timestamp: '2026-10-15 10:00', actor: 'System', action: 'Case Created', notes: 'S4 Transfer Audit' },
      { timestamp: '2026-10-16 14:20', actor: 'Dr. Ramesh Sharma', action: 'Approved', notes: 'NOC verified' }
    ]
  }
];

export const SEED_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'aud-1',
    eventId: 'EVT-2026-001284',
    timestamp: '2026-10-28 10:45:12',
    actor: 'Dr. Ramesh Sharma (aicte_admin)',
    role: 'AICTE Administrator',
    action: 'REVIEW_DECISION_APPROVED',
    entityTarget: 'CASE-2026-8501',
    reason: 'Approved sequential lateral transfer under Clause 8 of Admission Guidelines',
    previousHash: 'a71e84f938210381029381029381029381029381029381029381029381029381',
    currentHash: 'b942f10283948192839481928394819283948192839481928394819283948192'
  },
  {
    id: 'aud-2',
    eventId: 'EVT-2026-001283',
    timestamp: '2026-10-27 16:20:45',
    actor: 'Prof. K. Venkatesh (institution_operator)',
    role: 'Institution Operator',
    action: 'INGEST_SUBMISSION_BATCH',
    entityTarget: 'BATCH-2026-0042',
    reason: 'Uploaded Admission Dataset for CSE (500 records)',
    previousHash: 'f482019481029381029381029381029381029381029381029381029381029381',
    currentHash: 'a71e84f938210381029381029381029381029381029381029381029381029381'
  },
  {
    id: 'aud-3',
    eventId: 'EVT-2026-001282',
    timestamp: '2026-10-26 11:15:30',
    actor: 'Dr. Ramesh Sharma (aicte_admin)',
    role: 'AICTE Administrator',
    action: 'POLICY_UPDATE_APPROVED_INTAKE',
    entityTarget: 'AICTE-APH-2026',
    reason: 'Ratified AICTE Approved Process Handbook 2026-27 Master Quotas',
    previousHash: '3948102938102938102938102938102938102938102938102938102938102938',
    currentHash: 'f482019481029381029381029381029381029381029381029381029381029381'
  }
];

export const SEED_CREDENTIALS: ConsentPassCredential[] = [
  {
    id: 'cp-1',
    token: 'CP-TKN-8491-9201-9482',
    studentRef: 'STU-2026-00184',
    studentName: 'Aarav Rajesh Patel',
    institution: 'Bannari Amman Institute of Technology (BIT Sathy)',
    programme: 'B.Tech Computer Science & Engineering',
    issueDate: '2026-10-01',
    expiryDate: '2027-09-30',
    status: 'Active',
    permittedClaims: ['Enrolment Status: Active', 'Institution Verified', 'Approved Intake Seat', 'No Anomaly Flags']
  },
  {
    id: 'cp-2',
    token: 'CP-TKN-3918-1029-4819',
    studentRef: 'STU-2026-00185',
    studentName: 'Priya Sundararajan',
    institution: 'Bannari Amman Institute of Technology (BIT Sathy)',
    programme: 'B.Tech Computer Science & Engineering',
    issueDate: '2026-10-05',
    expiryDate: '2027-09-30',
    status: 'Active',
    permittedClaims: ['Enrolment Status: Active', 'Institution Verified', 'Category: OBC-NCL']
  }
];

export const SEED_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'New Review Case Assigned',
    message: 'Case CASE-2026-9021 (BIT Sathy - 28 Variance) flagged for AICTE administrative review.',
    type: 'alert',
    timestamp: '10 minutes ago',
    isRead: false,
    category: 'Review',
    link: '/aicte/review-queue/CASE-2026-9021'
  },
  {
    id: 'notif-2',
    title: 'Submission Preflight Complete',
    message: 'Batch BATCH-2026-0042 preflight validation finished with 472 valid records and 18 errors.',
    type: 'warning',
    timestamp: '2 hours ago',
    isRead: false,
    category: 'Submissions',
    link: '/institution/submissions/validation'
  },
  {
    id: 'notif-3',
    title: 'Approved Intake Master Synchronised',
    message: 'Academic Year 2026-27 policy master updated with Gazette Schedule 4.',
    type: 'info',
    timestamp: '1 day ago',
    isRead: true,
    category: 'Policy',
    link: '/aicte/policy-intake'
  }
];

