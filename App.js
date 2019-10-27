/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
} from 'react-native/Libraries/NewAppScreen';

import { NavHeader } from './components/NavHeader/NavHeader'


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <NavHeader/>
        <ScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
