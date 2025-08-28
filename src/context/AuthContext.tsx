import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

// Auth Actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial State
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
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

// Auth Context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  hasPermission: (module: string, action: string) => boolean;
  canAccessModule: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token },
        });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Session check failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // TODO: Replace with actual API call
      // Simulated login for MVP
      if (email === 'admin@portacabin.com' && password === 'admin123') {
        const mockUser: User = {
          id: '1',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@portacabin.com',
          role: 'admin',
          isActive: true,
          permissions: [
            { module: 'dashboard', actions: ['read'] },
            { module: 'quotations', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'sales_orders', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'projects', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'work_orders', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'invoices', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'inventory', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'payroll', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'contractors', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'assets', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'reports', actions: ['read'] },
            { module: 'settings', actions: ['create', 'read', 'update', 'delete'] },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'system',
        };

        const token = 'mock-jwt-token-' + Date.now();

        // Store in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(mockUser));

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: mockUser, token },
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user: User) => {
    localStorage.setItem('userData', JSON.stringify(user));
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const hasPermission = (module: string, action: string): boolean => {
    if (!state.user || !state.user.permissions) return false;

    const modulePermission = state.user.permissions.find(p => p.module === module);
    return modulePermission?.actions.includes(action as any) || false;
  };

  const canAccessModule = (module: string): boolean => {
    if (!state.user || !state.user.permissions) return false;

    return state.user.permissions.some(p => p.module === module);
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    hasPermission,
    canAccessModule,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};