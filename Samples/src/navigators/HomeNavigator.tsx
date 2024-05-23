import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {View,Image,Text} from "react-native"
import HomeScreen from "../../src/screens/HomeScreen"
import CustomerInformation from "../screens/CustomerInformation"
import AddCarpet from '../screens/AddCarpet'
import AddPilow  from '../screens/AddPilow'
import AddRugs from   '../screens/AddRugs'
import AddBlankets from   '../screens/AddBlankets'
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
        component={CustomerInformation}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Müşteri Kayıt Ekranı</Text>

          ),        
        }}
      />
      <Stack.Screen 
        name='AddProduct'
        component={AddCarpet}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Halı Ekle</Text>

          ),        
        }}
      /> 
      <Stack.Screen 
        name='AddPilow'
        component={AddPilow}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Yorgan Ekle</Text>

          ),        
        }}
      /> 
      <Stack.Screen 
        name='AddRugs'
        component={AddRugs}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Kilim Ekle</Text>

          ),        
        }}
      /> 
      <Stack.Screen 
        name='AddBlankets'
        component={AddBlankets}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Battaniye Ekle</Text>

          ),        
        }}
      /> 
      
    </Stack.Navigator>
  )
}

export default HomeNavigator