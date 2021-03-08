import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Pressable, Modal, TextInput } from 'react-native';
import Navigation from './Navigation';
import SaveButton from './SaveButton';
import Config from 'react-native-config';

const GOOGLE_CLIENT_ID = Config.GOOGLE_CLIENT_ID;
const scopes = ['https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.activity.write',
    'https://www.googleapis.com/auth/fitness.body.read',
    'https://www.googleapis.com/auth/fitness.body.write',
    'https://www.googleapis.com/auth/fitness.location.read',
    'https://www.googleapis.com/auth/fitness.location.write',
    'https://www.googleapis.com/auth/fitness.nutrition.read',
    'https://www.googleapis.com/auth/fitness.nutrition.write'];
const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        console.log(this.state.modalVisible);
    }

    renderModal() {
        const modalVisible = this.state.modalVisible;
        return (
            <View style={styles.modalView}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setModalVisible(!modalVisible)}
                >
                    <Text style={styles.closeButton}>X</Text>
                </Pressable>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.headerText, { fontSize: 42, marginBottom: 12 }]}>add meal</Text>
                        <Image source={require('../assets/divider-white.png')} />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="meal"
                            placeholderTextColor={this.placeholderTextColor}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="name"
                            placeholderTextColor={this.placeholderTextColor}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="calories"
                            placeholderTextColor={this.placeholderTextColor}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="carbs"
                            placeholderTextColor={this.placeholderTextColor}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="protein"
                            placeholderTextColor={this.placeholderTextColor}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="fat"
                            placeholderTextColor={this.placeholderTextColor}
                        />
                    </View>
                    <SaveButton style={{ backgroundColor: "#FAF9F5", maxWidth: 75, alignSelf: "center" }} />
                </View>
            </View>
        );
    }

    render() {
        const modalVisible = this.state.modalVisible;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>home</Text>
                    <Image source={require('../assets/divider.png')} />
                </View>
                <View style={styles.body}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose{... () => {
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        {this.renderModal()}
                    </Modal>
                    <Pressable
                        style={styles.addMealButton}
                        onPress={() => this.setModalVisible(true)}>
                        <Text style={{ color: "#FFF", fontSize: 46, fontWeight: "bold" }}>+</Text>
                    </Pressable>
                </View>
                <View style={styles.footer}>
                    <Navigation navigation={this.props.navigation} />
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
        top: 50,
        left: 25
    },
    headerText: {
        color: '#D22624',
        fontSize: 53,
        fontWeight: 'bold',
    },
    body: {
        flex: 0.8,
        marginTop: 45,
    },
    addMealButton: {
        backgroundColor: "#D22624",
        height: 55,
        width: 55,
        borderRadius: 100,
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: 25,
        position: "relative",
        bottom: 25,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#D6CBA8",
        borderRadius: 20,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 3,
        position: "relative",
        top: 130,
        minHeight: 630,
    },
    modalHeader: {
        flex: 1,
        marginBottom: 10,
    },
    closeButton: {
        color: "#FAF9F5",
        alignSelf: "flex-end",
        fontSize: 32,
    },
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 25
    },
    textInputContainer: {
        flexDirection: "column",
        marginTop: 15,
        marginBottom: 10,
    },
    textInput: {
        fontSize: 24,
        paddingLeft: 12,
        height: 50,
        width: 280,
        backgroundColor: "#FFFFFF",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        position: "relative",
        marginBottom: 13,
    },
    footer: {
        flex: 0.1
    }
});