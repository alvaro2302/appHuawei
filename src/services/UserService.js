import AsyncStorage from "@react-native-async-storage/async-storage";

exports.saveUser = async(data) => {
  try {
    const user = JSON.stringify(data);
    await AsyncStorage.setItem('user', user);
  }
  catch (err) {
    console.log('error', err);
    throw Error(err);
  }
}

exports.getUser = async() => {
  try {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  }
  catch(err) {
    console.log('error', err);
    throw Error(err);
  }
}

exports.deleteUser = async() => {
  try {
    await AsyncStorage.removeItem('user');
  }
  catch (err) {
    console.log('error', err);
    throw Error(err);
  }
}
