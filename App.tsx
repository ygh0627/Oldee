import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootStack from './screens/rootStack.screens';

function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
