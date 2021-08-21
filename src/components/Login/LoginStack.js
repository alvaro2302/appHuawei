import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';

const screenOptions = {
  headerTransparent: true,
  headerTitleStyle: {
    display: 'none'
  },
  headerLeft: null
}

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default LoginStack;
