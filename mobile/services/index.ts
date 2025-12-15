import { USE_MOCK_DATA } from '@/constants/config';
import { roadmapMockService } from './mock/roadmap';
import { roadmapApiService } from './api/roadmap';
import { RoadmapService } from './roadmap.interface';

import { leaderboardMockService } from './mock/leaderboard';
import { leaderboardApiService } from './api/leaderboard';
import { LeaderboardService } from './leaderboard.interface';

import { statsMockService } from './mock/stats';
import { statsApiService } from './api/stats';
import { StatsService } from './stats.interface';

import api, { quests as questsApiService, economy } from './api';
import { questsMockService } from './mock/quests';

export const roadmapService: RoadmapService = USE_MOCK_DATA 
  ? roadmapMockService 
  : roadmapApiService;

export const leaderboardService: LeaderboardService = USE_MOCK_DATA
  ? leaderboardMockService
  : leaderboardApiService;

export const statsService: StatsService = USE_MOCK_DATA
  ? statsMockService
  : statsApiService;

export const quests = USE_MOCK_DATA ? questsMockService : questsApiService;

export { api, economy };
