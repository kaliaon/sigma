import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { leaderboardService } from '@/services';
import { LeaderboardEntry, LeaderboardPeriod } from '@/types/leaderboard';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function LeaderboardScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);

  const fetchLeaderboard = async () => {
    try {
      const data = await leaderboardService.getLeaderboard(period);
      setEntries(data);
      if (userRank) {
          // If we have current user, try to update their rank from list if present
          const me = data.find(e => e.is_current_user);
          if (me) setUserRank(me);
          else {
              // Fetch explicitly if not in top list
             const rank = await leaderboardService.getUserRank(period);
             setUserRank(rank);
          }
      } else {
        const rank = await leaderboardService.getUserRank(period);
        setUserRank(rank);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [period]);

  const periods: { key: LeaderboardPeriod; label: string }[] = [
    { key: 'weekly', label: 'leaderboard.weekly' },
    { key: 'monthly', label: 'leaderboard.monthly' },
    { key: 'all_time', label: 'leaderboard.allTime' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">{t('leaderboard.title')}</ThemedText>
        <View style={styles.periodSelector}>
            {periods.map((p) => (
                <View key={p.key} style={{ flex: 1, paddingHorizontal: 4 }}>
                    <ThemedText
                        style={[
                            styles.periodText,
                            period === p.key && { 
                                color: Colors[colorScheme ?? 'light'].tint,
                                fontWeight: 'bold' 
                            }
                        ]}
                        onPress={() => setPeriod(p.key)}
                    >
                        {t(p.label)}
                    </ThemedText>
                    {period === p.key && (
                        <View style={[styles.activeIndicator, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} />
                    )}
                </View>
            ))}
        </View>
      </View>

      <View style={[styles.tableHeader, { borderBottomColor: Colors[colorScheme ?? 'light'].icon }]}>
          <ThemedText style={[styles.headerRank, styles.colText]}>{t('leaderboard.rank')}</ThemedText>
          <ThemedText style={[styles.headerUser, styles.colText]}>{t('leaderboard.user')}</ThemedText>
          <ThemedText style={[styles.headerXp, styles.colText]}>{t('leaderboard.xp')}</ThemedText>
      </View>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {entries.map((entry) => (
          <View 
            key={entry.id} 
            style={[
                styles.itemRow, 
                entry.is_current_user && { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }
            ]}
          >
            <View style={styles.rankCol}>
                {entry.rank <= 3 ? (
                    <IconSymbol 
                        name="trophy.fill" 
                        size={20} 
                        color={entry.rank === 1 ? '#FFD700' : entry.rank === 2 ? '#C0C0C0' : '#CD7F32'} 
                    />
                ) : (
                    <ThemedText style={styles.rankText}>{entry.rank}</ThemedText>
                )}
            </View>
            <View style={styles.userCol}>
                <ThemedText style={[styles.username, entry.is_current_user && { fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].tint }]}>
                    {entry.username} {entry.is_current_user && `(${t('leaderboard.you')})`}
                </ThemedText>
            </View>
            <View style={styles.xpCol}>
                <ThemedText style={styles.xpText}>{entry.xp}</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>

      {userRank && !entries.find(e => e.id === userRank.id) && (
          <View style={[styles.myRankFooter, { borderTopColor: Colors[colorScheme ?? 'light'].icon, backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
             <View style={styles.itemRow}>
                <View style={styles.rankCol}>
                    <ThemedText style={styles.rankText}>{userRank.rank}</ThemedText>
                </View>
                <View style={styles.userCol}>
                    <ThemedText style={[styles.username, { fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].tint }]}>
                        {userRank.username} ({t('leaderboard.you')})
                    </ThemedText>
                </View>
                <View style={styles.xpCol}>
                    <ThemedText style={styles.xpText}>{userRank.xp}</ThemedText>
                </View>
             </View>
          </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  periodText: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
  },
  activeIndicator: {
    height: 3,
    width: '100%',
    borderRadius: 2,
    marginTop: -3,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  colText: {
    fontWeight: 'bold',
    opacity: 0.7,
    fontSize: 12,
  },
  headerRank: {
    width: 60,
    textAlign: 'center',
  },
  headerUser: {
    flex: 1,
    paddingLeft: 10,
  },
  headerXp: {
    width: 80,
    textAlign: 'right',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  rankCol: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 16,
    fontWeight: '600',
  },
  userCol: {
    flex: 1,
    paddingLeft: 10,
  },
  username: {
    fontSize: 16,
  },
  xpCol: {
    width: 80,
    alignItems: 'flex-end',
  },
  xpText: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
  },
  myRankFooter: {
      borderTopWidth: 1,
      paddingBottom: 20,
  }
});
