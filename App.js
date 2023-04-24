import react from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { Routes } from './src/Routes';
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark'/>
      <Routes/>
    </NavigationContainer>
  );
}
