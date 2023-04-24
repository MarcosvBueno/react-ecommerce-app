import React, { useRef, useEffect,useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput, KeyboardAvoidingView, BackHandler,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome} from '@expo/vector-icons';
import {Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


const isAndroid = Platform.OS === 'android';

export function RegisterForm(){
  
  const [secureTextfirst, setSecureTextFirst] = useState(true);
  const [secureTextSecond, setSecureTextSecond] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  
  var validator = require('validator');


  useEffect(() => {
    AsyncStorage.getItem("userKey")
      .then(data => data ? JSON.parse(data) : [])
      .then(data => {
        console.log('data', data);
        setUsers(data);
      })
      
  }, [])

  handleErrorPassword = () => {
    if(password.length < 6){ 
      const ErrorMessage = ("Password must be at least 6 characters");
      return  ErrorMessage;
    }
  }

  handlePasswordConfirm = () => {
    if(password !== confirmPassword || confirmPassword.length < 6){
      const ErrorMessage =("passwords need to be the same");
      return ErrorMessage;
    }
  }


  async function handleRegister() {
    const emailExists = users.find(user => user.email === email);
    if(emailExists){
      alert("Email already exists");
      return;
    }
    
    if (
    !username || !email ||  password.length < 6 ||  password !== confirmPassword || confirmPassword.length < 6 ||
    !validator.isEmail(email)
  ) {
    console.log("erro");
    // alert("Please fill all fields correctly")
    return;
  }
   
      AsyncStorage.setItem("userKey", JSON.stringify([
        ...users,
        {
          id: uuid.v4(),
          username,
          email,
          password,
        }
      ]))
      .then(() => console.log(`User ${username} saved`))
      .then(() => navigation.navigate("LoginForm", {savedEmail: email, nameUser: username})) ; 
  }

  function handleIconFirst() {
    setSecureTextFirst(prev => !prev);
  }  
  function handleIconSecond() {
    setSecureTextSecond(prev => !prev);
  }

  return (
    <KeyboardAvoidingView style={styles.containerAll}
    behavior={Platform.OS === 'ios' ? 'position' : "position"}
    keyboardVerticalOffset={Platform.select({ios: -210 , android: -170})}>

    {Platform.OS === 'ios' &&
    <TouchableOpacity onPress={() => navigation.navigate("LoginForm")} style={styles.buttonBefore}>
    <MaterialIcons name="navigate-before" size={30} color="black" />
    </TouchableOpacity>
    }

      <View style={styles.logoContent}>
      
      <Image source={require("../../Images/44048.png")}
        style={styles.imageLogo}/>
        <Text style={styles.textTitle}>Ecommerce</Text>
        
      </View>
      <View style={styles.containerSubTitle}>
      <Text style={styles.subTitle}>Buy without limits</Text>
      </View>
      <View style={styles.containerUsername}>
        <Text style={{fontWeight: "bold"}}>Username</Text>
        <TextInput style={styles.input}
        placeholder="MarcosvBueno..."
        value={username}
        onChangeText={(user) => setUsername(user)}/>
      </View>
      <View style={styles.containerEmail}>
        <Text style={{fontWeight: "bold"}}>Your email Adress</Text>
        <TextInput style={styles.input}
        placeholder="testeteste@gmail.com..."
        value={email}
        onChangeText={(text) => setEmail(text)}/>
      </View>

      <View style={styles.inputTitle}>
      <Text style={{fontWeight: "bold"}}>Your Password</Text>
      </View>

      <View style={styles.containerPassword}>
        <TextInput style={styles.input}
        placeholder="min. 6 characteres"
        secureTextEntry={secureTextfirst}
        value={password}
        onChangeText={(passW) => setPassword(passW)}/>
        <TouchableOpacity style={styles.inputWithIcon} onPress={handleIconFirst}>
        <FontAwesome name={secureTextfirst ? 'eye' : 'eye-slash'} 
        size={24} 
        color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.errorContent}>
        <Text style={styles.errorText}>{handleErrorPassword() }</Text>
        <MaterialIcons name={handleErrorPassword() ? "error-outline" : "done-all"}
        size={24} 
        color={handleErrorPassword() ? "red" : "#101A30"} />
      </View>

      <View style={styles.inputTitle}>
      <Text style={{fontWeight: "bold"}}>Confirm Your Password *</Text>
      </View>


      <View style={styles.containerPassword}>
        <TextInput style={styles.input}
        placeholder="min. 6 characteres"
        secureTextEntry={secureTextSecond}
        value={confirmPassword}
        onChangeText={(passWC) => setConfirmPassword(passWC)}/>
        <TouchableOpacity style={styles.inputWithIcon} onPress={handleIconSecond}>
        <FontAwesome name={secureTextSecond ? 'eye' : 'eye-slash'} size={24} color="black" />
        </TouchableOpacity>      
      </View>
      <View style={styles.errorContent}>
        <Text style={styles.errorText}>{handlePasswordConfirm() }</Text>
        <MaterialIcons name={handlePasswordConfirm() ? "error-outline" : "done-all"}
        size={24} 
        color={handlePasswordConfirm() ? "red" : "#101A30"} 
        style={{}}/>
      </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.textButton}>Register</Text>
          <MaterialIcons name="navigate-next" size={24} color="black" style={{marginLeft: 5}} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

  containerAll: {
    backgroundColor: '#fff',
    flex: 1
  },
  buttonBefore:{
    marginTop:  "10%",
    marginLeft: "5%",
    top: 10 
  },
  imageLogo:{
    width: 50,
    height: 50,
    marginRight: 15
  },
  textTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  containerSubTitle:{
    justifyContent:"center",
    alignItems: 'center',
    marginLeft: 5,
    marginBottom: 10
  },
  subTitle:{
    fontSize:14,
    fontWeight: 'bold',

  },
  logoContent:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === 'ios' ? 0 : "5%",
   
  },
  containerUsername:{
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: Platform.OS === 'ios' ? "8%" : "7%",
    marginBottom: Platform.OS === 'ios' ? "5%" : "1%",
  },
  containerEmail:{
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "4%",
    marginBottom: Platform.OS === 'ios' ? "5%" : "1%",
  },
  input:{
    alignItems:"center",
    height: 45,
    borderRadius: 30,
    borderWidth: 2,
    padding: 10,
    borderColor: "#F3F3F3",
    marginTop: 10,
    width: "100%",
  },

  containerPassword:{
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: "5%",
    marginBottom: Platform.OS === 'ios' ? "1%" : "1%",
    flexDirection: "row",
  },

  inputWithIcon:{
    justifyContent: "center",
    alignItems: "center",
    right: 40,
    marginTop: 10,
    textAlign: "center",   
  },

  inputTitle:{
    justifyContent: "center",
    width: "80%",
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: "4%",
  },

  containerConfirm:{
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: Platform.OS === 'ios' ? "5%" : "2%",
  },

  button: { 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    width: "80%",
    backgroundColor: '#A7FC84',
    alignSelf: "center",
    padding: 15 ,
    borderRadius: 30,
    flexDirection: 'row'
  },
  textButton: {
    fontSize: 15,
    fontWeight: '500'
  },
  ErrorMessage:{
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5,
  },
  errorContent:{
    flexDirection: "row", 
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "baseline",
    marginBottom: Platform.OS === 'ios' ? "3%" : "0%",
    
  },
})
