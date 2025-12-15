export interface StatPoint {
  date: string;
  value: number;
}

export interface DomainProgress {
  domain: string;
  progress: number; // 0-100
  total_xp: number;
}

export interface UserStats {
  xp_history: StatPoint[];
  daily_activity: StatPoint[]; // minutes or quests count
  domain_stats: DomainProgress[];
  total_xp: number;
  level: number;
  streak: number;
}
