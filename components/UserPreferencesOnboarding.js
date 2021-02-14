import React, { Component } from 'react';
import { Image, Button, View, Text, StyleSheet } from 'react-native';

import SwipeCards from "react-native-swipe-cards-deck";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text>{this.props.Text}</Text>
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
    bgColor = "white";
    const foodPrefOptions = [
      { text: "Dairy", backgroundColor: bgColor },
      { text: "Low-Carb", backgroundColor: bgColor },
      { text: "Seafood", backgroundColor: bgColor },
      { text: "Red Meat", backgroundColor: bgColor },
      { text: "Vegetarian", backgroundColor: bgColor },
      { text: "Vegan", backgroundColor: bgColor },
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
          cards={this.state.cards}
          renderCard={(cardData) => <Card {...cardData} />}
          keyExtractor={(cardData) => String(cardData.text)}
          renderNoMoreCards={() => <NoMoreCards {...this.props} />}
          stack={true}
          stackDepth={3}
          stackOffsetX={10}
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
    width: 300,
    height: 400,
  },
  cardsText: {
    fontSize: 22,
    color: "black",
  },
  noMoreCardsText: {
    fontSize: 46,
  },
  yup: {
    borderColor: "transparent",
    position: "absolute",
    padding: 20,
    bottom: 50,
    right: 0,
  },
  yupText: {
    fontSize: 18,
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
    fontSize: 18,
    color: "#f8f8ff",
  },
});