import { StyleSheet, Text, View, FlatList, Button, Pressable , TextInput, DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';

function TagSymbol({ tag, color, onpress })
{
    return <Pressable style={styles.tag} onPress={() => onpress(tag)}>
        <View style={[styles.circle, {backgroundColor: color}]}/>
        <Text style={[styles.tagText]}>{tag}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    tag: {
        alignSelf: 'flex-start',
        borderRadius: "10%",
        padding: 4,
        paddingRight: 10,
        backgroundColor: "#dfdfdf",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    tagText: {
        color: "black",
        fontSize: 20,
        borderRadius: "10%",
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        marginRight: 5
    }
})

export default TagSymbol