import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {View,Image} from "react-native"
import HomeScreen from "../../src/screens/HomeScreen"
import CategoryFilterScren from "../../src/screens/CategoryFilterScreen"

const Stack = createStackNavigator()
function HomeNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name='Home'
        component={HomeScreen}
        options={{
          headerTitle: ()=>(
            <View style={{ alignItems: 'center' }}>
          <Image
          style={{ width: 70, height: 50 }}
            source={require("../../assets/logo6.png")}
          />
          </View>
          ),
         
        }}
        />
      <Stack.Screen 
        name='CategoryDetails'
        component={CategoryFilterScren}
        options={{
          headerTitle: ()=>(
            <View style={{ alignItems: 'center' }}>
          <Image
          style={{ width: 70, height: 50 }}
            source={require("../../assets/logo6.png")}
          />
          </View>
          ),
         
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigator