import { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
} from 'react-native';
import { ThemedView, Card } from '@/components/ThemedView';
import { ThemedText, Subtitle, Caption } from '@/components/ThemedText';
import { Calendar, Clock, Search, ShoppingCart } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import Badge from '@/components/Badge';
import Input from '@/components/Input';
import { useAppContext } from '@/hooks/appContext';

export const meals = [
  {
    id: 1,
    name: 'Mediterranean Salad Bowl',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    time: 'Lunch',
    date: 'Today',
    calories: 450,
    price: 12.99,
    tags: ['Low Carb', 'High Protein'],
  },
  {
    id: 2,
    name: 'Grilled Chicken with Vegetables',
    image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg',
    time: 'Dinner',
    date: 'Today',
    calories: 520,
    price: 14.49,
    tags: ['Gluten Free', 'High Protein'],
  },
  {
    id: 3,
    name: 'Avocado Toast with Poached Egg',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    time: 'Breakfast',
    date: 'Tomorrow',
    calories: 390,
    price: 9.99,
    tags: ['Vegetarian', 'Healthy Fats'],
  },
];



export default function OrderPlacementScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
 
 

  const { cartCountMap, setCartCountMap } = useAppContext();

  const handleOrder = (mealId: number, delta = 1) => {
    setCartCountMap((prev) => {
      const newCount = (prev[mealId] || 0) + delta;
  
      if (newCount <= 0) {
        const { [mealId]: _, ...rest } = prev;
        return rest;
      }
  
      return { ...prev, [mealId]: newCount };
    });
  };
  
  

  const getMealCount = (mealId: number) => cartCountMap[mealId] || 0;

  const totalItems = Object.values(cartCountMap).reduce((sum, qty) => sum + qty, 0);
//   const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const [searchQuery, setSearchQuery] = useState('');
 
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.searchContianer}>
        <Input
        placeholder="Search meals..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Search size={20} color={colors.placeholder} />}
        containerStyle={styles.searchInput}
      />
        </View>



      {/* Meals List */}
      <FlatList
        contentContainerStyle={styles.listContent}
        data={meals.filter((meal) =>
            meal?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const count = getMealCount(item.id);
          return (
            <Card style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.content}>
                <Subtitle>{item.name}</Subtitle>
                <View style={styles.metaRow}>
                  {/* <Calendar size={14} color={colors.placeholder} style={styles.metaIcon} />
                  <Caption>{item.date}</Caption>
                  <Clock size={14} color={colors.placeholder} style={[styles.metaIcon, { marginLeft: 12 }]} />
                  <Caption>{item.time}</Caption> */}
                </View>
                <View style={styles.infoRow}>
  <Caption>{item.calories} calories</Caption>
  <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
</View>



                <View style={styles.tagsContainer}>
                  {item.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      label={tag}
                      variant={index % 2 === 0 ? 'primary' : 'info'}
                      size="small"
                      style={styles.tagBadge}
                    />
                  ))}
                </View>

                {count === 0 ? (
  <TouchableOpacity
    onPress={() => handleOrder(item.id)}
    style={[styles.orderButton, { backgroundColor: colors.primary }]}
  >
    <ThemedText style={styles.orderButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
      Order
    </ThemedText>
  </TouchableOpacity>
) : (
  <View style={styles.quantitySelector}>
    <TouchableOpacity
      onPress={() => handleOrder(item.id, -1)}
      style={[styles.qtyButton, { backgroundColor: colors.primary }]}
    >
      <Text style={styles.qtyButtonText}>−</Text>
    </TouchableOpacity>

    <View style={styles.qtyCount}>
      <Text style={styles.qtyCountText}>{count}</Text>
    </View>

    <TouchableOpacity
      onPress={() => handleOrder(item.id, 1)}
      style={[styles.qtyButton, { backgroundColor: colors.primary }]}
    >
      <Text style={styles.qtyButtonText}>+</Text>
    </TouchableOpacity>
  </View>
)}

              </View>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    searchContianer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
      },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartIconWrapper: {
    position: 'relative',
    padding: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#E53935',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderColor:'#023c69',
    // borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  qtyButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  qtyCount: {
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyCountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  metaIcon: {
    marginRight: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  tagBadge: {
    marginRight: 6,
    marginTop: 4,
  },
  orderButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
});
