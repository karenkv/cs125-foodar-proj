import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import Navigation from './Navigation';
import Config from 'react-native-config';
import CustomButton from './CustomButton';

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

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", 
    "september", "october", "november", "december"];

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            calories: 2000,
            carbs: 0,
            protein: 0,
            fat: 0,
            calorieInput: 0,
            carbsInput: 0,
            proteinInput: 0,
            fatInput: 0,
        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        console.log(this.state.modalVisible);
    }

    handleChange=(text, stateProp)=>{
        this.setState({
          [stateProp]: text
        });
    }

    saveMeal() {
        this.setState({calories: this.state.calories - parseInt(this.state.calorieInput)});
        this.setState({carbs: this.state.carbs + parseInt(this.state.carbsInput)});
        this.setState({protein: this.state.protein + parseInt(this.state.proteinInput)});
        this.setState({fat: this.state.fat + parseInt(this.state.fatInput)});
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
                            onChangeText={(text)=>this.handleChange(text, 'calorieInput')}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="carbs"
                            placeholderTextColor={this.placeholderTextColor}
                            onChangeText={(text)=>this.handleChange(text, 'carbsInput')}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="protein"
                            placeholderTextColor={this.placeholderTextColor}
                            onChangeText={(text)=>this.handleChange(text, 'proteinInput')}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="fat"
                            placeholderTextColor={this.placeholderTextColor}
                            onChangeText={(text)=>this.handleChange(text, 'fatInput')}
                        />
                    </View>
                    <CustomButton
                        title="save"
                        style={{ 
                            backgroundColor: "#FAF9F5", 
                            maxWidth: 75, 
                            alignSelf: "center" 
                        }} 
                        onPress={() => {
                            this.saveMeal();
                            this.setModalVisible(false);
                        }}
                    />
                </View>
            </View>
        );
    }

    getDate = () => {
        let day = new Date(Date.now()).getDay();
        let mm = new Date(Date.now()).getMonth();
        let dd = new Date(Date.now()).getDate();
        let yy = new Date(Date.now()).getFullYear();
        return `${DAYS[day]}, ${MONTHS[mm]}  ${dd}, ${yy}`;
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
                    <ScrollView>
                        <View style={styles.caloriesRemaining}>
                            <Text style={{color: "#FAF9F5", fontSize: 24, textAlign: "center"}}>
                                {this.state.calories}{`\ncalories\nleft`}
                                </Text>
                        </View>
                        <View style={styles.nutrition}>
                            <Text style={{fontSize: 24}}>{this.state.carbs} g carbs</Text>
                            <Text style={{fontSize: 24}}>{this.state.protein} g protein</Text>
                            <Text style={{fontSize: 24}}>{this.state.fat} g fat</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={{fontSize: 18}}>{this.getDate()}</Text>
                            </View>
                    </ScrollView>
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
        top: 70,
        left: 50
    },
    headerText: {
        color: '#D22624',
        fontSize: 53,
        fontWeight: 'bold',
        paddingBottom: 22,
    },
    body: {
        flex: 0.8,
        marginTop: 100,
    },
    addMealButton: {
        backgroundColor: "#D22624",
        height: 55,
        width: 55,
        borderRadius: 100,
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: 30,
        position: "relative",
        bottom: 30,
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
    },
    caloriesRemaining: {
        alignItems:'center', 
        alignSelf: 'center',
        justifyContent:'center',  
        backgroundColor:'#D4947C',     
        width: 250,
        height: 250, 
        marginTop: 50,
        borderRadius: 150,
    },
    nutrition: {
        alignItems:'center', 
        justifyContent:'center',
        margin: 25
    },
    date: {
        alignItems:'center', 
        justifyContent:'center',
    }
});