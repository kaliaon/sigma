export type RoadmapDomain = 'HEALTH' | 'FINANCE' | 'LEARNING' | 'RELATIONSHIPS' | 'MENTAL';

export interface RoadmapNode {
  id: number;
  title: string;
  description: string;
  status: 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
  order: number;
  xp_reward: number;
  coin_reward: number;
}

export interface Roadmap {
  id: number;
  domain: RoadmapDomain;
  nodes: RoadmapNode[];
}
