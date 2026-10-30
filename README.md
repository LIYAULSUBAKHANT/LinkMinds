# SATYA-APAAR 2.1 — Student Admission Trust & Yield Assurance

**All India Council for Technical Education (AICTE)**  
**Smart India Hackathon (SIH) 2026** | **Problem Statement:** SIH26263  
**Theme:** Smart Automation | Software  
**Tagline:** *"One student. One academic identity. Every admission traceable. Every aggregate reconciled. Every approved seat accounted for."*

---

## 1. Project Overview

SATYA-APAAR 2.1 is an institutional governance, identity reconciliation, and admission integrity assurance platform designed for AICTE-approved institutions nationwide. It bridges institutional aggregate reporting with the Ministry of Education's 12-digit **Automated Permanent Academic Account Registry (APAAR)** identity ecosystem to prevent ghost admissions, multi-institution seat collisions, and quota inflation.

This repository hosts the **Full-Fidelity Production Frontend**, engineered with React, TypeScript, and Vite. It runs fully standalone with deterministic synthetic data, local Web Crypto SHA-256 hash chaining, client-side CSV/XLSX preflight parsing, and role-based access control.

---

## 2. Quick Start Guide (Windows PowerShell)

### Prerequisites
- **Node.js**: v18.0.0 or later (v22 LTS recommended)
- **npm**: v9.0.0 or later

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Start Development Server
```powershell
npm run dev
```
Open your browser and navigate to:  
👉 **`http://localhost:3000`**

### Step 3: Run Production Build & Typecheck
```powershell
npm run build
```
Generates an optimized, chunked static bundle in `dist/` verified with zero warnings and zero TypeScript errors.

---

## 3. Demo Role Credentials & One-Click Switcher

For jury evaluation and demonstration convenience, SATYA-APAAR 2.1 includes both a credentialed login screen (`/login`) and a **Demo Role Switcher** dropdown in the authenticated header:

| Role Name | Demo Email | Demo Password | Default Dashboard | Key Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Institution Operator** | `operator@institution.edu.in` | `Demo@2026` | `/institution/dashboard` | Batch upload, preflight validation, aggregate reconciliation, student records, SeatGuard ledger. |
| **AICTE Administrator** | `admin@aicte.gov.in` | `Demo@2026` | `/aicte/dashboard` | Central command, institution explorer, review queue, integrity intelligence, policy intake, reports. |
| **Authorised Verifier** | `verifier@aicte.gov.in` | `Demo@2026` | `/verifier/dashboard` | Verification queue, field inspection audit, biometric consent pass, candidate credential issuance. |
| **System Administrator** | `sysadmin@aicte.gov.in` | `Demo@2026` | `/admin/users` | User management (canonical Screen 27), integration health, system alert rules, demo reset. |

> [!TIP]
> **One-Click Quick Login:** On the `/login` page, click any of the 4 role cards below the form to automatically fill and log in with that profile.

---

## 4. Navigation Architecture & Screen Directory (All 29 Screens)

The platform is strictly structured into **Public Routes** and **14 Authenticated Business Modules (A–N)** with zero visual overlapping:

### Public Portal (5 Canonical Links + Auth CTA)
- `GET /` — **Page 01:** Portal Homepage (Tricolour emblem, Hero, Key Statistics, Process Flow)
- `GET /about` — **Page 02:** About Us (Background, Objective, Governance, Architectural Flow)
- `GET /features` — **Page 03:** Features & Core Capabilities (10 Architectural Features)
- `GET /resources` — **Page 04:** Guidelines, Circulars, Manuals, Video Tutorials & FAQs
- `GET /dashboard` — Dynamic role router (redirects authenticated users to their assigned dashboard)
- `GET /login` & `/register` — **Page 05:** Secure Authentication (Single Sign-On & Role selector)
- `GET /select-role` — **Page 06:** Role Switcher & Persona Overview

### Module A: Institution Registration & Setup
- `GET /institution/registration` — **Page 07:** Institution Onboarding & AICTE Approval Binding *(Inferred)*

### Module B: Institution Operations & Reconciliation
- `GET /institution/dashboard` — **Page 08:** Institution Operator Command Center
- `GET /institution/upload` — **Page 09:** Ingestion Engine & Bulk Admission Data Upload
- `GET /institution/preflight` — **Page 10:** Preflight Validation & CSV Error Sandbox
- `GET /institution/reconciliation` — **Page 11:** Aggregate-to-Detail Reconciliation Engine

### Module C: Student Records & Lifecycle Tracking
- `GET /institution/students` — **Page 12:** Student Admission Registry & APAAR Filter
- `GET /institution/timeline` — **Page 13:** TEIE™ Enrolment Timeline & Concurrent Tracker *(Inferred)*
- `GET /institution/apaar-identity` — **Page 14:** APAAR Identity Resolution & e-KYC Matcher *(Inferred)*

### Module D: Seat Management & Quota Assurance
- `GET /institution/seatguard` — **Page 15:** SeatGuard™ Intake Assurance & Branch Quotas

### Module E: Submission & Regulatory Compliance
- `GET /institution/submissions` — **Page 16:** Ingestion Batch Tracker & Digital Signatures

### Module F: AICTE Central Command & Oversight
- `GET /aicte/dashboard` — **Page 17:** AICTE National Central Command Center
- `GET /aicte/institutions` — **Page 18:** National Institution Explorer & Compliance Heatmap

### Module G: Verification & Discrepancy Adjudication
- `GET /aicte/review-queue` — **Page 19:** Discrepancy & Anomaly Case Review Queue
- `GET /aicte/case-workspace` — **Page 20:** Verification Case Investigation Workspace

### Module H: AI-Assisted Integrity Intelligence
- `GET /aicte/intelligence` — **Page 21:** Integrity Intelligence, Anomaly Signals & Graph Explorer

### Module I: Policy & Intake Regulatory Administration
- `GET /aicte/policy-intake` — **Page 22:** Policy Intake Roster & Supernumerary Quota Rules

### Module J: Immutable Trust & Audit Logging
- `GET /aicte/audit` — **Page 23:** RecordTrust™ Cryptographic Audit Trail & SHA-256 Verifier

### Module K: National Analytics & BI Reporting
- `GET /aicte/reports` — **Page 24:** National Analytics, Intake Ratios & Executive Export

### Module L: Field Verification & Trust Verification
- `GET /verifier/dashboard` — **Page 25:** Field Verifier Worklist & Inspection Records
- `GET /verifier/consent-pass` — **Page 26:** Candidate ConsentPass™ & QR Credential Validator

### Module M: System Governance & Security
- `GET /admin/users` — **Page 27:** Canonical User Management & Role Administration
- `GET /admin/health` — **Page 28:** Integration Health, Gateway Latencies & Seed Reset

### Module N: Notifications & Preferences
- `GET /admin/notifications` — **Page 29:** System Notification Rules & Alert Channels *(Inferred)*

---

## 5. Key SIH Demonstration Workflows (S1–S12)

1. **Scenario S1: Aggregate Reconciliation Variance (Pages 08, 11)**
   - *Inspection:* BIT Sathy Computer Science reports aggregate admission count of **500**, but student records enumerate **472**.
   - *Result:* Automated flag raises a **28-record variance** with reconciliation status *"Pending Verification"*.
2. **Scenario S2: CSV / Excel Upload & Sandbox Preflight (Pages 09, 10)**
   - *Inspection:* Upload any admission CSV or use the built-in sample template.
   - *Result:* Preflight engine validates column headers, APAAR 12-digit format, and highlights syntax errors in a live correction grid before submission.
3. **Scenario S4 & S8: Concurrent Multi-Institution Enrolment Collision (Pages 13, 21)**
   - *Inspection:* In TEIE Enrolment Timeline, inspect candidate `APAAR-2026-9012`.
   - *Result:* Temporal overlap shows candidate enrolled simultaneously at **Bannari Amman Institute** and **Apex Institute of Technology** for 92 days.
4. **Scenario S5: SeatGuard™ Intake Lockout (Page 15)**
   - *Inspection:* Examine AICTE Approved vs Admitted intake for B.Tech CSE (500 approved, 472 enrolled).
   - *Result:* Available quota displays 28 seats. Attempting to add admissions beyond approved intake triggers automated quota lockout.
5. **Scenario S7: RecordTrust™ Immutable Hash Verification (Page 23)**
   - *Inspection:* View the cryptographic audit log. Click **"Verify Cryptographic Chain"**.
   - *Result:* Computes genuine Web Crypto SHA-256 digests over block headers, verifying unbroken sequence against the Genesis Hash.

---

## 6. Technical Architecture & Tech Stack

- **Framework**: React 18 with TypeScript 5
- **Tooling**: Vite 6, React Router DOM v6
- **UI Architecture**: BEM / CSS Tokens (`src/styles/tokens.css`, `src/styles/global.css`) without heavyweight CSS frameworks
- **Data Persistence**: Versioned typed `localStorage` with seed fixtures (`src/data/seedData.ts`)
- **Parsers & Utilities**:
  - `xlsx` for Excel parsing
  - `papaparse` for CSV parsing
  - `qrcode.react` for PII-free SVG QR rendering
  - `recharts` for charts, bar graphs, and intake ratios
  - `lucide-react` for iconography
  - `react-hot-toast` for toast notifications
- **Accessibility**: Skip-to-main-content link, `A-` / `A` / `A+` font scaling context, high contrast colors, screen-reader semantic landmarks (`main`, `nav`, `header`, `footer`).

---

## 7. Compliance & Boundary Note

For detailed prototype disclosures, mock adapters, synthetic data guidelines, and legal boundaries, please review [`docs/DEMO_LIMITATIONS.md`](docs/DEMO_LIMITATIONS.md) and [`docs/REFERENCE_COVERAGE.md`](docs/REFERENCE_COVERAGE.md).

*(C) 2026 All India Council for Technical Education (AICTE). Developed for Smart India Hackathon 2026.*

