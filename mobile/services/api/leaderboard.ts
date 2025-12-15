import api from '../api';
import { LeaderboardEntry, LeaderboardPeriod } from '@/types/leaderboard';
import { LeaderboardService } from '../leaderboard.interface';

export const leaderboardApiService: LeaderboardService = {
  getLeaderboard: async (period: LeaderboardPeriod) => {
    try {
      const response = await api.get(`/leaderboard/?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Leaderboard API Error:', error);
      return [];
    }
  },
  getUserRank: async (period: LeaderboardPeriod) => {
    try {
      const response = await api.get(`/leaderboard/my-rank/?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('User Rank API Error:', error);
      return null;
    }
  }
};
