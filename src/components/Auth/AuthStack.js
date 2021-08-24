import React, { useEffect, useState } from 'react';
import LoginStack from '../Login/LoginStack';
import HomeStack from '../Home/HomeStack';
import AuthService from '../../services/AuthService';

const AuthStack = () => {
  const [hasUser, setUser] = useState(false);

  const updateStack = async () => {
    setUser(await AuthService.hasUser());
  }

  AuthService.suscribe('AuthStack', updateStack);

  useEffect(async () => {
    await updateStack();
    return () => {
      AuthService.unsuscribe('AuthStack');
    }
  });

  return (
    (hasUser) ? <HomeStack /> : <LoginStack />
  )
}

export default AuthStack;
