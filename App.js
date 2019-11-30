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
  StatusBar,
} from 'react-native';

import {} from 'react-native/Libraries/NewAppScreen';

import {NavHeader} from './components/NavHeader/NavHeader';
import {Content} from './components/Content/Content';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView >
        <NavHeader />
        <Content />
      </SafeAreaView>
    </>
  );
};

export default App;
