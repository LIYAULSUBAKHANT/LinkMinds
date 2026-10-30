import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AuthenticatedLayout } from '../components/layout/AuthenticatedLayout';
import { RoleGuard } from './RoleGuard';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { FeaturesPage } from '../pages/public/FeaturesPage';
import { ResourcesPage } from '../pages/public/ResourcesPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RoleSelectionPage } from '../pages/auth/RoleSelectionPage';

// Shared Pages
import { SupportPage } from '../pages/support/SupportPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { AccessDeniedPage } from '../pages/shared/AccessDeniedPage';
import { NotFoundPage } from '../pages/shared/NotFoundPage';

// Authenticated Pages (All 29 Numbered Screens)
import { InstitutionRegistrationPage } from '../pages/institution/InstitutionRegistrationPage'; // Screen 07
import { InstitutionDashboardPage } from '../pages/institution/InstitutionDashboardPage'; // Screen 08
import { DataUploadPage } from '../pages/institution/DataUploadPage'; // Screen 09
import { PreflightValidationPage } from '../pages/institution/PreflightValidationPage'; // Screen 10
import { AggregateReconciliationPage } from '../pages/institution/AggregateReconciliationPage'; // Screen 11
import { StudentRecordsPage } from '../pages/institution/StudentRecordsPage'; // Screen 12
import { TEIETimelinePage } from '../pages/institution/TEIETimelinePage'; // Screen 13
import { APAARIdentityPage } from '../pages/institution/APAARIdentityPage'; // Screen 14
import { SeatGuardPage } from '../pages/institution/SeatGuardPage'; // Screen 15
import { SubmissionTrackingPage } from '../pages/institution/SubmissionTrackingPage'; // Screen 16

import { CentralDashboardPage } from '../pages/aicte/CentralDashboardPage'; // Screen 17
import { InstitutionExplorerPage } from '../pages/aicte/InstitutionExplorerPage'; // Screen 18
import { ReviewQueuePage } from '../pages/aicte/ReviewQueuePage'; // Screen 19
import { ReviewCaseWorkspacePage } from '../pages/aicte/ReviewCaseWorkspacePage'; // Screen 20
import { IntegrityIntelligencePage } from '../pages/aicte/IntegrityIntelligencePage'; // Screen 21
import { PolicyIntakePage } from '../pages/aicte/PolicyIntakePage'; // Screen 22
import { RecordTrustAuditPage } from '../pages/aicte/RecordTrustAuditPage'; // Screen 23
import { ReportsAnalyticsPage } from '../pages/aicte/ReportsAnalyticsPage'; // Screen 24

import { VerifierDashboardPage } from '../pages/verifier/VerifierDashboardPage'; // Screen 25
import { ConsentPassPage } from '../pages/verifier/ConsentPassPage'; // Screen 26

import { UserManagementPage } from '../pages/admin/UserManagementPage'; // Screen 27
import { IntegrationHealthPage } from '../pages/admin/IntegrationHealthPage'; // Screen 28
import { NotificationsSettingsPage } from '../pages/admin/NotificationsSettingsPage'; // Screen 29

export const AppRouter: React.FC = () => {
  const { isAuthenticated, getDashboardPath } = useAuth();

  return (
    <Routes>
      {/* Public Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        
        {/* Dynamic /dashboard redirector based on authenticated user's role */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? <Navigate to={getDashboardPath()} replace /> : <Navigate to="/login" replace />
          } 
        />
        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Authenticated Layout Routes */}
      <Route element={<AuthenticatedLayout />}>
        {/* Common Account Route */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Institution Portal (Screens 07 - 16) */}
        <Route 
          path="/institution/registration" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'system_admin']}>
              <InstitutionRegistrationPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/dashboard" 
          element={
            <RoleGuard allowedRoles={['institution_operator']}>
              <InstitutionDashboardPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/profile" 
          element={
            <RoleGuard allowedRoles={['institution_operator']}>
              <InstitutionDashboardPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/intake" 
          element={
            <RoleGuard allowedRoles={['institution_operator']}>
              <SeatGuardPage />
            </RoleGuard>
          } 
        />
        {/* Submissions aliases */}
        <Route 
          path="/institution/upload" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <DataUploadPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/preflight" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <PreflightValidationPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/submissions" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <SubmissionTrackingPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/submissions/upload" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <DataUploadPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/submissions/validation" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <PreflightValidationPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/submissions/tracking" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <SubmissionTrackingPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/submissions/corrections" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <PreflightValidationPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/reconciliation" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <AggregateReconciliationPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/students" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <StudentRecordsPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/students/:studentId" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <StudentRecordsPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/students/:studentId/timeline" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <TEIETimelinePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/students/timeline" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <TEIETimelinePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/timeline" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <TEIETimelinePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/apaar-identity" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <APAARIdentityPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/identity" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <APAARIdentityPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/institution/seatguard" 
          element={
            <RoleGuard allowedRoles={['institution_operator', 'aicte_admin']}>
              <SeatGuardPage />
            </RoleGuard>
          } 
        />

        {/* AICTE Administration (Screens 17 - 24) */}
        <Route 
          path="/aicte/dashboard" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <CentralDashboardPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/institutions" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <InstitutionExplorerPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/institutions/:institutionId" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <InstitutionExplorerPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/review-queue" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <ReviewQueuePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/review-queue/:caseId" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <ReviewCaseWorkspacePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/case-workspace" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <ReviewCaseWorkspacePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/integrity" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <IntegrityIntelligencePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/intelligence" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <IntegrityIntelligencePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/policy-intake" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <PolicyIntakePage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/audit" 
          element={
            <RoleGuard allowedRoles={['aicte_admin', 'system_admin']}>
              <RecordTrustAuditPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/aicte/reports" 
          element={
            <RoleGuard allowedRoles={['aicte_admin']}>
              <ReportsAnalyticsPage />
            </RoleGuard>
          } 
        />

        {/* Verifier Portal (Screens 25 - 26) */}
        <Route 
          path="/verifier/dashboard" 
          element={
            <RoleGuard allowedRoles={['authorised_verifier']}>
              <VerifierDashboardPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/verifier/consentpass" 
          element={
            <RoleGuard allowedRoles={['authorised_verifier']}>
              <ConsentPassPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/verifier/consent-pass" 
          element={
            <RoleGuard allowedRoles={['authorised_verifier']}>
              <ConsentPassPage />
            </RoleGuard>
          } 
        />

        {/* System Administration (Screens 27 - 29) */}
        <Route 
          path="/admin/users" 
          element={
            <RoleGuard allowedRoles={['system_admin']}>
              <UserManagementPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/admin/integrations" 
          element={
            <RoleGuard allowedRoles={['system_admin']}>
              <IntegrationHealthPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/admin/health" 
          element={
            <RoleGuard allowedRoles={['system_admin']}>
              <IntegrationHealthPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/admin/notifications" 
          element={
            <RoleGuard allowedRoles={['system_admin']}>
              <NotificationsSettingsPage />
            </RoleGuard>
          } 
        />
      </Route>
    </Routes>
  );
};
