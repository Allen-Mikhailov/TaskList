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
    const [lists, setLists, updateLists] = store.useState("lists")
    const [tags, setTags] = store.useState("tags")
    const [ newListName, setNewListName ] = useState(listName)

    function DeleteList()
    {
        updateLists(lists => {
            delete lists[listName]
        })
    }

    return <View style={styles.container}>
        {/* Edit List Name */}
        <View style={styles.EditListNameContainer}>
            <Text style={styles.EditListNameText}>List Name</Text> 
            <TextInput 
                text={newListName} 
                onChangeText={setNewListName} 
                placeholder="Untitled" 
                style={styles.EditListNameInput}
            />
        </View>

        {/* Delete Button */}
        <Pressable style={styles.deleteButton} onPress={DeleteList}>
            <Text style={styles.deleteText}>DELETE</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteButton: {
        borderRadius: "10%",
        backgroundColor: "#f7746a",
        borderWidth: 3,
        borderColor: "#e33947",
        padding: "3%",
        paddingHorizontal: "10%",
    },
    deleteText: {
        fontSize: "15%",
        color: "white"
    }
})