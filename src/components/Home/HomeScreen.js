import React,{ useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AuthService from '../../services/AuthService';
import { HMSAccountAuthService, HMSAuthParamConstants } from "@hmscore/react-native-hms-account";

const SignOut = async () => {
  HMSAccountAuthService.signOut()
  .then(async () => { 
    console.log("signOut -> Success")
    await AuthService.signOut();
  })
  .catch((err) => { console.log(err) });
}

const HomeScreen = () => {
  return (
    <View style={styles.container} >
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity
        style={[styles.huaweiButton], [styles.socialLoginButton]}
        onPress={SignOut}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
    marginTop: 35,
    marginBottom: 25
  },
  huaweiButton: {
    backgroundColor: '#DF2A54'
  },
  socialLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    marginBottom: 15
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
});

export default HomeScreen;
