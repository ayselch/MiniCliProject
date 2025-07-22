import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreens from './screens/HomeScreens';
import NewsDetails from './screens/NewsDetails';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown :false}} >
        <Stack.Screen name="Home" component={HomeScreens}  />
        <Stack.Screen name="NewsDetails" component={NewsDetails}  />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}


export default App;
