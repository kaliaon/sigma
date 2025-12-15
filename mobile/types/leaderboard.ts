export interface LeaderboardEntry {
  id: number;
  rank: number;
  username: string;
  xp: number;
  avatar?: string;
  is_current_user?: boolean;
}

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all_time';
