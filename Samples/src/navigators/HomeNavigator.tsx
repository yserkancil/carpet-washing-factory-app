import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from "../../src/screens/HomeScreen"
const Stack = createStackNavigator()
function HomeNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='Home'
        component={HomeScreen}
        />
    </Stack.Navigator>
  )
}

export default HomeNavigator