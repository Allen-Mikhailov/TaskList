import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

const styles = StyleSheet.create({
    markBackground: {
        width: 35,
        height: 35,
        backgroundColor: "#f00",
        borderRadius: "5%",
        left: "10%",
        top: "-25%"
        // flex: 1
    },
    checkboxContainer: {
        width: "100%",
        // flexDirection: "row-reverse",
        // justifyContent: 'right',
        flex: 1
    },
    checkmark: {
        top: "15%",
        left: "15%",
        width: "70%",
        height: "70%",
    }
})

export default function CheckBox(props)
{


    return<Pressable style={styles.checkboxContainer} onPress={() => props.setChecked(!props.checked)}>
        <View style={styles.markBackground}>
            {props.checked? <Image source={require("../images/checkmark.png")} style={styles.checkmark}></Image>: null}
            <View style={styles.checkmark}></View>
        </View>
    </Pressable>
}