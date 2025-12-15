import { LeaderboardEntry, LeaderboardPeriod } from '@/types/leaderboard';
import { LeaderboardService } from '../leaderboard.interface';

const MOCK_LEADERBOARD_DATA: Record<LeaderboardPeriod, LeaderboardEntry[]> = {
  weekly: [
    { id: 101, rank: 1, username: 'Айдос', xp: 2500, is_current_user: false },
    { id: 102, rank: 2, username: 'Динара', xp: 2350, is_current_user: false },
    { id: 1, rank: 3, username: 'Мен (Сіз)', xp: 2100, is_current_user: true },
    { id: 103, rank: 4, username: 'Ержан', xp: 1900, is_current_user: false },
    { id: 104, rank: 5, username: 'Сәуле', xp: 1850, is_current_user: false },
  ],
  monthly: [
    { id: 102, rank: 1, username: 'Динара', xp: 9500, is_current_user: false },
    { id: 101, rank: 2, username: 'Айдос', xp: 9200, is_current_user: false },
    { id: 105, rank: 3, username: 'Қайрат', xp: 8800, is_current_user: false },
    { id: 103, rank: 4, username: 'Ержан', xp: 8100, is_current_user: false },
    { id: 1, rank: 5, username: 'Мен (Сіз)', xp: 7500, is_current_user: true },
  ],
  all_time: [
    { id: 105, rank: 1, username: 'Қайрат', xp: 45000, is_current_user: false },
    { id: 102, rank: 2, username: 'Динара', xp: 42300, is_current_user: false },
    { id: 101, rank: 3, username: 'Айдос', xp: 41000, is_current_user: false },
    { id: 106, rank: 4, username: 'Әлихан', xp: 39500, is_current_user: false },
    { id: 1, rank: 10, username: 'Мен (Сіз)', xp: 15400, is_current_user: true },
  ]
};

export const leaderboardMockService: LeaderboardService = {
  getLeaderboard: async (period: LeaderboardPeriod) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_LEADERBOARD_DATA[period] || [];
  },
  getUserRank: async (period: LeaderboardPeriod) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const list = MOCK_LEADERBOARD_DATA[period] || [];
    return list.find(u => u.is_current_user) || null;
  }
};
