import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../api/client';

interface User {
  id: number;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  updateProfile: (data: { full_name: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const updateProfile = useCallback(async (data: { full_name: string }) => {
    try {
      const response = await apiClient.patch('/users/me', data);
      setUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }, []);

  // Efecto para cargar el perfil del usuario si hay un token
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.get('/users/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token, logout]);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    updateUser,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
