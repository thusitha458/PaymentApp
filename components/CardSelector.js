import React from "react";
import {View, StyleSheet, Image} from "react-native";
import {CARD_TYPES} from "../config/constants";

const CardSelector = props => {
    return (
        <View style={styles.container}>
            <View style={props.selectedCard === CARD_TYPES.VISA ? {...styles.cardWrapper, ...styles.selected} : styles.cardWrapper}>
                <Image style={styles.cardImage} source={require('../assets/card-visa.png')}/>
            </View>
            <View style={props.selectedCard === CARD_TYPES.MASTERCARD ? {...styles.cardWrapper, ...styles.selected} : styles.cardWrapper}>
                <Image style={styles.cardImage} source={require('../assets/card-mastercard.png')}/>
            </View>
            <View style={props.selectedCard === CARD_TYPES.AMEX ? {...styles.cardWrapper, ...styles.selected} : styles.cardWrapper}>
                <Image style={styles.cardImage} source={require('../assets/card-amex.png')}/>
            </View>
            <View style={props.selectedCard === CARD_TYPES.DINERSCLUB ? {...styles.cardWrapper, ...styles.selected} : styles.cardWrapper}>
                <Image style={styles.cardImage} source={require('../assets/card-dinersclub.png')}/>
            </View>
            <View style={props.selectedCard === CARD_TYPES.DISCOVER ? {...styles.cardWrapper, ...styles.selected} : styles.cardWrapper}>
                <Image style={styles.cardImage} source={require('../assets/card-discover.png')}/>
            </View>
            <View style={props.selectedCard === CARD_TYPES.JCB ? {...styles.cardWrapper, ...styles.selected} : styles.cardWrapper}>
                <Image style={styles.cardImage} source={require('../assets/card-jcb.png')}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    cardWrapper: {
        opacity: 0.1,
        height: 20,
        width: 30,
        marginHorizontal: 2,
    },
    cardImage: {
        height: 20,
        width: 30,
    },
    selected: {
        opacity: 1,
    },
});

export default CardSelector;
