import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Modal,CheckBox,TextInput } from 'react-native';
import Day from '../Day/Day';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const ScheduleScreen=({navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);
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

    React.useLayoutEffect(() => {
        navigation.setOptions({
        
          headerRight: () => (
                <View>
                    <TouchableOpacity style={styles.buttonAdd} 
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Icon   name='md-add-sharp' size={35} color='#000'  />
                    </TouchableOpacity>
                </View>
          
           
          ),
          
        });
    }, [navigation]);
    var onPress = (value, index) => {
        setRadio_props({
            options:[{label: 'alto', value: 0 ,color:'#FF6347'},{label: 'medio', value: 1,color:'#47A7FF' },{label: 'bajo', value: 1,color:'#AA817A' }],
            value: value,
            index: index
        })
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

    const showMode= (currentMode)=>{
        setShow(true);
        setMode(currentMode);

    }
    const minutosFormateados=(minutos)=>{
        if(minutos === 0)
        {
            return '00';
        }
        if(minutos <10)
        {
            return '0'+ minutos;
        }
        else
        {
            return minutos;
        }

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
    const showModeFinalTime= (currentMode)=>{
        setShowFinalTime(true)
        setModeFinal(currentMode);

    }

    return (
       
        
        <View>
            
           
            <ScrollView>
                <Day data={{day:"lunes",hora:"19:00-20:00", transporte:"110"}} ></Day>
                <Day data={{day:"lunes",hora:"19:00-20:00", transporte:"110"}} ></Day>
                <Day data={{day:"lunes",hora:"19:00-20:00", transporte:"110"}} ></Day>
                <Day data={{day:"lunes",hora:"19:00-20:00", transporte:"110"}} ></Day>
                <Day data={{day:"lunes",hora:"19:00-20:00", transporte:"110"}} ></Day>
                <Day data={{day:"lunes",hora:"19:00-20:00", transporte:"110"}} ></Day>
            </ScrollView>
            
            <Modal transparent={true} visible={modalVisible}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={styles.formAdd}>
                        <View style={styles.dayForm}>
                            <Picker
                                
                                selectedValue={selectedDay}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedDay(itemValue)
                                }>
                                {
                                    daysWeek.days.map((day)=>(
                                        <Picker.Item label= {day.value} value={day.value} key={day.id} />
                                    ))
                                }
                                {/* <Picker.Item label="Lunes" value="java" />
                                <Picker.Item label="martes" value="js" /> */}
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
                                inputStyle={{color: 'red'}} 
                                maxLength={5}
                                onChangeText={setNameTransport}
                            />
                          
                            <Icon style={styles.textTransport} name='car' size={25} color='#000'  color='black'/>
                        </View >
                            
                        <View style={styles.colorOptionForm}>
                            <RadioForm
                                formHorizontal={true}
                                
                                    // radio_props={radio_props}
                                    
                                    // initial={0}
                                    // buttonColor={'#50C900'}
                                    selectedButtonColor={'blue'}
                                    initial={0}
                                    onPress={(value) => {setValueOption({value:value})}}
                            >
                                {
                                   
                                  radio_props.options.map((obj,i)=>(
                                   
                                      <RadioButton labelHorizontal={false} key={i}>
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
                           
                        </View >
                        <View style={styles.confirmForm}>
                            <TouchableOpacity style={styles.buttonConfirm} 
                                                        onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textColorButtonsConfirm}>aceptar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonCancel} 
                            onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textColorButtonsConfirm}>cancelar</Text>
                            </TouchableOpacity>

                        </View>
                       
                    </View>
                    
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        buttonAdd:{
          
            
            width:wp('10.5%'),
            height:hp('4.9%'),
            backgroundColor:'red',
            borderRadius:(wp('12.5%')+ hp('5.2%'))/2,
           
            alignItems: 'center',
            justifyContent:'center'
          
        },
        
        formAdd:{
            backgroundColor:'white',
            margin:wp('9%'),
            marginTop:hp('13.9%'),
            marginBottom:hp('41.6%'),
            borderRadius:15,
            width:wp('81%'),
            height:hp('44.5%'),
            flexDirection:'column'
            
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
        textHour:{
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
        textTransport:{
            marginStart:wp('2.66%'),
            marginTop:hp('1.23%'),
            marginBottom:hp('2.2%'),
            fontWeight: 'bold'
        },
        dayForm:{
            backgroundColor: '#D4D4D4',
            marginStart:'11.7%',
            marginTop:hp('1.7%'),
            height:hp('5.1%'),
            width:wp('38%'),
            borderRadius:15,
            marginBottom:hp('1.8%'),
            flexDirection:'column'
        },
        hourForm:{
            backgroundColor: '#D4D4D4',
            marginStart:'11.7%',
            height:hp('7.2%'),
            width:wp('68.5%'),
            borderRadius:15,
            marginBottom:hp('1.8%'),
            flexDirection:'row'
        },
        transpotForm:{
            backgroundColor: '#D4D4D4',
            marginStart:'11.7%',
            height:hp('7.2%'),
            width:wp('62.6%'),
            borderRadius:15,
            marginBottom:hp('1.8%'),
            flexDirection:'row'
        },
        colorOptionForm:{
            marginStart:'11.7%',
            marginTop:hp('1.84%'),
            marginBottom:hp('1.84%'),
        },
        confirmForm:{
            flexDirection:'row',
            marginStart:wp('8.8%'),
            marginLeft:wp('8.8%')
        },
        buttonConfirm:{ 
            marginStart:'11.7%',
            width:wp('21.3'),
            height:hp('4.8%'), 
            backgroundColor:'#40CA4E',
            borderRadius:15,
            alignItems: 'center',
            justifyContent:'center',
            
           
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
            
        },
        textColorButtonsConfirm:{
            color:'white',
            fontWeight:'normal'
        },
        nameTransport:{
            backgroundColor:'black',
            marginStart:wp('2.6%'),
            marginRight:wp('2.6%'),
            marginTop:hp('1.2%'),
            marginBottom:hp('1.2%'),
            borderRadius:15,
            color:'white',
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
            
        }
        
    }

)

export default ScheduleScreen;