import { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedView, Card } from '@/components/ThemedView';
import { ThemedText, Title, Subtitle, Caption } from '@/components/ThemedText';
import Button from '@/components/Button';
import { User, Settings, Users, Medal, MessageCircle, Bell, ChevronRight, LogOut, ShieldCheck } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [familyAccessEnabled, setFamilyAccessEnabled] = useState(false);
  
  // Stubbed user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    dietitian: {
      name: 'Dr. Sarah Johnson',
      specialty: 'Nutritionist, Diabetes Specialist',
      lastContact: '3 days ago',
    },
    plan: {
      name: 'Premium Nutrition Plan',
      startDate: 'March 15, 2025',
      nextBilling: 'June 15, 2025',
    },
  };
  
  const handleLogout = () => {
    // In a real app, perform logout logic
    router.replace('/auth');
  };
  
  const renderSettingItem = (icon, title, description, rightElement) => (
    <View style={styles.settingItem}>
      <View style={[styles.settingIconContainer, { backgroundColor: colors.primary }]}>
        {icon}
      </View>
      <View style={styles.settingInfo}>
        <ThemedText style={styles.settingTitle}>{title}</ThemedText>
        <Caption>{description}</Caption>
      </View>
      {rightElement}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Title>{userData.name}</Title>
            <Caption>{userData.email}</Caption>
            <Button
              title="Edit Profile"
              onPress={() => {}}
              variant="outline"
              size="small"
              style={styles.editButton}
            />
          </View>
        </View>
        
        {/* Care Team Card */}
        <Card>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconContainer, { backgroundColor: colors.secondary }]}>
              <Users size={18} color="#FFFFFF" />
            </View>
            <Subtitle>Your Care Team</Subtitle>
          </View>
          
          <View style={styles.dietitianContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg' }} 
              style={styles.dietitianImage} 
            />
            <View style={styles.dietitianInfo}>
              <ThemedText style={styles.dietitianName}>{userData.dietitian.name}</ThemedText>
              <Caption>{userData.dietitian.specialty}</Caption>
              <Caption>Last contact: {userData.dietitian.lastContact}</Caption>
            </View>
          </View>
          
          <View style={styles.careTeamActions}>
            <Button
              title="Message"
              onPress={() => {}}
              variant="outline"
              size="small"
              icon={<MessageCircle size={16} color={colors.primary} />}
              style={styles.careTeamButton}
            />
            <Button
              title="Schedule Call"
              onPress={() => {}}
              size="small"
              style={styles.careTeamButton}
            />
          </View>
        </Card>
        
        {/* Plan Details Card */}
        <Card>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconContainer, { backgroundColor: colors.accent }]}>
              <Medal size={18} color="#FFFFFF" />
            </View>
            <Subtitle>Plan Details</Subtitle>
          </View>
          
          <View style={styles.planDetails}>
            <View style={styles.planDetail}>
              <ThemedText style={styles.planLabel}>Current Plan:</ThemedText>
              <ThemedText>{userData.plan.name}</ThemedText>
            </View>
            <View style={styles.planDetail}>
              <ThemedText style={styles.planLabel}>Started On:</ThemedText>
              <ThemedText>{userData.plan.startDate}</ThemedText>
            </View>
            <View style={styles.planDetail}>
              <ThemedText style={styles.planLabel}>Next Billing:</ThemedText>
              <ThemedText>{userData.plan.nextBilling}</ThemedText>
            </View>
          </View>
          
          <Button
            title="View Plan Details"
            onPress={() => {}}
            variant="outline"
            fullWidth
            style={styles.viewPlanButton}
          />
        </Card>
        
        {/* Settings */}
        <Card>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconContainer, { backgroundColor: colors.primary }]}>
              <Settings size={18} color="#FFFFFF" />
            </View>
            <Subtitle>Settings</Subtitle>
          </View>
          
          {renderSettingItem(
            <Bell size={18} color="#FFFFFF" />,
            'Notifications',
            'Get alerts for meals, appointments, and rewards',
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: colors.tertiary }}
              thumbColor={notificationsEnabled ? colors.primary : '#f4f3f4'}
            />
          )}
          
          {renderSettingItem(
            <Users size={18} color="#FFFFFF" />,
            'Family Access',
            'Allow family members to view your progress',
            <Switch
              value={familyAccessEnabled}
              onValueChange={setFamilyAccessEnabled}
              trackColor={{ false: '#767577', true: colors.tertiary }}
              thumbColor={familyAccessEnabled ? colors.primary : '#f4f3f4'}
            />
          )}
          
          {renderSettingItem(
            <ShieldCheck size={18} color="#FFFFFF" />,
            'Privacy & Security',
            'Manage your data and privacy settings',
            <ChevronRight size={20} color={colors.placeholder} />
          )}
        </Card>
        
        {/* Logout Button */}
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          icon={<LogOut size={18} color={colors.error} />}
          style={styles.logoutButton}
          textStyle={{ color: colors.error }}
        />
        
        {/* App Info */}
        <View style={styles.appInfo}>
          <Caption style={styles.versionText}>LifeChef MIP v1.0.0</Caption>
          <Caption style={styles.copyrightText}>© 2025 LifeChef Health, Inc.</Caption>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:.1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  editButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dietitianContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dietitianImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  dietitianInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  dietitianName: {
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  careTeamActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  careTeamButton: {
    marginLeft: 8,
  },
  planDetails: {
    marginBottom: 16,
  },
  planDetail: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  planLabel: {
    width: 100,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  viewPlanButton: {
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'Inter-Medium',
  },
  logoutButton: {
    marginTop: 24,
    marginBottom: 16,
    borderColor: Colors.light.error,
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  versionText: {
    marginBottom: 4,
  },
  copyrightText: {
    textAlign: 'center',
  },
});