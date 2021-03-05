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
import SetUpProfile from "./components/SetUpProfile";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Initial" component={Initial} options={{headerShown: false,}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/>
        <Stack.Screen name="Set Up" component={SetUpProfile} options={{headerShown: false,}}/>
        <Stack.Screen name="UserPreferencesOnboarding" component={UserPreferencesOnboarding} options={{headerShown: false,}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown: false,}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>;
  }
}

const styles = StyleSheet.create({});