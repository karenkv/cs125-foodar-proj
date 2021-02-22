import React, { Component } from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/logo.png')}/>
                    <Text style={styles.headerText}>login</Text>
                    <Image source={require('../assets/divider.png')}/>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="email"
                        placeholderTextColor={this.placeholderTextColor}
                    />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="password"
                        placeholderTextColor={this.placeholderTextColor}
                    />
                </View>
                <View style={styles.bottom}>
                    <Button title="back"
                        style={{alignSelf: "center", position: "relative", top:0}}
                        onPress={() => {
                            this.props.navigation.navigate('Initial');
                        }}
                    />
                    <Button title="next"
                        style={{alignSelf: "center", position: "relative", top:0}}
                        onPress={() => {
                            this.props.navigation.navigate('Home');
                            console.log("User logged in!");
                        }}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  header: {
      flex: 0.1,
      top: 30,
      left: 20
  },
  headerText: {
      color: '#D22624',
      fontSize: 53,
      fontWeight: 'bold',
  },
  body: {
      flex: 0.8,
      marginTop: 45,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FAF9F5",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    flex:1,
    flexDirection: "column",
    position: "relative",
    top:0,
    marginTop: 220,
    marginBottom: 25,
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
  bottom: { 
    position: "relative",
    bottom:0,
    marginTop: 400,
    marginBottom: 25,
  }
});