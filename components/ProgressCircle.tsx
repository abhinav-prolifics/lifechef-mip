import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ThemedText } from './ThemedText';

interface ProgressCircleProps {
  size: number;
  progress: number; // 0 to 1
  strokeWidth?: number;
  label?: string;
  showPercentage?: boolean;
}

export default function ProgressCircle({
  size,
  progress,
  strokeWidth = 10,
  label,
  showPercentage = true,
}: ProgressCircleProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressArc = circumference * (1 - progress);
  
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colorScheme === 'light' ? '#E0E0E0' : '#424242'}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progressArc}
          strokeLinecap="round"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
      <View style={styles.contentContainer}>
        {showPercentage && (
          <ThemedText style={styles.percentage}>
            {Math.round(progress * 100)}%
          </ThemedText>
        )}
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
});