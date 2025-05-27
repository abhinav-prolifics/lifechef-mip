import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, CheckCircle, ForkKnife, Info } from 'lucide-react-native';
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
  ];

  const renderItem = ({ item }:any) => {
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
    <View style={styles.container}>
      {/* App Bar with Back Button */}
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Bell size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Notifications</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.notificationList}
      />
      
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
  },
  backButton: {
    padding: 10,
  },
  appBarTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
