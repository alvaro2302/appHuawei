import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from '../Map/MapScreen';
import ScheduleStack from '../Schedule/ScheduleStack';
import UserService from '../../services/UserService';

const screenOptions = {
  tabBarShowLabel: false,
}
const COLOR_INACTIVE = "black";
const COLOR_ACTIVE = "tomato";
const colorActivateIcon =(focused)=>{
  return focused ? COLOR_ACTIVE : COLOR_INACTIVE;
}
const Tab = createBottomTabNavigator();

const disabledTab = {
  tabPress: e => {
    e.preventDefault();
  }
};

const HomeStack = () => {
  const [guest, setGuest] = useState(true);

  useEffect(async () => {
    const isGuest = await UserService.isGuest();
    await setGuest(isGuest);
  }, []);

  return (
    <Tab.Navigator screenOptions={screenOptions} screenOptions={{tintColor:'white',
    tabBarActiveTintColor:COLOR_ACTIVE ,headerShown:false}}>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: ({focused}) => {
          return <Icon name='home' size={16} color='#000' color={colorActivateIcon(focused)} />
        }
      }}/>
      {
        !guest
          ? <Tab.Screen name='Schedule' component={ScheduleStack} options={{
              tabBarIcon: ({focused}) => {
                return <Icon name='calendar-sharp' size={16} color='#000' color={colorActivateIcon(focused)}/> 
              },
            }}/>
          : <Tab.Screen name='Schedule' component={ScheduleStack} listeners={disabledTab} options={{
              tabBarIcon: ({focused}) => {
                return <Icon name='calendar-sharp' size={16} color='#dddddd'/> 
              }
            }}/>
      }
      <Tab.Screen name='Map' component={MapScreen} options={{
        tabBarIcon: ({focused}) => {
          return <Icon name='map' size={16} color='#000'  color={colorActivateIcon(focused)}/>
        }
      }}/>
    </Tab.Navigator>
  )
}



export default HomeStack;
