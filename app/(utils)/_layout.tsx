import { Stack, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const BackButton = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  )
}

const UtilLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="notification" options={{
          headerShown: true, title: 'Notifications', animation: 'fade',
          headerLeft: () => <BackButton />
        }} />
        <Stack.Screen name="cart" options={{
          headerShown: true, title: 'Your Cart', animation: 'fade',
          headerLeft: () => <BackButton />
        }} />
        <Stack.Screen name="mealPlan" options={{
          headerShown: true, title: 'Meal Plan', animation: 'fade',
          headerLeft: () => <BackButton />
        }} />
        <Stack.Screen name="support" options={{
          headerShown: true, title: 'Support', animation: 'fade',
          headerLeft: () => <BackButton />
        }} />
         <Stack.Screen name="dependants" options={{
          headerShown: true, title: 'Care Givers', animation: 'fade',
          headerLeft: () => <BackButton />
        }} />
        <Stack.Screen name="create-dependants" options={{
          headerShown: true, title: 'Create Care Giver', animation: 'fade',
          headerLeft: () => <BackButton />
        }} />
         <Stack.Screen name="orderHistory" options={{
          headerShown: true, title: 'Order History', animation: 'fade',
          headerLeft: () => <BackButton />
        }} />
      </Stack>
    </SafeAreaView>
  )
}

export default UtilLayout
