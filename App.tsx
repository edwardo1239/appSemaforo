/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Header from './src/components/Header';
import Body from './src/components/Body';
import Footer from './src/components/Footer';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={require('./src/assets/semaforo.jpg')}>
          <Header />
          <Body />
          <Footer />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
