import React, { useState,useEffect} from 'react';
import {  View,Text,StyleSheet,TextInput, Image,TouchableOpacity,Modal} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ModalComponent } from '../../Components/ModalForLogin';

export function LoginForm({route}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameReceived, setUsernameReceived] = useState('');


  useEffect(() => {
    console.log("testeteste")
    const receivedEmail = route.params?.savedEmail;
    console.log('receivedEmail:', receivedEmail);
    if (receivedEmail) {
    setEmail(receivedEmail);
    }else{
      setEmail('');
    }
  },[route])

  const navigation = useNavigation();

  const isAndroid = Platform.OS === 'android';

  async function getUser() {
    try {
      const userObj = await AsyncStorage.getItem("userKey");
      if (userObj !== null) {
        const user = JSON.parse(userObj);
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error retrieving user: ', error);
    }
  }

  const handleLogin = async () => {
    const users = await getUser();
    console.log("user: ",users);

    const userExists = users.find(user => user.email === email && user.password === password);
    
    if(userExists){
      setModalVisible(true);
      const usernameUser = userExists.username;
      setUsernameReceived(usernameUser);
      return;
    }else{
      alert("Login Failed. Email or Password are incorrect");
      return;
    }

  };

  function closeModal() {
    setModalVisible(false);
  }

  function handleScreen() {
    navigation.navigate('RegisterForm');
  }

  function handleIcon() {
    setSecureTextEntry(prev => !prev);
  }

  return (
    <View style={styles.containerAll}>
      <View style={styles.logoContent}>
        <Image
          source={require('../../Images/44048.png')}
          style={styles.imageLogo}
        />
        <Text style={styles.textTitle}>Ecommerce</Text>
      </View>
      <View style={styles.containerSubTitle}>
        <Text style={styles.subTitle}>Buy without limits</Text>
      </View>

      <View style={styles.containerEmail}>
        <Text style={{ fontWeight: 'bold' }}>Your email Adress:</Text>
        <TextInput
          style={styles.input}
          placeholder="testeteste@gmail.com..."
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputTitle}>
        <Text style={{ fontWeight: 'bold' }}>Your Password:</Text>
      </View>
      <View style={styles.containerPassword}>
        <TextInput
          style={styles.input}
          placeholder="min. 6 characteres"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity style={styles.inputWithIcon} onPress={handleIcon}>
          <FontAwesome
            name={secureTextEntry ? 'eye' : 'eye-slash'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.containerOrLine}>
        <View style={styles.Lines} />
        <View>
          <Text style={styles.textLine}>Or</Text>
        </View>
        <View style={styles.Lines} />
      </View>

      <TouchableOpacity style={styles.buttonMidia}>
        <AntDesign
          name="google"
          size={20}
          color="#121212"
          style={{ marginRight: 5 }}
        />
        <Text style={styles.textButton}>Sign up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonMidia}>
        <FontAwesome
          name="apple"
          size={20}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={styles.textButton}>Sign up with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.RegisterOnApp} onPress={handleScreen}>
        <Text style={styles.textRegistration}>Register in the App </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true}>
      <ModalComponent close={closeModal} nameOfUser={route.params?.nameUser ? route.params?.nameUser : usernameReceived} received={usernameReceived}/>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAll: {
    backgroundColor: '#fff',
    flex: 1
  },
  imageLogo: {
    width: 50,
    height: 50,
    marginRight: 15
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerSubTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  logoContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? "20%" : "10%"
  },
  containerEmail: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? "20%" : "10%",
    marginBottom: Platform.OS === 'ios' ? "5%" : null,
  },
  input: {
    alignItems: 'center',
    height: 45,
    borderRadius: 30,
    borderWidth: 2,
    padding: 10,
    borderColor: '#F3F3F3',
    marginTop: 10,
    width: '100%'
  },
  containerPassword: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%'
  },
  inputWithIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 40,
    marginTop: 10,
    textAlign: 'center'
  },
  inputTitle: {
    justifyContent: 'center',
    width: '80%',
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginTop: '5%'
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    width: '80%',
    backgroundColor: '#A7FC84',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row'
  },
  textButton: {
    fontSize: 14,
    fontWeight: '500'
  },
  containerOrLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '10%',
    paddingLeft: '10%',
    marginTop: '5%'
  },
  Lines: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F3F3'
  },
  textLine: {
    width: 40,
    textAlign: 'center'
  },
  buttonMidia: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#F3F3F3'
  },
  RegisterOnApp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },
  textRegistration: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#101A30'
  }
});
