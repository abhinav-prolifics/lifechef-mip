import { useAppContext } from "@/hooks/appContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View ,StyleSheet,Text} from "react-native";

const CartIconWithBadge = () => {
    const navigation = useNavigation();
    const { cartCountMap } = useAppContext();
    const totalCount = Object.values(cartCountMap).reduce((sum, qty) => sum + qty, 0);
  
    return (
      <TouchableOpacity
        style={styles.cartIconWrapper}
        onPress={() => { router.push("/(utils)/cart") }}
      >
        <Ionicons name="cart-outline" size={24} color="black" />
        {totalCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    cartIconWrapper: {
      marginRight: 16,
      position: 'relative',
    },

      badge: {
        position: 'absolute',
        top: -4,
        right: -6,
        backgroundColor: '#E53935',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 16,
        minHeight: 16,
      },
      badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });

    export default CartIconWithBadge;
      