import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {View,Image,Text} from "react-native"
import HomeScreen from "../../../src/screens/CustomerSide/HomeScreen"
import Information from "../../../src/screens/CustomerSide/Information"
import AddCarpetC from '"../../../src/screens/CustomerSide/AddCarpetC'
import AddPilowC  from '../../../src/screens/CustomerSide/AddPilowC'
import AddRugsC from   '../../../src/screens/CustomerSide/AddRugsC'
import AddBlanketsC from   '../../../src/screens/CustomerSide/AddBlanketsC'
import OrderDetails from   '../../../src/screens/CustomerSide/OrderDetails'
const Stack = createStackNavigator()
function HomeNavigatorC() {
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
            source={require("../../../assets/logo6.png")}
          />
          </View>
          ),
         
        }}
        />
      <Stack.Screen 
        name='Information'
        component={Information}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Ana Sayfa</Text>

          ),        
        }}
      />
      <Stack.Screen 
        name='AddCarpetC'
        component={AddCarpetC}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Halı Ekle</Text>

          ),        
        }}
      /> 
      <Stack.Screen 
        name='AddPilowC'
        component={AddPilowC}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Yorgan Ekle</Text>

          ),        
        }}
      /> 
      <Stack.Screen 
        name='AddRugsC'
        component={AddRugsC}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Kilim Ekle</Text>

          ),        
        }}
      /> 
      <Stack.Screen 
        name='AddBlanketsC'
        component={AddBlanketsC}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Battaniye Ekle</Text>

          ),        
        }}
      /> 
      <Stack.Screen 
        name='OrderDetails'
        component={OrderDetails}
        options={{
          headerStyle: {backgroundColor:"#f2e2bd"},
          headerTitle: ()=>(
            <Text style={{fontWeight:'bold',fontSize:15,color:"black"}}>Ana Sayfa</Text>

          ),        
        }}
      /> 
      
    </Stack.Navigator>
  )
}

export default HomeNavigatorC