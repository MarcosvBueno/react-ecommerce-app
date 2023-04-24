import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  FlatList,
  ScrollView,
  BackHandler
} from 'react-native';
import { products } from '../../mocks/products.js';
import ProductsCard from '../../Components/ProductsCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

export default function ProductList() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    return () => backHandler.remove();
  }, []);

  function handleFilter(category) {
    const filtered = products.filter(product => product.category === category);
    setFilteredProducts(filtered);
    console.log(filtered);
  }

  function handleProductClick(productId) {
    const product = products.find(product => product.id === productId);
    navigation.navigate('ProductDetail', product);
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#101A30' }}>
        <View style={styles.header}>
        <Ionicons name="ios-exit" size={30} color="#fff" onPress={() => navigation.navigate("LoginForm")}/>
          <TouchableOpacity onPress={() => navigation.navigate('ProductCart')}>
            <Ionicons name="ios-cart" size={30} color="#f3f3f3" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: 'row', marginBottom: 10 }}
        >
          <TouchableOpacity
            onPress={() => setFilteredProducts(products)}
            style={[styles.cardFilter, { width: 145 }]}
          >
            <Image
              source={require('../../Images/mens-Clothing.png')}
              style={[styles.imageProduct, { tintColor: '#232312' }]}
            />
            <Text style={styles.textAll}>All Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilter('electronics')}
            style={styles.cardFilter}
          >
            <Image
              source={require('../../Images/airpods2.png')}
              style={styles.imageProduct}
            />
            <Text style={styles.textAll}>Electronics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilter("men's clothing")}
            style={[styles.cardFilter, { width: 145 }]}
          >
            <Image
              source={require('../../Images/mens-Clothing.png')}
              style={[styles.imageProduct, { tintColor: '#fff' }]}
            />
            <Text style={styles.textAll}>Men's Clothing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFilter("women's clothing")}
            style={[styles.cardFilter, { width: 165 }]}
          >
            <Image
              source={require('../../Images/women-Clothing.png')}
              style={styles.imageProduct}
            />
            <Text style={styles.textAll}>Women's Clothing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilter('jewelery')}
            style={styles.cardFilter}
          >
            <Image
              source={require('../../Images/ring.png')}
              style={styles.imageProduct}
            />
            <Text style={styles.textAll}>Jewelery</Text>
          </TouchableOpacity>
        </ScrollView>

        <FlatList
          data={filteredProducts.length > 0 ? filteredProducts : products}
          keyExtractor={products => String(products.id)}
          renderItem={({ item }) => (
            <ProductsCard
              {...item}
              clickProduct={() => handleProductClick(item.id)}
            />
          )}
          clickProduct={handleProductClick}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  imageLogoStyle: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    tintColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#101A30',
    width: '80%',
    alignSelf: 'center',
    padding: 5
  },
  cardFilter: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
    margin: 10,
    width: 120,
    height: 40
  },
  imageProduct: {
    width: 25,
    height: 25,
    marginRight: 5,
    backgroundColor: '#232312',
    borderRadius: 30,
    padding: 10
  },
  textAll: {
    color: '#101A30',
    fontWeight: 'bold'
  },
  allProductsText: {
    color: '#101A30',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10
  },
  allContent: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    padding: 10,
    margin: 10,
    width: 120,
    height: 40
  }
});
