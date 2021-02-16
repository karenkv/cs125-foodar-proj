import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Navigation from './Navigation';

export default class Profile extends Component {
<<<<<<< HEAD
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
=======
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>profile</Text>
                    <Image source={require('../assets/divider.png')}/>
                </View>
                <View style={styles.body}>
                    <ScrollView>
                        
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <Navigation navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
>>>>>>> 28431c2f3e8eeff50a213841c12e7f92f79a714d
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
        flex: 0.8
    },
    footer: {
        flex: 0.1
    }
});