import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './tabs/HomePage';
import FavPage from './tabs/FavPage';
import CountryPage from './tabs/CountryPage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function HomeScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#E8FFD7',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomePage') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          else if (route.name === 'CountryPage') {
            iconName = focused ? 'globe' : 'globe-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}>

      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="Favorites" component={FavPage} />
      <Tab.Screen name="CountryPage" component={CountryPage} />
    </Tab.Navigator>
  );
}
