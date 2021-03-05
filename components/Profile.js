import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import Navigation from './Navigation';
import SaveButton from './SaveButton';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.placeholderTextColor = "#ACACAC";
        this.state = {
            profileImgUri: "https://stylecaster.com/wp-content/uploads/2020/04/blackpink-jennie-kim.jpg",
            name: "Jennie Kim",
        };
    }

    saveProfile() {
        console.log("profile saved");
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
                            <TextInput 
                                style={styles.textInput} 
                                keyboardType="numeric"
                                placeholder="zipcode"
                                placeholderTextColor={this.placeholderTextColor}
                            />
                            <TextInput 
                                style={styles.textInput} 
                                keyboardType="numeric"
                                placeholder="weight"
                                placeholderTextColor={this.placeholderTextColor}
                            />
                            <TextInput 
                                style={styles.textInput} 
                                keyboardType="numeric"
                                placeholder="height"
                                placeholderTextColor={this.placeholderTextColor}
                            />
                            <TextInput 
                                style={styles.textInput} 
                                placeholder="food preference"
                                placeholderTextColor={this.placeholderTextColor}
                            />
                            <TextInput 
                                style={styles.textInput} 
                                placeholder="average activity level"
                                placeholderTextColor={this.placeholderTextColor}
                            />
                            <SaveButton 
                                style={{alignSelf: "center", marginVertical: 12}}
                                onPress={ this.saveProfile }
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
        alignSelf: "center",
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
        marginBottom:15,
    },
    saveButton: {

    },
    footer: {
        flex: 0.1,
        position: "relative",
        bottom: 0,
        minHeight: 10,
    }
});