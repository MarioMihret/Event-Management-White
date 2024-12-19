import { api } from '../utils/api';
import { logger } from '../utils/logger';
import { User } from '../types';
import { SignupData } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // Correct import

interface TokenPayload {
  userId: string;
  role: string;
  exp: number;
}

class AuthService {
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<{ user: User }>('/auth/me');
      return response.user;
    } catch (error) {
      logger.error('Failed to fetch current user', { error });
      throw error;
    }
  }

  async login(email: string, password: string, rememberMe: boolean): Promise<User> {
    try {
      const response = await api.post<{ token: string; user: User }>('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;  // Ensure to access data correctly
      this.setToken(token, rememberMe);
      return user;
    } catch (error) {
      logger.error('Login failed', { email, error });
      throw error;
    }
  }

  async signup(data: SignupData): Promise<void> {
    try {
      await api.post('/auth/signup', data);
    } catch (error) {
      logger.error('Signup failed', { email: data.email, error });
      throw error;
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      logger.error('Password reset request failed', { email, error });
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      logger.error('Password reset failed', { error });
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
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
      logger.error('Token validation failed', { error });
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
      logger.error('Failed to decode user role from token', { error });
      return null;
    }
  }
}

export const authService = new AuthService();