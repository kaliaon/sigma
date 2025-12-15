import { Roadmap, RoadmapDomain, RoadmapNode } from '@/types/roadmap';

export interface RoadmapService {
  getRoadmap(domain: RoadmapDomain): Promise<Roadmap | null>;
  generateRoadmap(domain: RoadmapDomain): Promise<Roadmap | null>;
  startNode(nodeId: number): Promise<boolean>;
  completeNode(nodeId: number): Promise<boolean>;
  getActiveNode(): Promise<RoadmapNode | null>;
}
