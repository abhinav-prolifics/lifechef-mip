import { Text, TextProps } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function ThemedText(props: TextProps & { lightColor?: string; darkColor?: string }) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const color = colorScheme === 'light' ? lightColor ?? Colors.light.text : darkColor ?? Colors.dark.text;

  return <Text style={[{ color, fontFamily: 'Inter-Regular' }, style]} {...otherProps} />;
}

export function Title(props: TextProps & { lightColor?: string; darkColor?: string }) {
  return (
    <ThemedText
      {...props}
      style={[
        { fontSize: 24, fontWeight: 'bold', marginBottom: 8, fontFamily: 'Inter-Bold' },
        props.style,
      ]}
    />
  );
}

export function Subtitle(props: TextProps & { lightColor?: string; darkColor?: string }) {
  return (
    <ThemedText
      {...props}
      style={[
        { fontSize: 18, fontWeight: '600', marginBottom: 4, fontFamily: 'Inter-SemiBold' },
        props.style,
      ]}
    />
  );
}

export function Caption(props: TextProps & { lightColor?: string; darkColor?: string }) {
  const colorScheme = useColorScheme();
  const defaultColor = colorScheme === 'light' ? Colors.light.placeholder : Colors.dark.placeholder;
  
  return (
    <ThemedText
      {...props}
      lightColor={props.lightColor ?? defaultColor}
      darkColor={props.darkColor ?? defaultColor}
      style={[
        { fontSize: 14, fontFamily: 'Inter-Regular' },
        props.style,
      ]}
    />
  );
}