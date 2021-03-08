import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TextInput, SafeAreaView, Button } from 'react-native';
import CustomButton from './CustomButton';

export default class Signup extends Component {
    constructor(props) {
      super(props);
      this.placeholderTextColor = "#ACACAC";
    }

    render() {
      return (
        <SafeAreaView styles={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>sign up</Text>
            <Image source={require('../assets/divider.png')}/>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput 
              style={styles.textInput} 
              keyboardType="numbers-and-punctuation"
              placeholder="birthdate"
              placeholderTextColor={this.placeholderTextColor}
            />
            <TextInput 
              style={styles.textInput} 
              keyboardType="numeric"
              placeholder="weight"
              placeholderTextColor={this.placeholderTextColor}
            />
            <TextInput 
              style={styles.textInput} 
              keyboardType="numeric"
              placeholder="height"
              placeholderTextColor={this.placeholderTextColor}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="food preference"
              placeholderTextColor={this.placeholderTextColor}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="average activity level"
              placeholderTextColor={this.placeholderTextColor}
            />
          </View>
          <View style={styles.bottom}>
            <CustomButton 
              title="back"
              onPress={() => this.props.navigation.navigate('Initial')}
              accessibilityLabel="Click to go back to initial screen"
            />
            <CustomButton 
              title="submit"
              accessibilityLabel="Click to continue user signup with preferences"
              onPress={() => {
                this.props.navigation.navigate('UserPreferencesOnboarding');
                console.log("User information submitted!");
                }}/>
          </View>
        </SafeAreaView>
      )
    }
  }
  
  
const styles = StyleSheet.create({
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
  header: {
    flex: 0.1,
    top: 80,
    left: 50,
    flexDirection: "column",
    position: "relative",
    alignContent: "flex-start",
    alignSelf: "flex-start",
    height: 200,
  },
  title: {
    color: "#D22624",
    fontSize: 72,
    paddingBottom: 100,
  },
  bottom: { 
    position: "relative",
    bottom: 0,
    marginTop: 400,
    marginBottom: 25,
    alignItems: "center",
  }
});