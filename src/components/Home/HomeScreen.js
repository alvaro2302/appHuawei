import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch, Image, ActivityIndicator } from 'react-native';
import AuthService from '../../services/AuthService';
import { HmsLocalNotification } from'@hmscore/react-native-hms-push';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HMSLocation from '@hmscore/react-native-hms-location';
import LocationService from '../../services/LocationService';
import { HMSAccountAuthService } from '@hmscore/react-native-hms-account';
import UserService from '../../services/UserService';

const SignOut =  () => {
  HMSAccountAuthService.signOut()
  .then(async () => {
    console.log("signOut -> Success")
    await UserService.deleteUser();
    await AuthService.signOut();
  })
  .catch(async (err) => {
    if(err.code == 3001) {
      await UserService.deleteUser();
      await AuthService.signOut();
    }
  });
}

const Notification= () => {
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
    alert("[LocalNotification Default] Error/Exception: " + JSON.stringify(err));
  });
}

const addLocation = async (location)=>{
  console.log("locationn")
  await LocationService.addLocation(location);
}

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    avatarUriString: '',
    displayName: ''
  });

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
    if(!isEnabled) {
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
      });
    }
    else {
      setIsEnabled(previousState =>!previousState);
    }
  }

  useEffect(async () => {
    const userData = await UserService.getUser();
    await setUser(userData);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{user.displayName}</Text>
      </View>
      <View>
        {
          (user.avatarUriString == '') ?
            <ActivityIndicator style={styles.profileImage} size="large" color="blue" />
          :
            <Image style={styles.profileImage} source={{ uri: user.avatarUriString }} resizeMode='contain' />
        }
      </View>
      
      <View style={styles.signOutButtonContainer}>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={SignOut}
        >
          <Text style={styles.signOutButtonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.switchNotification}>
        <View style={styles.circleSwitchnotification}>
          {
            (loading) ?
              <ActivityIndicator style={styles.iconoSwitch} size="large" color="#bc2b78" />
            :
            <Image
              style={[styles.iconoSwitch,{tintColor: isEnabled? '#21D348':'#EF4646'}]}
              source={require('../../assets/iconoPedir.png')}
            />
          }
          <Switch
            trackColor={{ false: "#767577", true: "#619288" }}
            thumbColor={isEnabled ? "#619288" : "#619288"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
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
    fontSize: 17,
    lineHeight: 40,
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    width: wp('95%'),
    alignSelf: 'center',
    padding: 10
  },
  titleText: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  profileImage: {
    width: 144,
    height: 144,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 30
  },
  huaweiNotification:{
    backgroundColor:'red'
  },
  signOutButtonContainer: {
    marginTop: 45
  },
  signOutButton: {
    alignSelf: 'center',
    padding: 12,
    justifyContent: 'center',
    backgroundColor: '#FF6347',
    borderRadius: 12
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 17
  },
  switchNotification:{
    marginTop: 50,
    alignItems:'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center'
  },
  circleSwitchnotification: {
    backgroundColor:'#ECECEC',
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 75
  },
  iconoSwitch:{
    width: 75,
    height: 75,
    marginBottom: 5
  }
});

export default HomeScreen;
