import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TextInput} from 'react-native';
import Navigation from './Navigation';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>recommend</Text>
                    <Image source={require('../assets/divider.png')}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.searchContainer}>
                        <TextInput 
                            style={styles.searchInput} 
                            keyboardType="numbers-and-punctuation"
                            placeholder="search 'sushi'"
                            placeholderTextColor={this.placeholderTextColor}
                        />
                        <Image style={styles.searchIcon} source={require('../assets/search.png')} />
                    </View>
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
        flexDirection: "column",
        backgroundColor: "#FAF9F5",
        justifyContent: "center",
    },
    header: {
        flex: 0.1,
        top: 40,
        left: 50,
        flexDirection: "column",
        position: "relative",
        alignContent: "flex-start",
        alignSelf: "flex-start",
    },
    title: {
        color: "#D22624",
        fontSize: 53,
        paddingBottom: 25,
        fontWeight: 'bold',
    },
    body: {
        flex: 0.8
    },
    footer: {
        flex: 0.1
    },
    searchContainer: {
        flexDirection:"row",
        alignSelf: "center",
        justifyContent: "center",
        alignItems:"center",
        position: "relative",
        top: 85,
        margin: 10,
        height: 50,
        width: 320,
        backgroundColor: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 8,
    },
    searchIcon: {
        margin: 5,
        padding: 10,
        alignItems:"center",
    },
    searchInput: {
        flex:1,
        fontSize: 24,
        paddingLeft: 15,
        height: 50,
        borderColor: "transparent",
    }
});