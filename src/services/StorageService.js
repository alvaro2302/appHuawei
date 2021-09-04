import AsyncStorage from "@react-native-async-storage/async-storage";

exports.getkeys = async() =>{
  try {
    return await AsyncStorage.getAllKeys();
  }
  catch (err) {
    console.log('not get all keys', err);
    throw Error(err);
  }
}

exports.multiGet = async(keys)=>{
  try {
    return await AsyncStorage.multiGet(keys)
  }
  catch (err) {
    console.log('not get keys', err);
    throw Error(err);
  }
}
