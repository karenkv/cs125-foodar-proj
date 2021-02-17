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
          source={{uri: this.props.uri}}
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
      { text: "Dairy", uri: "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/nutraingredients.com/news/research/global-study-links-high-fat-dairy-consumption-to-blood-and-heart-health/11403932-1-eng-GB/Global-study-links-high-fat-dairy-consumption-to-blood-and-heart-health.jpg" },
      { text: "Nuts", uri: "https://selecthealth.org/-/media/selecthealth82/article/post/2017/05/nuts_blog_lg.ashx"},
      { text: "Low-Carb", uri: "https://cdn.pixabay.com/photo/2015/01/03/16/56/bread-587597__340.jpg" },
      { text: "Seafood", uri: "https://miro.medium.com/max/800/1*qa8T3nnBWaMHV63xKS-Abg.jpeg" }, 
      { text: "Red Meat", uri: "data:image/jpeg;base64,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" },
      { text: "Vegetarian", uri: "https://cdn.pixabay.com/photo/2016/10/31/18/23/salad-1786327__340.jpg" },
      { text: "Vegan", uri: "https://live.staticflickr.com/7837/47227303852_b36d09aeb8_b.jpg" },
    ];
    this.state = {
      cards: foodPrefOptions
    };
  }

  handleYup (card) {
    console.log(`Like for ${card.text}`)
    return true;
  }

  handleNope (card) {
    console.log(`Dislike for ${card.text}`)
    return true;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>sign up</Text>
            <Image source={require('../assets/divider.png')}/>
        </View>
        <SwipeCards
          cards={this.state.cards}
          ref={(swiper) => this.swiper = swiper}
          loop={false}
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
        <Text style={styles.caption}>Swipe right on foods you like and left on foods you dislike</Text>
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
    fontSize: 72,
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
    bottom: 30,
    marginHorizontal: 80,
  },
});