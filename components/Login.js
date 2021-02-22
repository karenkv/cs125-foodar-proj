import React, { Component } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/logo.png')}/>
                    <Text style={styles.headerText}>fooda</Text>
                    <Image source={require('../assets/divider.png')}/>
                </View>
                <View style={styles.body}>
                    <Text numberOfLines={5} style={styles.motto}>
                        your local food radar for meeting fitness goals
                    </Text>
                    <Button numberOfLines={10}
                      title="login"
                      onPress={() => this.props.navigation.navigate('Login')}
                    />
                    <Button
                      title="sign up"
                      onPress={() => this.props.navigation.navigate('Home')}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FAF9F5"
  },
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
  motto: {
      color: '#D35D50',
      fontSize: 36
  }
});