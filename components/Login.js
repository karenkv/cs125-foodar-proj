import React, { Component , useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    login() {
        auth()
            .signInWithEmailAndPassword(this.state.username, this.state.password)
                .then(() => {
                    console.log('User account recognized and signed in!');
                    return true;
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                      console.log('That email address is invalid!');
                    }
                    Toast.show({
                      type: "error",
                      position: "bottom",
                      text1: 'ERROR',
                      text2: "Invalid User information. Please try again."
                    });
                    return false;
                });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/logo.png')}/>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleName}>login</Text>
                    <Image source={require('../assets/divider.png')}/>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="email"
                        onChangeText={(text) => this.setState({username:text})}
                        placeholderTextColor={this.placeholderTextColor}
                    />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="password"
                        onChangeText={(text) => this.setState({username:text})}
                        placeholderTextColor={this.placeholderTextColor}
                    />                    
                </View>
                <View style={styles.footer}>
                    <CustomButton 
                        title="back"
                        onPress={() => this.props.navigation.navigate('Initial')}
                        accessibilityLabel="Click to go back to initial screen"
                    />
                    <CustomButton 
                        title="login"
                        onPress={() => {
                            if (this.login() === true) {
                                this.props.navigation.navigate('Home');
                            }
                        }}
                        accessibilityLabel="Click to submit login information"
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FAF9F5",
    padding: 40
  },
  header: {
      flex: 0.4,
      top: 30,
      right: 40
  },
  titleName: {
      color: '#D22624',
      fontSize: 70,
      fontWeight: 'bold',
  },
  title: {
      flex: 0.4,
  },
  textInputContainer: {
    flex: 0.4,
    flexDirection: "column",
    position: "relative",
  },
  textInput: {
    fontSize: 24,
    paddingLeft: 10,
    height: 50,
    width: 300,
    backgroundColor: "#FFFFFF",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    position: "relative",
    marginBottom:15,
  },
  footer: {
    flex: 0.4,
    alignSelf: "center"
  }   
});