import { View, ViewProps } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function ThemedView(props: ViewProps & { lightColor?: string; darkColor?: string }) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'light'
      ? lightColor ?? Colors.light.background
      : darkColor ?? Colors.dark.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Card(props: ViewProps & { lightColor?: string; darkColor?: string }) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'light'
      ? lightColor ?? Colors.light.cardBackground
      : darkColor ?? Colors.dark.cardBackground;
  const borderColor =
    colorScheme === 'light'
      ? Colors.light.borderColor
      : Colors.dark.borderColor;

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: 12,
          padding: 16,
          marginVertical: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: colorScheme === 'light' ? 0.1 : 0.2,
          shadowRadius: 4,
          elevation: 2,
          borderWidth: 1,
          borderColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}