import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import Colors from '@/constants/Colors';
import { Subtitle } from '@/components/ThemedText';
import Button from '@/components/Button'; // Optional: Use your custom Button
import { useAppContext } from '@/hooks/appContext';

// Ideally move to a global shared file
export const meals= [
    {
      id: 1,
      name: 'Mediterranean Salad Bowl',
      image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
      calories: 450,
      price: 12.99,
    },
    {
      id: 2,
      name: 'Grilled Chicken with Vegetables',
      image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg',
      calories: 520,
      price: 14.49,
    },
    {
      id: 3,
      name: 'Avocado Toast with Poached Egg',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      calories: 390,
      price: 9.99,
    },
  ];
  
  

export default function CartScreen() {
  const { cartCountMap, setCartCountMap } = useAppContext();
  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (mealId: number, delta: number) => {
    setCartCountMap((prev) => {
      const newCount = (prev[mealId] || 0) + delta;
      if (newCount <= 0) {
        const { [mealId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [mealId]: newCount };
    });
  };

  const selectedItems = meals.filter((meal) => cartCountMap[meal.id]);
  const totalItems = selectedItems.reduce((acc, m) => acc + cartCountMap[m.id], 0);
  const totalCalories = selectedItems.reduce((acc, m) => acc + (m.calories * cartCountMap[m.id]), 0);
  const totalPrice = selectedItems.reduce(
    (acc, m) => acc + m.price * cartCountMap[m.id],
    0
  );
  

  const handlePlaceOrder = () => {
    Alert.alert('Order Placed', 'This will take to the payment screen in a real app.');
    setCartCountMap({}); // clear cart
    setPromoCode('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={selectedItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
  <Text style={styles.itemCalories}>
    {item.calories} cal x {cartCountMap[item.id]}
  </Text>
  <Text style={styles.itemPrice}>
    ${(item.price * cartCountMap[item.id]).toFixed(2)}
  </Text>
</View>


                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => handleQuantityChange(item.id, -1)}
                    >
                      <Text style={styles.qtyText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyCount}>{cartCountMap[item.id]}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => handleQuantityChange(item.id, 1)}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.promoContainer}>
            <TextInput
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="Enter promo code"
              style={styles.promoInput}
            />
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => {Alert.alert('Promo Applied', promoCode || 'No code entered');setPromoCode("")}}
            >
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summary}>
  <View style={styles.summaryRow}>
    <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
    <Text style={styles.summaryPrice}>${totalPrice.toFixed(2)}</Text>
  </View>
  <View style={styles.summaryRow}>
    <Text style={styles.summaryText}>Total Calories: {totalCalories}</Text>
  </View>
</View>

          <Button
            title="Place Order"
            variant="primary"
            onPress={handlePlaceOrder}
            style={styles.placeOrderBtn}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
      },
      summaryPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      },
      
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    empty: {
      fontSize: 16,
      color: '#777',
      textAlign: 'center',
      marginTop: 100,
    },
    itemCard: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: '#f3f3f3',
      borderRadius: 10,
      padding: 10,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    itemInfo: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'space-between',
    },
    itemName: {
      fontSize: 16,
      fontWeight: '600',
    },
    itemCalories: {
      fontSize: 13,
      color: '#888',
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    qtyBtn: {
      backgroundColor: '#007AFF',
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    qtyText: {
      color: '#fff',
      fontSize: 18,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
      },
      
    qtyCount: {
      marginHorizontal: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    promoContainer: {
      flexDirection: 'row',
      marginVertical: 20,
    },
    promoInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 40,
    },
    applyBtn: {
      marginLeft: 10,
      backgroundColor: '#007AFF',
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    applyText: {
      color: '#fff',
      fontWeight: '600',
    },
    summary: {
      marginBottom: 16,
    },
    summaryText: {
      fontSize: 16,
      fontWeight: '500',
    },
    placeOrderBtn: {
      marginTop: 10,
    },
  });
  