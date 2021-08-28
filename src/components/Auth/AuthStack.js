import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import LoginStack from '../Login/LoginStack';
import HomeStack from '../Home/HomeStack';
import AuthService from '../../services/AuthService';

const AuthStack = () => {
  const [hasUser, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateStack = async () => {
    setUser(await AuthService.hasUser());
  }

  AuthService.suscribe('AuthStack', updateStack);

  useEffect(async () => {
    await updateStack();
    setLoading(false);
    return () => {
      AuthService.unsuscribe('AuthStack');
    }
  }, []);

  /*if(loading) {
    return (
      <ActivityIndicator
        animating = {loading}
        color = '#bc2b78'
        size = "large"
        style = {styles.activityIndicator}
      />
    );
  }*/

  return (
    (hasUser) ? <HomeStack /> : <LoginStack />
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

export default AuthStack;
