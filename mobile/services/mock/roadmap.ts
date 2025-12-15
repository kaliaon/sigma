import { Roadmap, RoadmapDomain } from '@/types/roadmap';
import { RoadmapService } from '../roadmap.interface';

const MOCK_ROADMAPS: Record<RoadmapDomain, Roadmap> = {
  HEALTH: {
    id: 1,
    domain: 'HEALTH',
    nodes: [
      {
        id: 101,
        title: 'Күніне 2Л су ішу',
        description: 'Саяхатыңызды су балансын сақтаудан бастаңыз. Бір апта бойы күніне 8 стакан су ішіңіз.',
        status: 'COMPLETED',
        order: 1,
        xp_reward: 50,
        coin_reward: 10,
      },
      {
        id: 102,
        title: '5,000 қадам жүру',
        description: 'Қозғалыс әдетін қалыптастырыңыз. Күн сайын кемінде 5,000 қадам жүріңіз.',
        status: 'AVAILABLE',
        order: 2,
        xp_reward: 100,
        coin_reward: 20,
      },
      {
        id: 103,
        title: 'Қантсыз челлендж',
        description: '3 күн бойы қантты сусындар мен тіскебасарлардан бас тартыңыз.',
        status: 'LOCKED',
        order: 3,
        xp_reward: 150,
        coin_reward: 30,
      },
      {
        id: 104,
        title: '8 сағат ұйқы',
        description: '8 сағаттық сапалы ұйқы арқылы қалпына келуді жақсартыңыз.',
        status: 'LOCKED',
        order: 4,
        xp_reward: 200,
        coin_reward: 40,
      },
      {
        id: 105,
        title: '5КМ жүгіру',
        description: 'Тоқтамай 5 шақырым жүгіру арқылы төзімділігіңізді сынаңыз.',
        status: 'LOCKED',
        order: 5,
        xp_reward: 300,
        coin_reward: 50,
      },
    ],
  },
  FINANCE: {
    id: 2,
    domain: 'FINANCE',
    nodes: [
      { id: 201, title: 'Шығындарды бақылау', description: '7 күн бойы әрбір шығынды жазып отырыңыз.', status: 'AVAILABLE', order: 1, xp_reward: 50, coin_reward: 10 },
      { id: 202, title: 'Бюджет құру', description: 'Тамақ, көлік және демалыс үшін лимиттер белгілеңіз.', status: 'LOCKED', order: 2, xp_reward: 100, coin_reward: 20 },
      { id: 203, title: '100$ жинау', description: 'Жинаққа 100$ алып қойыңыз.', status: 'LOCKED', order: 3, xp_reward: 150, coin_reward: 30 },
      { id: 204, title: 'Шығынсыз күн', description: '24 сағат бойы ештеңе жұмсамаңыз.', status: 'LOCKED', order: 4, xp_reward: 200, coin_reward: 40 },
      { id: 205, title: '50$ инвестициялау', description: 'Алғашқы инвестицияңызды жасаңыз.', status: 'LOCKED', order: 5, xp_reward: 300, coin_reward: 50 },
    ]
  },
  LEARNING: {
    id: 3,
    domain: 'LEARNING',
    nodes: [
      { id: 301, title: '10 бет оқу', description: '30 минут бойы танымдық кітап оқыңыз.', status: 'AVAILABLE', order: 1, xp_reward: 50, coin_reward: 10 },
      { id: 302, title: '5 сөз үйрену', description: 'Үйреніп жүрген тілде жаңа сөздер жаттаңыз.', status: 'LOCKED', order: 2, xp_reward: 100, coin_reward: 20 },
      { id: 303, title: 'Сабақ көру', description: 'Бір білім беретін бейнесабақты толық көріп шығыңыз.', status: 'LOCKED', order: 3, xp_reward: 150, coin_reward: 30 },
      { id: 304, title: 'Дағдыны жаттықтыру', description: 'Жаңа дағдыны жаттықтыруға 1 сағат арнаңыз.', status: 'LOCKED', order: 4, xp_reward: 200, coin_reward: 40 },
      { id: 305, title: 'Біреуге үйрету', description: 'Үйренген ұғымды досыңызға түсіндіріңіз.', status: 'LOCKED', order: 5, xp_reward: 300, coin_reward: 50 },
    ]
  },
  RELATIONSHIPS: {
    id: 4,
    domain: 'RELATIONSHIPS',
    nodes: [
      { id: 401, title: 'Досыңызға қоңырау шалу', description: 'Көп болды сөйлеспеген адамыңызға хабарласыңыз.', status: 'AVAILABLE', order: 1, xp_reward: 50, coin_reward: 10 },
      { id: 402, title: 'Отбасымен бейнеқоңырау', description: 'Отбасыңызбен 15 минут бейнечатта сөйлесіңіз.', status: 'LOCKED', order: 2, xp_reward: 100, coin_reward: 20 },
      { id: 403, title: 'Белсенді тыңдау', description: '10 минут бойы серіктесіңізді немесе досыңызды мұқият тыңдаңыз.', status: 'LOCKED', order: 3, xp_reward: 150, coin_reward: 30 },
      { id: 404, title: 'Хат жазу', description: 'Ризашылық білдіретін қолжазба немесе ұзақ хабарлама жазыңыз.', status: 'LOCKED', order: 4, xp_reward: 200, coin_reward: 40 },
      { id: 405, title: 'Әлеуметтік шара', description: 'Әлеуметтік жиынға немесе кездесуге қатысыңыз.', status: 'LOCKED', order: 5, xp_reward: 300, coin_reward: 50 },
    ]
  },
  MENTAL: {
    id: 5,
    domain: 'MENTAL',
    nodes: [
      { id: 501, title: '5 мин медитация', description: '5 минут тыныш отырып, тыныс алуға назар аударыңыз.', status: 'AVAILABLE', order: 1, xp_reward: 50, coin_reward: 10 },
      { id: 502, title: 'Ризашылық күнделігі', description: 'Сіз риза болатын 3 нәрсені жазыңыз.', status: 'LOCKED', order: 2, xp_reward: 100, coin_reward: 20 },
      { id: 503, title: 'Сандық детокс', description: '2 сағат бойы әлеуметтік желілерді қолданбаңыз.', status: 'LOCKED', order: 3, xp_reward: 150, coin_reward: 30 },
      { id: 504, title: 'Позитивті аффирмация', description: '2 минут бойы позитивті сөздерді қайталаңыз.', status: 'LOCKED', order: 4, xp_reward: 200, coin_reward: 40 },
      { id: 505, title: 'Саналы серуен', description: 'Айналаңызға назар аударып, 20 минут серуендеңіз.', status: 'LOCKED', order: 5, xp_reward: 300, coin_reward: 50 },
    ]
  },
};

export const roadmapMockService: RoadmapService = {
  getRoadmap: async (domain: RoadmapDomain) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_ROADMAPS[domain];
  },
  generateRoadmap: async (domain: RoadmapDomain) => {
    return MOCK_ROADMAPS[domain];
  },
  startNode: async (nodeId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In mock, we don't persist changes to the const object easily across reloads unless we mute it.
    // But for a session it works.
    
    // Find the node and update status
    for (const domain of Object.keys(MOCK_ROADMAPS) as RoadmapDomain[]) {
        const roadmap = MOCK_ROADMAPS[domain];
        const node = roadmap.nodes.find(n => n.id === nodeId);
        if (node) {
            node.status = 'IN_PROGRESS';
            return true;
        }
    }
    return false;
  },
  completeNode: async (nodeId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    for (const domain of Object.keys(MOCK_ROADMAPS) as RoadmapDomain[]) {
        const roadmap = MOCK_ROADMAPS[domain];
        const nodeIndex = roadmap.nodes.findIndex(n => n.id === nodeId);
        
        if (nodeIndex !== -1) {
            const node = roadmap.nodes[nodeIndex];
            if (node.status !== 'IN_PROGRESS' && node.status !== 'COMPLETED') return false;
            
            node.status = 'COMPLETED';
            
            // Award XP
            const { MOCK_USER } = require('./store');
            if (MOCK_USER && MOCK_USER.profile) {
                MOCK_USER.profile.xp += node.xp_reward;
            }

            // Unlock next
            if (nodeIndex + 1 < roadmap.nodes.length) {
                roadmap.nodes[nodeIndex + 1].status = 'AVAILABLE';
            }
            return true;
        }
    }
    return false;
  },
  getActiveNode: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    for (const domain of Object.keys(MOCK_ROADMAPS) as RoadmapDomain[]) {
        const roadmap = MOCK_ROADMAPS[domain];
        const node = roadmap.nodes.find(n => n.status === 'IN_PROGRESS');
        if (node) return node;
    }
    return null;
  }
};
