import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";

const screenOptions = {
  tabBarShowLabel: false
}

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        /*tabBarIcon: () => {
          return <Ionicons name="home-outline" size={16} color="#000" />;
        }*/
      }} />
    </Tab.Navigator>
  )
}

export default HomeStack;
