import React, { Component , useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

import auth from '@react-native-firebase/auth';

function LoginApp() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    if (!user) {
      return (
        <View>
          <Text>Login</Text>
        </View>
      );
    }
  
    return (
      <View>
        <Text>Welcome {user.email}</Text>
      </View>
    );
  }

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    login = () => {
        auth()
            .signInWithEmailAndPassword(this.state.username, this.state.password)
                .then(() => {
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    }
        
                    if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    }
        
                    console.error(error);
                });
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginApp />
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
                            this.login;
                            this.props.navigation.navigate('Home');
                            console.log("User logged in!");
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