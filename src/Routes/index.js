import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Intro } from "../Screens/Intro";
import { LoginForm } from "../Screens/LoginForm";
import { RegisterForm } from "../Screens/RegisterForm";
import  ProductList  from "../Screens/ProductList";
import  ProductDetail  from "../Screens/ProductDetail";
import  ProductCart  from "../Screens/ProductCart";

export function Routes() {

  const Stack = createNativeStackNavigator();


  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="ProductList" component={ProductList}  options={{gestureEnabled: false}}/>
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductCart" component={ProductCart} />
    </Stack.Navigator>
  )
}

