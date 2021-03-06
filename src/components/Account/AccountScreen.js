import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
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
  }
});

export default AccountScreen;
