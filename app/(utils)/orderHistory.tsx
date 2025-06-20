import React, { JSX, useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, SectionListRenderItemInfo } from 'react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

type OrderItem = {
  name: string;
  price: number;
};

type Order = {
  id: number;
  name: string;
  date: Date;
  items: OrderItem[];
};

type SectionType = {
  title: string;
  data: Order[];
};

export default function OrderScreen(): JSX.Element {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const [openOrders, setOpenOrders] = useState<Order[]>([]);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = (): void => {
    setLoading(true);
    const dummyOpenOrders: Order[] = [
      {
        id: 1,
        name: 'Order #001',
        date: new Date(),
        items: [
          { name: 'Mediterranean Salad Bowl', price: 12.99 },
          { name: 'Avocado Toast with Poached Egg', price: 9.99 },
        ],
      },
      {
        id: 2,
        name: 'Order #002',
        date: new Date(),
        items: [
          { name: 'Grilled Chicken with Vegetables', price: 14.49 },
        ],
      },
    ];

    const dummyPastOrders: Order[] = [
      {
        id: 3,
        name: 'Order #003',
        date: new Date(Date.now() - 86400000 * 5),
        items: [
          { name: 'Avocado Toast with Poached Egg', price: 9.99 },
          { name: 'Grilled Chicken with Vegetables', price: 14.49 },
        ],
      },
      {
        id: 4,
        name: 'Order #004',
        date: new Date(Date.now() - 86400000 * 10),
        items: [
          { name: 'Mediterranean Salad Bowl', price: 12.99 },
        ],
      },
    ];

    setTimeout(() => {
      setOpenOrders(dummyOpenOrders);
      setPastOrders(dummyPastOrders);
      setLoading(false);
    }, 1000);
  };

  const cancelOrder = (orderId: number): void => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setOpenOrders(prev => prev.filter(order => order.id !== orderId));
            Alert.alert('Cancelled', 'Your order has been cancelled');
          },
        },
      ]
    );
  };

  const sections: SectionType[] = [
    openOrders.length > 0 && { title: 'Open Orders', data: openOrders },
    pastOrders.length > 0 && { title: 'Past Orders', data: pastOrders },
  ].filter(Boolean) as SectionType[];

  const renderItem = ({ item, section }: SectionListRenderItemInfo<Order, SectionType>) => {
    const total = item.items.reduce((sum, p) => sum + p.price, 0);
    return (
      <View style={[styles.itemContainer, { borderColor: colors.borderColor, backgroundColor: colors.cardBackground }]}> 
        <View style={styles.infoHeader}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.date, { color: colors.text }]}>{item.date.toLocaleDateString()} {item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
        <View style={styles.bulletList}>
          {item.items.map((dish, index) => (
            <Text key={index} style={[styles.bulletItem, { color: colors.text }]}>• {dish.name}</Text>
          ))}
        </View>
        {section.title === 'Open Orders' ? (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
    <Text style={[styles.totalText, { color: colors.text }]}>Total: ₹{total.toFixed(2)}</Text>
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <TouchableOpacity style={styles.trackButton}>
        <Text style={{ color: '#2E7D32' }}>Track Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.cancelButton, { backgroundColor: colors.error }]}
        onPress={() => cancelOrder(item.id)}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
) : (
  <Text style={[styles.totalText, { color: colors.text }]}>Total: ₹{total.toFixed(2)}</Text>
)}

      </View>
    );
  };

  const renderSectionHeader = ({ section }: { section: SectionType }) => (
    section.data.length > 0 ? <Text style={[styles.header, { backgroundColor: colors.cardBackground, color: colors.primary }]}>{section.title}</Text> : null
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <Text style={[styles.emptyText, { color: colors.text }]}>No orders to display.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginVertical: 8, padding: 4 },
  itemContainer: {
    borderBottomWidth: 1,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  trackButton:{
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    color: '#2E7D32',
    borderColor: '#2E7D32',
    borderWidth: 1,
    // backgroundColor: '#E53935',
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12 },
  bulletList: { marginTop: 4 },
  bulletItem: { fontSize: 13, marginLeft: 8, lineHeight: 18 },
  totalText: { fontSize: 14, fontWeight: '600', marginTop: 6 },
  cancelButton: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  cancelText: { color: '#fff', fontSize: 14 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 20 },
});
