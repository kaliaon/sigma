import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { statsService } from '@/services';
import { UserStats } from '@/types/stats';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function StatsScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const data = await statsService.getUserStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
      return (
          <ThemedView style={[styles.container, styles.center]}>
              <ThemedText>{t('common.loading')}</ThemedText>
          </ThemedView>
      );
  }

  // Transform data for charts
  const xpHistoryData = stats.xp_history.map(p => ({
      label: p.date.split('-').slice(1).join('/'), // 11-01 -> 01/11 or simpler
      value: p.value
  }));

  const activityData = stats.daily_activity.map(p => ({
      label: p.date,
      value: p.value
  }));

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: t('stats.title'), headerBackTitle: t('common.back') }} />
      
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        
        {/* Overview Cards */}
        <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
                <ThemedText style={styles.statValue}>{stats.total_xp}</ThemedText>
                <ThemedText style={styles.statLabel}>{t('common.totalXp')}</ThemedText>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FF9500' }]}>
                <ThemedText style={styles.statValue}>{stats.streak} {t('profile.days')}</ThemedText>
                <ThemedText style={styles.statLabel}>{t('profile.streak')}</ThemedText>
            </View>
        </View>

        {/* Activity Chart */}
        <View style={[styles.section, { borderBottomColor: Colors[colorScheme ?? 'light'].icon }]}>
            <View style={styles.sectionHeader}>
                <IconSymbol name="chart.bar.fill" size={20} color={Colors[colorScheme ?? 'light'].icon} />
                <ThemedText type="subtitle" style={styles.sectionTitle}>{t('stats.dailyActivity')}</ThemedText>
            </View>
            <SimpleBarChart data={activityData} height={180} />
            <ThemedText style={styles.chartSubtext}>{t('stats.activityDescription')}</ThemedText>
        </View>

        {/* XP History Chart */}
        <View style={[styles.section, { borderBottomColor: Colors[colorScheme ?? 'light'].icon }]}>
             <View style={styles.sectionHeader}>
                <IconSymbol name="chart.bar.fill" size={20} color={Colors[colorScheme ?? 'light'].icon} />
                <ThemedText type="subtitle" style={styles.sectionTitle}>{t('stats.xpHistory')}</ThemedText>
            </View>
            <SimpleBarChart data={xpHistoryData} height={180} barColor="#34C759" />
        </View>

        {/* Domain Progress */}
        <View style={styles.section}>
             <View style={styles.sectionHeader}>
                <IconSymbol name="chart.pie.fill" size={20} color={Colors[colorScheme ?? 'light'].icon} />
                <ThemedText type="subtitle" style={styles.sectionTitle}>{t('stats.domainProgress')}</ThemedText>
             </View>
             
             {stats.domain_stats.map((domain) => (
                 <View key={domain.domain} style={styles.progressRow}>
                     <View style={styles.progressHeader}>
                         <ThemedText style={styles.progressLabel}>{t(`tabs.${domain.domain.toLowerCase()}`, { defaultValue: domain.domain })}</ThemedText>
                         <ThemedText style={styles.progressValue}>{domain.progress}%</ThemedText>
                     </View>
                     <View style={[styles.progressBarBg, { backgroundColor: Colors[colorScheme ?? 'light'].icon + '40' }]}>
                         <View 
                            style={[
                                styles.progressBarFill, 
                                { 
                                    width: `${domain.progress}%`,
                                    backgroundColor: Colors[colorScheme ?? 'light'].tint
                                }
                            ]} 
                         />
                     </View>
                     <ThemedText style={styles.progressSubtext}>{domain.total_xp} XP</ThemedText>
                 </View>
             ))}
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc', // fallback
  },
  sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
  },
  sectionTitle: {
      fontWeight: '600',
  },
  chartSubtext: {
      fontSize: 12,
      opacity: 0.6,
      marginTop: 8,
      textAlign: 'center',
  },
  progressRow: {
      marginBottom: 16,
  },
  progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
  },
  progressLabel: {
      fontSize: 16,
      fontWeight: '500',
  },
  progressValue: {
      fontSize: 16,
      fontWeight: 'bold',
      opacity: 0.7,
  },
  progressBarBg: {
      height: 8,
      borderRadius: 4,
      width: '100%',
      overflow: 'hidden',
  },
  progressBarFill: {
      height: '100%',
      borderRadius: 4,
  },
  progressSubtext: {
      fontSize: 12,
      opacity: 0.5,
      marginTop: 4,
  },
});
