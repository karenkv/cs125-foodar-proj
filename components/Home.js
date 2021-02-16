import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, FlatList, TouchableHighlight} from 'react-native';

export default class Home extends Component {
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
            <>
            <View>
                <Text style={styles.header}>home</Text>
            </View>
            <View>
                <Image source={require('../assets/divider.png')}/>
            </View>
            <View>
                <FlatList
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    data={this.state.icons}
                    renderItem={({item}) => (
                        <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => this.props.navigation.navigate(item.id)}>
                            <Image source={item.src}/>
                        </TouchableHighlight>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            </>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        color: '#D22624',
        fontSize: 72,
        fontWeight: 'bold',
    }
});