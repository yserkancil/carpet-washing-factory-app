import React from 'react'
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo,Feather,FontAwesome ,MaterialCommunityIcons } from '@expo/vector-icons';
import HomeNavigatorC from '../../src/navigators/CustomerNaviagtors/HomeNavigatorC';
import SearchNavigator from '../../src/navigators/SearchNaviagtor';
import ActiveNavigator from '../../src/navigators/LogOut'
import FutureNavigator from '../../src/navigators/FutureNavigator';
import LogOut from '../../src/navigators/LogOut';
const Tab =createBottomTabNavigator()

function CustomerScreen() {
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
         component={HomeNavigatorC}
         options={{
            tabBarIcon: ({color})=>(
            <Entypo name="home" size={24} color={color}/>
            )
         }}
      />

         <Tab.Screen
          name="Hesap"
          component={LogOut}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
          
        />



   </Tab.Navigator>
  )
}

export default CustomerScreen