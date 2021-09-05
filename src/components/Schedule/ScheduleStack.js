import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from './ScheduleScreen';
import { TouchableOpacity,Text,View } from 'react-native';





const Stack = createStackNavigator();

const ScheduleStack = () => {
  return (
    <Stack.Navigator initialRouteName='Schedule' >
      <Stack.Screen name='Schedule' component={ScheduleScreen}   />
    </Stack.Navigator>
  )
}

export default ScheduleStack;