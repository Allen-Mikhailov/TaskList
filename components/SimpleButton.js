import { StyleSheet, Text, View, Button , TextInput, ScrollView, Image, Pressable } from 'react-native';

import mainstyles from '../modules/mainstyles';

const styles = StyleSheet.create({
    baseButton: {
        
    },

    text: {
        color: mainstyles.buttonColor,
        fontSize: "20%"
    }
})

export default function({style, text, textStyle, onPress})
{
    return <Pressable style={style} onPres={onPress}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
}