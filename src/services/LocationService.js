import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('yagl2Yo3F2OjpvdfK6sgDUlRhruxAvpMHa9HdQBO', 'nujuwIVqGKW2IQqGrQcuqatVdNyiInX5hEuFYQoO');
Parse.serverURL = 'https://parseapi.back4app.com/';

exports.getLocations = async () => {
  const query = new Parse.Query('Location');
  const locationResult = await query.find();
  return locationResult;
}
