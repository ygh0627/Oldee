import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './homeScreen.screens';
import LoginScreen from './loginScreeen.screens';
import SignUpScreen from './signUpScreen.screens';
import TermsOfService from './termsOfService.screens';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  회원가입: {
    email: string | undefined;
    phone: string | undefined | null;
  };
  이용약관: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={LoginScreen}
        name="Login"
        options={{headerShown: false}}
      />
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={SignUpScreen} name="회원가입" />
      <Stack.Screen component={TermsOfService} name="이용약관" />
    </Stack.Navigator>
  );
}

export default RootStack;
