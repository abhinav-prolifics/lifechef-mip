import { useState } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText, Title } from '@/components/ThemedText';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Mail, Lock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function AuthScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateInputs = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://t3.ftcdn.net/jpg/02/93/22/02/360_F_293220207_aSKIua6mTAymZDbIJOSOApeJ7vNoD6Zd.jpghttps://t3.ftcdn.net/jpg/02/93/22/02/360_F_293220207_aSKIua6mTAymZDbIJOSOApeJ7vNoD6Zd.jpg' }}
              style={styles.backgroundImage}
            />
            <View style={[styles.overlay , {backgroundColor: colors.primary }]} />
            <Image
              source={{ uri: 'https://th.bing.com/th/id/OIP.5NoAJBfu6cLaZYUK2ISAqwHaHa?cb=iwc2&pid=ImgDet&w=178&h=178&c=7&dpr=1.5' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <ThemedText style={styles.logoText} lightColor="#FFFFFF" darkColor="#FFFFFF">
              Lifechef Health Platform 
            </ThemedText>
          </View>
          
          <View style={styles.formContainer}>
            <Title style={styles.title}>Sign In</Title>
            <ThemedText style={styles.subtitle}>
              Welcome back! Please sign in to access your account.
            </ThemedText>
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={colors.placeholder} />}
              error={errors.email}
              containerStyle={styles.inputContainer}
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Lock size={20} color={colors.placeholder} />}
              error={errors.password}
              containerStyle={styles.inputContainer}
            />
            
            <Button
              title="Sign In"
              onPress={handleLogin}
              isLoading={isLoading}
              fullWidth
              style={styles.loginButton}
            />
            
            <Button
              title="Forgot Password?"
              onPress={() => {}}
              variant="text"
              style={styles.forgotPasswordButton}
            />
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  formContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  forgotPasswordButton: {
    marginTop: 12,
    alignSelf: 'center',
  },
});