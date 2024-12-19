// import { useState, useEffect, ReactNode } from 'react';
// import { AuthContext, AuthContextType, SignupData } from '../context/AuthContext';
// import { User } from '../types';
// import { authService } from '../services/authService';
// import { logger } from '../utils/logger';

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const currentUser = await authService.getCurrentUser();
//         setUser(currentUser);
//       } catch (error) {
//         logger.error('Auth check failed', { error });
//         authService.logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (email: string, password: string, rememberMe = false) => {
//     try {
//       const loggedInUser = await authService.login(email, password, rememberMe);
//       setUser(loggedInUser);
//     } catch (error) {
//       logger.error('Login failed', { email, error });
//       throw error; // Consider handling this in the UI
//     }
//   };

//   const signup = async (data: SignupData) => {
//     try {
//       await authService.signup(data);
//     } catch (error) {
//       logger.error('Signup failed', { email: data.email, error });
//       throw error; // Consider handling this in the UI
//     }
//   };

//   const logout = () => {
//     authService.logout();
//     setUser(null);
//   };

//   const requestPasswordReset = async (email: string) => {
//     try {
//       await authService.requestPasswordReset(email);
//     } catch (error) {
//       logger.error('Password reset request failed', { email, error });
//       throw error; // Consider handling this in the UI
//     }
//   };

//   const resetPassword = async (token: string, newPassword: string) => {
//     try {
//       await authService.resetPassword(token, newPassword);
//     } catch (error) {
//       logger.error('Password reset failed', { error });
//       throw error; // Consider handling this in the UI
//     }
//   };

//   const isAdmin = () => user?.role === 'admin';

//   const contextValue: AuthContextType = {
//     user,
//     loading,
//     login,
//     signup,
//     logout,
//     requestPasswordReset,
//     resetPassword,
//     isAdmin,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }