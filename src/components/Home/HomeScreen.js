import React,{ useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch ,Image,ActivityIndicator} from 'react-native';
import AuthService from '../../services/AuthService';
import { HmsLocalNotification,HmsPushResultCode } from'@hmscore/react-native-hms-push';
import{ HmsPushInstanceId }from "@hmscore/react-native-hms-push";
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HMSLocation from '@hmscore/react-native-hms-location';
import LocationService from '../../services/LocationService';


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
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const addLocation = async(location)=>{
    console.log("locationn")
    // console.log(location.longitude);
    // console.log(location.latitude);
    await LocationService.addLocation(location);

  }


  const toggleSwitch = async() => {

    const locationRequest = {
      priority: HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
      interval: 3,
      numUpdates: 10,
      fastestInterval: 1000.0,
      expirationTime: 200000.0,
      expirationTimeDuration: 200000.0,
      smallestDisplacement: 0.0,
      maxWaitTime: 2000000.0,
      needAddress: true,
      language: 'en',
      countryCode: 'en',
    };
    

    const locationSettingsRequest = {
      locationRequests: [locationRequest],
      alwaysShow: false,
      needBle: false,
    }

    if(!isEnabled){
      setLoading(true);
      HMSLocation.FusedLocation.Native.checkLocationSettings(locationSettingsRequest)
        .then(res => {
          
          console.log("Location setting result:", JSON.stringify(res, null, 2))
          HMSLocation.FusedLocation.Native.getLastLocation()
          .then(async function(pos)  {
            let location = pos;
            await addLocation(location);
            console.log("Last location:", JSON.stringify(pos, null, 2));
            setIsEnabled(previousState =>!previousState);
            setLoading(false)
          })      
          .catch(err => {
            console.log('Failed to get last location', err)
          });
        })
        .catch(ex => {
          console.log("Error while getting location settings. " + ex)
        })
    }
    else
    {
      setIsEnabled(previousState =>!previousState);
    }
       
           
      
            
  
    
  
  }
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
      <View style={styles.switchNotification}>
        <View style={styles.circleSwitchnotification}>
          
          <Image
            style={[styles.iconoSwitch,{tintColor: isEnabled? '#21D348':'#EF4646'}]}
            source={require('../../assets/iconoPedir.png')}
          />
        
          <Switch
            trackColor={{ false: "#767577", true: "#619288" }}
            thumbColor={isEnabled ? "#619288" : "#619288"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <ActivityIndicator
            animating = {loading}
            color = '#bc2b78'
            size = "small"
            style = {styles.activityIndicator}
          />
        </View>
      </View>
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
  },
  switchNotification:{
    marginTop:hp('50%'),
    marginBottom:hp('6.2%'),
    alignItems:'center'
  },
  circleSwitchnotification:{
   
    width:wp('41.8%'),
    height:hp('19.7%'),
    backgroundColor:'#ECECEC',
    borderRadius:(wp('41.5%')+ hp('17.7%'))/2,
    alignItems: 'center',
    justifyContent:'center',
    
  },
  iconoSwitch:{
    marginTop:hp('1%'),
    width:wp('20.5%'),
    height:hp('9.8%'),
  
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:0,
    height: 80
 }
});

export default HomeScreen;
