import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable, Dimensions, TextInput } from 'react-native';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { store } from '../store.js';
import TagSymbol from './TagSymbol.js';

export default function EditListScreen({ navigation, route })
{
    const { listName } = route.params;
    const [lists, setLists] = store.useState("lists")
    const [tags, setTags] = store.useState("tags")

    return <View style={styles.container}>
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
})