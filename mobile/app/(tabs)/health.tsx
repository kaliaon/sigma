import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HealthScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText type="title">Health</ThemedText>
          <ThemedText style={styles.subtitle}>Track your physical wellbeing</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Today's Goals
          </ThemedText>

          <View style={[styles.goalCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.goalTitle}>Steps</ThemedText>
            <ThemedText style={styles.goalProgress}>0 / 10,000</ThemedText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: Colors[colorScheme ?? 'light'].tint, width: '0%' },
                ]}
              />
            </View>
          </View>

          <View style={[styles.goalCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.goalTitle}>Water Intake</ThemedText>
            <ThemedText style={styles.goalProgress}>0 / 8 glasses</ThemedText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: Colors[colorScheme ?? 'light'].tint, width: '0%' },
                ]}
              />
            </View>
          </View>

          <View style={[styles.goalCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.goalTitle}>Exercise</ThemedText>
            <ThemedText style={styles.goalProgress}>0 / 30 minutes</ThemedText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: Colors[colorScheme ?? 'light'].tint, width: '0%' },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Health Quests
          </ThemedText>
          <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.questTitle}>Morning Workout</ThemedText>
            <ThemedText style={styles.questReward}>Reward: 15 XP</ThemedText>
            <TouchableOpacity
              style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <ThemedText style={styles.questButtonText}>Start</ThemedText>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  goalCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  goalProgress: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
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
