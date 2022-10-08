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
    const [ changed, setChanged ] = useState(false)

    function DeleteList()
    {
        updateLists(lists => {
            delete lists[listName]
        })
    }

    function ApplyEdits()
    {
        updateLists(lists => {
            if (newListName != listName)
            {
                const list = lists[listName]
                delete lists[listName]
                lists[newListName] = list
            }
        })
    }

    function ListNameChanged(newText)
    {
        if (newText != listName && !changed)
            setChanged(true)
        setNewListName(newText)
    }

    return <View style={styles.container}>
        {/* Edit List Name */}
        <View style={styles.EditListNameContainer}>
            <Text style={styles.EditListNameText}>List Name</Text> 
            <TextInput 
                defaultValue={newListName} 
                onChangeText={ListNameChanged} 
                placeholder="Untitled" 
                style={styles.EditListNameInput}
            />
        </View>

        {/* Apply Button */}
        {changed && <Pressable style={styles.applyButton} onPress={ApplyEdits}>
            <Text style={styles.applyText}> APPLY </Text>
        </Pressable>}

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
    EditListNameContainer: {
        flexDirection: "row",
        margin: "5%"
    },
    EditListNameText: {
        fontSize: "25%",
        marginRight: "5%",
        padding: "2%",
    },
    EditListNameInput: {
        borderWidth: 2,
        borderRadius: "7.6%",
        fontSize: "25%",
        padding: "2%",
        width: "50%",
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
        color: "white",
        fontWeight: "bold"
    },
    applyButton: {
        borderRadius: "10%",
        backgroundColor: "#58f58c",
        borderWidth: 3,
        borderColor: "#13ab45",
        padding: "3%",
        paddingHorizontal: "10%",
        marginBottom: "3%"
    },
    applyText: {
        fontSize: "15%",
        color: "black",
        fontWeight: "bold"
    }
})