import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from '../Map/MapScreen';

const screenOptions = {
  tabBarShowLabel: false
}

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: () => {
          return <Icon name='home-outline' size={16} color='#000' />
        }
      }} />
      <Tab.Screen name='Map' component={MapScreen} options={{
        tabBarIcon: () => {
          return <Icon name='map-outline' size={16} color='#000' />
        }
      }} />
    </Tab.Navigator>
  )
}

export default HomeStack;
