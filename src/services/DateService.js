import AsyncStorage from "@react-native-async-storage/async-storage";

exports.addDay = async(token, data) => {
  try {
    const schedule = JSON.parse(data);
    const newSchedule = await AsyncStorage.setItem(schedule.id, data);
    let schedulesString = await AsyncStorage.getItem(token);
    if(schedulesString == null) {
      schedulesString = '[]';
    }
    const schedules = JSON.parse(schedulesString);
    schedules.push(schedule.id);
    schedulesString = JSON.stringify(schedules);
    await AsyncStorage.setItem(token, schedulesString);
  }
  catch (err) {
    console.log('error', err);
    throw Error(err);
  }
}

exports.getDays = async(token)=>{
  try {
    let schedulesString = await AsyncStorage.getItem(token);
    if(schedulesString == null) {
      schedulesString = '[]';
      return JSON.parse(schedulesString);
    }
    const schedules = JSON.parse(schedulesString);
    return schedules;
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
