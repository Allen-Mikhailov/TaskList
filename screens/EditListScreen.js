import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable, Dimensions, TextInput, Image } from 'react-native';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { store } from '../store.js';
import TagSymbol from '../components/TagSymbol.js';

export default function EditListScreen({ navigation, route })
{
    const { listId } = route.params;
    const [lists, setLists, updateLists] = store.useState("lists")
    const [tags, setTags] = store.useState("tags")
    const [ newListName, setNewListName ] = useState(lists[listId].name)
    const [ changed, setChanged ] = useState(false)

    function DeleteList()
    {
        updateLists(lists => {
            delete lists[listId]
        })
    }

    function ApplyEdits()
    {
        updateLists(lists => {
            lists[listId].name = newListName
        })
        setChanged(false)
    }

    function ListNameChanged(newText)
    {
        if (newText != listId && !changed)
            setChanged(true)
        setNewListName(newText)
    }

    return <View style={styles.container}>
        {/* Edit List Header */}
        <Text style={styles.header}>{newListName}</Text>

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

        {/* Tag Editor */}
        <View style={styles.tagBackground}>
            <FlatList
            style={styles.tagContainer} 
            data={Object.keys(tags)}
            renderItem={({item}) => <Pressable style={styles.tag} onPress={
                () => updateLists(lists => {
                    if (lists[listId].tags[item])
                        delete lists[listId].tags[item]
                    else
                        lists[listId].tags[item] = true
                })}>
                    <View style={[styles.tagCircle, {backgroundColor: tags[item].color || "red"}]}/>
                    <Text style={styles.tagText}>{item}</Text>
                    {lists[listId].tags[item] && <Image source={require("../images/whiteCheck.png")} style={styles.tagCheck}/>}
                </Pressable>}
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
    },
    header: {
        fontSize: "50%"
    },

    // Tag editor
    tagBackground: {
        width: "50%",
        height: "40%",
        backgroundColor: "grey",
        borderRadius: "25%",
        marginBottom: "5%",
        borderWidth: 2
    },
    tagContainer: {
        width: "100%",
        marginVertical: "10%",
        borderTopWidth: 2,
    },
    tag: {
        width: "100%",
        height: windowHeight*.075,
        borderBottomWidth: 2,
        justifyContent: "space-evenly",
    },
    tagCircle: {
        width: windowWidth*.05,
        height: windowWidth*.05,
        borderRadius: "50%",
        marginLeft: "5%",
        // position: "relative",
        top: "25%"
    },
    tagText: {
        fontSize: "20%",
        marginLeft: "20%",
        top: "-25%",
        fontWeight: "bold",
        color: "white",
    },
    tagCheck: {
        width: windowWidth*.08,
        height: windowWidth*.08,
        borderRadius: "50%",
        marginLeft: "80%",
        top: "20%",
        position: "absolute",
        // top: windowWidth*(.075-.05)
    }
})