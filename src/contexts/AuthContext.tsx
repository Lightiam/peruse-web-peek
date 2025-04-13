
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getUserByEmail } from '../services/db';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const checkAuth = async () => {
      const userId = localStorage.getItem('currentUserId');
      const userEmail = localStorage.getItem('currentUserEmail');
      
      if (userId && userEmail) {
        const user = await getUserByEmail(userEmail);
        if (user) {
          setCurrentUser(user);
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUserId', user.id);
    localStorage.setItem('currentUserEmail', user.email);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserEmail');
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
