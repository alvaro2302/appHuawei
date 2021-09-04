import AsyncStorage from "@react-native-async-storage/async-storage";

exports.addDay = async(token, data)=>{
  try {
    await AsyncStorage.setItem(token, data);
  }
  catch (err) {
    console.log('error', err);
    throw Error(err);
  }
}

exports.getDay = async(token)=>{
  try {
    return await AsyncStorage.getItem(token);
  }
  catch (err) {
    console.log('not get token', err);
    throw Error(err);
  }
}

exports.deleteDay = async(token)=>{
  try {
    await AsyncStorage.removeItem(token);
  }
  catch (err) {
    console.log('not eliminate token', err);
    throw Error(err);
  }
}
