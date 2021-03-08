import React, { Component } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';

export default class Initial extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/logo.png')}/>
                </View>
                <View style={styles.body}>
                    <Text style={styles.headerText}>foodar</Text>
                    <Image source={require('../assets/divider.png')}/>
                    <Text numberOfLines={5} style={styles.motto}>
                        your local food radar for meeting fitness goals
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Button
                        color="#D4947C"
                        title="login"
                        onPress={() => this.props.navigation.navigate('Login')}
                        accessibilityLabel="Click to login to foodar"
                    />
                    <Button
                        color="#D4947C"
                        title="sign up"
                        onPress={() => this.props.navigation.navigate('Signup')}
                        accessibilityLabel="Click to sign up for foodar"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF9F5",
        padding: 40
    },
    header: {
        flex: 0.3,
        right: 40,
        top: 30
    },
    headerText: {
        color: '#D22624',
        fontSize: 70,
        fontWeight: 'bold',
    },
    motto: {
        fontSize: 40,
        top: 30,
        color: '#D35D50'
    },
    body: {
        flex: 0.5
    },
    footer: {
        flex: 0.2,
    }
});