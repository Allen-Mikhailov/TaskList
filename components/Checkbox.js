import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

const styles = StyleSheet.create({
    markBackground: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: "5%",
    },
    checkboxContainer: {
        borderColor: "#fff",
        border: "10%",
        // justifyContent: "center"
    },
    checkmark: {
        top: "15%",
        left: "15%",
        width: "70%",
        height: "70%",
    },
})

export default function CheckBox({checked, setChecked})
{
    return <Pressable style={styles.checkboxContainer}
        onPress={() => setChecked(!checked)}>
        <View style={styles.markBackground}>
            {checked? <Image source={require("../images/checkmark.png")} style={styles.checkmark}></Image>: null}
            <View style={styles.checkmark}></View>
        </View>
    </Pressable>
}