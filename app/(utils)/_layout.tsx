import { Stack, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const backButton = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  )
}
const UtilLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="notification" options={{
          headerShown: true, title: 'Notifications', animation: 'fade',
          headerLeft: backButton
        }} />
        <Stack.Screen name="mealPlan" options={{
          headerShown: true, title: 'Meal Plan', animation: 'fade',
          headerLeft: backButton
        }} />
        <Stack.Screen name="support" options={{
          headerShown: true, title: 'Support', animation: 'fade',
          headerLeft: backButton
        }} />
      </Stack>
    </>
  )
}

export default UtilLayout