/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import ImageUpload from './src/screens/ImageUpload';
const stack = createNativeStackNavigator()
function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='ImageUpload'>
       <stack.Screen 
        name='ImageUpload'
        component={ImageUpload}
        options={{headerShown: false}}
       />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 20,
    color: "#000",
    marginTop: 20
  }
});

export default App;
