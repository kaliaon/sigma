import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText type="title">Profile</ThemedText>
        </View>

        <View style={styles.section}>
          <View style={[styles.profileCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
            <View style={styles.avatarPlaceholder}>
              <ThemedText style={styles.avatarText}>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </ThemedText>
            </View>
            <ThemedText style={styles.username}>{user?.username || 'User'}</ThemedText>
            <ThemedText style={styles.email}>{user?.email || 'email@example.com'}</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Statistics
          </ThemedText>

          <View style={[styles.statRow, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.statLabel}>Level</ThemedText>
            <ThemedText style={styles.statValue}>1</ThemedText>
          </View>

          <View style={[styles.statRow, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.statLabel}>Total XP</ThemedText>
            <ThemedText style={styles.statValue}>0</ThemedText>
          </View>

          <View style={[styles.statRow, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.statLabel}>Quests Completed</ThemedText>
            <ThemedText style={styles.statValue}>0</ThemedText>
          </View>

          <View style={[styles.statRow, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.statLabel}>Total Coins</ThemedText>
            <ThemedText style={styles.statValue}>0</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Achievements
          </ThemedText>
          <View style={[styles.achievementCard, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
            <ThemedText style={styles.achievementText}>No achievements yet</ThemedText>
            <ThemedText style={styles.achievementSubtext}>
              Complete quests to earn achievements!
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: '#ff4444' }]}
            onPress={handleLogout}
          >
            <ThemedText style={[styles.logoutText, { color: '#ff4444' }]}>Logout</ThemedText>
          </TouchableOpacity>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  achievementCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  achievementText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  logoutButton: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
