# SATYA-APAAR 2.1 — Prototype Demo Limitations & Boundary Disclosures

**System:** SATYA-APAAR 2.1 (Student Admission Trust & Yield Assurance for AICTE-Approved Institutions)  
**Problem Statement:** SIH26263 | **Theme:** Smart Automation | Software  
**Version:** 2.1.0-DEMO  
**Evaluation Target:** Smart India Hackathon (SIH) 2026 Evaluation

---

## 1. Executive Summary & Regulatory Boundary

SATYA-APAAR 2.1 is presented as a high-fidelity, client-side, zero-dependency standalone frontend demonstration prototype. In strict accordance with Ministry of Education (MoE), All India Council for Technical Education (AICTE), and National Digital Educational Blueprint standards, this prototype operates entirely within a sandboxed browser environment with deterministic synthetic data.

> [!IMPORTANT]
> **Boundary Notice:** SATYA-APAAR 2.1 prototype does not connect to live production AICTE databases, live APAAR / DigiLocker APIs, the Academic Bank of Credits (ABC) registry, or the National Academic Depository (NAD). All transactions, identity resolutions, and audits executed in this demonstration use cryptographically simulated workflows and browser `localStorage`.

---

## 2. Component-by-Component Disclosure Matrix

| Functional Module | Prototype Implementation | Production Architecture Specification | Compliance & Privacy Safeguards |
| :--- | :--- | :--- | :--- |
| **APAAR 12-Digit Resolution & e-KYC** | Simulated 12-digit format with Luhn-equivalent checksum check, seeded fixture matches, and synthetic KYC demographic records. | Direct integration with UIDAI Aadhaar Vault & MoE APAAR/DigiLocker gateway over mutual TLS (mTLS) with AES-256 encrypted payloads. | No real Aadhaar or citizen biometric/demographic information is accepted, stored, or processed. Synthetic IDs adhere to test range `APAAR-2026-XXXX`. |
| **RecordTrust Audit & Hash Chain** | Local deterministic SHA-256 hash chains computed using browser Web Crypto API (`window.crypto.subtle.digest`) with Genesis hash `0000000000000000000000000000000000000000000000000000000000000000`. | Distributed Permissioned Ledger / Merkle Tree anchoring periodically published to state-sanctioned immutable append-only logs. | Hash signatures represent mock submission payloads. The cryptographic chaining logic is authentic, verifiable, and tamper-evident. |
| **Government Single Sign-On (SSO)** | Local role session switcher and simulated Jan Parichay / MeriPehchaan modal auth with pre-seeded role tokens. | OpenID Connect (OIDC) / OAuth2 federation with MeriPehchaan (National Single Sign-On) and AICTE Portal IAM. | Demo passwords and tokens do not grant access to external services. Sessions are strictly scoped to `localStorage`. |
| **National Statistics & Benchmarking** | Realistic synthetic dataset reflecting 14,280 institutions, 3,421,800 national approved intake, and 2,987,450 enrolled students. | Live data warehousing aggregating streaming batch submissions across all state directorates of technical education (DTEs). | All dashboards, charts, and ratios are purely illustrative and do not reflect official AICTE annual statistical publications. |
| **SeatGuard™ Quota & Intake Validation** | Deterministic in-browser quota ledger validating Approved vs Enrolled seats across AICTE CSE, ECE, ME, IT branches with over-admission lockout. | High-throughput distributed ACID transaction ledger with real-time seat lock orchestration and state reservation roster enforcement. | Demonstrates over-intake blocking (e.g., BIT CSE 472/500 remaining 28 seats) without backend network latency. |
| **TEIE™ Multi-Institution Collision Detection** | Local temporal overlap detection comparing date ranges for duplicate APAAR / Roll Number entries across simulated institutions. | Event-driven microservices running on Apache Kafka / Flink tracking national enrolment state transitions with sub-second collision alerts. | Simulates S4/S8 concurrent enrolment flags (e.g., student registered simultaneously at BIT and Apex Institute). |
| **QR Code Verification & ConsentPass** | Local browser generation via `qrcode.react` encoding secure verification URL tokens with zero personal identifying information (PII). | Asymmetric ECDSA (secp256r1) signed JWS/JWT tokens resolvable through an offline public key resolver and Consent Architecture. | No PII (names, Aadhaar, DOB, personal phone numbers) is embedded in the QR payload; only opaque hash tokens. |
| **CSV / Excel Ingestion & Preflight Engine** | Client-side PapaParse (CSV) and XLSX (Excel) parsers running preflight validation against schema rules S1–S12. | Ingestion pipeline with virus scanning (ClamAV), large file streaming chunking, asynchronous queue processing, and error reconciliation. | Fully validates real uploaded files against headers `ApaarId, RollNumber, StudentName, Category, Branch, Quota, EnrolmentDate`. |

---

## 3. Anomaly Scoring & Ethical AI Declarations

1. **Anomaly & Integrity Indices (`0–100%`):**
   - In SATYA-APAAR 2.1, scores generated by the **Integrity Intelligence Module (Screen 21)** are purely statistical risk indicators derived from deterministic validation rules (`TEIE-ANOM-04`, `REC-VAR-09`, `SEAT-EXP-02`).
   - **Non-Judgmental Standard:** An anomaly score is never labelled as a "fraud verdict" or criminal accusation. All flags require manual verification via the **Authorised Verifier Workspace (Screen 20)** before any administrative sanction can occur.

2. **Zero-PII Storage Guarantee:**
   - The synthetic dataset contains no real Indian citizen names, live phone numbers, active residential addresses, or real Aadhaar credentials.
   - Any resemblance to real individuals, institutions, or students is purely coincidental.

3. **Reset & State Isolation:**
   - The frontend includes a prominent **"Reset Demo Data"** action in the authenticated header and integration health dashboard. Clicking this action restores all fixtures to the initial clean state and re-seeds baseline records.

