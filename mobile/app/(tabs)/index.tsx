import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView, View, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { quests, roadmapService } from '@/services';

export default function QuestsScreen() {
  const { t } = useTranslation();
  const { user, refreshUser } = useAuth();
  const colorScheme = useColorScheme();
  const [dailyQuests, setDailyQuests] = useState([]);
  const [weeklyQuests, setWeeklyQuests] = useState([]);
  const [epicQuests, setEpicQuests] = useState([]);
  const [activeRoadmapNode, setActiveRoadmapNode] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuests = async () => {
    try {
      const response = await quests.list();
      const allQuests = response.data;
      setDailyQuests(allQuests.filter((q: any) => q.quest_type === 'DAILY'));
      setWeeklyQuests(allQuests.filter((q: any) => q.quest_type === 'WEEKLY'));
      setEpicQuests(allQuests.filter((q: any) => q.quest_type === 'EPIC'));
      
      const activeNode = await roadmapService.getActiveNode();
      setActiveRoadmapNode(activeNode);

    } catch (error) {
      console.error('Error fetching quests:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchQuests(), refreshUser()]);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleStartQuest = async (id: number) => {
    try {
      await quests.start(id);
      Alert.alert(t('common.success'), t('common.questStarted'));
      fetchQuests(); // Refresh status
    } catch (error) {
      console.error('Error starting quest:', error);
      Alert.alert(t('common.error'), t('common.failedToStart'));
    }
  };

  const renderQuestCard = (quest: any) => (
    <View key={quest.id} style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
      <ThemedText style={styles.questTitle}>{quest.title}</ThemedText>
      <ThemedText style={styles.questReward}>{t('common.reward')}: {quest.xp_reward} XP</ThemedText>
      <TouchableOpacity
        style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={() => handleStartQuest(quest.id)}
      >
        <ThemedText style={styles.questButtonText}>{t('common.startQuest')}</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.header}>
          <ThemedText type="title">{t('tabs.quests')}</ThemedText>
          <ThemedText style={styles.subtitle}>
            {t('common.welcome', { name: user?.username || 'User' })}
          </ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
            <ThemedText style={styles.statValue}>{t('common.level')} {user?.profile?.level || 1}</ThemedText>
            <ThemedText style={styles.statLabel}>{t('common.level')}</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
            <ThemedText style={styles.statValue}>{user?.profile?.xp || 0} XP</ThemedText>
            <ThemedText style={styles.statLabel}>{t('common.totalXp')}</ThemedText>
          </View>
        </View>

        {activeRoadmapNode && (
            <View style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    {t('roadmap.currentStep')}
                </ThemedText>
                <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].tint, borderWidth: 2 }]}>
                    <ThemedText style={styles.questTitle}>{activeRoadmapNode.title}</ThemedText>
                    <ThemedText style={styles.questReward}>{activeRoadmapNode.description}</ThemedText>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8, justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{backgroundColor: Colors[colorScheme ?? 'light'].tint, padding: 4, borderRadius: 4, marginRight: 8}}>
                                <ThemedText style={{color: '#fff', fontSize: 12}}>{t('roadmap.inProgress')}</ThemedText>
                            </View>
                            <ThemedText style={{fontSize: 12, opacity: 0.7}}>+ {activeRoadmapNode.xp_reward} XP</ThemedText>
                        </View>
                        <TouchableOpacity 
                            style={{backgroundColor: Colors[colorScheme ?? 'light'].tint, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8}}
                            onPress={async () => {
                                const success = await roadmapService.completeNode(activeRoadmapNode.id);
                                if (success) {
                                    Alert.alert(t('common.success'), t('common.questCompleted'));
                                    // Refresh logic
                                    const activeNode = await roadmapService.getActiveNode();
                                    setActiveRoadmapNode(activeNode);
                                    fetchQuests(); 
                                    refreshUser(); // Update XP
                                } else {
                                    Alert.alert(t('common.error'), t('common.failedToComplete'));
                                }
                            }}
                        >
                            <ThemedText style={{color: '#fff', fontWeight: '600', fontSize: 12}}>{t('common.complete')}</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )}

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {t('quests.daily')}
          </ThemedText>
          {dailyQuests.length > 0 ? dailyQuests.map(renderQuestCard) : (
            <ThemedText>{t('quests.noDaily')}</ThemedText>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {t('quests.weekly')}
          </ThemedText>
          {weeklyQuests.length > 0 ? weeklyQuests.map(renderQuestCard) : (
            <ThemedText>{t('quests.noWeekly')}</ThemedText>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {t('quests.epic')}
          </ThemedText>
          {epicQuests.length > 0 ? epicQuests.map(renderQuestCard) : (
            <ThemedText>{t('quests.noEpic')}</ThemedText>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  questCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  questTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  questReward: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  questButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  questButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
