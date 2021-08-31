import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Modal,CheckBox } from 'react-native';
import Day from '../Day/Day';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import Icon from 'react-native-vector-icons/Ionicons';


const ScheduleScreen=({navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [radio_props, setRadio_props] = useState({options:[{label: 'alto', value: 0 ,color:'#FF6347'},{label: 'medio', value: 1,color:'#47A7FF' },{label: 'bajo', value: 1,color:'#AA817A' }],value:0,index:0});
    const [valueOption,setValueOption]= useState({value:0});
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
                        
                        </View>

                        <View style={styles.hourForm}>
                            <Text style={styles.textHour}>Hora:</Text>
                            <Text style={styles.textHour}></Text>
                            
                            
                        </View>

                        <View style={styles.transpotForm}>
                            <Text style={styles.textTransport}>Transporte:</Text>
                            <Text style={styles.textTransport}></Text>
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
            width:wp('22.%'),
            borderRadius:15,
            marginBottom:hp('1.8%'),
            flexDirection:'row'
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
        }
        
    }

)

export default ScheduleScreen;