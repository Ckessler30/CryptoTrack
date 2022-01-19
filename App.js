import { useRef, useMemo, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/HomeStack'




export default function App() {

  return (
    <Navigator />
  );
}

const styles = StyleSheet.create({
  
});
