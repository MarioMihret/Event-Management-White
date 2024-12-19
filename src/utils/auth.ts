// import { api } from './api';
// import { logger } from './logger';
// import { User } from '../types';
// import { jwtDecode } from 'jwt-decode';

// interface TokenPayload {
//   userId: string;
//   role: string;
//   exp: number;
// }

// class AuthService {
//   private static instance: AuthService;

//   private constructor() {}

//   static getInstance(): AuthService {
//     if (!AuthService.instance) {
//       AuthService.instance = new AuthService();
//     }
//     return AuthService.instance;
//   }

//   async getCurrentUser(): Promise<User> {
//     try {
//       const response = await api.get<{ user: User }>('/auth/me');
//       return response.data.user;
//     } catch (error) {
//       logger.error('Failed to fetch current user.', { error });
//       throw error;
//     }
//   }

//   async login(email: string, password: string, rememberMe: boolean): Promise<User> {
//     try {
//       const response = await api.post<{ token: string; user: User }>('/auth/login', {
//         email,
//         password,
//       });

//       const { token, user } = response.data;
//       this.setToken(token, rememberMe);
//       return user;
//     } catch (error) {
//       logger.error('Login failed.', { email, error });
//       throw error;
//     }
//   }

//   async signup(data: { name: string; email: string; password: string; role: string }): Promise<void> {
//     try {
//       await api.post('/auth/signup', data);
//     } catch (error) {
//       logger.error('Signup failed.', { email: data.email, error });
//       throw error;
//     }
//   }

//   async requestPasswordReset(email: string): Promise<void> {
//     try {
//       await api.post('/auth/forgot-password', { email });
//     } catch (error) {
//       logger.error('Password reset request failed.', { email, error });
//       throw error;
//     }
//   }

//   async resetPassword(token: string, newPassword: string): Promise<void> {
//     try {
//       await api.post('/auth/reset-password', { token, newPassword });
//     } catch (error) {
//       logger.error('Password reset failed.', { error });
//       throw error;
//     }
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     sessionStorage.removeItem('token');
//   }

//   private setToken(token: string, rememberMe: boolean): void {
//     if (rememberMe) {
//       localStorage.setItem('token', token);
//     } else {
//       sessionStorage.setItem('token', token);
//     }
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token') || sessionStorage.getItem('token');
//   }

//   isAuthenticated(): boolean {
//     const token = this.getToken();
//     if (!token) return false;

//     try {
//       const decoded = jwtDecode<TokenPayload>(token);
//       return decoded.exp * 1000 > Date.now();
//     } catch (error) {
//       logger.error('Token decoding failed.', { error });
//       return false;
//     }
//   }

//   getUserRole(): string | null {
//     const token = this.getToken();
//     if (!token) return null;

//     try {
//       const decoded = jwtDecode<TokenPayload>(token);
//       return decoded.role;
//     } catch (error) {
//       logger.error('Failed to decode token for user role.', { error });
//       return null;
//     }
//   }

//   getDashboardRoute(): string {
//     const role = this.getUserRole();
//     switch (role) {
//       case 'admin':
//         return '/admin-dashboard';
//       case 'organizer':
//         return '/organizer-dashboard';
//       case 'attendee':
//         return '/attendee-dashboard';
//       default:
//         return '/';
//     }
//   }

//   // New methods for enhanced functionality

//   async updateUserProfile(data: { name?: string; email?: string; password?: string }): Promise<User> {
//     try {
//       const response = await api.put<{ user: User }>('/auth/me', data);
//       return response.data.user;
//     } catch (error) {
//       logger.error('Profile update failed.', { error });
//       throw error;
//     }
//   }

//   async verifyToken(token: string): Promise<boolean> {
//     try {
//       const decoded = jwtDecode<TokenPayload>(token);
//       return decoded.exp * 1000 > Date.now();
//     } catch (error) {
//       logger.error('Token verification failed.', { error });
//       return false;
//     }
//   }
// }

// export const authService = AuthService.getInstance();