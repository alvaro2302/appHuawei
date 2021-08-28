import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from '../Map/MapScreen';
import AuthService from '../../services/AuthService';
import { HMSAccountAuthService, HMSAuthParamConstants } from "@hmscore/react-native-hms-account";

const screenOptions = {
  tabBarShowLabel: false,
  tintColor:'white',
  tabBarActiveTintColor:COLOR_ACTIVE
};

const COLOR_INACTIVE = "black";
const COLOR_ACTIVE = "tomato";

const colorActivateIcon = (focused) => {
  return focused ? COLOR_ACTIVE : COLOR_INACTIVE;
}

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const [loading, setLoading] = useState(true);
  
  const SignInHuaweidToken = async() => {
    let datatoken = await AuthService.getToken();
    let signInData = {
      accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM,
      authRequestOption: [ datatoken["idToken"], datatoken["accessToken"] ],
      authScopeList: [datatoken["email"]]
    }
    HMSAccountAuthService.signIn(signInData)
    .then((response) => { 
      console.log("sing in succefull")
      setLoading(false)}
    )
    .catch((err) => { console.log(err) });
  }

  useEffect(async () => {
    await SignInHuaweidToken()
  }, []);

  if(loading) {
    return (
      <ActivityIndicator
        animating = {loading}
        color = '#bc2b78'
        size = "large"
        style = {styles.activityIndicator}
      />
    );
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: ({focused}) => {
          return <Icon name='home' size={16} color='#000' color={colorActivateIcon(focused)} />
        }
      }} />
      <Tab.Screen name='Map' component={MapScreen} options={{
        tabBarIcon: ({focused}) => {
          return <Icon name='map' size={16} color='#000'  color={colorActivateIcon(focused)}/>
        }
      }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
});

export default HomeStack;
