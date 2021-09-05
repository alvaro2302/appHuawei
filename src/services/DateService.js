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

const getNextDayOfWeek = (date, dayOfWeek, hourInitialForm) => {
  const [ hours, minutes ] = hourInitialForm.split(':', 2);
  const resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
  const scheduleDate = new Date(resultDate.getTime());
  scheduleDate.setHours(hours, minutes, 0, 0);
  if(Date.parse(scheduleDate) < Date.parse(date)) {
    scheduleDate.setDate(scheduleDate.getDate() + 7);
  }
  return scheduleDate;
}

const getWeekCode = (dayForm) => {
  switch(dayForm) {
    case 'Domingo': return 0;
    case 'Lunes': return 1;
    case 'Martes': return 2;
    case 'Miercoles': return 3;
    case 'Jueves': return 4;
    case 'Viernes': return 5;
    case 'Sabado': return 6;
  }
}

exports.findFireDate = (dayForm, hourInitialForm) => {
  return getNextDayOfWeek(new Date(), getWeekCode(dayForm), hourInitialForm);
}
