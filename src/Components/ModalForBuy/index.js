import React,{useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image,Platform} from "react-native";
import { Ionicons ,Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ModalForBuy({close,}) {
  const navigation = useNavigation();

  return(
    <>
    
    <View style={styles.container}>
    <View style={styles.containerModal}>
      <TouchableOpacity onPress={close} style={styles.closeButton}>
      <Ionicons name="ios-close-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.ImageModal}>
      <Image source={require("../../Images/44048.png")}
      style={{width: 30, height: 30, tintColor: "#fff"}}/>
      </View>
      <View style={styles.containerOrLine}>
      <View style={styles.Lines} />
      </View>
        
       <View style={styles.welcomeUser}>
       <Text style={styles.textMessage}>Thank you for buying. 🥳📦</Text>
       
       </View>


    </View>
    </View>
    
    </>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: "flex-start",
  },

  containerModal: {
    width: "95%",
    height: Platform.OS === "ios" ? "15%" : "20%",
    backgroundColor: '#101A30',
    borderRadius: 30,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? "10%" : 0,
  },
  closeButton:{
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: "4%",
  },
  ImageModal:{
    justifyContent: "center",
    alignItems: "center",
    bottom: "10%"
  },
  containerOrLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Lines: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F3F3'
  },
  welcomeUser:{
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  textMessage:{
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold"
  },

})