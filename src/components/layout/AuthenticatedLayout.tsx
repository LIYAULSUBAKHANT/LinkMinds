import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GovernmentUtilityBar } from './GovernmentUtilityBar';
import { AuthenticatedHeader } from './AuthenticatedHeader';
import { RoleBasedSidebar } from './RoleBasedSidebar';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
import { Footer } from './Footer';

export const AuthenticatedLayout: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fbfe' }}>
      <GovernmentUtilityBar />
      <AuthenticatedHeader />
      
      {/* Authenticated Workspace Row: Sidebar + Main Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        position: 'relative',
        minHeight: 'calc(100vh - 96px)',
      }}>
        {/* Left-hand Collapsible Accordion Sidebar */}
        <RoleBasedSidebar />

        {/* Right-hand Main Content Column */}
        <main
          id="main-content"
          style={{
            flex: 1,
            minWidth: 0, // Prevents flex child from overflowing
            padding: '20px 28px 40px 28px',
            overflowX: 'hidden',
          }}
        >
          <BreadcrumbNavigation />
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

