import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput, TouchableWithoutFeedback  } from 'react-native';
import { useEffect, useState } from 'react';
import {Keyboard} from 'react-native'

import SimpleButton from "../components/SimpleButton.js"

import { store } from '../store.js';
import mainstyles from '../modules/mainstyles.js';

const checkMark = require("../images/whiteCheck.png")
import IconButton from '../components/IconButton.js';

const deleteIcon = require("../images/DeleteIcon.png")

function EditListScreen()
{
    const [editListId, setEditListId ]  = store.useState("editList")
    const [lists, setLists, updateLists] = store.useState("lists")
    let [tags, setTags] = store.useState("tags")
    const [ listName, setListName ] = useState(lists[editListId]? lists[editListId].name: "Untitled")

    const [toggledTags, setToggledTags] = useState({})

    // useEffect(() => {
    //     updateToggledTags((toggledTags) => {
    //         Object.keys(tags).map((tag) => {
    //             toggledTags[tag] = toggledTags[tag] || false
    //         })
    //     })
    // }, [tags])

    function saveEdits()
    {
        updateLists((lists) => {
            const newtags = []
            Object.keys(toggledTags).map((key, index) => {
                if (toggledTags[key])
                    newtags.push(key)
            })
            lists[editListId].tags = newtags
            lists[editListId].name = listName

        })
    }

    return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <View style={styles.editNameContainer}>
                <Text style={styles.listNameLabel}>List Name:</Text>
                <TextInput value={listName} onChangeText={setListName} style={styles.listNameInput}/>
            </View>

            {/* Tag Picker */}
            <View style={styles.tagPickerWrapper}>
                <Text style={styles.tagPickerLabel}>Tags</Text>
                <ScrollView style={styles.tagPicker}>
                    {Object.keys(tags).map((tag, index) => 
                        <Pressable style={styles.tag} onPress={() => {
                            const newTags = Object.assign({}, toggledTags)
                        newTags[tag] = !newTags[tag]

                            setToggledTags(newTags)
                        }} key={index}>
                            <Image source={checkMark} style={[styles.tagCheckMark, 
                                {tintColor: toggledTags[tag]? mainstyles.buttonColor:mainstyles.backgroundColor}]}/>
                            <Text style={styles.tagLabel}>{tag}</Text>
                        </Pressable>
                    )}
                </ScrollView>
            </View>

            <View style={styles.themeDropDownContainer}>

            </View>

            <SimpleButton text="Save / Apply" style={styles.SaveButtonStyle} onPress={saveEdits}/>
            <IconButton source={deleteIcon} style={styles.deleteIcon}/>
        </View>
    </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: mainstyles.backgroundColor,

        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    editNameContainer: {
        // marginTop: "5%",
        // backgroundColor: "red",
        width: "80%",
        height: "10%",

        // flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center'
    },
    listNameLabel: {
        color: mainstyles.titleColor,
        fontSize: "20%"
    },
    listNameInput: {
        color: "#fff",
        fontSize: "35%",
    },

    tagPickerWrapper: {
        width: "35%",
        marginLeft: "-45%",
        height: "60%",
        marginTop: "5%"
    },

    tagPickerLabel: {
        color: mainstyles.buttonColor,
        fontSize: "20%",
        marginBottom: "3%",
    },

    tagPicker: {
        // backgroundColor: "red",
    },
    tag: {
        width: "100%",
        fontSize: "20%",
        marginBottom: "1%",

        flex: 1,
        flexDirection: 'row',
        alignItems: "center"
    },

    tagLabel: {
        color: mainstyles.infoColor,
        fontSize: "30%",
        marginLeft: "4%",
    },

    tagCheckMark: {
        width: '20%',
        height: undefined,
        aspectRatio: 1,
        borderColor: mainstyles.buttonColor,
        borderWidth: 1,
        borderRadius: "5%",
        tintColor: mainstyles.buttonColor
    },

    themeDropDownContainer: {
        position: "absolute",
        right: "10%",
        width: '35%',
        height: "60%",
    },
    SaveButtonStyle: {
        position: "absolute",
        textAlign: "center",
        bottom: "20%",
        borderWidth: 1,
        borderColor: mainstyles.buttonColor,
        borderRadius: "5%",
        padding: 4
    },
    deleteIcon: {
        position: "absolute",
        right: mainstyles.buttonMargins,
        bottom: mainstyles.buttonMargins,
        // backgroundColor: "red"
    }
})

export default EditListScreen