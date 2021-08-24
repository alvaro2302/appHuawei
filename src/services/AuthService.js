import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService {
  static instance = new AuthService();

  hasUser = async(key) => {

    try {
      
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log("user not login",error);
      throw Error(error);
      
    }
  }

  

  signIn = async (key, value) =>{
    try {
      await AsyncStorage.setItem(key,value);
      return true;
    } catch (error) {
      console.log("not save token localStorage",error);
      return false;
    }
    

  }

  signOut = async ()=>{
    try {
      await AsyncStorage.removeItem("token");
      return true;
    } catch (error) {
      console.log("not sign out", error);
      return false;
    }

  }

  getKeys= async()=>{
    try {
      return await AsyncStorage.getAllKeys()
    } catch (error) {
      console.log("not keyss", error);
      throw Error(error)
      
    }
  }

  


}
export default AuthService;

