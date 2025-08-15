import React, { createContext, useContext, useReducer } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  isEmailVerified?: boolean;
  accountStatus?: string;
  tradingLevel?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAIL' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_BALANCE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'AUTH_FAIL':
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        user: state.user ? { ...state.user, balance: action.payload } : null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Static user data for demo purposes
const DEMO_USERS = [
  {
    id: '1',
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin@123',
    balance: 10000,
    isEmailVerified: true,
    accountStatus: 'active',
    tradingLevel: 'intermediate'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'admin@example.com',
    password: 'admin123',
    balance: 25000,
    isEmailVerified: true,
    accountStatus: 'active',
    tradingLevel: 'expert'
  }
];

// Simulate API delay
const simulateApiDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Generate a simple token for demo
const generateToken = (userId: string) => `token_${userId}_${Date.now()}`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call delay
      await simulateApiDelay(800);
      
      // Find user in demo data
      const user = DEMO_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = user;
      const token = generateToken(user.id);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { 
          user: userWithoutPassword, 
          token 
        },
      });
      
    } catch (error: any) {
      console.error('Login error:', error);
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call delay
      await simulateApiDelay(1000);
      
      // Check if user already exists
      const existingUser = DEMO_USERS.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        balance: 1000, // Starting balance
        isEmailVerified: false,
        accountStatus: 'active',
        tradingLevel: 'beginner'
      };
      
      const token = generateToken(newUser.id);
      
      // In a real app, you'd save this to a database
      // For demo purposes, we'll just simulate successful registration
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: newUser, token },
      });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateBalance = (newBalance: number) => {
    dispatch({ type: 'UPDATE_BALANCE', payload: newBalance });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export demo credentials for easy testing
export const DEMO_CREDENTIALS = {
  user1: { email: 'demo@example.com', password: 'demo123' },
  user2: { email: 'admin@example.com', password: 'admin123' }
};