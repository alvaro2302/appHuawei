import React from 'react';
import LoginStack from '../Login/LoginStack';
import HomeStack from '../Home/HomeStack';
import AuthService from '../../services/AuthService';

const AuthStack = () => {
  return (
    (AuthService.hasUser()) ? <HomeStack /> : <LoginStack />
  )
}

export default AuthStack;
