import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

const styles = StyleSheet.create({
    markBackground: {
        width: 30,
        height: 30,
        // backgroundColor: "#f00",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: "5%",
        right: "-40%",
        // top: "-25%"
        // flex: 1
    },
    checkboxContainer: {
        flex: 1,
        borderColor: "#000",
        border: "10%",
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: "row-reverse"
    },
    checkmark: {
        top: "15%",
        left: "15%",
        width: "70%",
        height: "70%",
    },
})

export default function CheckBox(props)
{
    return <Pressable style={styles.checkboxContainer}
    onPress={() => {
        console.log(props.checked)
        props.setChecked(!props.checked)
        }}>
        <View style={styles.markBackground}>
            {props.checked? <Image source={require("../images/checkmark.png")} style={styles.checkmark}></Image>: null}
            <View style={styles.checkmark}></View>
        </View>
    </Pressable>
}