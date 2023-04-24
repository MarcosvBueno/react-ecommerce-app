import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { ModalCart } from '../../Components/ModalForCart';

export default function ProductDetail({ route }) {
  const { title, price, description, category, image } = route.params;
  const navigation = useNavigation();
  const [cartList, setCartList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;

  function handleBack() {
    navigation.navigate("ProductList");
  }

  function handlePlusQuantity() {
    setQuantity(quantity + 1);
  }

  function handleMinusQuantity() {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
  }


  async function handleaddCart() {
    const productCartList = {
      id: uuid.v4(),
      title,
      price: totalPrice,
      description,
      category,
      image,
      quantity
    };
    const cartListStored = await AsyncStorage.getItem("cartList");
    let updatedCartList = [];
    if (cartListStored !== null) {
      updatedCartList = JSON.parse(cartListStored);
    }

  
    const existProduct = updatedCartList.find(product => product.title === title);
    if (existProduct) {
      existProduct.quantity += quantity;
      
      setCartList([...updatedCartList]);
      await AsyncStorage.setItem("cartList", JSON.stringify(updatedCartList));
      console.log(`Product (${title}) added to cart with quantity ${quantity}`);
      
      setModalVisible(true);
    

  } else {

    updatedCartList.push(productCartList);
    setCartList(updatedCartList); 
      
    await AsyncStorage.setItem("cartList", JSON.stringify(updatedCartList));
    console.log(`Product (${title}) added to cart ` );

    setModalVisible(true); 
   
  }};


  function handleScreen() {
    navigation.navigate("ProductCart");
    setModalVisible(false);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }


  return (
    <SafeAreaView style={styles.containerAll}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.detailsTitle}>Details Products</Text>
        <Image source={require('../../Images/44048.png')} style={styles.logo} />
      </View>
      <ScrollView>
        <View style={styles.containerImage}>
          <View style={styles.viewImage}>
            <Image source={{ uri: image }} style={styles.styleImage} />
          </View>
          <View style={styles.pointOfImage} />
        </View>

        <View style={styles.containerInformations}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textDescription}>{description}</Text>
        </View>

        <View>
          <Text style={styles.textPrice}> $ {price * quantity}</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.quantityContent}>
          <TouchableOpacity style={styles.priceContent}>
            <View style={styles.totalQuantity}>
              <FontAwesome
                name="minus-square-o"
                size={28}
                color="#39C7A5"
                onPress={handleMinusQuantity}
              />
              <Text style={styles.quantity}>{quantity}</Text>
              <AntDesign
                name="plussquare"
                size={24}
                color="#39C7A5"
                onPress={handlePlusQuantity}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonAddCart}
            onPress={() => handleaddCart()} 
          >
            <Text style={styles.textButton}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} transparent={true}>
          <ModalCart close={handleCloseModal} 
          Switch={() => handleScreen()}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: '#fff'
  },

  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6'
  },

  styleImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 10
  },

  pointOfImage: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    width: 30,
    height: 10
  },

  viewImage: {
    marginTop: 20,
    borderRadius: 10,
    width: 300,
    height: 320,
    backgroundColor: '#fff'
  },

  elevation: {
    elevation: 10,
    color: '#000'
  },

  backButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },

  logo: {
    width: 30,
    height: 30,
    marginRight: 15
  },

  detailsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 15
  },

  priceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 20,
    marginBottom: 10
  },

  totalQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginLeft: 8
  },

  containerInformations: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
    width: '90%',
    marginLeft: 8
  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15
  },

  quantity: {
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 25,
    marginRight: 25
  },

  textPrice: {
    fontSize: 22,
    fontWeight: '900'
  },
  
  line: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: '90%',
    height: 1
  },

  buttonAddCart: {
    backgroundColor: '#39C7A5',
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  textButton: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },

  quantityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '65%',
    marginLeft: 8,
    marginTop: 10,
    marginBottom: 10
  }
});
