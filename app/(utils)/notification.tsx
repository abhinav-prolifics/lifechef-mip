import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, CheckCircle, ForkKnife, Info, Droplet, Dumbbell, ShoppingCart, Book, Star, BookOpen, CalendarCheck, Lightbulb, TrendingUp, UtensilsCrossed, RefreshCcw, Heart, Quote } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const Notification = () => {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      title: 'Meal Delivered',
      message: 'Your heart-healthy meal has arrived. Enjoy your nutritious dining experience!',
      timestamp: '2025-05-28T12:00:00Z',
      icon: <CheckCircle size={24} color="#28a745" />,
    },
    {
      id: 2,
      title: 'New Meal Plan Available',
      message: 'Explore our latest Mediterranean diet plan tailored for your health goals.',
      timestamp: '2025-05-27T14:30:00Z',
      icon: <BookOpen size={24} color="#007bff" />,
    },
    {
      id: 3,
      title: 'Dietitian Consultation Reminder',
      message: 'Your scheduled consultation with our registered dietitian is tomorrow at 10 AM.',
      timestamp: '2025-05-26T09:15:00Z',
      icon: <CalendarCheck size={24} color="#ff9800" />,
    },
    {
      id: 4,
      title: 'Health Tip',
      message: 'Incorporate more fiber-rich carbs to support gut health and energy levels.',
      timestamp: '2025-05-25T11:00:00Z',
      icon: <Lightbulb size={24} color="#ffc107" />,
    },
    {
      id: 5,
      title: 'Weekly Progress Update',
      message: 'Great job! You’ve maintained balanced meals for 7 consecutive days.',
      timestamp: '2025-05-24T10:45:00Z',
      icon: <TrendingUp size={24} color="#00bcd4" />,
    },
    {
      id: 6,
      title: 'New Recipe Added',
      message: 'Try our new quinoa salad recipe, perfect for a light and healthy meal.',
      timestamp: '2025-05-23T08:30:00Z',
      icon: <UtensilsCrossed size={24} color="#8e24aa" />,
    },
    {
      id: 7,
      title: 'Subscription Renewal',
      message: 'Your meal plan subscription renews in 3 days. Ensure your preferences are up to date.',
      timestamp: '2025-05-22T18:00:00Z',
      icon: <RefreshCcw size={24} color="#3f51b5" />,
    },
    {
      id: 8,
      title: 'Hydration Reminder',
      message: 'Stay hydrated! Drinking water aids in digestion and overall well-being.',
      timestamp: '2025-05-21T14:20:00Z',
      icon: <Droplet size={24} color="#00bcd4" />,
    },
    {
      id: 9,
      title: 'Customer Success Story',
      message: 'Read how Sedalia managed her diabetes and weight with LifeChef meals.',
      timestamp: '2025-05-20T16:10:00Z',
      icon: <Heart size={24} color="#f44336" />,
    },
    {
      id: 10,
      title: 'Motivational Quote',
      message: '“Let food be thy medicine and medicine be thy food.” – Hippocrates',
      timestamp: '2025-05-19T07:00:00Z',
      icon: <Quote size={24} color="#f44336" />,
    },
  ];

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.notificationCard}>
        <View style={styles.iconContainer}>
          {item.icon}
        </View>
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTimestamp}>
            {new Date(item.timestamp).toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Notification List */}
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.notificationList}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  notificationList: {
    padding: 15,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default Notification;
