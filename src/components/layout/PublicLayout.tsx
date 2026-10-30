import React from 'react';
import { Outlet } from 'react-router-dom';
import { GovernmentUtilityBar } from './GovernmentUtilityBar';
import { PublicHeader } from './PublicHeader';
import { Footer } from './Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fbfe' }}>
      <GovernmentUtilityBar />
      <PublicHeader />
      <main id="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

