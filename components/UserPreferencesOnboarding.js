'use strict';

import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, RefreshControlBase } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import CustomButton from './CustomButton';

// React Native module for a Tinder-like swipe card deck
import SwipeCards from "react-native-swipe-cards-deck";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Image 
          style={styles.thumbnail}
          source={{uri: this.props.uri}}
        />
        <Text style={styles.cardText}>{this.props.text}</Text>
        <View style={{flex:1, flexDirection:"row", position:"absolute", bottom:7, justifyContent:"space-between", minWidth: 130}}>
          <Text style={{fontSize:24,}}>💔</Text> 
          <Text style={{fontSize:24,}}>❤️</Text> 
        </View>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View>
        <Text style={styles.NoMoreCards}>thanks for letting us know!</Text>
        <CustomButton
          title="done"
          onPress={() => {
            this.props.navigation.navigate('Home');
            this.props.addUserPreferences();
          }}
          style={{ 
            backgroundColor: "#FAF9F5", 
            maxWidth: 75, 
            alignSelf: "center" 
          }} 
        />
      </View>
    )
  }
}

export default class UserPreferencesOnboarding extends Component {
  constructor(props) {
    super(props);
    const foodPrefOptions = [
      { text: "dairy", uri: "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/nutraingredients.com/news/research/global-study-links-high-fat-dairy-consumption-to-blood-and-heart-health/11403932-1-eng-GB/Global-study-links-high-fat-dairy-consumption-to-blood-and-heart-health.jpg" },
      { text: "nuts", uri: "https://selecthealth.org/-/media/selecthealth82/article/post/2017/05/nuts_blog_lg.ashx"},
      { text: "low-carb", uri: "https://cdn.pixabay.com/photo/2015/01/03/16/56/bread-587597__340.jpg" },
      { text: "seafood", uri: "https://miro.medium.com/max/800/1*qa8T3nnBWaMHV63xKS-Abg.jpeg" }, 
      { text: "red meat", uri: "https://cdn.pixabay.com/photo/2018/02/08/15/01/meat-3139640_1280.jpg" },
      { text: "vegetarian", uri: "https://cdn.pixabay.com/photo/2016/10/31/18/23/salad-1786327__340.jpg" },
      { text: "vegan", uri: "https://live.staticflickr.com/7837/47227303852_b36d09aeb8_b.jpg" },
    ];

    var prefInputsInit = new Object;
    for (let item in foodPrefOptions) {
      prefInputsInit[foodPrefOptions[item].text] = true;
    }

    this.state = {
      cards: foodPrefOptions,
      prefInputs: prefInputsInit,
    };

    this.handleNope = this.handleNope.bind(this);
    this.handleYup = this.handleYup.bind(this);
    this.addUserPreferences = this.addUserPreferences.bind(this);
  }

  async addUserPreferences() {
    const ref = firestore().collection('user-pref');
    const uid = auth().currentUser.uid;
    console.log(this.state.prefInputs);
    await ref.doc(uid).set(this.state.prefInputs);
  }

  handleYup (card) {
    console.log(`like for ${card.text}`);
    return true;
  }

  handleNope (card) {
    console.log(`dislike for ${card.text}`);
    const newPrefInputs = { ...this.state.prefInputs, [card.text]: false};
    this.setState({
      prefInputs: newPrefInputs
    });
    return true;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>preferences</Text>
            <Image source={require('../assets/divider.png')}/>
        </View>
        <SwipeCards
          cards={this.state.cards}
          loop={false}
          renderCard={(cardData) => <Card {...cardData} />}
          keyExtractor={(cardData) => String(cardData.text)}
          renderNoMoreCards={() => <NoMoreCards addUserPreferences={this.addUserPreferences} {...this.props} />}
          showYup={true}
          showNope={true}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          yupText={"like ❤️"}
          nopeText={"dislike 💔"}
          yupStyle={styles.yup}
          nopeStyle={styles.nope}
          yupTextStyle={styles.yupText}
          nopeTextStyle={styles.nopeText}
        />
        <Text style={styles.caption}>swipe right on foods you like and left on foods you dislike</Text>
        <View style={styles.buttonContainer}>
          <CustomButton 
            title="skip"
            onPress={() => {
              this.props.navigation.navigate('Home');
              this.addUserPreferences();
            }}
          />
        </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FAF9F5",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  header: {
    flex: 0.1,
    top: 80,
    left: 50,
    alignContent: "flex-start",
    alignSelf:"flex-start",
    height: 150,
  },
  title: {
    color: "#D22624",
    fontSize: 53,
    paddingBottom: 100,
  },
  card: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
    width: 300,
    height: 400,
  },
  cardText: {
    fontSize: 24,
    marginTop: 16,
    color: "black",
    alignSelf: "center",
  },
  NoMoreCards: {
    color: "#D4947C",
    fontSize: 22,
  },
  yup: {
    borderColor: "transparent",
    position: "absolute",
    padding: 20,
    bottom: 50,
    right: 0,
  },
  yupText: {
    fontSize: 20,
    color: "#D4947C",
  },
  nope: {
    borderColor: "transparent",
    position: "absolute",
    padding: 20,
    bottom: 50,
    left: 0,
  },
  nopeText: {
    fontSize: 20,
    color: "#D4947C",
  },
  thumbnail: {
    width: 250,
    height: 250,
  },
  caption: {
    fontSize: 16,
    color: "#D4947C",
    justifyContent: "center",
    position:"relative",
    bottom: 40,
    marginHorizontal: 80,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    minWidth: 280,
    position: "relative",
    bottom: 25,
  }
});