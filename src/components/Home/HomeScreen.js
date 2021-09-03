import React,{ useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AuthService from '../../services/AuthService';
import { HmsLocalNotification,HmsPushResultCode } from'@hmscore/react-native-hms-push';
import{ HmsPushInstanceId }from "@hmscore/react-native-hms-push";
const SignOut =  () => {
  HMSAccountAuthService.signOut()
  .then(async () => { 
    console.log("signOut -> Success")
    await AuthService.signOut();
  })
  .catch((err) => { console.log(err) });
}

const Notification= ()=>{
  

  HmsLocalNotification.localNotificationSchedule({
    [HmsLocalNotification.Attr.title]: 'Notification Title',
    [HmsLocalNotification.Attr.message]: 'Notification Message', // (required)
    [HmsLocalNotification.Attr.ticker]: 'Optional Ticker',
    [HmsLocalNotification.Attr.largeIcon]: 'ic_launcher',
    [HmsLocalNotification.Attr.smallIcon]: 'ic_notification',
    [HmsLocalNotification.Attr.bigText]: 'This is a bigText',
    [HmsLocalNotification.Attr.subText]: 'This is a subText',
    [HmsLocalNotification.Attr.color]: 'white',
    [HmsLocalNotification.Attr.vibrate]: false,
    [HmsLocalNotification.Attr.vibrateDuration]: 1000,
    [HmsLocalNotification.Attr.tag]: 'hms_tag',
    [HmsLocalNotification.Attr.ongoing]: false,
    [HmsLocalNotification.Attr.importance]: HmsLocalNotification.Importance.max,
    [HmsLocalNotification.Attr.dontNotifyInForeground]: false,
    [HmsLocalNotification.Attr.autoCancel]: false,
    [HmsLocalNotification.Attr.actions]: '["Yes", "No"]',
    [HmsLocalNotification.Attr.fireDate]: new Date(Date.now() + 60 * 1000).getTime(), // in 1 min
    })
    .then((result) => {
      console.log("LocalNotification Default", result);
    })
    .catch((err) => {
      alert(
        "[LocalNotification Default] Error/Exception: " + JSON.stringify(err)
      );
    });
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

      <TouchableOpacity
        style={[styles.huaweiNotification], [styles.socialLoginButton]}
        onPress={Notification}
      >
        <Text>Notificacion en 1 minuto</Text>
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
  huaweiNotification:{
    backgroundColor:'red'
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
