import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
const Stack = createStackNavigator();


const LoginStack=()=>{
    return(

        <Stack.Navigator>
            <Stack.Screen
             name = " "
             component = {LoginScreen}
             
            />
        </Stack.Navigator>
    )

}


export default LoginStack;