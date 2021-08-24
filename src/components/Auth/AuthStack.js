import React from 'react';
import LoginStack from '../Login/LoginStack';
import HomeStack from '../Home/HomeStack';
import AuthService from '../../services/AuthService';

let signIn= async()=>{
  const hasUser = await AuthService.instance.hasUser("token")
  console.log(hasUser);
    if(hasUser=== null)
    {
      return false
    }
    else
    {
      console.log("entra")
      return false;
    }
}
  

const AuthStack = () => {
  return (
    ( signIn())? <HomeStack /> : <LoginStack />
  )
}

export default AuthStack;
