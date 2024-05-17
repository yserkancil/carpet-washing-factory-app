import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo,Feather,FontAwesome ,MaterialCommunityIcons } from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNaviagtor';
const Tab =createBottomTabNavigator()

function RootNavigator() {
  return (
   <Tab.Navigator initialRouteName="Ana Sayfa" 
   screenOptions={{
    tabBarHideOnKeyboard:true,
    tabBarShowLabel: false,
    tabBarActiveTintColor:"#d93e0f" ,
    tabBarInactiveTintColor:"#959595",
    headerShown: false,
    tabBarStyle:{ height: 80,backgroundColor:"#eba009"},
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
          name="Arama"
          component={SearchNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={24} color={color} />
            ),
          }}
        />
         <Tab.Screen
          name="Aktif"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
          
        />
             <Tab.Screen
          name="Hepsi"
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