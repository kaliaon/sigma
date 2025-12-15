import { LeaderboardEntry, LeaderboardPeriod } from '@/types/leaderboard';

export interface LeaderboardService {
  getLeaderboard(period: LeaderboardPeriod): Promise<LeaderboardEntry[]>;
  getUserRank(period: LeaderboardPeriod): Promise<LeaderboardEntry | null>;
}
