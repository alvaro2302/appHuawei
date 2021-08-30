import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
const Day=({data})=>{
    return (
        <View style={styles.days}>
            
            <View style={styles.tarjet}>
                <Text style={styles.dayName}>{data.day}</Text>
                <View style={styles.hour}>
                    <Text style={styles.textHour}>Hora:</Text>
                    <Text style={styles.textHour}>{data.hora}</Text>
                    
                    
                </View>
                <View style={styles.transport}>
                    <Text style={styles.textTransport}>Transporte:</Text>
                    <Text style={styles.textTransport}>{data.transporte}</Text>
                    <Icon style={styles.textTransport} name='car-sharp' size={25} color='#000'  color='black'/>
                </View>
            </View>

            
        </View>
    );
}
const styles = StyleSheet.create(
    {
        days:{
            marginStart:wp('13.0%'),
            marginLeft:wp('11.7%'),
            marginTop:hp('1.23%'),
            marginBottom:hp('1.23%'),
        },
        tarjet:{
            backgroundColor: 'rgba(255, 99, 71, 0.56)',
            flexDirection: 'row',
            width:wp('75.2%'),
            height:hp('19.2%'),
            borderRadius:15,
            flexDirection:'column',
            
           
        },
        dayName:{
            marginStart:wp('8.8%'),
            marginTop:hp('1.2%'),
            marginBottom:hp('1.2%'),
            color:'white',
            fontWeight: 'bold'
        },
        hour:{
            backgroundColor: 'white',
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
            backgroundColor: 'white',
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

    }

)


export default Day;