import Badge from '@/components/Badge';
import Button from '@/components/Button';
import ProgressCircle from '@/components/ProgressCircle';
import { Caption, Subtitle, ThemedText, Title } from '@/components/ThemedText';
import { Card, ThemedView } from '@/components/ThemedView';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import useColorScheme from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { Award, Bell, ChevronRight, ChevronUp, DollarSign, MessageCircle, Scan } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Image, Platform, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import logo from "../../assets/images/lifechef-icon.jpeg"
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [refreshing, setRefreshing] = useState(false);
  const [showAllMeals, setShowAllMeals] = useState(false);
  const [showRewardDetails, setShowRewardDetails] = useState(false);

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
      {
        id: 1,
        name: 'Mediterranean Salad Bowl',
        time: 'Lunch',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      },
      {
        id: 2,
        name: 'Italian Meatballs, Roasted Mushrooms, Steamed Spinach',
        time: 'Dinner',
        image: 'https://www.lifechef.com/media/all/sqr/119585-sqr.png?format=auto&width=600',
      },
      {
        id: 3,
        name: 'Turkey Chili, Braised Kale, Roasted Mushrooms',
        time: 'Lunch',
        image: 'https://img.lifechef.com/nwp/21321_12014_20321_nwp.png?d=808',
      },
      {
        id: 4,
        name: 'Turkey & Sweet Potato Hash',
        time: 'Breakfast',
        image: 'https://www.lifechef.com/media/all/breakfast/sqr/21301.jpg?format=auto&width=600',
      },
      {
        id: 5,
        name: 'Cod with Tomato and Capers, Braised Kale, Steamed Broccoli',
        time: 'Lunch',
        image: 'https://www.lifechef.com/media/all/sqr/113643-sqr.png?format=auto&width=600',
      },
      {
        id: 6,
        name: 'Turkey Nutri-Morning',
        time: 'Breakfast',
        image: 'https://www.lifechef.com/media/all/breakfast/sqr/21331.jpg?format=auto&width=600',
      },
      {
        id: 7,
        name: 'Fajita Shrimp, Steamed Broccoli, Riced Cauliflower',
        time: 'Lunch',
        image: 'https://www.lifechef.com/media/all/sqr/114293-sqr.png?format=auto&width=600',
      },
      {
        id: 8,
        name: 'Italian Meatballs',
        time: 'Dinner',
        image: 'https://www.lifechef.com/media/all/op/12012-op.jpg?format=auto&width=375',
      },
      {
        id: 9,
        name: 'Mediterranean Orzo',
        time: 'Breakfast',
        image: 'https://www.lifechef.com/media/all/op/12013-op.jpg?format=auto&width=375',
      },
      {
        id: 10,
        name: 'Chickpea Buddha Bowl',
        time: 'Lunch',
        image: 'https://images.pexels.com/photos/6546021/pexels-photo-6546021.jpeg',
      },
    ],
    notifications: [
      { id: 1, type: 'reminder', message: 'Remember to log your breakfast', time: '1 hour ago' },
      { id: 2, type: 'reward', message: 'You earned $5 for logging all meals this week!', time: '5 hours ago' },
    ],
  };

  const mealsToDisplay = showAllMeals
    ? userData.upcomingMeals
    : userData.upcomingMeals.slice(0, 3);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <Image source={logo} style={styles.logo} />
          <TouchableOpacity style={styles.notificationButton} onPress={() => { router.push("/(utils)/notification") }}>
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
              <Subtitle lightColor="#000000" darkColor="#000000">Current Rewards</Subtitle>
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
              title={showRewardDetails ? "Hide Details" : "View Details"}
              onPress={() => setShowRewardDetails(!showRewardDetails)}
              variant="outline"
              size="small"
              icon={
                showRewardDetails ? (
                  <ChevronUp size={16} color={colors.primary} />
                ) : (
                  <ChevronRight size={16} color={colors.primary} />
                )
              }
            />
          </View>

          {showRewardDetails && (
            <View style={styles.rewardHistory}>
              <Subtitle lightColor="#000000" darkColor="#000000">Reward History</Subtitle>
              <Caption>- $10 for meals this week</Caption>
              <Caption>- $5 bonus for daily weigh-ins</Caption>
              <Caption>- $105 past rewards</Caption>
            </View>
          )}
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
                size={90}
                progress={userData.compliance.meals}
                label="Meals"
              />
            </View>
            <View style={styles.progressItem}>
              <ProgressCircle
                size={90}
                progress={userData.compliance.weigh_ins}
                label="Weigh-ins"
              />
            </View>
            <View style={styles.progressItem}>
              <ProgressCircle
                size={90}
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
            <TouchableOpacity onPress={() => setShowAllMeals(!showAllMeals)}>
              <ThemedText style={styles.seeAllLink}> {showAllMeals ? 'Show Less' : 'See All'}</ThemedText>
            </TouchableOpacity>
          </View>

          {mealsToDisplay.map((meal) => (
            <View key={meal.id} style={styles.mealItem}>
              <Image
                source={{ uri: meal.image }}
                style={styles.mealImage}
              />
              <View style={styles.mealInfo}>
                <ThemedText style={styles.mealName}>{meal.name}</ThemedText>
                <Badge label={meal.time} variant="primary" size="small" />
              </View>
              <TouchableOpacity
                style={[styles.scanButton, { backgroundColor: colors.primary }]}
                onPress={() =>
                  Alert.alert(
                    'Camera Access',
                    'This will open your camera to scan the QR code.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Ok' },
                    ]
                  )
                }
              >
                <Scan size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}

          <Button
            title='View Meal Plans'
            onPress={() => router.push('/(utils)/mealPlan')}
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

{/* Branding Watermark */}
<View style={styles.watermarkContainer}>
  <Image
    source={require('../../assets/images/lifechef-icon.jpeg')}
    style={styles.watermarkLogo}
  />
  <View>
    <ThemedText style={styles.watermarkText}>Life Chef</ThemedText>
    <Caption style={styles.watermarkTagline}>Nourish your life</Caption>
  </View>
</View>


      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => { router.push("/(utils)/support") }}>
        <Image
          source={{ uri: 'https://t4.ftcdn.net/jpg/06/43/62/53/240_F_643625328_VPkhbt47OV328Nzqexsg2zjVu7tTgdXx.jpg' }}
          style={styles.fabAvatar}
        />
      </TouchableOpacity>

    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  logo: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    marginTop: 16,
    alignSelf: 'center',
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
  rewardHistory: {
    marginTop: 10,
    paddingHorizontal: 16,
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
    color: '#34A34F'
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
    marginTop: 14,
    margin: 8,
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
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  fabAvatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  watermarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 40,
    opacity: 0.5,
  },
  watermarkLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: 'contain',
  },
  watermarkText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  watermarkTagline: {
    fontSize: 12,
    opacity: 0.7,
  },
  
});