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
      { text: "baked goods or gluten", uri: "https://www.bakingbusiness.com/ext/resources/2019/6/OrganicWheat_Lead.jpg?t=1560864223&width=1080"},
      { text: "dairy and eggs", uri: "https://post.healthline.com/wp-content/uploads/2020/08/AN480-Eggs-Dairy-732x549-thumb.jpg" },
      { text: "fast food", uri: "https://youngmenshealthsite.org/wp-content/uploads/2015/05/iStock_000016515039Small.jpg" },
      { text: "seafood", uri: "https://miro.medium.com/max/800/1*qa8T3nnBWaMHV63xKS-Abg.jpeg" }, 
      { text: "grains and pasta", uri: "https://lh3.googleusercontent.com/proxy/uOdmmsJOzN9JqwMUAEfBSl6t_houh4ik-MR5fA5W2lrbBDbR6hm3yAZHyFE4gJwcE7ZhLGjpqcRF-g19fveghfKDVuFbqLkUT00L1Q" }, 
      { text: "meat", uri: "https://cdn.pixabay.com/photo/2018/02/08/15/01/meat-3139640_1280.jpg" },
      { text: "soup", uri: "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Potluck-Chicken-Vegetable-Soup_EXPS_FT20_15848_F_0110_1.jpg"},
      { text: "vegetarian", uri: "https://cdn.pixabay.com/photo/2016/10/31/18/23/salad-1786327__340.jpg" }
    ];

    var prefInputsInit = new Object;
    for (let item in foodPrefOptions) {
      prefInputsInit[foodPrefOptions[item].text] = 1;
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
    const newPrefInputs = { ...this.state.prefInputs, [card.text]: 0};
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