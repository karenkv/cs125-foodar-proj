import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TextInput} from 'react-native';
import Navigation from './Navigation';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Config from 'react-native-config';

const YELP_API_URL = "https://api.yelp.com/v3/businesses/search";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            origin: { latitude:33.650340, longitude: -117.839313 },
            searchText: "",
        };

        config = {
            headers: { Authorization: `Bearer ${Config.YELP_API_KEY}`, },
            params: {
                term: 'healthy',
                latitude: this.state.origin.latitude,
                longitude: this.state.origin.longitude,
                limit: 10,
            },
        }
    }
    
    getLocation = () => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => {
                    let newOrigin = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    config.params.latitude = newOrigin.latitude;
                    config.params.longitude = newOrigin.longitude;

                    this.setState({
                        origin: newOrigin,
                    });
                    resolve(true);
                },
                err => {
                    console.log('Error getting location');
                    console.log(err);
                    reject(reject);
                },
                { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
            );
        });
    };

    fetchMarkerData() {
        console.log("Fetching data...");
        return axios
                .get(YELP_API_URL, config)
                .then(responseJson => {
                    this.setState({isLoading: false, markers: responseJson.data.businesses.map(x => x),});
                })
                .catch(error => {
                    console.log('Error with making request')
                    console.log(error);
                });
    }

    changeSearchInput(inputText) {
        this.setState({ searchText: inputText, });
    }

    async endEditing() {
        const inputText = this.state.searchText;
        if (inputText != "") {
            console.log(inputText);
            config.params.term = inputText; 
            await this.fetchMarkerData();
        }
    }

    async componentDidMount() {
        await this.getLocation();
        await this.fetchMarkerData();
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
                            placeholder="search 'sushi'"
                            placeholderTextColor={this.placeholderTextColor}
                            onChangeText={text => this.changeSearchInput(text)}
                            onEndEditing={() => this.endEditing()}
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
    },
    scrollView: {
        marginHorizontal: 10,
    }
});