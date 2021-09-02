import AsyncStorage from "@react-native-async-storage/async-storage";

const updateAuth = () => {
  observers.forEach(callback => {
    callback();
  });
}

exports.hasUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token != null;
  }
  catch (err) {
    console.log('user not login', err);
    throw Error(err);
  }
}

exports.signIn = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
    updateAuth();
  }
  catch (err) {
    console.log('error', err);
    throw Error(err);
  }
}

exports.signOut = async () => {
  try {
    await AsyncStorage.removeItem('token');
    updateAuth();
  }
  catch (err) {
    console.log('error', err);
    throw Error(err);
  }
}

exports.getToken = async () =>{
  try {
    return await AsyncStorage.getItem('token');
  }
  catch (err) {
    console.log('not get token', err);
    throw Error(err);
  }
}
exports.getkeys = async() =>{
  try {
    return await AsyncStorage.getAllKeys();
  }
  catch (err) {
    console.log('not get all keys', err);
    throw Error(err);
  }
}
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
exports.multiGet=async(keys)=>{
  try {
     return await AsyncStorage.multiGet(keys)
  }
  catch (err) {
    console.log('not get keys', err);
    throw Error(err);
  }
}

const observers = new Map();

exports.suscribe = (key, method) => {
  observers.set(key, method);
}

exports.unsuscribe = (key) => {
  observers.delete(key);
}
