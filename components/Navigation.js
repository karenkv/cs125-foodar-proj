import React, { Component } from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <View style={styles.icons}>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Image source={require('../assets/home.png')}/>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => this.props.navigation.navigate('Search')}
                >
                    <Image source={require('../assets/search.png')}/>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => this.props.navigation.navigate('Profile')}
                >
                    <Image source={require('../assets/profile.png')} style={styles.icon}/>
                </TouchableHighlight>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    icons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        height: 35,
        width: 35
    }
});