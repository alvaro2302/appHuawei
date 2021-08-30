import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from './ScheduleScreen';

const screenOptions = {
  headerTransparent: true,
  headerTitleStyle: {
    display: 'none'
  },
  headerLeft: null
}

const Stack = createStackNavigator();

const ScheduleStack = () => {
  return (
    <Stack.Navigator initialRouteName='ScheduleHome' screenOptions={screenOptions}>
      <Stack.Screen name='  ' component={ScheduleScreen} />
    </Stack.Navigator>
  )
}

export default ScheduleStack;