import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AuthService from '../../services/AuthService';

const SignOut = async () => {
  await AuthService.signOut();
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
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
});

export default HomeScreen;
