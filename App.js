import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./components/Home";
import Login from "./components/Login";
import Initial from "./components/Initial";
import Profile from "./components/Profile";
import UserPreferencesOnboarding from "./components/UserPreferencesOnboarding";
import Search from "./components/Search";
import Signup from "./components/Signup";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return <NavigationContainer> 
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserPreferencesOnboarding" component={UserPreferencesOnboarding} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>;
  }
}

const styles = StyleSheet.create({});