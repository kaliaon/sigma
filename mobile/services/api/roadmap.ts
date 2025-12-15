import api from '../api';
import { Roadmap, RoadmapDomain } from '@/types/roadmap';
import { RoadmapService } from '../roadmap.interface';

export const roadmapApiService: RoadmapService = {
  getRoadmap: async (domain: RoadmapDomain) => {
    try {
      const response = await api.get(`/quests/roadmap/?domain=${domain}`);
      // The API returns a list, we want the first active one or matching one
      // Since the backend filter returns a list in ReadOnlyModelViewSet, we might need adjustments.
      // But let's assume we filter by domain in the component or backend.
      // Wait, ViewSet `get_queryset` filters by user. We need to filter by domain in the list or use a custom action?
      // Actually `RoadmapViewSet` maps to `/roadmap/`. 
      // Let's rely on filtering in Python or change backend to filter.
      // For now, let's just get the list and find the one for the domain.
      const roadmap = response.data.find((r: Roadmap) => r.domain === domain);
      return roadmap || null;
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      return null;
    }
  },
  generateRoadmap: async (domain: RoadmapDomain) => {
    try {
      const response = await api.post('/quests/roadmap/generate/', { domain });
      return response.data;
    } catch (error) {
      return null;
    }
  },
  startNode: async (nodeId: number) => {
    try {
      await api.post('/quests/roadmap/start-node/', { node_id: nodeId });
      return true;
    } catch (error) {
      console.error('Error starting roadmap node:', error);
      return false;
    }
  },
  completeNode: async (nodeId: number) => {
    try {
      await api.post('/quests/roadmap/complete-node/', { node_id: nodeId });
      return true;
    } catch (error) {
      console.error('Error completing roadmap node:', error);
      return false;
    }
  },
  getActiveNode: async () => {
    try {
        const response = await api.get('/quests/roadmap/active-node/');
        return response.data;
    } catch (error) {
        console.error('Error fetching active node:', error);
        return null;
    }
  },
};
