import { User } from '../types';
import { SignupData } from '../context/AuthContext';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; // In real app, this would be hashed
  role: 'user' | 'admin' | 'organizer';
  events: string[];
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

const USER_KEY = 'event-management-user';
const USERS_KEY = 'event-management-users';

// Helper function to get all registered users
const getStoredUsers = (): StoredUser[] => {
  const usersJson = sessionStorage.getItem(USERS_KEY);
  if (usersJson) {
    try {
      return JSON.parse(usersJson) as StoredUser[];
    } catch (error) {
      console.error('Error parsing users data from session storage', error);
      return [];
    }
  }
  return [];
};

// Helper function to save users to storage
const saveUsers = (users: StoredUser[]): void => {
  sessionStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Helper function to generate unique ID
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const authService = {
  signup: async (data: SignupData): Promise<User> => {
    console.log('Signing up with:', { ...data, password: '[HIDDEN]' });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        
        // Check if user already exists
        const existingUser = users.find(user => user.email.toLowerCase() === data.email.toLowerCase());
        if (existingUser) {
          reject(new Error('An account with this email already exists'));
          return;
        }
        
        // Create new user
        const newStoredUser: StoredUser = {
          id: generateId(),
          name: data.name,
          email: data.email.toLowerCase(),
          password: data.password, // In real app, this would be hashed
          role: data.role as 'user' | 'admin' | 'organizer',
          events: [],
          status: 'active' as 'active' | 'suspended',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // Save user to storage
        users.push(newStoredUser);
        saveUsers(users);
        
        // Create user object for session (without password)
        const newUser: User = {
          id: newStoredUser.id,
          name: newStoredUser.name,
          email: newStoredUser.email,
          role: newStoredUser.role,
          events: [],
          status: newStoredUser.status,
          createdAt: newStoredUser.createdAt,
          updatedAt: newStoredUser.updatedAt,
        };
        
        // Set current user session
        sessionStorage.setItem(USER_KEY, JSON.stringify(newUser));
        resolve(newUser);
      }, 500);
    });
  },

  login: async (email: string, password: string): Promise<User> => {
    console.log('Logging in with:', { email, password: '[HIDDEN]' });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        
        // Find user by email and password
        const user = users.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }
        
        // Create user object for session (without password)
        const loggedInUser: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          events: [],
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
        
        sessionStorage.setItem(USER_KEY, JSON.stringify(loggedInUser));
        resolve(loggedInUser);
      }, 500);
    });
  },

  logout: (): void => {
    sessionStorage.removeItem(USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const userJson = sessionStorage.getItem(USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson) as User;
      } catch (error) {
        console.error('Error parsing user data from session storage', error);
        return null;
      }
    }
    return null;
  },
};

export default authService;
