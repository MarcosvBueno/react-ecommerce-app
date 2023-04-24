import React, { useRef, useEffect } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
export function Intro() {
  const navigate = useNavigation();

  function handleScreen() {
    navigate.navigate('LoginForm');
    console.log('Intro page');
  }

  return (
    <View style={styles.containerAll}>
      <View style={styles.Fillcontainer}></View>
      <View style={styles.ImageContent}>
        <View style={styles.borderStyle}>
          <Image
            source={require('../../Images/44048.png')}
            style={styles.imageLogo}
          />
        </View>
      </View>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Best Ecommerce</Text>
          <Text style={styles.subTitle}>For you. </Text>
        </View>
        
          <TouchableOpacity style={styles.button} onPress={handleScreen}>
            <Text style={styles.textButton}>Get Started for Free</Text>
            <AntDesign name="arrowright" size={20} color="black" />
          </TouchableOpacity>   
    </View>
  );
}

const styles = StyleSheet.create({
  containerAll: {
    backgroundColor: '#fff',
    flex: 1
  },

  Fillcontainer: {
    height: '50%',
    backgroundColor: '#101A30',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150
  },
  borderStyle: {
    borderWidth: 0,
    padding: 25,
    backgroundColor: '#EEF0F2',
    borderRadius: 60
  },
  imageLogo: {
    width: 60,
    height: 60,

    borderRadius: 30
  },
  ImageContent: {
    position: 'absolute',
    top: '41%',
    alignSelf: 'center',
    zIndex: 2
  },

  containerTitle: {
    
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonContainer: {

  },
  button: {
    backgroundColor: '#A7FC84',
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '15%',
    width: "50%"
  },
  textButton: {
    fontSize: 14,
    fontWeight: '500'
  }
});
