import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const domains = [
    { id: 'health', title: 'tabs.health', icon: 'heart.fill', color: '#ff3b30' },
    { id: 'finance', title: 'tabs.finance', icon: 'dollarsign.circle.fill', color: '#34c759' },
    { id: 'learning', title: 'tabs.learning', icon: 'book.fill', color: '#007aff' },
    { id: 'relationships', title: 'tabs.relationships', icon: 'person.2.fill', color: '#af52de' },
    { id: 'mental', title: 'tabs.mental', icon: 'brain.head.profile', color: '#5856d6' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.header}>
            {t('tabs.explore')}
        </ThemedText>
        <View style={styles.grid}>
          {domains.map((domain) => (
            <TouchableOpacity
              key={domain.id}
              style={[
                styles.card, 
                { 
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                  borderColor: Colors[colorScheme ?? 'light'].icon + '40', // slightly transparent border
                }
              ]}
              onPress={() => router.push(`/domains/${domain.id}` as any)}
            >
              <IconSymbol name={domain.icon as any} size={40} color={domain.color} />
              <ThemedText style={styles.cardTitle}>{t(domain.title)}</ThemedText>
            </TouchableOpacity>
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
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  card: {
    width: '47%', 
    aspectRatio: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    // shadow for ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // elevation for android
    elevation: 2,
  },
  cardTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
