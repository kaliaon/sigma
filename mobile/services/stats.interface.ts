import { UserStats } from '@/types/stats';

export interface StatsService {
  getUserStats(): Promise<UserStats>;
}
