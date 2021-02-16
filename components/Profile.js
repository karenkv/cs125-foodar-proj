import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Navigation from './Navigation';

export default class Profile extends Component {
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