import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo,Feather,FontAwesome ,MaterialCommunityIcons } from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';

const Tab =createBottomTabNavigator()

function RootNavigator() {
  return (
   <Tab.Navigator initialRouteName="Ana Sayfa" 
   screenOptions={{
    tabBarHideOnKeyboard:true,
    tabBarShowLabel: false,
    tabBarActiveTintColor:"#5C3EBC" ,
    tabBarInactiveTintColor:"#959595",
    headerShown: false,
    tabBarStyle:{ height: 80},
   }}>
      <Tab.Screen
         name="Ana Sayfa"
         component={HomeNavigator}
         options={{
            tabBarIcon: ({color})=>(
            <Entypo name="home" size={24} color={color}/>
            )
         }}
      />
      <Tab.Screen
          name="Bildirimler"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={24} color={color} />
            ),
          }}
        />
         <Tab.Screen
          name="Sohbet"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
          
        />
             <Tab.Screen
          name="İlanlarım"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gift" size={24} color={color} />            ),
          }}
        />


   </Tab.Navigator>
  )
}

export default RootNavigator