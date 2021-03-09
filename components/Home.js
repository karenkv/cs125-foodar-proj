import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import Navigation from './Navigation';
import CustomButton from './CustomButton';
import AppleHealthKit from 'react-native-health';


const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", 
    "september", "october", "november", "december"];

const options = {
    permissions: {
        read: ["Height", "Weight", "StepCount"],
        write: ["Height", "Weight", "StepCount"]
    }
};

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            calories: 2000,
            carbs: 0,
            protein: 0,
            fat: 0,
            caloriesInput: 0,
            carbsInput: 0,
            proteinInput: 0,
            fatInput: 0,
            recommendedMeal: 'burger',
            recommendedCalories: 500,
            height: 0,
            weight: 0,
            steps: 0,
            activity: ''
        };
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
        await this.getHeight();
        await this.getWeight();
        for(i = 1; i < 8; i++) {
            await this.getSteps(i);
        }
        await this.getActivity();
    }

    getSteps = (i) => {
        return new Promise(resolve => {
            let d = new Date();
            const dateOpt = {date: new Date(d.setDate(d.getDate() - i)).toISOString()};
            AppleHealthKit.getStepCount(dateOpt, (err, results) => {
                if (err) {
                    console.log("error getting steps: ", dateOpt);
                    return;
                }
                console.log("steps: ", results.value);
                this.setState({steps: this.state.steps += results.value}, () => { resolve() });
            });
        });
    }

    getHeight = () => {
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

    getWeight = () => {
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

    getActivity = () => {
        const steps = this.state.steps / 6;
        return new Promise(resolve => {
            if(steps < 3000) {
                this.setState({activity: 'low'}, () => { resolve() });
            } else if(steps >= 3000 && this.state.steps < 7000) {
                this.setState({activity: 'med'}, () => { resolve() });
            } else {
                this.setState({activity: 'high'}, () => { resolve() });
            }
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
        this.setState({calories: this.state.calories - parseInt(this.state.caloriesInput)});
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
                        <View style={styles.recommend}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>recommended meal</Text>
                            <Text style={{fontSize: 18, paddingTop: 10, paddingBottom: 10}}>{this.state.recommendedMeal}</Text>
                            <Text style={{fontSize: 14, fontStyle: 'italic'}}>~{this.state.recommendedCalories} calories</Text>
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
        backgroundColor:'#FFFFFF',     
        width: 250,
        height: 100, 
        marginTop: 15,
        borderRadius: 10,
        padding: 15
    }
});