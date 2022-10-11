import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FirstScreen from './screens/firstScreen.screens';
import LoginScreen from './screens/loginScreeen.screens';
import SignUpScreen from './screens/signUpScreen.screens';

function App() {
  return (
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
}

export default App;
