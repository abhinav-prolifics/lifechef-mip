import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}: BadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'info':
        return colors.tertiary;
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    // For warning badge, use dark text for better contrast
    if (variant === 'warning') return '#000000';
    return '#FFFFFF';
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 2, paddingHorizontal: 6 };
      case 'medium':
        return { paddingVertical: 4, paddingHorizontal: 8 };
      case 'large':
        return { paddingVertical: 6, paddingHorizontal: 12 };
      default:
        return { paddingVertical: 4, paddingHorizontal: 8 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'medium':
        return 12;
      case 'large':
        return 14;
      default:
        return 12;
    }
  };

  return (
    <View
      style={[
        styles.badge,
        getPadding(),
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontSize: getFontSize(),
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});