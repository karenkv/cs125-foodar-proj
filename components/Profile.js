import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Button
          title="Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({

});