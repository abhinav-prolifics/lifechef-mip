import { Tabs } from 'expo-router';
import { Clipboard, Apple, Home as Home, User, MessageCircle, BookOpen, Bell } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import CartIconWithBadge from '@/components/cartIocnWithBadge';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colorScheme === 'light' ? '#FFFFFF' : '#121212',
          borderTopColor: colorScheme === 'light' ? '#E0E0E0' : '#333333',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colorScheme === 'light' ? '#FFFFFF' : '#121212',
          shadowColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: colorScheme === 'light' ? '#E0E0E0' : '#333333',
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 18,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'User Dashboard',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color, size }) => <Apple size={size} color={color} />,
          headerTitle: 'Meal Planning',
        }}
      />
       <Tabs.Screen
  name="order"
  options={{
    title: 'Order',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="receipt-outline" size={size} color={color} />
    ),
    headerTitle: 'Order',
    headerRight: () => <CartIconWithBadge />,
  }}
/>
      <Tabs.Screen
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ color, size }) => <Clipboard size={size} color={color} />,
          headerTitle: 'Health Tracking',
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          headerTitle: 'Education Center',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          headerTitle: 'My Profile',
        }}
      />
    </Tabs>
  );
}