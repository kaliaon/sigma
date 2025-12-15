import api from './api';
import * as SecureStore from 'expo-secure-store';
import { USE_MOCK_DATA } from '@/constants/config';

export interface User {
  id: number;
  username: string;
  email: string;
  profile?: {
    level: number;
    xp: number;
    current_streak: number;
    language: string;
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email?: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    if (USE_MOCK_DATA) {
      console.log('Mock login');
      await SecureStore.setItemAsync('accessToken', 'mock-access-token');
      await SecureStore.setItemAsync('refreshToken', 'mock-refresh-token');
      const { MOCK_USER } = require('./mock/store');
      return { user: MOCK_USER };
    }
    const response = await api.post('/auth/login/', credentials);
    const { access, refresh } = response.data;
    await SecureStore.setItemAsync('accessToken', access);
    await SecureStore.setItemAsync('refreshToken', refresh);
    
    // Fetch user profile after login
    const profileResponse = await api.get('/auth/profile/');
    return { user: profileResponse.data };
  },

  register: async (data: RegisterData) => {
    if (USE_MOCK_DATA) {
      console.log('Mock register');
      return authService.login({ username: data.username, password: data.password });
    }
    await api.post('/auth/register/', data);
    return authService.login({ username: data.username, password: data.password });
  },

  logout: async () => {
    try {
      if (!USE_MOCK_DATA) {
        const refresh = await SecureStore.getItemAsync('refreshToken');
        if (refresh) {
          await api.post('/auth/logout/', { refresh });
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    }
  },

  getProfile: async () => {
    if (USE_MOCK_DATA) {
        // Return shared mock user
        const { MOCK_USER } = require('./mock/store');
        return MOCK_USER;
    }
    const response = await api.get('/auth/profile/');
    return response.data;
  },

  isAuthenticated: async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    return !!token;
  },
};
