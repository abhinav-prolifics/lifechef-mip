import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const UtilLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="notification" options={{ title: 'Notifications',animation: 'fade' }} />
         <Stack.Screen name="mealPlan" options={{ title: 'Meal Plan',animation: 'fade' }} />
         <Stack.Screen name="support" options={{ title: 'Notifications',animation: 'fade' }}  />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}

export default UtilLayout