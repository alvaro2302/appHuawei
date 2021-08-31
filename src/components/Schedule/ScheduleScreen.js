import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Modal,Header } from 'react-native';
import Day from '../Day/Day';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';


const ScheduleScreen=({navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);

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
            {/* <View style={styles.positionAdd}>
                <TouchableOpacity style={styles.buttonAdd} 
                  onPress={() => setModalVisible(!modalVisible)}
                >
                    <Icon   name='md-add-sharp' size={35} color='#000'  />
                </TouchableOpacity>
            </View> */}
            <Modal transparent={true} visible={modalVisible}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={styles.formAdd}>
                        <Text style={styles.dayName}></Text>
                        <View style={styles.hour}>
                            <Text style={styles.textHour}>Hora:</Text>
                            <Text style={styles.textHour}></Text>
                            
                            
                        </View>
                        <View style={styles.transport}>
                            <Text style={styles.textTransport}>Transporte:</Text>
                            <Text style={styles.textTransport}></Text>
                            <Icon style={styles.textTransport} name='car' size={25} color='#000'  color='black'/>
                        </View>
                        <TouchableOpacity style={{ marginStart:'11.7%',width:70,height:40, backgroundColor:'green',borderRadius:15}} 
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text>aceptar</Text>
                        </TouchableOpacity>
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
        positionAdd:{
            marginStart:wp('83.2%'),
            marginBottom:hp('9.6%'),
            marginTop:hp('0%'),
         
            position:'absolute',
           
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
        }
    }

)

export default ScheduleScreen;