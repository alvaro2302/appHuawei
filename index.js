/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import HMSLocation from '@hmscore/react-native-hms-location';

const locationkit= (data)=> console.log(data) // set your listener function

// register headless tasks
HMSLocation.ActivityIdentification.Events.registerActivityIdentificationHeadlessTask(locationkit);
HMSLocation.ActivityIdentification.Events.registerActivityConversionHeadlessTask(locationkit);
HMSLocation.FusedLocation.Events.registerFusedLocationHeadlessTask(locationkit);
HMSLocation.Geofence.Events.registerGeofenceHeadlessTask(locationkit);
// then register the application component


AppRegistry.registerComponent(appName, () => App);
