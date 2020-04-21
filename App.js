/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  Colors
  
} from 'react-native/Libraries/NewAppScreen';

import AppNavigator from './src/AppNavigator';

const App: () => React$Node = () => {
  return (
    <>
      <AppNavigator />
    </>
  );
};

export default App;