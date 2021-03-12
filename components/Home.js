'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Modal, TextInput, TouchableOpacity } from 'react-native';
import Navigation from './Navigation';
import CustomButton from './CustomButton';
import AppleHealthKit from 'react-native-health';
import SwipeCards from "react-native-swipe-cards-deck";
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import data from '../data/data.json';


const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", 
    "september", "october", "november", "december"];

const options = {
    permissions: {
        read: ["Height", "Weight", "StepCount", "BiologicalSex", "DateOfBirth"],
        write: ["Height", "Weight", "StepCount", "BiologicalSex", "DateOfBirth"]
    }
};

class Card extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <View style={styles.card}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>recommended meal</Text>
            <Text style={{fontSize: 18, paddingTop: 10, paddingBottom: 10}}>{this.props.meal}</Text>
            <Text style={{fontSize: 14, fontStyle: 'italic'}}>~{this.props.calories} calories</Text>       
        </View>
      );
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.placeholderTextColor = "#ACACAC";
        this.state = {
            modalVisible: false,
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
            caloriesInput: 0,
            carbsInput: 0,
            proteinInput: 0,
            fatInput: 0,
            recommendedMeal: '',
            recommendedCalories: 0,
            height: 0,
            weight: 0,
            steps: 0,
            activity: '',
            sex: '',
            age: 0,
            bmr: 0,
            prefs: {},
            recommendations: [],
            cardPlace: 0
        };

        this.handleNope = this.handleNope.bind(this);
        this.handleYup = this.handleYup.bind(this);
    }

    async componentDidMount() {
        AppleHealthKit.initHealthKit(options, (err, results) => {
            if (err) {
                console.log("error initializing Healthkit: ", err);
                return;
            }
            this.fetchData();
        });
    }

    fetchData = async () => {
        await this.getSex();
        await this.getAge();
        await this.getHeight();
        await this.getWeight();
        let i;
        for(i = 1; i < 8; i++) {
            await this.getSteps(i);
        }
        await this.getActivity();
        await this.getBMR();
        await this.getCalories();
        await this.getPrefs();
        await this.getRecommendations();
    }

    getSteps = async (i) => {
        return new Promise(resolve => {
            let d = new Date();
            const dateOpt = {date: new Date(d.setDate(d.getDate() - i)).toISOString()};
            AppleHealthKit.getStepCount(dateOpt, (err, results) => {
                if (err) {
                    console.log("error getting steps: ", err);
                    this.setState({steps: this.state.steps += 0}, () => { resolve() });
                    return;
                }
                console.log("steps for ", i, ": ", results.value);
                this.setState({steps: this.state.steps += results.value}, () => { resolve() });
            });
        });
    }

    getAge = async () => {
        return new Promise(resolve => {
            AppleHealthKit.getDateOfBirth(null, (err, results) => {
                if (err) {
                    console.log("error getting latest age: ", err);
                    return;
                }
                console.log("age: ", results.age);
                this.setState({age: results.age}, () => { resolve() });
            });
        });
    }

    getSex = async () => {
        return new Promise(resolve => {
            AppleHealthKit.getBiologicalSex(null, (err, results) => {
                if (err) {
                    console.log("error getting latest age: ", err);
                    return;
                }
                console.log("sex: ", results.value);
                this.setState({sex: results.value}, () => { resolve() });
            });
        });
    }

    getHeight = async () => {
        return new Promise(resolve => {
            AppleHealthKit.getLatestHeight(null, (err, results) => {
                if (err) {
                    console.log("error getting latest height: ", err);
                    return;
                }
                console.log("height: ", results.value);
                this.setState({height: results.value}, () => { resolve() });
            });
        });
    }

    getWeight = async () => {
        return new Promise(resolve => {
            AppleHealthKit.getLatestWeight(null, (err, results) => {
                if (err) {
                    console.log("error getting latest weight: ", err);
                    return;
                }
                console.log("weight: ", results.value);
                this.setState({weight: results.value}, () => { resolve() });
            });
        });
    }

    getActivity = async () => {
        const steps = this.state.steps / 6;
        console.log("Activity set");
        return new Promise(resolve => {
            if(steps < 1500) {
                this.setState({activity: 'very low'}, () => { resolve() });
            } else if(steps >= 1500 && steps < 3000) {
                this.setState({activity: 'low'}, () => { resolve() });
            } else if(steps >= 3000 && steps < 6000) {
                this.setState({activity: 'moderate'}, () => { resolve() });
            } else if(steps >= 6000 && steps < 7500) {
                this.setState({activity: 'high'}, () => { resolve() });
            } else {
                this.setState({activity: 'very high'}, () => { resolve() });
            }
        });
    }

    getBMR = async () => {  
        return new Promise(resolve => {
            console.log("BMR set");
            if(this.state.sex === 'female') {
                this.setState({bmr: 
                    66 + (6.3 * this.state.weight) + (12.9 * this.state.height) - (6.8 * this.state.age)},
                    () => { resolve() });
            } else {
                this.setState({bmr: 
                    65 + (4.3 * this.state.weight) + (4.7 * this.state.height) - (4.7 * this.state.age)},
                    () => { resolve() });
            }
        });
    }

    getCalories = async () => {
        return new Promise(resolve => {
            console.log("Calories set");
            if(this.state.activity === 'very low') {
                this.setState({calories: this.state.bmr * 1.2}, () => { resolve() });
            } else if(this.state.activity === 'low') {
                this.setState({calories: this.state.bmr * 1.375}, () => { resolve() });
            } else if(this.state.activity === 'moderate') {
                this.setState({calories: this.state.bmr * 1.55}, () => { resolve() });
            } else if(this.state.activity === 'high') {
                this.setState({calories: this.state.bmr * 1.725}, () => { resolve() });
            } else {
                this.setState({calories: this.state.bmr * 1.9}, () => { resolve() });
            }
        });
    }
    
    getPrefs = async () => {
        return new Promise(resolve => {
                firestore().collection('user-pref').doc(auth().currentUser.uid).get()
                .then(documentSnapshot => {
                    console.log("prefs: ", documentSnapshot.data());
                    this.setState({prefs: documentSnapshot.data()}, () => { resolve() });
                });
            })
        }

    getRecommendations = async () => {
        return new Promise(resolve => {
            let total = this.state.fat + this.state.protein + this.state.carbs;
            let fat_p = total > 0 ? (.3 - (this.state.fat / total)) * 100 : 0;
            let protein_p = total > 0 ? (.2 - (this.state.protein / total)) * 100 : 0;
            let carbs_p = total > 0 ? (.5 - (this.state.carbs / total)) * 100 : 0;
            console.log("getting recs");

            let food_recs = [];
            let i;
            for(i = 0; i < data.length; i++) {
                let obj = data[i];
                let score = 0.0;
                let key;
                for(key in obj) {
                    if(key === "calories") {
                        if(obj[key] > this.state.calories){
                            score -= 10.0;
                        }
                    } else if(key === "fat") {
                        score += obj[key] * fat_p;
                    } else if(key === "protein") {
                        score += obj[key] * protein_p;
                    } else if(key === "carbs") {
                        score += obj[key] * carbs_p;
                    } else if(obj[key] == this.state.prefs[key]) {
                        score += 10.0
                    }
                }
                food_recs.push({"meal": obj["name"], "calories": obj["calories"], "score": score})
            }

            food_recs.sort(function(obj1, obj2) {
                return obj2.score - obj1.score;
            });

            console.log("recommendations: ", food_recs.slice(0, 10));
            this.setState({
                recommendations: food_recs.slice(0, 10),
                recommendedMeal: food_recs[0].meal,
                recommendedCalories: food_recs[0].calories
            }, () => { resolve() });
        });
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
        this.setState({
            calories: this.state.calories - parseInt(this.state.caloriesInput),
            carbs: this.state.carbs + parseInt(this.state.carbsInput),
            protein: this.state.protein + parseInt(this.state.proteinInput),
            fat: this.state.fat + parseInt(this.state.fatInput)
        }, () => {
            this.getRecommendations();
        });
    }

    handleYup = () => {
        console.log(`swiped right on meal recommendation for ${this.state.recommendedMeal}`);
        this.props.navigation.navigate('Search', {searchText: this.state.recommendedMeal});
        return false;
    }

    handleNope = () => {
        console.log(`swiped left on meal recommendation for ${this.state.recommendedMeal}`);
        this.setState({
          recommendMeal: this.state.recommendations[this.state.cardPlace + 1].meal,
          recommendedCalories: this.state.recommendations[this.state.cardPlace + 1].calories,
          card: this.state.cardPlace < 10 ? this.state.cardPlace + 1 : 0
        });
        return true;
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
                            onChangeText={(text)=>this.handleChange(text, 'caloriesInput')}
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
                        <View style={styles.caloriesRemaining}>
                            <Text style={{color: "#FAF9F5", fontSize: 24, textAlign: "center"}}>
                                {Number.parseFloat(this.state.calories).toFixed(2)}{`\ncalories\nleft`}
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
                        <View style={styles.recommend}>
                                <SwipeCards
                                    cards={this.state.recommendations}
                                    renderCard={(cardData) => <Card {...cardData} />}
                                    keyExtractor={(cardData) => String(cardData.meal)}
                                    handleYup={this.handleYup}
                                    handleNope={this.handleNope}
                                    showYup={false}
                                    showNope={false}
                                    loop={true}
                                    smoothTransition={true}
                                />
                        </View>
                        <View style={styles.activity}>
                            <Text style={{fontSize: 18, fontStyle: 'italic'}}>
                                activity this week: {this.state.activity}
                            </Text>
                        </View>
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
        marginTop: 30,
        borderRadius: 150,
    },
    nutrition: {
        alignItems:'center', 
        justifyContent:'center',
        margin: 15
    },
    date: {
        alignItems:'center', 
        justifyContent:'center',
    },
    recommend: {
        alignItems:'center', 
        alignSelf: 'center',
        justifyContent:'center',  
        marginTop: 15,
        width: 250,
        height: 100, 
    },
    card: {
        backgroundColor:'#FFFFFF',     
        width: 250,
        height: 100, 
        borderRadius: 10,
        padding: 15
    },
    activity: {
        alignItems:'center', 
        justifyContent:'center',
        marginTop: 25
    }
});