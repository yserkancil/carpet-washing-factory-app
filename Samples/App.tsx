/*import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigator from './src/navigators/RootNavigator';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import { AuthStackParamList } from './src/types/types';

const Stack = createStackNavigator<AuthStackParamList>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      const userRole = await AsyncStorage.getItem('role'); // role bilgisini AsyncStorage'dan alıyoruz
      setIsAuthenticated(!!token);
      setRole(userRole); // role bilgisini state'e atıyoruz
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated && role ? (
          <Stack.Screen name="Home">
            {(props) => <RootNavigator {...props} role={role} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigator from './src/navigators/RootNavigator';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import CustomerScreen from './src/screens/CustomerScreen';
import { RootStackParamList } from './src/types/RootStackParamList';
import LogOut from './src/navigators/LogOut';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RootNavigator" component={RootNavigator} />
        <Stack.Screen name="Customerscreen" component={CustomerScreen} />
        <Stack.Screen name="Hesap" component={LogOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
