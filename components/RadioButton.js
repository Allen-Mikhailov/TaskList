import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import mainstyles from '../modules/mainstyles';

const styles = StyleSheet.create({
    markBackground: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: mainstyles.buttonColor,
        borderRadius: "50%",
    },
    checkmark: {
        top: "15%",
        left: "15%",
        width: "70%",
        height: "70%",
        borderRadius: "50%",
        backgroundColor: mainstyles.buttonColor
    },
})

export default function CheckBox({checked})
{
    return <View style={styles.markBackground}>
        {checked? <View style={styles.checkmark}/>: null}
    </View>
}