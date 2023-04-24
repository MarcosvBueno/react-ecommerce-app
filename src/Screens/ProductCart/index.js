import React, { useState, useEffect,useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  AntDesign
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ModalForBuy } from '../../Components/ModalForBuy';


export default function ProductCart() {
  const [cartList, setCartList] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);


  function handlePlusQuantity(productId) {
    const updatedCartList = cartList.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1
        };
      } else {
        return product;
      }
    });

    setCartList(updatedCartList);
    AsyncStorage.setItem('cartList', JSON.stringify(updatedCartList));
  }

  function handleMinusQuantity(productId) {
    const updatedCartList = cartList.map(product => {
      if (product.id === productId && product.quantity > 1) {
        const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
        return {
          ...product,
          quantity: newQuantity
        };
      } else {
        return product;
      }
    });

    AsyncStorage.setItem('cartList', JSON.stringify(updatedCartList));
    setCartList(updatedCartList);
  }

  useEffect(() => {
    async function retrieveCartList() {
      try {
        const cartListJSON = await AsyncStorage.getItem('cartList');
        if (cartListJSON !== null) {
          const cartList = JSON.parse(cartListJSON);
          setCartList(cartList);
        }
      } catch (error) {
        console.log('Error retrieving cart list from AsyncStorage:', error);
      }
    }

    retrieveCartList();
  }, []);



  function handleExcluideItem(productId) {
    const updatedCartList = cartList.filter(
      product => product.id !== productId
    );

    setCartList(updatedCartList);

    AsyncStorage.setItem('cartList', JSON.stringify(updatedCartList));
  }
   
  function totalPrice() {
    const total = cartList.reduce((total, product) =>  total + product.price * product.quantity, 0).toFixed(2);
    return total;
  }

  function handleClearCart() {
    if(cartList.length === 0) return;
    setCartList([]);
    AsyncStorage.setItem('cartList', JSON.stringify([]));
    setModalVisible(true);
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Cart</Text>
        <View style={{ width: 30 }} />
      </View>
      
      {cartList.length > 0 ? (
      
        <FlatList
          priceOfProduct={totalPrice()}
          data={cartList}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.containerInformations}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>
                    $ {item.price * item.quantity}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.priceContent}>
                <View style={styles.totalQuantity}>
                  <TouchableOpacity
                    onPress={() => handleMinusQuantity(item.id)}
                  >
                    <FontAwesome
                      name="minus-square-o"
                      size={28}
                      color="#39C7A5"
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handlePlusQuantity(item.id)}>
                    <AntDesign name="plussquare" size={24} color="#39C7A5" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleExcluideItem(item.id)}>
                    <FontAwesome5 name="trash" size={24} color="#F46E6E" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      )}
      <View style={styles.contentTotalPrice}>
      <Text style={styles.textTotal}>Total:</Text>
      <Text style={styles.priceText}>$ {totalPrice()}</Text>
      </View>
      <TouchableOpacity style={styles.containerBuyButton} onPress={() => handleClearCart()}>
        <Text style={styles.textButtonBuy}>Buy</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType='slide' transparent={true}>
        <ModalForBuy  close={() => setModalVisible(false)}/>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  priceContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 0,
    marginBottom: 10
  },

  itemContainer: {
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flex: 1,
    backgroundColor: '#fff'
  },

  containerInformations: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },

  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10
  },

  itemDetails: {
    flex: 1
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },

  itemPrice: {
    fontSize: 14,
    color: '#777'
  },

  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  totalQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%'
  },

  containerBuyButton:{
    backgroundColor: '#39C7A5',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10
  
  },

  textButtonBuy:{
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  contentTotalPrice:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    
  },

  priceText:{
    fontSize: 22,
    fontWeight: 'bold',
    color: "#000"
  },
  
  textTotal:{
    fontSize: 16,
    fontWeight: 'bold',
    color: "#8E8E8E"

  }
});
