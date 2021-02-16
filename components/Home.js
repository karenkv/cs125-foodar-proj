import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: [
                require('../assets/home.png'),
                require('../assets/search.png'),
                require('../assets/profile.png'),
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
                    renderItem={({item}) => (<Image source={item}/>)}
                    keyExtractor={(index) => index.toString()}
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