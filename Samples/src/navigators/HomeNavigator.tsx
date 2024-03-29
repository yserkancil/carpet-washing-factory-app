import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {View,Image,Text} from "react-native"
import HomeScreen from "../../src/screens/HomeScreen"
import CategoryFilterScren from "../../src/screens/CategoryFilterScreen"
import ProductOne from "../screens/ProductOne"

const Stack = createStackNavigator()
function HomeNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name='Home'
        component={HomeScreen}
        options={{
          headerStyle: {backgroundColor:"#eba009"},
          headerTitle: ()=>(
            <View style={{ alignItems: 'center' }}>
          <Image
          style={{ width: 70, height: 55 ,borderRadius:17,borderWidth:1,borderColor:"#e0a61d"}}
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
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Müşteri Kayıt Ekranı</Text>

          ),        
        }}
      />
      <Stack.Screen 
        name='AddProduct'
        component={ProductOne}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Product1</Text>

          ),        
        }}
      /> 
      
    </Stack.Navigator>
  )
}

export default HomeNavigator