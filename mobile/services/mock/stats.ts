import { UserStats } from '@/types/stats';
import { StatsService } from '../stats.interface';

const MOCK_STATS: UserStats = {
  total_xp: 15400,
  level: 12,
  streak: 5,
  xp_history: [
    { date: '2023-11-01', value: 100 },
    { date: '2023-11-02', value: 150 },
    { date: '2023-11-03', value: 200 },
    { date: '2023-11-04', value: 50 },
    { date: '2023-11-05', value: 300 },
    { date: '2023-11-06', value: 250 },
    { date: '2023-11-07', value: 400 },
  ],
  daily_activity: [
    { date: 'Дүй', value: 2 },
    { date: 'Сей', value: 3 },
    { date: 'Сәр', value: 5 },
    { date: 'Бей', value: 1 },
    { date: 'Жұм', value: 4 },
    { date: 'Сен', value: 6 },
    { date: 'Жек', value: 4 },
  ],
  domain_stats: [
    { domain: 'Денсаулық', progress: 75, total_xp: 4500 },
    { domain: 'Оқу', progress: 40, total_xp: 2100 },
    { domain: 'Қаржы', progress: 60, total_xp: 3200 },
    { domain: 'Қарым-қатынас', progress: 30, total_xp: 1500 },
    { domain: 'Менталды', progress: 85, total_xp: 4100 },
  ]
};

export const statsMockService: StatsService = {
  getUserStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_STATS;
  }
};
