import React from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface DataPoint {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  data: DataPoint[];
  height?: number;
  barColor?: string;
  showValues?: boolean;
}

export function SimpleBarChart({ 
  data, 
  height = 200, 
  barColor,
  showValues = true 
}: SimpleBarChartProps) {
  const colorScheme = useColorScheme();
  const themeBarColor = barColor || Colors[colorScheme ?? 'light'].tint;
  
  const maxValue = Math.max(...data.map(d => d.value), 1); // Avoid division by zero

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.chartArea}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          
          return (
            <View key={index} style={styles.columnContainer}>
             {showValues && (
                  <ThemedText style={styles.valueText}>{item.value}</ThemedText>
              )}
              <View style={styles.barContainer}>
                <View 
                    style={[
                        styles.bar, 
                        { 
                            height: `${barHeight}%`, 
                            backgroundColor: themeBarColor,
                            opacity: barHeight === 0 ? 0.1 : 1
                        }
                    ]} 
                />
              </View>
              <ThemedText style={styles.labelText} numberOfLines={1}>{item.label}</ThemedText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  chartArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barContainer: {
     flex: 1,
     width: '100%',
     justifyContent: 'flex-end',
     alignItems: 'center',
     marginVertical: 4,
  },
  bar: {
    width: '80%', // Bar width relative to column width
    minHeight: 4, // Ensure empty bars are visible as small line
    borderRadius: 4,
  },
  valueText: {
    fontSize: 10,
    marginBottom: 2,
    opacity: 0.7,
  },
  labelText: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7,
    textAlign: 'center',
  },
});
