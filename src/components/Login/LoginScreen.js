import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import HMSAccount, {HMSAuthRequestOptionConstants, HMSAccountAuthService, HMSAuthParamConstants, HMSAuthScopeListConstants, HMSAuthButton} from '@hmscore/react-native-hms-account';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';

state ={
  token:{}

}
const signInWithIdToken = () => {
  const signInData = {
    accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM,
    authRequestOption: [HMSAuthRequestOptionConstants.ID_TOKEN, HMSAuthRequestOptionConstants.ACCESS_TOKEN],
    authScopeList: [HMSAuthScopeListConstants.EMAIL]
  };
  HMSAccountAuthService.signIn(signInData)
  .then(async (response) => {
    await saveUser(response);
    await saveTokenLocalStorage(response);
  })
  .catch((err) => { console.log('Sign In With IdToken -> ', err) });
};

const silentSignIn = () => {
  const silentSignInData = {
    accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM
  };
  HMSAccountAuthService.silentSignIn(silentSignInData)
  .then(async (response) => {
    await saveUser(response);
    await saveTokenLocalStorage(response);
  })
  .catch((err) => {
    if(err.code == 2002) {
      signInWithIdToken();
    }
    else {
      console.log('Sign In With IdToken -> ', err)
    }
  });
}

const guestLogin = async () => {
  const guest = {
    avatarUriString: 'Guest',
    displayName: 'Guest',
    openId: 'Guest'
  }
  await saveTokenLocalStorage(guest);
  await saveUser(guest);
}

const saveTokenLocalStorage = async (rawToken) => {
  const valueToken = JSON.stringify(rawToken);
  await AuthService.signIn(valueToken);
}

const saveUser = async (data) => {
  const { avatarUriString, displayName, openId } = data;
  await UserService.saveUser({
    avatarUriString: avatarUriString,
    displayName: displayName,
    openId: openId
  });
}

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>login</Text>
      
      <TouchableOpacity style={[styles.socialLoginButton, styles.huaweiButton]} onPress={silentSignIn}>
        <Image
          style={[styles.socialLoginButtonImage, styles.huaweiButtonImage]}
          source={require('../../assets/huawei_login_icon.png')}
          resizeMode='contain'
        />
        <Text style={styles.socialLoginButtonText}>huawei id login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialLoginButton, styles.guestButton]} onPress={guestLogin}>
        <Image
          style={[styles.socialLoginButtonImage, styles.guestButtonImage]}
          source={require('../../assets/guest_login_icon.png')}
          resizeMode='contain'
        />
        <Text style={styles.socialLoginButtonText}>user guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  loginTitle: {
    marginTop: 75,
    fontSize: 24,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 0,
    fontFamily: 'Roboto, sans-serif'
  },
  socialLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    marginBottom: 15
  },
  huaweiButton: {
    backgroundColor: '#DF2A54'
  },
  huaweiButtonImage: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DF2A54'
  },
  guestButton: {
    backgroundColor: '#2B181C'
  },
  guestButtonImage: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#2B181C'
  },
  socialLoginButtonImage: {
    flex: 0.2,
    height: 44
  },
  socialLoginButtonText: {
    flex: 0.8,
    color: '#FFF',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 13,
    textTransform: 'uppercase',
    paddingLeft: 35
  },
  viewcontainer: {
    marginTop: 20,
    height: 38
  },
});

export default LoginScreen;
