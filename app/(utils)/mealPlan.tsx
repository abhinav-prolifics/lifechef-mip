import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// import CircularProgress from 'react-native-circular-progress-indicator';
interface Meal {
  title: string;
  image: any; // Replace 'any' with proper type if available (e.g., ImageSourcePropType)
  cal: number;
  fat: number;
  sodium: number;
  carbs: number;
  protein: number;
  ingredients?: string; // Optional, if not all meals have it
}
interface DayMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}
const CircularProgress = ({ percentage, label, value, unit, color }:any) => {
  const radius = 23;
  const strokeWidth = 4;
  const center = radius + strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedStrokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, circumference - (percentage / 100) * circumference],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View
      style={{
        alignItems: 'center',
        marginHorizontal: 4,
        width: (radius + strokeWidth) * 2,
        height: (radius + strokeWidth) * 2 + 20, 
      }}
    >
      <Svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke={color}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={animatedStrokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ position: 'absolute', top: '13%', left: 0, right: 0, alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{value}</Text>
        <Text style={{ fontSize: 10, color: '#555' }}>{unit}</Text>
      </View>
      <Text style={{ fontSize: 10, color: '#555', marginTop: 4 }}>{label}</Text>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const mealData: Record<string, DayMeals> = {
  'Day 1': {
    breakfast: {
      title: 'Avocado Toast with Poached Eggs',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
      cal: 250,
      fat: 12,
      sodium: 180,
      carbs: 20,
      protein: 14,
      ingredients: 'Whole Grain Bread, Avocado, Eggs, Olive Oil, Salt, Pepper, Lemon Juice',
    },
    lunch: {
      title: 'Grilled Chicken Salad',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      cal: 320,
      fat: 9,
      sodium: 300,
      carbs: 12,
      protein: 30,
    },
    dinner: {
      title: 'Baked Salmon with Quinoa & Broccoli',
      image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
      cal: 400,
      fat: 14,
      sodium: 400,
      carbs: 18,
      protein: 32,
    },
  },
  'Day 2': {
    breakfast: {
      title: 'Turkey & Sweet Potato Hash',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      cal: 190,
      fat: 1.5,
      sodium: 170,
      carbs: 15,
      protein: 12,
      ingredients: 'Sweet Potato, Ground Turkey, Tomatoes, Bell Peppers, Marinara, Onion, Spices',
    },
    lunch: {
      title: 'Fajita Shrimp, Roasted Mushrooms, Steamed Spinach',
      image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg',
      cal: 370,
      fat: 3.5,
      sodium: 450,
      carbs: 10,
      protein: 25,
    },
    dinner: {
      title: 'Beef Stroganoff with Brussels Sprouts & Green Beans',
      image:'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      cal: 360,
      fat: 5,
      sodium: 530,
      carbs: 15,
      protein: 24,
    },
  },
  'Day 3': {
    breakfast: {
      title: 'Banana Protein Pancakes',
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      cal: 280,
      fat: 6,
      sodium: 210,
      carbs: 35,
      protein: 18,
      ingredients: 'Banana, Eggs, Protein Powder, Oats, Cinnamon',
    },
    lunch: {
      title: 'Chicken Burrito Bowl',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
      cal: 430,
      fat: 12,
      sodium: 550,
      carbs: 40,
      protein: 34,
    },
    dinner: {
      title: 'Zucchini Noodles with Turkey Meatballs',
      image: 'https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg',
      cal: 310,
      fat: 8,
      sodium: 390,
      carbs: 20,
      protein: 28,
    },
  },
  'Day 4': {
    breakfast: {
      title: 'Greek Yogurt Parfait',
      image: 'https://images.pexels.com/photos/1435906/pexels-photo-1435906.jpeg',
      cal: 200,
      fat: 2,
      sodium: 75,
      carbs: 22,
      protein: 14,
      ingredients: 'Greek Yogurt, Berries, Honey, Granola',
    },
    lunch: {
      title: 'Tuna Salad Lettuce Wraps',
      image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg',
      cal: 310,
      fat: 7,
      sodium: 420,
      carbs: 10,
      protein: 26,
    },
    dinner: {
      title: 'Chicken Stir Fry with Brown Rice',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      cal: 390,
      fat: 10,
      sodium: 480,
      carbs: 35,
      protein: 30,
    },
  },
  'Day 5': {
    breakfast: {
      title: 'Oatmeal with Almond Butter and Berries',
      image: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg',
      cal: 270,
      fat: 9,
      sodium: 120,
      carbs: 30,
      protein: 10,
      ingredients: 'Oats, Almond Butter, Strawberries, Blueberries, Chia Seeds',
    },
    lunch: {
      title: 'Quinoa Chickpea Bowl',
      image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg',
      cal: 340,
      fat: 10,
      sodium: 330,
      carbs: 28,
      protein: 20,
    },
    dinner: {
      title: 'Pesto Pasta with Grilled Vegetables',
      image: 'https://images.pexels.com/photos/1640780/pexels-photo-1640780.jpeg',
      cal: 420,
      fat: 15,
      sodium: 470,
      carbs: 45,
      protein: 18,
    },
  },
  'Day 6': {
    breakfast: {
      title: 'Veggie Omelette with Whole Wheat Toast',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      cal: 260,
      fat: 11,
      sodium: 200,
      carbs: 18,
      protein: 16,
      ingredients: 'Eggs, Spinach, Tomato, Onion, Mushrooms, Whole Wheat Bread',
    },
    lunch: {
      title: 'Turkey Wrap with Hummus',
      image: 'https://images.pexels.com/photos/1640781/pexels-photo-1640781.jpeg',
      cal: 330,
      fat: 8,
      sodium: 390,
      carbs: 26,
      protein: 24,
    },
    dinner: {
      title: 'Lentil Soup with Side Salad',
      image: 'https://images.pexels.com/photos/1640782/pexels-photo-1640782.jpeg',
      cal: 350,
      fat: 9,
      sodium: 440,
      carbs: 30,
      protein: 22,
    },
  },
  'Day 7': {
    breakfast: {
      title: 'Smoothie Bowl with Nuts & Seeds',
      image: 'https://images.pexels.com/photos/4040667/pexels-photo-4040667.jpeg',
      cal: 300,
      fat: 10,
      sodium: 100,
      carbs: 35,
      protein: 14,
      ingredients: 'Banana, Mixed Berries, Almond Milk, Chia Seeds, Almonds, Granola',
    },
    lunch: {
      title: 'Grilled Tofu with Steamed Veggies',
      image: 'https://images.pexels.com/photos/1640783/pexels-photo-1640783.jpeg',
      cal: 310,
      fat: 7,
      sodium: 350,
      carbs: 20,
      protein: 22,
    },
    dinner: {
      title: 'Shrimp Paella with Peas & Bell Peppers',
      image: 'https://images.pexels.com/photos/1640784/pexels-photo-1640784.jpeg',
      cal: 410,
      fat: 13,
      sodium: 480,
      carbs: 38,
      protein: 28,
    },
  },
};
const { width } = Dimensions.get('window');
const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
const MealCard = ({ meal, onPress }:any) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 10, width: width * 0.85, borderRadius: 16, backgroundColor: '#f5f5f5', padding: 10, elevation: 3 }}>
      <Image source={{ uri: meal.image }} style={{ width: '100%', height: 150, borderRadius: 12 }} resizeMode="cover" />
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>{meal.title}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <CircularProgress percentage={meal.cal / 300 * 100} label="Cal" value={meal.cal} unit="kcal" color="black" />
        <CircularProgress percentage={meal.fat / 10 * 100} label="Sat Fat" value={meal.fat} unit="g" color="orange" />
        <CircularProgress percentage={meal.sodium / 500 * 100} label="Sodium" value={meal.sodium} unit="mg" color="gray" />
        <CircularProgress percentage={meal.carbs / 50 * 100} label="Net Carbs" value={meal.carbs} unit="g" color="blue" />
        <CircularProgress percentage={meal.protein / 50 * 100} label="Protein" value={meal.protein} unit="g" color="green" />
      </View>
    </TouchableOpacity>
  );
};
export default function YourMealPlanScreen() {
  const [selectedDay, setSelectedDay] = useState('Day 1');
  const [selectedMeal, setSelectedMeal] = useState<any>(null);

  const meals = mealData[selectedDay];


  return (
    <ScrollView style={{ flex: 1, padding: 10, paddingBottom:20, paddingTop:30, backgroundColor: '#fff' }}>
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {days.map(day => (
          <TouchableOpacity key={day} onPress={() => setSelectedDay(day)}>
            <View style={{ padding: 10, borderRadius: 8, backgroundColor: selectedDay === day ? '#34A853' : '#eee', marginHorizontal: 4 }}>
              <Text style={{ color: selectedDay === day ? '#fff' : '#000' }}>{day}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {meals && (
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', margin: 8 }}>Breakfast</Text>
           <View style={{ alignItems: 'center' }}><MealCard meal={meals.breakfast} onPress={() => setSelectedMeal(meals.breakfast)} /></View>
          <Text style={{ fontSize: 18, fontWeight: '600', margin: 8 }}>Lunch</Text>
         <View style={{ alignItems: 'center' }}>   <MealCard meal={meals.lunch} onPress={() => setSelectedMeal(meals.lunch)} /></View>
          <Text style={{ fontSize: 18, fontWeight: '600', margin: 8 }}>Dinner</Text>
           <View style={{ alignItems: 'center' }}> 
          <MealCard meal={meals.dinner} onPress={() => setSelectedMeal(meals.dinner)} /></View>
        </View>
      )}

     { selectedMeal && <Modal visible={!!selectedMeal} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20 }}>
            {selectedMeal && (
              <>
                <Image source={{uri:selectedMeal.image}} style={{ width: '100%', height: 150, borderRadius: 12 }} resizeMode="cover" />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 8 }}>{selectedMeal.title}</Text>
                <Text>Calories: {selectedMeal.cal}</Text>
                <Text>Saturated Fat: {selectedMeal.fat}g</Text>
                <Text>Sodium: {selectedMeal.sodium}mg</Text>
                <Text>Net Carbs: {selectedMeal.carbs}g</Text>
                <Text>Protein: {selectedMeal.protein}g</Text>
                {selectedMeal.ingredients && (
                  <Text style={{ marginTop: 10 }}><Text style={{ fontWeight: 'bold' }}>Ingredients:</Text> {selectedMeal.ingredients}</Text>
                )}
                <TouchableOpacity onPress={() => setSelectedMeal(null)} style={{ marginTop: 20, alignSelf: 'center' }}>
                  <Text style={{ color: '#34A853', fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

      </Modal>}
    <StatusBar style='auto'/>
    </SafeAreaView>
    </ScrollView>
  );
}