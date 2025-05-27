import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const UtilLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="notification" />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}

export default UtilLayout