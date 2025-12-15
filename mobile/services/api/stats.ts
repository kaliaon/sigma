import api from '../api';
import { UserStats } from '@/types/stats';
import { StatsService } from '../stats.interface';

export const statsApiService: StatsService = {
  getUserStats: async () => {
    try {
      const response = await api.get('/stats/user/');
      return response.data;
    } catch (error) {
      console.error('Stats API Error:', error);
      throw error;
    }
  }
};
