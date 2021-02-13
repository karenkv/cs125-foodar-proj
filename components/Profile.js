import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Button
          title="User Preferences"
          onPress={() => this.props.navigation.navigate('UserPreferencesOnboarding')}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({

});