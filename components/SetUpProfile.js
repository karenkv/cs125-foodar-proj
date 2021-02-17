import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TextInput, SafeAreaView, Button } from 'react-native';

export default class SetUpProfile extends Component {
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
              placeholder="birthdate"
              placeholderTextColor={this.placeholderTextColor}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="weight"
              placeholderTextColor={this.placeholderTextColor}
            />
            <TextInput 
              style={styles.textInput} 
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
            <Button title="Submit"
              onPress={() => {
                this.props.navigation.navigate('Home');
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
    color: "#FAF9F5",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInputContainer: {
    flex:1,
    flexDirection: "column",
    position: "relative",
    top: 220,
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
    flex:1, 
    flexDirection:"column",
    position: "relative",
    alignContent: "flex-end",
    bottom:0,
  }
});