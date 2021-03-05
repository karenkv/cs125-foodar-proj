import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, } from 'react-native';
import Navigation from './Navigation';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImgUri: "https://stylecaster.com/wp-content/uploads/2020/04/blackpink-jennie-kim.jpg",
            name: "Jennie Kim",
        };
      }

    render() {
        const imgUri = this.state.profileImgUri;
        const name = this.state.name;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>profile</Text>
                    <Image source={require('../assets/divider.png')}/>
                </View>
                <View style={styles.body}>
                    <ScrollView>
                        <View style={styles.profileImgContainer}>
                            <Image source={{ uri: imgUri}} style={styles.profileImg}/>
                        </View>
                        <Text style={styles.nameText}>{name}</Text>
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
        backgroundColor: "#FAF9F5",
        flexDirection: "column",
        justifyContent: "center",
    },
    header: {
        flex: 0.1,
        position: "relative",
        top: 30,
        left: 50,
        marginBottom: 25,
        paddingBottom: 12,
        minHeight: 45,
    },
    title: {
        color: "#D22624",
        fontSize: 53,
        paddingBottom: 22,
        fontWeight: 'bold',
    },
    body: {
        flex: 0.8,
        alignSelf: "center",
        marginTop: 22,
        marginBottom: 10,
        marginHorizontal: 55,
    },
    profileImgContainer: {
        marginVertical: 10,
        height: 230,
        width: 230,
        borderRadius: 150,
        overflow: "hidden",
    },
    profileImg: {
        height: 230,
        width: 230,
        borderRadius: 0,
    },
    nameText: {
        alignSelf: "center",
        margin: 22,
        padding: 5,
        fontSize: 24,
    },
    footer: {
        flex: 0.1,
        position: "relative",
        bottom: 0,
        minHeight: 10,
    }
});