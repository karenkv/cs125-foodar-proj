import React, { Component } from 'react';
import { Button, View, StyleSheet } from 'react-native';

export default class CustomButton extends Component {
    constructor(props) {
        super(props);
        this.onPress = props.onPress != null ? props.onPress : () => {console.log("save button pressed");};
        this.style = props.style;
    }

    render() {
        return (
            <View style={[ this.style, styles.buttonContainer]}>
                <Button 
                    title={this.props.title}
                    color="#D4947C"
                    onPress={ () => {
                        this.onPress();
                    }}
                    accessibilityLabel="Tap to save profile edits."
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 112,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "#D6CBA8",
        padding: 5,
        margin: 5
    },
});