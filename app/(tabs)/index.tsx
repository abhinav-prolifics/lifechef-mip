import { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { ThemedView, Card } from '@/components/ThemedView';
import { ThemedText, Title, Subtitle, Caption } from '@/components/ThemedText';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import ProgressCircle from '@/components/ProgressCircle';
import { Bell, ChevronRight, Scan, DollarSign, Award } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import Layout from '@/constants/Layout';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [refreshing, setRefreshing] = useState(false);

  // Stubbed data
  const userData = {
    name: 'John Doe',
    rewards: {
      weekly: 15,
      total: 120,
    },
    compliance: {
      meals: 0.7,
      weigh_ins: 0.8,
      overall: 0.75,
    },
    upcomingMeals: [
      { id: 1, name: 'Mediterranean Salad Bowl', time: 'Lunch' },
      { id: 2, name: 'Grilled Chicken with Vegetables', time: 'Dinner' },
    ],
    notifications: [
      { id: 1, type: 'reminder', message: 'Remember to log your breakfast', time: '1 hour ago' },
      { id: 2, type: 'reward', message: 'You earned $5 for logging all meals this week!', time: '5 hours ago' },
    ],
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Welcome back,</ThemedText>
            <Title>{userData.name}</Title>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.text} />
            <View style={[styles.notificationBadge, { backgroundColor: colors.primary }]}>
              <ThemedText style={styles.notificationCount} lightColor="#FFFFFF" darkColor="#FFFFFF">
                2
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Rewards Card */}
        <Card style={styles.rewardsCard}>
          <View style={styles.rewardsHeader}>
            <View style={styles.rewardsIconContainer}>
              <DollarSign size={20} color="#FFFFFF" />
            </View>
            <View>
              <Subtitle>Current Rewards</Subtitle>
              <Caption>Keep up the good work!</Caption>
            </View>
          </View>
          
          <View style={styles.rewardsContent}>
            <View style={styles.rewardItem}>
              <ThemedText style={styles.rewardValue}>${userData.rewards.weekly}</ThemedText>
              <Caption>This Week</Caption>
            </View>
            <View style={styles.rewardDivider} />
            <View style={styles.rewardItem}>
              <ThemedText style={styles.rewardValue}>${userData.rewards.total}</ThemedText>
              <Caption>Total Earned</Caption>
            </View>
          </View>
          
          <View style={styles.rewardsFooter}>
            <Button
              title="View Details"
              onPress={() => {}}
              variant="outline"
              size="small"
              icon={<ChevronRight size={16} color={colors.primary} />}
            />
          </View>
        </Card>

        {/* Compliance Card */}
        <Card>
          <Subtitle>Your Compliance</Subtitle>
          <Caption style={styles.complianceCaption}>
            You're ${20 - userData.rewards.weekly} away from your weekly goal of $20
          </Caption>
          
          <View style={styles.complianceContainer}>
            <View style={styles.progressItem}>
              <ProgressCircle
                size={80}
                progress={userData.compliance.meals}
                label="Meals"
              />
            </View>
            <View style={styles.progressItem}>
              <ProgressCircle
                size={80}
                progress={userData.compliance.weigh_ins}
                label="Weigh-ins"
              />
            </View>
            <View style={styles.progressItem}>
              <ProgressCircle
                size={80}
                progress={userData.compliance.overall}
                label="Overall"
              />
            </View>
          </View>
        </Card>

        {/* Upcoming Meals */}
        <Card>
          <View style={styles.sectionHeader}>
            <Subtitle>Today's Meals</Subtitle>
            <TouchableOpacity>
              <ThemedText style={styles.seeAllLink}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          
          {userData.upcomingMeals.map((meal) => (
            <View key={meal.id} style={styles.mealItem}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' }}
                style={styles.mealImage}
              />
              <View style={styles.mealInfo}>
                <ThemedText style={styles.mealName}>{meal.name}</ThemedText>
                <Badge label={meal.time} variant="primary" size="small" />
              </View>
              <TouchableOpacity 
                style={[styles.scanButton, { backgroundColor: colors.primary }]}
              >
                <Scan size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
          
          <Button
            title="View Meal Plan"
            onPress={() => {}}
            variant="outline"
            fullWidth
            style={styles.viewMealsButton}
          />
        </Card>

        {/* Recent Notifications */}
        <Card style={styles.notificationsCard}>
          <Subtitle>Recent Notifications</Subtitle>
          
          {userData.notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationItem}>
              <View 
                style={[
                  styles.notificationIcon, 
                  { 
                    backgroundColor: notification.type === 'reward' 
                      ? colors.success 
                      : colors.primary 
                  }
                ]}
              >
                {notification.type === 'reward' ? (
                  <Award size={18} color="#FFFFFF" />
                ) : (
                  <Bell size={18} color="#FFFFFF" />
                )}
              </View>
              <View style={styles.notificationContent}>
                <ThemedText style={styles.notificationMessage}>
                  {notification.message}
                </ThemedText>
                <Caption>{notification.time}</Caption>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 16,
    opacity: 0.7,
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  rewardsCard: {
    backgroundColor: Platform.OS === 'ios' ? '#F8F9FA' : '#F5F5F5',
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rewardsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  rewardItem: {
    alignItems: 'center',
    flex: 1,
  },
  rewardDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  rewardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  rewardsFooter: {
    alignItems: 'flex-end',
  },
  complianceCaption: {
    marginBottom: 16,
  },
  complianceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  progressItem: {
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllLink: {
    color: '#4CAF50',
    fontFamily: 'Inter-Medium',
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  mealInfo: {
    flex: 1,
    marginLeft: 12,
  },
  mealName: {
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  scanButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMealsButton: {
    marginTop: 8,
  },
  notificationsCard: {
    marginBottom: Layout.spacing.xl,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
});