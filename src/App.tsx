import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AppRouter } from './router/AppRouter';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <AuthProvider>
          <AppRouter />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#001e46',
                color: '#ffffff',
                fontSize: '13px',
                borderRadius: '6px',
                padding: '10px 16px',
                boxShadow: '0 4px 12px rgba(0, 30, 70, 0.25)',
              },
              success: {
                iconTheme: {
                  primary: '#16a34a',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </AuthProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
};

export default App;

