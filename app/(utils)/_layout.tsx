import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const UtilLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="notification" options={{ headerShown: true, title: 'Notifications', animation: 'fade' }} />
        <Stack.Screen name="mealPlan" options={{ headerShown: true, title: 'Meal Plan', animation: 'fade' }} />
        <Stack.Screen name="support" options={{ headerShown: true, title: 'Support', animation: 'fade' }} />
      </Stack>
    </>
  )
}

export default UtilLayout