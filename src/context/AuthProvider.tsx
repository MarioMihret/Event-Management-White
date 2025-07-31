import React, { useState, useEffect, ReactNode } from 'react';
import { AuthContext, AuthContextType, SignupData } from './AuthContext';
import { authService } from '../utils/auth';
import { User } from '../types';
import { logger } from '../utils/logger';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        logger.warn('No authenticated user found.');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    const loggedInUser = await authService.login(email, password, rememberMe);
    setUser(loggedInUser);
  };

  const signup = async (data: SignupData) => {
    await authService.signup(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const requestPasswordReset = async (email: string) => {
    await authService.requestPasswordReset(email);
  };

  const resetPassword = async (token: string, newPassword: string) => {
    await authService.resetPassword(token, newPassword);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const authContextValue: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    requestPasswordReset,
    resetPassword,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
