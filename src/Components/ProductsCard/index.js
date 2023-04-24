import React,{useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image,Platform,FlatList} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function ProductsCard({title,price,description,category,image, clickProduct, }){

  const [quantity, setQuantity] = useState(1);
  const [colorHeart, setColorHeart] = useState("#000");
  



  function handleColorHeart () {
    colorHeart === "#000" ? setColorHeart("#FF0000") : setColorHeart("#000");
  }


  return (
    
      <TouchableOpacity style={styles.cardProducts} onPress={() => clickProduct()}>
        <TouchableOpacity style={styles.heartContainer} onPress={handleColorHeart }>
        <Ionicons name="ios-heart-circle-outline" size={30} color={colorHeart} />
        </TouchableOpacity>
        <View>
        <Image source={{uri: image}} 
        style={styles.imageProducts}/>
        </View>
        <View style={styles.categoryContent}>
          <Text style={styles.textCategory}>{category}</Text>
          <View style={styles.shippingStyle}>
            <Text style={{color: "#fff", fontWeight: "bold"}}>Free Shipping</Text>
          </View>
        </View>
        <View style={styles.textContent}>
        <Text style={styles.textTitle}>{title}</Text>
        </View>
      
      <Text numberOfLines={3}>{description}</Text>
      </TouchableOpacity>
      
  )
}


const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: "#101A30",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "18%",

  },
  heartContainer:{
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  imageProducts:{
    width: "100%",
    height: 250,
    resizeMode: "contain",
    borderRadius: 30,
    padding: 10
    
  },
  cardProducts:{
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    padding: 15,
    marginTop: Platform.OS === "ios" ? 20 : 20,
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 30,
    
      
  },
  categoryContent:{
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  shippingStyle:{
    backgroundColor: "#39C7A5",
    borderRadius:  5,
    height: 23,
    justifyContent: "center",
    paddingRight: 5,
    paddingLeft: 5,
  },

  textCategory:{
    color: "#808080",
    fontSize: 15,
  },
  textTitle:{
    fontSize: 18,
    fontWeight: "500"
  
  },
  textContent:{
    marginBottom: 12,
  }


})