import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text>Login</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({

});