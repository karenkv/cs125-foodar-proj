'use strict';

import React, { Component } from 'react';
import { Image, Button, View, Text, StyleSheet } from 'react-native';

import SwipeCards from "react-native-swipe-cards-deck";

class Card extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Image 
          style={styles.thumbnail}
          source={{uri: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif"}}
        />
        <Text style={styles.cardText}>{this.props.text}</Text>
        <View style={{flex:1, flexDirection:"row", position:"absolute", bottom:5}}>
          <Button title='💔' // TODO: fix dislike button onPress
            onPress={() => {this.props.swiper._forceSwipeLeft()}}/>
          <Button title='❤️' // TODO: fix like button onPress
            onPress={() => {this.props.swiper._forceSwipeRight()}}/>
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
        <Text style={styles.NoMoreCards}>Thanks for letting us know!</Text>
        <Button
          title="Done"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}

export default class UserPreferencesOnboarding extends Component {
  constructor(props) {
    super(props);
    const foodPrefOptions = [
      { text: "Dairy", },
      { text: "Nuts", },
      { text: "Low-Carb", },
      { text: "Seafood", }, 
      { text: "Red Meat", },
      { text: "Vegetarian", },
      { text: "Vegan", },
    ];
    this.state = {
      cards: foodPrefOptions
    };
  }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
    return true;
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
    return true;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Eating habits</Text>
        <SwipeCards
          ref={(swiper) => this.swiper = swiper}
          cards={this.state.cards}
          renderCard={(cardData) => <Card swiper={this.swiper} {...cardData} />}
          keyExtractor={(cardData) => String(cardData.text)}
          renderNoMoreCards={() => <NoMoreCards {...this.props} />}
          showYup={true}
          showNope={true}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          yupText={"Like ❤️"}
          nopeText={"Dislike 💔"}
          yupStyle={styles.yup}
          nopeStyle={styles.nope}
          yupTextStyle={styles.yupText}
          nopeTextStyle={styles.nopeText}
        />
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F8AD9D",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#f8f8ff",
    fontSize: 32,
    alignContent: "center",
    alignSelf: "center",
    top: 120,
    position: "relative",
  },
  card: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    width: 300,
    height: 400,
  },
  cardText: {
    fontSize: 24,
    color: "black",
    alignSelf: "center",
  },
  NoMoreCards: {
    color: "#f8f8ff",
    fontSize: 28,
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
    color: "#f8f8ff",
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
    color: "#f8f8ff",
  },
  thumbnail: {
    width: 250,
    height: 250,
  },
});