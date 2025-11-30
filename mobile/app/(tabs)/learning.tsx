import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LearningScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText type="title">Learning</ThemedText>
          <ThemedText style={styles.subtitle}>Expand your knowledge</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Active Courses
          </ThemedText>

          <View style={[styles.courseCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.courseTitle}>Personal Development</ThemedText>
            <ThemedText style={styles.courseProgress}>Progress: 0%</ThemedText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: Colors[colorScheme ?? 'light'].tint, width: '0%' },
                ]}
              />
            </View>
            <TouchableOpacity
              style={[styles.courseButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <ThemedText style={styles.courseButtonText}>Continue Learning</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Learning Quests
          </ThemedText>
          <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.questTitle}>Read for 30 minutes</ThemedText>
            <ThemedText style={styles.questReward}>Reward: 10 XP</ThemedText>
            <TouchableOpacity
              style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <ThemedText style={styles.questButtonText}>Start</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={[styles.questCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.questTitle}>Complete a lesson</ThemedText>
            <ThemedText style={styles.questReward}>Reward: 15 XP</ThemedText>
            <TouchableOpacity
              style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <ThemedText style={styles.questButtonText}>Start</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Recommended Topics
          </ThemedText>
          <View style={styles.topicsContainer}>
            <View style={[styles.topicChip, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
              <ThemedText style={styles.topicText}>Leadership</ThemedText>
            </View>
            <View style={[styles.topicChip, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
              <ThemedText style={styles.topicText}>Communication</ThemedText>
            </View>
            <View style={[styles.topicChip, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
              <ThemedText style={styles.topicText}>Time Management</ThemedText>
            </View>
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
  courseCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  courseProgress: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  courseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  courseButtonText: {
    color: '#fff',
    fontWeight: '600',
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
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  topicText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
