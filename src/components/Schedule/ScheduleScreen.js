import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Modal,CheckBox,TextInput, FlatList, SafeAreaView } from 'react-native';
import Day from '../Day/Day';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import UserService from '../../services/UserService';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateService from '../../services/DateService';
import StorageService from '../../services/StorageService';
import { HmsLocalNotification, HmsPushEvent } from'@hmscore/react-native-hms-push';
import uuid from 'react-native-uuid';

HmsPushEvent.onLocalNotificationAction((result) => {
  console.log("[onLocalNotificationAction]: " + result);
  const notification = JSON.parse(result.dataJSON);
  const { action, tag } = notification;
  HmsLocalNotification.cancelNotificationsWithTag(tag).then((result) => {
    if (notification.action === "Marcar ubicación") {

    }
    if (notification.action === "Postergar una semana") {

    }
    console.log("Clicked: " + notification.action);
  });
});

const ScheduleScreen = ({navigation}) => {
  const [user, setUser] = useState({
    openId: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrorVisible,setModalErrorVisible] = useState (false);
  const [radio_props, setRadio_props] = useState({options:[{label: 'alto', value: 0 ,color:'#FF6347'},{label: 'medio', value: 1,color:'#47A7FF' },{label: 'bajo', value: 1,color:'#AA817A' }],value:0,index:0});
  const [valueOption,setValueOption]= useState({value:0});
  const [selectedDay, setSelectedDay] = useState();
  const [daysWeek, setDaysWeek]= useState({days:[{id:"1",value:"Lunes"},{id:"2",value:"Martes"},{id:"3",value:"Miercoles"},{id:"4",value:"Jueves"},{id:"5",value:"Viernes"},{id:"6",value:"Sabado"},{id:"7",value:"Domingo"} ]});
  const [nameTransport, setNameTransport] = useState("");
  const [hourInitial, setHourInitial] = useState("inicial");
  const [hourFinal, setHourFinal] = useState("Final"); 
  const [date, setDate] = useState(new Date());
  const [dateFinal, setDateFinal] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [modeFinal, setModeFinal] = useState('date');
  const [show, setShow] = useState(false);
  const [showFinalTime, setShowFinalTime] = useState(false);
  const [messageError,setMessageError] = useState('');
  const [Days, setDays]= useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity style={styles.buttonAdd} 
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Icon name='md-add-sharp' size={35} color='#000' />
          </TouchableOpacity>
        </View>
      )    
    });
  }, [navigation]);

  const onPress = (value, index) => {
    setRadio_props({
      options:[{label: 'alto', value: 0 ,color:'#FF6347'},{label: 'medio', value: 1,color:'#47A7FF' },{label: 'bajo', value: 1,color:'#AA817A' }],
      value: value,
      index: index
    });
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let minutos = minutosFormateados(tempDate.getMinutes());
    let timeInitial = tempDate.getHours()+':'+ minutos;
    setHourInitial(timeInitial);
  };

  const showMode= (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  
  const minutosFormateados = (minutos) => {
    if(minutos == 0) {
      return '00';
    }
    if(minutos < 10) {
      return '0'+ minutos;
    }
    return minutos;
  }

  const onChangeHourFinal = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowFinalTime(Platform.OS === 'ios');
    setDateFinal(currentDate);
    let tempDate = new Date(currentDate);
    let minutos = minutosFormateados(tempDate.getMinutes());
    let timeFinal = tempDate.getHours()+':'+minutos;
    setHourFinal(timeFinal);
  };

  const showModeFinalTime= (currentMode) => {
    setShowFinalTime(true)
    setModeFinal(currentMode);
  };

  const validateTimeInitialAndFinal = (initial , final) => {
    let timeInitial = initial.split(":");
    let hourInitial = parseInt(timeInitial[0]);
    let minuteInitial = parseInt(timeInitial[1]);
    let timeFinal = final.split(":");
    let hourFinal = parseInt(timeFinal[0]);
    let minuteFinal = parseInt(timeFinal[1]);
    let isValidateTime = false;
    if((hourInitial > 0 && hourInitial <= 12  && hourFinal > 0 && hourFinal <= 12) || ((hourInitial > 12 || hourInitial === 0) && hourInitial <= 23  && (hourFinal > 12 || hourFinal === 0 ) && hourFinal <= 23) ) {
      if(hourFinal > hourInitial) {
        isValidateTime = true
      }
      else{
        if((hourFinal === hourInitial) && ( minuteFinal > minuteInitial)) {
          isValidateTime = true
        }
      }
    }
    return isValidateTime;
  }

  const validateForm = (day, hourInitial, hourFinal, nameTransport, color) => {
    let messageError = ''
    if(day && validateTimeInitialAndFinal(hourInitial, hourFinal) && nameTransport && color) { 
      return true
    }
    else {
      if(!day) {
        messageError += '- Falta el dia seleccionado' + '\n';
      }      
      if(!validateTimeInitialAndFinal(hourInitial, hourFinal)) {
        messageError += '- El formato de la hora debe ser el mismo o la hora final debe ser menor'+'\n';
      }
      if(!nameTransport) {
        messageError += '- El nombre debe añadirse '+'\n';
      }
      if(!color) {
        messageError += '- El color debe elegirse' +'\n';
      }
      setMessageError(messageError);
      return false;
    }
  }

  const updateDaysData = async (updateDaysData) => {
    try {
      /*const listKeys = await StorageService.getkeys();
      const listkeysDays = listKeys.filter((key) => key != 'token' && key != 'Parse/yagl2Yo3F2OjpvdfK6sgDUlRhruxAvpMHa9HdQBO/installationId' && key != 'user');

      const days = await StorageService.multiGet(listkeysDays);
      const daysObjects = days.map((day)=> JSON.parse(day[1]));
      setDays(daysObjects);*/

      const schedules = await DateService.getDays(updateDaysData.openId);
      const days = await StorageService.multiGet(schedules);
      const daysObjects = days.map((day)=> JSON.parse(day[1]));
      setDays(daysObjects);
    }
    catch (error) {
      console.log(error)
    }
  }

  const programateNotification = (day, hour)=>{
    const fireDate = DateService.findFireDate(day, hour);
    HmsLocalNotification.localNotificationSchedule({
      [HmsLocalNotification.Attr.title]: 'Alerta de Transporte.',
      [HmsLocalNotification.Attr.message]: 'Los conductores de transporte esperan saber donde estas.', // (required)
      [HmsLocalNotification.Attr.ticker]: 'Hola ya es hora de pedir transporte.',
      [HmsLocalNotification.Attr.largeIcon]: 'ic_launcher',
      [HmsLocalNotification.Attr.smallIcon]: 'ic_notification',
      [HmsLocalNotification.Attr.bigText]: 'Ya es hora de estar en el mapa.',
      [HmsLocalNotification.Attr.subText]: 'Con solo un toque.',
      [HmsLocalNotification.Attr.color]: 'white',
      [HmsLocalNotification.Attr.vibrate]: true,
      [HmsLocalNotification.Attr.vibrateDuration]: 1000,
      [HmsLocalNotification.Attr.tag]: uuid.v4(),
      [HmsLocalNotification.Attr.ongoing]: false,
      [HmsLocalNotification.Attr.importance]: HmsLocalNotification.Importance.max,
      [HmsLocalNotification.Attr.dontNotifyInForeground]: false,
      [HmsLocalNotification.Attr.autoCancel]: false,
      [HmsLocalNotification.Attr.invokeApp]: false,
      [HmsLocalNotification.Attr.actions]: '["Marcar ubicación", "Postergar una semana"]',
      [HmsLocalNotification.Attr.fireDate]: fireDate.getTime(),
    })
    .then((result) => {
      console.log("LocalNotification Default", result);
    })
    .catch((err) => {
      alert("[LocalNotification Default] Error/Exception: " + JSON.stringify(err));
    });
  }

  const addToSchedule= async() => {
    const dayForm = selectedDay;    
    const hourInitialForm = hourInitial;
    const houhourFinalForm = hourFinal;
    const nameTransportForm = nameTransport;
    const index = radio_props.index;
    const optionColorForm = radio_props.options[index];  
    if(validateForm(dayForm,hourInitialForm,houhourFinalForm,nameTransportForm,optionColorForm.color)) {
      programateNotification(dayForm,hourInitialForm);
      const token = new Date().toLocaleString();
      const dayFormCompleto = {
        id: token,
        day: dayForm,
        hora: hourInitialForm + '-' + houhourFinalForm,
        transporte:nameTransportForm,
        color:optionColorForm.color
      }
      const valueToken = JSON.stringify(dayFormCompleto);
      await DateService.addDay(user.openId, valueToken);
      await updateDaysData(user);
      setModalVisible(!modalVisible)
    }
    else {
      setModalErrorVisible(!modalErrorVisible);
    }      
  }

  const renderItem = ({ item }) => (
    <Day data={item}></Day>
  );

  useEffect(async () => {
    const userData = await UserService.getUser();
    await setUser(userData);
    await updateDaysData(userData);

    const unsubscribe = navigation.addListener('focus', () => {
      updateDaysData(userData);
      
    });
    return unsubscribe;
  }, [navigation]);

  return (      
    <View>     
      <View>
        {Days.length === 0 ? (
          <Text>Todavia no hay dias</Text>
        ) : (
          <FlatList
            data={Days}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>

      <Modal transparent={true} visible={modalVisible}>
        <View style={{backgroundColor:'#000000aa',flex:1, justifyContent:'center'}}>
          <View style={styles.formAdd}>
            <View style={styles.dayForm}>
              <Picker
                selectedValue={selectedDay}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedDay(itemValue)
                }
              >
                {
                  daysWeek.days.map((day) => (
                    <Picker.Item label= {day.value} value={day.value} key={day.id} />
                  ))
                }
              </Picker>               
            </View>

            <View style={styles.hourForm}>
              <Text style={styles.textHour}>Hora:</Text>
              <TouchableOpacity style={styles.formHours}
                onPress={()=> showMode('time')}
              >
                <Text style={styles.textHolderHour}>{hourInitial}</Text>
              </TouchableOpacity>
              <Text style={{alignSelf:'center'}}>-</Text>
              <TouchableOpacity style={styles.formHours}
                onPress={()=> showModeFinalTime('time')}
              >
                <Text style={styles.textHolderHour}>{hourFinal}</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}

              {showFinalTime && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateFinal}
                  mode={modeFinal}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeHourFinal}
                />
              )}                
            </View>

            <View style={styles.transpotForm}>
              <Text style={styles.textTransport}>Transporte:</Text>

              <TextInput style={styles.nameTransport}
                placeholder="nombre"
                placeholderTextColor="#D4D4D4"
                maxLength={5}
                value={nameTransport}
                textAlign={'center'}
                onChangeText={setNameTransport}
              />

              <Icon style={styles.textTransport} name='car' size={25} color='#000' color='black'/>
            </View>

            <View style={styles.colorOptionForm}>
              <RadioForm
                formHorizontal={true}
                selectedButtonColor={'blue'}
                initial={0}
                onPress={(value) => {setValueOption({value:value})}}
              >
                {
                  radio_props.options.map((obj,i) => (
                    <RadioButton labelHorizontal = {false} key = {i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={radio_props.index === i}
                        onPress={(obj,i)=> {onPress(obj.value,i)}}
                        borderWidth={0.5}
                        buttonInnerColor={'black'}
                        buttonOuterColor={radio_props.value === i ? 'red' : 'black'}
                        buttonSize={10}
                        buttonOuterSize={35}
                        buttonStyle={{
                          backgroundColor:obj.color
                        }}
                        buttonWrapStyle={{marginLeft: 1}}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(obj,i)=> {onPress(obj.value,i)}}
                        labelStyle={{fontSize: 10, color: 'black'}}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))   
                }
              </RadioForm>
            </View>
            
            <View style={styles.confirmForm}>
              <TouchableOpacity style={styles.buttonConfirm} 
                onPress={() => addToSchedule()}
              >
                <Text style={styles.textColorButtonsConfirm}>aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} 
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textColorButtonsConfirm}>cancelar</Text>
              </TouchableOpacity>
            </View>

          </View>          
        </View>
      </Modal>

      <Modal transparent={true} visible={modalErrorVisible}>
        <View style={{backgroundColor:'#000000aa',flex:1, justifyContent:'center'}}>
          <View style={styles.formError}>
            <Text style={styles.textErrorModal}>{messageError}</Text>
            <TouchableOpacity style={styles.buttonAceptModalError}
              onPress={() => setModalErrorVisible(!modalErrorVisible)}
            >
              <Text style={styles.textColorButtonsConfirm}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonAdd: {
    width:wp('10.5%'),
    height:hp('4.9%'),
    backgroundColor:'red',
    borderRadius:(wp('12.5%')+ hp('5.2%'))/2,
    alignItems: 'center',
    justifyContent:'center'
  },
  formAdd: {
    backgroundColor:'white',
    margin:wp('10%'),
    borderRadius: 15,
    //width:wp('81%'),
    //height:hp('44.5%'),
    flexDirection: 'column'
  },
  dayForm: {
    backgroundColor: '#D4D4D4',
    marginStart:'11.7%',
    marginTop:hp('1.7%'),
    //height: hp('5.1%'),
    width: wp('40%'),
    borderRadius: 15,
    marginBottom: hp('1.8%'),
    //paddingTop: 0,
    //paddingBottom: 0
  },
  hourForm:{
    backgroundColor: '#D4D4D4',
    marginStart:'11.7%',
    //height:hp('7.2%'),
    width: wp('68.5%'),
    borderRadius:15,
    marginBottom:hp('1.8%'),
    flexDirection:'row',
    alignItems: 'center'
  },
  transpotForm:{
    backgroundColor: '#D4D4D4',
    marginStart:'11.7%',
    height: hp('7.2%'),
    width: wp('62.6%'),
    borderRadius:15,
    marginBottom:hp('1.8%'),
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameTransport:{
    backgroundColor:'black',
    marginStart:wp('2.6%'),
    marginRight:wp('2.6%'),
    marginTop:hp('1.2%'),
    marginBottom:hp('1.2%'),
    borderRadius:15,
    color:'white',
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0
  },
  colorOptionForm:{
    marginStart: '11.7%',
    marginTop:hp('1.84%'),
    marginBottom:hp('1.84%')
  },
  confirmForm:{
    flexDirection:'row',
    marginStart:wp('8.8%'),
    marginLeft:wp('8.8%'),
    marginTop:hp('1.0%'),
    marginBottom:hp('2.0%')
  },
  buttonConfirm:{ 
    marginStart:'11.7%',
    width:wp('21.3'),
    height:hp('4.8%'), 
    backgroundColor:'#40CA4E',
    borderRadius:15,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom:hp('1.2%') 
  },
  formError:{
    backgroundColor:'white',
    margin:wp('9%'),
    alignSelf:'center',
    borderRadius:15,
    width:wp('70%'),
    height:hp('24.5%'),
    flexDirection:'column',
    justifyContent:'center',
  },
  dayName:{
    marginStart:wp('8.8%'),
    marginTop:hp('1.2%'),
    marginBottom:hp('1.2%'),
    color:'white',
    fontWeight: 'bold'
  },
  hour:{
    backgroundColor: '#D4D4D4',
    marginStart:'11.7%',
    height:hp('5.1%'),
    width:wp('44.8%'),
    borderRadius:15,
    marginBottom:hp('1.2%'),
    flexDirection:'row'
  },
  textHour: {
    marginStart:wp('2.66%'),
    marginTop:hp('1.23%'),
    marginBottom:hp('1.23%'),
    fontWeight: 'bold'
  },
  transport:{
    backgroundColor: '#D4D4D4',
    marginStart:'11.7%',
    width:wp('49%'),
    height:hp('6.15%'),
    borderRadius:15,
    flexDirection:'row'
  },
  textTransport: {
    marginStart:wp('2.66%'),
    //marginTop:hp('1.23%'),
    //marginBottom:hp('2.2%'),
    fontWeight: 'bold'
  },
  buttonCancel:{
    marginStart:wp('5.3%'),
    marginLeft:wp('9.3%'),
    width:wp('21.3'),
    height:hp('4.8%'), 
    backgroundColor:'#E72020',
    borderRadius:15,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom:hp('1.2%')
  },
  textColorButtonsConfirm:{
    color:'white',
    fontWeight:'normal'
  },
  formHours:{
    marginStart:wp('2.6%'),
    marginRight:wp('2.6%'),
    marginTop:hp('1.2%'),
    marginBottom:hp('1.2%'),
    width:wp('21.3%'),
    height:hp('4.8%'),
    backgroundColor:'black',
    borderRadius:15,
    alignItems: 'center',
    justifyContent:'center',
  },
  textHolderHour:{
    color:'#D4D4D4',
  },
  textErrorModal:{
    marginStart:wp('2.14'),
    marginRight:wp('2.14')
  },
  buttonAceptModalError:{
    width:wp('21.3'),
    height:hp('4.8%'), 
    backgroundColor:'#E72020',
    borderRadius:15,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent:'center',
  }
});

export default ScheduleScreen;
