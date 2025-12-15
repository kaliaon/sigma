import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Use localhost for iOS simulator, 10.0.2.2 for Android emulator
const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:8000/api' 
  : 'http://192.168.0.16:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const quests = {
  list: () => api.get('/quests/quests/'),
  myQuests: () => api.get('/quests/my-quests/'),
  start: (id: number) => api.post(`/quests/quests/${id}/start/`),
  generateRoadmap: () => api.post('/quests/generate-roadmap/'),
};

export const economy = {
  getWallet: () => api.get('/economy/wallet/'),
};

export default api;
