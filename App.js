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

import Toast, { BaseToast }  from 'react-native-toast-message';

const Stack = createStackNavigator();

const toastConfig = {
  error: ({ text1, text2, ...rest }) => (
    <BaseToast
      style={{ height: 100, borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text1={text1}
      text2={text2}
    />
  )
};

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
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>;
  }
}

const styles = StyleSheet.create({});