import { StyleSheet, Text, View, FlatList, Button, Dimensions , TextInput, DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';

function TagSymbol({ tag, color, onpress })
{
    return <View style={styles.tag}>
        <View style={[styles.circle, {backgroundColor: color}]}/>
        <Text style={[styles.tagText]}>{tag}</Text>
    </View>
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
        borderWidth: 1,
        marginBottom: -10
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