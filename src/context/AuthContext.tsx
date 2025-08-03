import { createContext, useContext } from 'react';
import { User } from '../types';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  isAdmin: () => boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'organizer';
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: false,
  login: async () => { throw new Error('Not implemented'); },
  signup: async () => { throw new Error('Not implemented'); },
  logout: () => {},
  requestPasswordReset: async () => { throw new Error('Not implemented'); },
  resetPassword: async () => { throw new Error('Not implemented'); },
  isAdmin: () => false,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}