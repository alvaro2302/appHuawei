import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { color } from 'react-native-reanimated';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>login</Text>
      <TouchableOpacity style={[styles.socialLoginButton, styles.huaweiButton]}>
        <Image
          style={[styles.socialLoginButtonImage, styles.huaweiButtonImage]}
          source={require('../../assets/huawei_login_icon.png')}
          resizeMode='contain'
        />
        <Text style={styles.socialLoginButtonText}>huawei id login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialLoginButton, styles.guestButton]}>
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
    backgroundColor: '#FFF',    
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
  }
});

export default LoginScreen;
