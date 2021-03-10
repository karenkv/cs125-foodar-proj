import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Linking } from 'react-native';
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
            origin: { latitude: 33.651381302843774, longitude: -117.83880949630442 }, // utc coordinates
            searchText: props.route.params != null ? props.route.params.searchText : "sushi",
        };
        config = {
            headers: { Authorization: `Bearer ${Config.YELP_API_KEY}`, },
            params: {
                term: this.state.searchText,
                latitude: this.state.origin.latitude,
                longitude: this.state.origin.longitude,
                limit: 20,
                categories: "food,restaurants"
            },
        }
    }

    getLocation = () => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position) => {
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
                (err) => {
                    console.log('Error getting location');
                    console.log(err);
                    reject(reject);
                },
                { enableHighAccuracy: true, timeout: 200000, maximumAge: 3000 }
            );
        });
    };

    fetchMarkerData() {
        console.log(`Fetching ${config.params.term} restaurants...`);
        return axios
            .get(YELP_API_URL, config)
            .then(responseJson => {
                this.setState({ isLoading: false, results: responseJson.data.businesses.filter(item => item.transactions.includes("delivery")) });
            })
            .catch(error => {
                console.log(error);
            });
    }

    changeSearchInput(inputText) {
        this.setState({ searchText: inputText, });
    }

    async endEditing() {
        const inputText = this.state.searchText;
        if (inputText != "" || inputText.length > 0) {
            console.log(inputText);
            config.params.term = inputText;
            await this.fetchMarkerData();
        }
    }

    async componentDidMount() {
        await this.getLocation().catch(error => { console.log(error) });
        await this.fetchMarkerData();
    }

    render() {
        const results = this.state.results;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>recommend</Text>
                    <Image source={require('../assets/divider.png')} />
                </View>
                <View style={styles.body}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="search"
                            placeholderTextColor={this.placeholderTextColor}
                            onChangeText={text => this.changeSearchInput(text)}
                            onEndEditing={() => this.endEditing()}
                            autoCorrect={false}
                        />
                        <Image style={styles.searchIcon} source={require('../assets/search.png')} />
                    </View>
                    <FlatList style={styles.scrollView}
                        data={results}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(result) => result.id}
                        renderItem={({ item }) => {
                            if (this.state.isLoading) {
                                return (
                                    <Text>Finding the best places...</Text>
                                )
                            }
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log(`pressed ${item.name}`);
                                        Linking.openURL(item.url);
                                    }}>
                                    <View style={styles.listItemContainer}>
                                        <View style={styles.listItem}>
                                            <Text numberOfLines={1} style={styles.listItemName}>{item.name}</Text>
                                            <Text style={styles.listItemPhone}>{item.display_phone != "" ? item.display_phone : "-"}</Text>
                                            {/* <Text style={styles.listItemDetails}>
                                                { item.location.address1 != "" 
                                                    ? `${item.location.address1}\n${item.location.city}, ${item.location.state} ${item.location.zip_code}`
                                                    : "-"}
                                            </Text> */}
                                            <Text style={styles.listItemDetails}>{(item.transactions.includes("delivery") ? "✓ delivery" : "ⅹ delivery")
                                                + "\t" + (item.transactions.includes("pickup") ? "✓ pickup" : "ⅹ pickup")}
                                            </Text>
                                        </View>
                                        <View style={styles.listItemImgContainer}>
                                            <Image 
                                                style={styles.listItemImg}
                                                source={{ uri: String(item.image_url) }} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View>
                                    <Text style={{ fontSize: 24, alignSelf: "center" }}>searching... or try again.</Text>
                                </View>
                            )
                        }}
                    />
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
        flexDirection: "column",
        backgroundColor: "#FAF9F5",
        justifyContent: "center",
    },
    header: {
        flex: 0.1,
        position: "relative",
        top: 70,
        left: 50,
        flexDirection: "column",
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
        flex: 0.8,
        paddingTop: 20
    },
    footer: {
        flex: 0.1
    },
    searchContainer: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
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
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        fontSize: 24,
        paddingLeft: 15,
        height: 50,
        borderColor: "transparent",
    },
    scrollView: {
        position: "relative",
        top: 90,
        marginVertical: 10,
        marginHorizontal: 50,
        maxHeight: 505,
    },
    listItemContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        marginVertical: 5,
        height: 92,
        width: 312,
        borderRadius: 5,
        justifyContent: "space-between",
    },
    listItemImgContainer: {
        width: 75,
        height: 72,
        overflow: "hidden",
        marginLeft: 8,
        position: "relative",
        right: 0,
    },
    listItemImg: {
        borderRadius: 0,
        width: 80,
        height: 80,
        resizeMode: "stretch",
        justifyContent: "flex-start",
    },
    listItem: {
        flexDirection: "column",
        padding: 5,
        maxWidth: 215,
    },
    listItemName: {
        fontSize: 18,
        marginBottom: 3,
    },
    listItemPhone: {
        fontSize: 16,
        marginBottom: 3,
        color: "gray"
    },
    listItemDetails: {
        fontSize: 16,
        marginBottom: 2,
    }
});