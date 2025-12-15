import React, { useEffect, useState, ReactNode } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { roadmapService } from '@/services';
import { RoadmapView } from '@/components/RoadmapView';
import { RoadmapDomain } from '@/types/roadmap';

interface DomainScreenProps {
  domain: RoadmapDomain;
  title: string;
  subtitle: string;
  children?: ReactNode; // For custom content like Wallet card
}

export function DomainScreen({ domain, title, subtitle, children }: DomainScreenProps) {
  const { t } = useTranslation();
  const { refreshUser } = useAuth();
  const colorScheme = useColorScheme();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      const data = await roadmapService.getRoadmap(domain);
      setRoadmap(data);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const data = await roadmapService.generateRoadmap(domain);
      setRoadmap(data);
    } catch (error) {
      Alert.alert(t('common.error'), t('roadmap.failedToGenerate'));
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRoadmap();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleNodePress = (node: any) => {
    if (node.status === 'AVAILABLE') {
      Alert.alert(node.title, node.description, [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('common.start'), 
          onPress: async () => {
            const success = await roadmapService.startNode(node.id);
            if (success) {
              await fetchRoadmap(); 
              Alert.alert(t('common.success'), t('common.questStarted'));
            } else {
              Alert.alert(t('common.error'), t('common.failedToStart'));
            }
          }
        }
      ]);
    } else if (node.status === 'IN_PROGRESS') {
        Alert.alert(node.title, t('roadmap.inProgressDescription', { defaultValue: 'This step is currently in progress.' }), [
            { text: t('common.cancel'), style: 'cancel' },
            { 
              text: t('common.complete'), 
              onPress: async () => {
                const success = await roadmapService.completeNode(node.id);
                if (success) {
                  await fetchRoadmap(); 
                  await refreshUser();
                  Alert.alert(t('common.success'), t('common.questCompleted'));
                } else {
                  Alert.alert(t('common.error'), t('common.failedToComplete'));
                }
              }
            }
        ]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.header}>
          <ThemedText type="title">{title}</ThemedText>
          <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
        </View>

        {children && (
          <View style={styles.section}>
            {children}
          </View>
        )}

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {t('roadmap.yourJourney')}
          </ThemedText>
          
          {loading ? (
             <ThemedText>{t('roadmap.loading')}</ThemedText>
          ) : roadmap ? (
            <RoadmapView nodes={roadmap.nodes} onNodePress={handleNodePress} />
          ) : (
            <View style={styles.center}>
                <ThemedText style={{marginBottom: 16}}>{t('roadmap.noRoadmap')}</ThemedText>
                <TouchableOpacity 
                    style={[styles.questButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
                    onPress={handleGenerate}
                >
                    <ThemedText style={styles.questButtonText}>{t('roadmap.generate')}</ThemedText>
                </TouchableOpacity>
            </View>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
