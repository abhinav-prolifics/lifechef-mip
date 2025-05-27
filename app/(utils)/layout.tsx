import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const UtilLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="notification" />
         <Stack.Screen name="mealPlan" />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}

export default UtilLayout