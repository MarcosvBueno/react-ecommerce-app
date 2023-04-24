import React,{useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image,Platform} from "react-native";
import { Ionicons ,Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export function ModalCart({close,Switch}) {
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
      style={{width: 50, height: 50, tintColor: "#fff"}}/>
      </View>
      <View style={styles.containerOrLine}>
      <View style={styles.Lines} />
      </View>
        
       <View style={styles.welcomeUser}>
       <Text style={styles.welcomeText}>Product added to cart 🥳</Text>
       </View>

       <View style={styles.conatainerButtons}>
      <TouchableOpacity style={styles.enterEcommerce} onPress={() => navigation.navigate("ProductList")}>
        <Text style={styles.textEnter}>Products</Text>
        <Entypo name="flickr-with-circle" size={24} color="black" style={styles.iconCart} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.enterEcommerce} onPress={Switch}>
        <Text style={styles.textEnter}>Go to Cart</Text>
        <Ionicons name="ios-cart" size={24} color="black" style={styles.iconCart}/>
      </TouchableOpacity>
      </View>

    </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: "center",
  },

  containerModal: {
    width: "75%",
    height: Platform.OS === "ios" ? "28%" : "35%",
    backgroundColor: '#101A30',
    borderRadius: 30,
    alignSelf: "center",
    

  },
  closeButton:{
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: "4%",
  },
  ImageModal:{
    justifyContent: "center",
    alignItems: "center",
    bottom: "5%"
  },
  containerOrLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1%'
  },
  Lines: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F3F3'
  },
  welcomeUser:{
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText:{
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold"
  },
  enterEcommerce:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "40%",
    alignSelf: "center",
    borderRadius: 30,
    height: "60%",
    marginBottom: "5%"
  },
  textEnter:{
    fontSize: 16,
    fontWeight: "bold",
    color: "#101A30",
  },
  iconCart:{
    marginLeft: "5%"
  
  },

  conatainerButtons:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",

  }

})