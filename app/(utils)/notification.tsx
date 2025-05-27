import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, CheckCircle, ForkKnife, Info, Droplet, Dumbbell, ShoppingCart, Book, Star } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const Notification = () => {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      title: 'Food Delivered',
      message: 'Your pizza has been delivered! Enjoy your meal.',
      timestamp: '2023-10-01T12:00:00Z',
      icon: <CheckCircle size={24} color="#28a745" />,
    },
    {
      id: 2,
      title: '200 kcal Calories',
      message: 'You’ve consumed 200 kcal from your salad today.',
      timestamp: '2023-10-02T14:30:00Z',
      icon: <ForkKnife size={24} color="#007bff" />,
    },
    {
      id: 3,
      title: 'New Diet Plan Available',
      message: 'Check out your new diet plan for the week.',
      timestamp: '2023-10-03T09:15:00Z',
      icon: <Info size={24} color="#ff9800" />,
    },
    {
      id: 4,
      title: 'Food Fact',
      message: 'Did you know? A medium apple has only 95 calories.',
      timestamp: '2023-10-04T11:00:00Z',
      icon: <ForkKnife size={24} color="#007bff" />,
    },
    {
      id: 5,
      title: 'Reminder: Drink Water',
      message: 'Stay hydrated! Don’t forget to drink water.',
      timestamp: '2023-10-05T10:45:00Z',
      icon: <Droplet size={24} color="#00bcd4" />,
    },
    {
      id: 6,
      title: 'Workout Completed',
      message: 'Great job! You completed your 30-minute workout today.',
      timestamp: '2023-10-06T08:30:00Z',
      icon: <Dumbbell size={24} color="#f44336" />,
    },
    {
      id: 7,
      title: 'Meal Prep Tips',
      message: 'Save time during the week with these easy meal prep tips.',
      timestamp: '2023-10-07T18:00:00Z',
      icon: <ForkKnife size={24} color="#ffc107" />,
    },
    {
      id: 8,
      title: 'Grocery Shopping Reminder',
      message: 'It’s time to restock your kitchen. Don’t forget your essentials!',
      timestamp: '2023-10-08T14:20:00Z',
      icon: <ShoppingCart size={24} color="#3f51b5" />,
    },
    {
      id: 9,
      title: 'New Recipe Available',
      message: 'A new healthy recipe is available. Try out our quinoa salad!',
      timestamp: '2023-10-09T16:10:00Z',
      icon: <Book size={24} color="#8e24aa" />,
    },
    {
      id: 10,
      title: 'Motivational Quote',
      message: '“The only bad workout is the one that didn’t happen.” - Anonymous',
      timestamp: '2023-10-10T07:00:00Z',
      icon: <Star size={24} color="#f44336" />,
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
