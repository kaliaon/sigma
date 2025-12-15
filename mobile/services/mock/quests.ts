export const questsMockService = {
  list: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: [
        {
          id: 1,
          title: "Drink Water",
          description: "Drink 2L of water today",
          quest_type: "DAILY",
          xp_reward: 50,
          status: "AVAILABLE",
        },
        {
          id: 2,
          title: "Walk 5k Steps",
          description: "Take 5000 steps",
          quest_type: "DAILY",
          xp_reward: 50,
          status: "AVAILABLE",
        },
        {
          id: 3,
          title: "Read 30 mins",
          description: "Read a book for 30 minutes",
          quest_type: "DAILY",
          xp_reward: 50,
          status: "AVAILABLE",
        },
        {
          id: 4,
          title: "Weekly Exercise",
          description: "Exercise 3 times this week",
          quest_type: "WEEKLY",
          xp_reward: 200,
          status: "AVAILABLE",
        },
        {
          id: 5,
          title: "Complete a Course",
          description: "Finish a learning module",
          quest_type: "EPIC",
          xp_reward: 1000,
          status: "AVAILABLE",
        }
      ]
    };
  },

  myQuests: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: [] };
  },

  start: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: { success: true } };
  },

  generateRoadmap: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { data: { success: true } };
  }
};
