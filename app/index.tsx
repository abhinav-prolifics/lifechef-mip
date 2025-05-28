import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

export default function SplashScreen() {
  // For demo purposes, we'll redirect to the auth screen after a brief delay
  // In a real app, you'd check if the user is already logged in
  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to auth screen
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Redirect to auth screen
  return <Redirect href="/auth" />;
  
  // In a real implementation, you'd show a splash screen first
  /*
  return (
    <LinearGradient
      colors={['#2E7D32', '#4CAF50']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://example.com/lifechef-logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <ThemedText style={styles.title} lightColor="#FFFFFF" darkColor="#FFFFFF">
          Member Intelligence Platform 
        </ThemedText>
      </View>
    </LinearGradient>
  );
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
});