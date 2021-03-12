import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Button } from 'react-native';
import Navigation from './Navigation';
import CustomButton from './CustomButton';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.placeholderTextColor = "#ACACAC";
        this.state = {
            profileImgUri: "https://stylecaster.com/wp-content/uploads/2020/04/blackpink-jennie-kim.jpg",
            name: "",
        };
    }

    async componentDidMount() {
        await this.getName();
    }

    getName = async () => {
        return new Promise(resolve => {
                firestore().collection('user-name').doc(auth().currentUser.uid).get()
                .then(documentSnapshot => {
                    console.log("name: ", documentSnapshot.data());
                    this.setState({name: documentSnapshot.data() != undefined 
                        ? documentSnapshot.data() : "Jennie Kim"}, () => { resolve() });
                });
            })
    }

    saveProfile() {
        console.log("profile saved");
    }

    signOut() {
        auth().signOut().then(() => console.log('User signed out!'));
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
                    <ScrollView 
                        showsVerticalScrollIndicator="false">
                        <View style={styles.profileImgContainer}>
                            <Image source={{ uri: imgUri}} style={styles.profileImg}/>
                        </View>
                        <Text style={styles.nameText}>{name}</Text>
                        <View style={styles.textInputContainer}>
                            <TextInput 
                                style={styles.textInput} 
                                placeholder="full name"
                                placeholderTextColor={this.placeholderTextColor}
                            />
                            <TextInput 
                                style={styles.textInput} 
                                placeholder="email"
                                placeholderTextColor={this.placeholderTextColor}
                            />
                            <TextInput 
                                style={styles.textInput} 
                                placeholder="password"
                                placeholderTextColor={this.placeholderTextColor}
                            />
                            <View style={{width: 150,
                                borderWidth: 1,
                                borderRadius: 25,
                                borderColor: "#D6CBA8",
                                padding: 5,
                                margin: 5,
                                alignSelf: "center",
                                marginVertical: 12}}>
                                <Button
                                    title="preferences"
     
                                    color="#D4947C"
                                    onPress={() => this.props.navigation.navigate('UserPreferencesOnboarding')}
                                />
                            </View>
                            <CustomButton 
                                title="save"
                                style={{alignSelf: "center", marginVertical: 12}}
                                onPress={ this.saveProfile }
                            />
                            <CustomButton 
                                title="log out"
                                style={{alignSelf: "center", marginVertical: 12}}
                                onPress={
                                    () => { this.props.navigation.navigate('Initial'); this.signOut(); }
                                }
                            />
                        </View>
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
        top: 70,
        left: 50,
        marginBottom: 45,
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
        alignSelf: "center",
        marginVertical: 5,
        height: 150,
        width: 150,
        borderRadius: 150,
        overflow: "hidden",
    },
    profileImg: {
        height: 150,
        width: 150,
        borderRadius: 0,
    },
    nameText: {
        alignSelf: "center",
        margin: 10,
        padding: 5,
        fontSize: 24,
    },
    textInputContainer: {
        flexDirection: "column",
    },
    textInput: {
        fontSize: 24,
        paddingLeft: 10,
        height: 50,
        width: 300,
        backgroundColor: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        position: "relative",
        marginBottom:10,
    },
    footer: {
        flex: 0.1,
        position: "relative",
        bottom: 0,
        minHeight: 10,
    }
});