import { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { ThemedView, Card } from '@/components/ThemedView';
import { ThemedText, Title, Subtitle, Caption } from '@/components/ThemedText';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { Camera, Calendar, Clock, Search, Filter, ChevronRight, ArrowRight, Scan } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import Input from '@/components/Input';
import { router } from 'expo-router';

export default function MealsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');



  // Stubbed datax
  const mealsData = {
    upcoming: [
      {
        id: 1,
        name: 'Mediterranean Salad Bowl',
        image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
        time: 'Lunch',
        date: 'Today',
        calories: 450,
        tags: ['Low Carb', 'High Protein'],
        scanned: false,
      },
      {
        id: 2,
        name: 'Grilled Chicken with Vegetables',
        image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg',
        time: 'Dinner',
        date: 'Today',
        calories: 520,
        tags: ['Gluten Free', 'High Protein'],
        scanned: false,
      },
      {
        id: 6,
        name: 'Avocado Toast with Poached Egg',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        time: 'Breakfast',
        date: 'Tomorrow',
        calories: 390,
        tags: ['Vegetarian', 'Healthy Fats'],
        scanned: false,
      },
      {
        id: 7,
        name: 'Thai Green Curry',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
        time: 'Lunch',
        date: 'Tomorrow',
        calories: 600,
        tags: ['Spicy', 'Gluten Free'],
        scanned: false,
      },
      {
        id: 8,
        name: 'Quinoa & Black Bean Bowl',
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
        time: 'Dinner',
        date: 'Tomorrow',
        calories: 480,
        tags: ['Vegan', 'High Fiber'],
        scanned: false,
      },
      {
        id: 9,
        name: 'Pesto Pasta with Cherry Tomatoes',
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
        time: 'Lunch',
        date: 'Wednesday',
        calories: 550,
        tags: ['Vegetarian', 'Comfort Food'],
        scanned: false,
      },
    ],
    completed: [
      {
        id: 4,
        name: 'Protein Smoothie Bowl',
        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
        time: 'Breakfast',
        date: 'Today',
        calories: 380,
        tags: ['Dairy Free', 'High Fiber'],
        scanned: true,
      },
      {
        id: 5,
        name: 'Turkey & Avocado Wrap',
        image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg',
        time: 'Lunch',
        date: 'Yesterday',
        calories: 420,
        tags: ['Low Sodium', 'Whole Grain'],
        scanned: true,
      },
      {
        id: 10,
        name: 'Chickpea and Spinach Stew',
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
        time: 'Dinner',
        date: 'Yesterday',
        calories: 410,
        tags: ['Vegan', 'Iron Rich'],
        scanned: true,
      },
      {
        id: 12,
        name: 'Salmon Sushi Rolls',
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
        time: 'Lunch',
        date: 'Two days ago',
        calories: 430,
        tags: ['Omega-3', 'Gluten Free'],
        scanned: true,
      },
    ],
  };

  const filteredMeals = mealsData[activeTab].filter(meal =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const renderMealItem = (item:any, showScanButton = true) => (
    <Card key={item.id} style={styles.mealCard}>
      <Image source={{ uri: item.image }} style={styles.mealImage} />

      <View style={styles.mealContentContainer}>
        <View style={styles.mealHeader}>
          <Subtitle>{item.name}</Subtitle>
          <View style={styles.mealMetaContainer}>
            <View style={styles.mealMeta}>
              <Calendar size={14} color={colors.placeholder} style={styles.metaIcon} />
              <Caption>{item.date}</Caption>
            </View>
            <View style={styles.mealMeta}>
              <Clock size={14} color={colors.placeholder} style={styles.metaIcon} />
              <Caption>{item.time}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.mealDetailsContainer}>
          <View style={styles.calorieContainer}>
            <ThemedText style={styles.calorieValue}>{item.calories}</ThemedText>
            <Caption>calories</Caption>
          </View>

          <View style={styles.tagsContainer}>
            {item.tags.map((tag:any, index:number) => (
              <Badge
                key={index}
                label={tag}
                variant={index % 2 === 0 ? 'primary' : 'info'}
                size="small"
                style={styles.tagBadge}
              />
            ))}
          </View>
        </View>

        {showScanButton ? (
          <TouchableOpacity
            style={[styles.scanButtonContainer, { backgroundColor: colors.primary }]}
          >
            <Scan size={16} color="#FFFFFF" style={styles.scanIcon} />
            <ThemedText style={styles.scanButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
              Scan QR Code
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <View style={[styles.scannedContainer, { borderColor: colors.success }]}>
            <ThemedText style={[styles.scannedText, { color: colors.success }]}>
              ✓ Meal logged successfully
            </ThemedText>
          </View>
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <Input
          placeholder="Search meals..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={colors.placeholder} />}
          rightIcon={<Filter size={20} color={colors.placeholder} />}
          containerStyle={styles.searchContainer}
        />


        {/* Camera Button */}
        <TouchableOpacity style={[styles.cameraButton, { backgroundColor: colors.primary }]}>
          <Camera size={20} color="#FFFFFF" style={styles.cameraIcon} />
          <ThemedText style={styles.cameraButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
            Scan a Meal
          </ThemedText>
        </TouchableOpacity>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            style={[
              styles.tab,
              activeTab === 'upcoming' && { borderBottomColor: colors.primary },
            ]}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === 'upcoming' && { color: colors.primary, fontFamily: 'Inter-SemiBold' },
              ]}
            >
              Upcoming Meals
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('completed')}
            style={[
              styles.tab,
              activeTab === 'completed' && { borderBottomColor: colors.primary },
            ]}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === 'completed' && { color: colors.primary, fontFamily: 'Inter-SemiBold' },
              ]}
            >
              Completed
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Meal List */}
        <View style={styles.mealsContainer}>
          {filteredMeals.map(item => renderMealItem(item, activeTab === 'upcoming'))}
        </View>


        {/* Diet Plan Card */}
        <Card style={styles.planCard}>
          <View style={styles.planCardContent}>
            <View>
              <Subtitle>Your Meal Plan</Subtitle>
              <Caption>View your personalized meal recommendations</Caption>
            </View>
            <Button
              title="View"
               onPress={() => router.push('/(utils)/mealPlan')}
              variant="primary"
              style={styles.viewPlanButton}
              size="small"
              icon={<ChevronRight size={16} color="#FFFFFF" />}
            />
          </View>
        </Card>
      </ScrollView>
    </ThemedView>
    </SafeAreaView>
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
  searchContainer: {
    marginBottom: 16,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  cameraIcon: {
    marginRight: 8,
  },
  cameraButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
  },
  mealsContainer: {
    marginBottom: 16,
  },
  mealCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  mealImage: {
    width: '100%',
    height: 160,
  },
  mealContentContainer: {
    padding: 16,
  },
  mealHeader: {
    marginBottom: 12,
  },
  mealMetaContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  mealMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaIcon: {
    marginRight: 4,
  },
  mealDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: 16,
  },
  calorieValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
    fontFamily: 'Inter-Bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:8,
    flex: 1,
  },
  tagBadge: {
    marginRight: 6,
    marginBottom: 4,
  },
  scanButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  scanIcon: {
    marginRight: 6,
  },
  scanButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  scannedContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  scannedText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  planCard: {
    marginBottom: 32,
  },
  planCardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  viewPlanButton:{
    marginTop: 10,
    alignSelf: 'flex-start',
    justifyContent:'flex-end',
  }
});