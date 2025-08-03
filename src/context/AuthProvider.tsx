import React, { useState, useEffect, ReactNode } from 'react';
import { AuthContext, AuthContextType, SignupData } from './AuthContext';
import authService from '../services/authService';
import { User } from '../types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
  };

  const signup = async (data: SignupData) => {
    const newUser = await authService.signup(data);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const requestPasswordReset = async (email: string) => {
    console.log('Password reset is not implemented in mock mode.', email);
  };

  const resetPassword = async (token: string, newPassword: string) => {
    console.log('Password reset is not implemented in mock mode.', { token, newPassword });
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
