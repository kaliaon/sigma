import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { RoadmapNode } from '@/types/roadmap';

interface RoadmapViewProps {
  nodes: RoadmapNode[];
  onNodePress: (node: RoadmapNode) => void;
}

export function RoadmapView({ nodes, onNodePress }: RoadmapViewProps) {
  const colorScheme = useColorScheme();
  const sortedNodes = [...nodes].sort((a, b) => a.order - b.order);

  return (
    <View style={styles.container}>
      {sortedNodes.map((node, index) => {
        const isLast = index === sortedNodes.length - 1;
        const isActive = node.status === 'AVAILABLE';
        const isInProgress = node.status === 'IN_PROGRESS';
        const isCompleted = node.status === 'COMPLETED';
        const isLocked = node.status === 'LOCKED';

        let iconName = 'lock.fill';
        let iconColor = Colors[colorScheme ?? 'light'].icon;
        
        if (isCompleted) {
          iconName = 'checkmark.circle.fill';
          iconColor = Colors[colorScheme ?? 'light'].tint;
        } else if (isInProgress) {
          iconName = 'play.circle.fill';
          iconColor = Colors[colorScheme ?? 'light'].tint;
        } else if (isActive) {
          iconName = 'star.circle.fill';
          iconColor = Colors[colorScheme ?? 'light'].tint;
        }

        return (
          <View key={node.id} style={styles.nodeContainer}>
            {/* Connection Line */}
            {!isLast && (
              <View 
                style={[
                  styles.line, 
                  { backgroundColor: isCompleted ? Colors[colorScheme ?? 'light'].tint : '#e0e0e0' }
                ]} 
              />
            )}

            <TouchableOpacity 
              style={[
                styles.nodeContent,
                (isActive || isInProgress) && { borderColor: Colors[colorScheme ?? 'light'].tint, borderWidth: 2 }
              ]} 
              onPress={() => onNodePress(node)}
              disabled={isLocked}
            >
              <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
                <IconSymbol name={iconName as any} size={32} color={iconColor} />
              </View>
              
              <View style={styles.textContainer}>
                <ThemedText style={[styles.title, isLocked && styles.lockedText]}>
                  {node.title}
                </ThemedText>
                <ThemedText style={styles.description} numberOfLines={2}>
                  {node.description}
                </ThemedText>
                <ThemedText style={styles.reward}>
                  +{node.xp_reward} XP
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  nodeContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    position: 'relative',
    paddingBottom: 40, 
  },
  line: {
    position: 'absolute',
    left: 24, // Center of icon (16+8 padding) ?
    top: 40,
    bottom: 0,
    width: 2,
    zIndex: -1,
    marginLeft: 16, // Adjust based on icon size
  },
  nodeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  reward: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  lockedText: {
    opacity: 0.5,
  },
});
