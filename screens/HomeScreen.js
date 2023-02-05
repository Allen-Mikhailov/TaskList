import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , TextInput, ScrollView, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { store } from '../store.js';

import mainstyles from '../modules/mainstyles.js';

// Images
const arrowImg = require("../images/arrow.png")

function ListItem({ listId, list, navigation })
{
    return <View style={styles.listFrame}>
        <Pressable title={list.name} onPress={() => navigation.navigate("List:"+listId)} style={styles.listTitle}>
            <Text style={styles.listTitle}>{list.name || "Error: NoName :("}</Text>
            <View style={styles.listSubContainer}>
                <Text style={styles.listItemCount}>0</Text>
                <Image style={styles.listArrow} source={arrowImg}></Image>
            </View>
        </Pressable>
    </View>
}

function SettingsButton({ navigation })
{
    return <Pressable style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.buttonText}>Edit</Text>
    </Pressable>
}

function NewListButton({ navigation })
{
    return  <Pressable style={styles.newListButton}
        onPress={() => navigation.navigate("NewListScreen")}>
            <Text style={styles.buttonText}>New List</Text>
    </Pressable>
}

function HomeScreenHeader({ route, navigation })
{
    return <></>
}

function HomeScreen({ route, navigation })
{
    const [lists, setLists] = store.useState("lists")
    return <View style={styles.body}>
        <Text style={styles.title}>Task List</Text>
        <ScrollView style={styles.scroll}>
            {Object.entries(lists).map(([listId, list]) => <ListItem key={listId}
                list={list} navigation={navigation} listId={listId}/>)}
        </ScrollView>
        <SettingsButton navigation={navigation}/>
        <NewListButton navigation={navigation}/>
    </View>
}

const styles = StyleSheet.create({
    body: {
        width: "100%",
        height: "100%",
        backgroundColor: mainstyles.backgroundColor
    },

    title: {
        textAlign: "center",
        marginTop: "4%",
        fontSize: "55%"
    },

    scroll: {
        width: "90%",
        height: "70%",
        left: "5%"
    },

    listFrame: {
        width: "100%",
        aspectRatio: 6,
        borderRadius: "10%",
        backgroundColor: mainstyles.itemColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center'
    },

    listDot: {
        marginLeft: "5%",
        aspectRatio: 1,
        height: "25%",
        top: "37.5%",
    },

    listTitle: {
        // textAlignVertical: "center",
        fontSize: "20%",
        marginLeft: "2%",
        // height: "100%",
        // top: "-3%",
        color: mainstyles.infoColor
    },

    fullImage: {
        width: "100%",
        height: "100%",
    },

    settingsButton: {
        position: "absolute",
        aspectRatio: 1,
        right: 10,
        bottom: 10,
    },

    buttonText: {
        color: mainstyles.buttonColor,
        fontSize: "20%"
    },

    listItemCount: {
        position: "absolute",
        fontSize: "17%",
        color: mainstyles.subInfoColor,
        right: "45%",
        // width: "100%",
        // height: "100%"
    },

    listSubContainer: {
        position: "absolute",
        height: "100%",
        right: "2%",
        width: "15%",
        justifyContent: "center"
},

    listArrow: {
        position: "absolute",
        width: 15,
        height: 15,
        right: "2%",
        tintColor: mainstyles.subInfoColor,
        transform: [{rotate: "180deg"}, {translateY: 0}]
    },

    newListButton: {
        color: mainstyles.buttonColor,
        position: "absolute",
        // width: "10%",
        aspectRatio: 1,
        left: 10,
        bottom: 10
    }
})


export {HomeScreen, HomeScreenHeader};