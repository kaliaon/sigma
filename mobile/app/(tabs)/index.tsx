import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function QuestsScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText type="title">Quests</ThemedText>
          <ThemedText style={styles.subtitle}>
            Welcome back, {user?.username || 'User'}!
          </ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
            <ThemedText style={styles.statValue}>Level 1</ThemedText>
            <ThemedText style={styles.statLabel}>Your Level</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
            <ThemedText style={styles.statValue}>0 XP</ThemedText>
            <ThemedText style={styles.statLabel}>Total XP</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Daily Quests
          </ThemedText>
          <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.questTitle}>Complete your first quest</ThemedText>
            <ThemedText style={styles.questReward}>Reward: 10 XP</ThemedText>
            <TouchableOpacity
              style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <ThemedText style={styles.questButtonText}>Start Quest</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Weekly Quests
          </ThemedText>
          <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.questTitle}>Weekly Challenge</ThemedText>
            <ThemedText style={styles.questReward}>Reward: 50 XP</ThemedText>
            <TouchableOpacity
              style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <ThemedText style={styles.questButtonText}>View Details</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Epic Quests
          </ThemedText>
          <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.questTitle}>Personal Growth Journey</ThemedText>
            <ThemedText style={styles.questReward}>Reward: 200 XP</ThemedText>
            <TouchableOpacity
              style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <ThemedText style={styles.questButtonText}>Begin Journey</ThemedText>
            </TouchableOpacity>
          </View>
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
