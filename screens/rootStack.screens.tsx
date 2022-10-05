import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './homeScreen.screens';
import LoginScreen from './loginScreeen.screens';

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={HomeScreen} name="Home" />
    </Stack.Navigator>
  );
}

export default RootStack;
