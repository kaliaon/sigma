import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function FinanceScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText type="title">Finance</ThemedText>
          <ThemedText style={styles.subtitle}>Manage your financial goals</ThemedText>
        </View>

        <View style={styles.section}>
          <View style={[styles.balanceCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
            <ThemedText style={styles.balanceLabel}>In-App Currency</ThemedText>
            <ThemedText style={styles.balanceAmount}>0 Coins</ThemedText>
            <ThemedText style={styles.balanceSubtext}>Earn coins by completing quests</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Financial Goals
          </ThemedText>

          <View style={[styles.goalCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.goalTitle}>Emergency Fund</ThemedText>
            <ThemedText style={styles.goalProgress}>$0 / $1,000</ThemedText>
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
            <ThemedText style={styles.goalTitle}>Monthly Savings</ThemedText>
            <ThemedText style={styles.goalProgress}>$0 / $500</ThemedText>
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
            Finance Quests
          </ThemedText>
          <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.questTitle}>Track Daily Expenses</ThemedText>
            <ThemedText style={styles.questReward}>Reward: 10 XP + 5 Coins</ThemedText>
            <TouchableOpacity
              style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <ThemedText style={styles.questButtonText}>Start</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.questTitle}>Create a Budget Plan</ThemedText>
            <ThemedText style={styles.questReward}>Reward: 20 XP + 10 Coins</ThemedText>
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
  balanceCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    height: 48,
    lineHeight: 48,
  },
  balanceSubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
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
