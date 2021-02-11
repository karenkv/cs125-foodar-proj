import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>;
  }
}

const styles = StyleSheet.create({});