import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

const styles = StyleSheet.create({
    markBackground: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: "50%",
    },
    checkmark: {
        top: "15%",
        left: "15%",
        width: "70%",
        height: "70%",
        borderRadius: "50%",
        backgroundColor: "#aaa"
    },
})

export default function CheckBox({checked})
{
    return <View style={styles.markBackground}>
        {checked? <View style={styles.checkmark}/>: null}
    </View>
}