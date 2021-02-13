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
        <Text style={styles.NoMoreCards}>That's all!</Text>
      </View>
    )
  }
}

export default class UserPreferencesOnboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {text: 'Dairy', backgroundColor: 'yellow'},
        {text: 'Seafood', backgroundColor: 'blue'},
        {text: 'Red Meat', backgroundColor: 'green'},
        {text: 'Vegetarian', backgroundColor: 'purple'},
        {text: 'Vegan', backgroundColor: 'purple'},
      ]
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
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        keyExtractor={(cardData) => String(cardData.text)}
        renderNoMoreCards={() => <NoMoreCards />}
        stack={true}
        stackDepth={3}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    )
  }
}


const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
});