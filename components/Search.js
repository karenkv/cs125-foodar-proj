import React, { Component } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Navigation from './Navigation';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <>
            <View>
                <Text style={styles.header}>recommend</Text>
            </View>
            <View>
                <Image source={require('../assets/divider.png')}/>
            </View>
            <View>
                <Navigation navigation={this.props.navigation}/>
            </View>
            </>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        color: '#D22624',
        fontSize: 53,
        fontWeight: 'bold',
    }
});