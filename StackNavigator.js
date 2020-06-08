import React, { useEffect, useState } from 'react'
import LoginNewAccount from './scenes/LoginNewAccount'
import LoginDeleteAccount from './scenes/LoginDeleteAccount'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function RootStack(props) {
  const NavigationStack = () => {
      return (
        <>
          <Stack.Screen
            name='LoginNewAccount'
            component={LoginNewAccount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='LoginDeleteAccount'
            component={LoginDeleteAccount}
            options={{ headerShown: false }}
          />
        </>
      )
  }

  return (
    <NavigationContainer {...props}>
      <Stack.Navigator>
        {NavigationStack()}
      </Stack.Navigator>
    </NavigationContainer>
  )
}