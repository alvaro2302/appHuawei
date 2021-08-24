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

const observers = new Map();

exports.suscribe = (key, method) => {
  observers.set(key, method);
}

exports.unsuscribe = (key) => {
  observers.delete(key);
}
