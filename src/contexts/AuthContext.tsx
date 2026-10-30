import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { StorageService } from '../services/storageService';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  getDashboardPath: (role?: UserRole) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => StorageService.getCurrentUser());

  const getDashboardPath = (targetRole?: UserRole): string => {
    const r = targetRole || user?.role || 'aicte_admin';
    switch (r) {
      case 'institution_operator':
        return '/institution/dashboard';
      case 'aicte_admin':
        return '/aicte/dashboard';
      case 'authorised_verifier':
        return '/verifier/dashboard';
      case 'system_admin':
        return '/admin/users';
      default:
        return '/login';
    }
  };

  const login = (role: UserRole, email?: string) => {
    const switched = StorageService.switchRole(role);
    if (email) {
      switched.email = email;
    }
    setUser(switched);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('satya_apaar_v2_1_currentUser');
  };

  const switchRole = (newRole: UserRole) => {
    const switched = StorageService.switchRole(newRole);
    setUser(switched);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'aicte_admin',
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        getDashboardPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

