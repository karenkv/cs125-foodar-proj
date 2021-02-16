import React, { Component } from 'react';
import {View, StyleSheet, Image, FlatList, TouchableHighlight} from 'react-native';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: [
                {id: 'Home', src:require('../assets/home.png')},
                {id: 'Search', src:require('../assets/search.png')},
                {id: 'Profile', src:require('../assets/profile.png')},
            ]
        };
      }

    render() {
        return (
            <View>
                <FlatList
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    data={this.state.icons}
                    renderItem={({item}) => (
                        <View style={styles.icon}>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => this.props.navigation.navigate(item.id)}
                            >
                                <Image source={item.src}/>
                            </TouchableHighlight>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    icon: {
        flexWrap: "wrap"
    }
});