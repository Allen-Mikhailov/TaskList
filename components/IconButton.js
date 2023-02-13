import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput, TouchableWithoutFeedback  } from 'react-native';
import { useEffect, useState } from 'react';
import mainstyles from '../modules/mainstyles';

const styles = StyleSheet.create({
    button: {
        width: "10%",
        aspectRatio: 1,
        // height: "7%",

        borderWidth: 1,
        borderColor: mainstyles.buttonColor,
        borderRadius: "5%",
    },

    icon: {
        tintColor: mainstyles.buttonColor,
        width: "100%",
        height: "100%",
    }
})

export default function({style, imagestyle, source, onPress})
{
    return <Pressable onPress={onPress} style={[styles.button, style]}>
        <Image source={source} style={[styles.icon, imagestyle]}/>
    </Pressable>
}