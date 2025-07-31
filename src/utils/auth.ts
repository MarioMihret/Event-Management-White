import { api } from './api';
import { logger } from './logger';
import { User } from '../types';
import { SignupData } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userId: string;
  role: string;
  exp: number;
}

interface LoginResponse {
  token: string;
  user: User;
}

class AuthService {
  async login(email: string, password: string, rememberMe: boolean): Promise<User> {
    try {
      const response = await api.post<LoginResponse>('auth/v1/login', {
        email,
        password,
      });

      const { token, user } = response;
      this.setToken(token, rememberMe);
      return user;
    } catch (error) {
      logger.error('Login failed.', { email, error });
      throw error;
    }
  }

  async signup(data: SignupData): Promise<void> {
    try {
      await api.post('auth/v1/register', data);
    } catch (error) {
      logger.error('Signup failed.', { email: data.email, error });
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  }

  private setToken(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      logger.error('Token decoding failed.', { error });
      return false;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.role;
    } catch (error) {
      logger.error('Failed to decode token for user role.', { error });
      return null;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.isAuthenticated()) {
      return null;
    }

    try {
      const response = await api.get<{ user: User }>('auth/v1/me');
      return response.user;
    } catch (error) {
      logger.error('Failed to fetch current user.', { error });
      this.logout();
      return null;
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await api.post('auth/v1/forgot-password', { email });
    } catch (error) {
      logger.error('Password reset request failed.', { email, error });
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post('auth/v1/reset-password', { token, newPassword });
    } catch (error) {
      logger.error('Password reset failed.', { error });
      throw error;
    }
  }
}

export const authService = new AuthService();