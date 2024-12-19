// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import axios from "axios";
// import { User } from "../types";

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (
//     email: string,
//     password: string,
//     rememberMe?: boolean
//   ) => Promise<void>;
//   signup: (data: SignupData) => Promise<void>;
//   logout: () => void;
//   requestPasswordReset: (email: string) => Promise<void>;
//   resetPassword: (token: string, newPassword: string) => Promise<void>;
//   isAdmin: () => boolean;
// }

// interface SignupData {
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (token) {
//         const response = await axios.get("http://localhost:5000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       localStorage.removeItem("token");
//       sessionStorage.removeItem("token");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email: string, password: string, rememberMe = false) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/v1/login",
//         {
//           email,
//           password,
//         }
//       );

//       const { token, user } = response.data;
//       if (rememberMe) {
//         localStorage.setItem("token", token);
//       } else {
//         sessionStorage.setItem("token", token);
//       }
//       setUser(user);
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Login failed");
//     }
//   };

//   const signup = async (data: SignupData) => {
//     try {
//       await axios
//         .post("http://localhost:5000/api/auth/v1/signup", data)
//         .then((result: any) => {
//           console.log(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (error: any) {
//       console.log("Error", error);
//       throw new Error(error.response?.data?.message || "Signup failed");
//     }
//   };


  
//   const logout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("token");
//     setUser(null);
//   };

//   const requestPasswordReset = async (email: string) => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/forgot-password", {
//         email,
//       });
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to request password reset"
//       );
//     }
//   };

//   const resetPassword = async (token: string, newPassword: string) => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/reset-password", {
//         token,
//         newPassword,
//       });
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to reset password"
//       );
//     }
//   };

//   const isAdmin = () => user?.role === "admin";

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

//   return AuthContext.Provider({
//     value: contextValue,
//     children: !loading && children,
//   });
// }

// export function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
