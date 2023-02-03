import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , TextInput, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { store } from '../store.js';



const styles = StyleSheet.create({
    body: {
        width: "100%",
        height: "100%",
        // backgroundColor: "red"
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
        height: "300%",
        backgroundColor: "red"
    },

    listDot: {

    },

    listTitle: {

    }
})

function ListItem({list})
{
    return <View style={styles.listFrame}>
        <Image style={styles.listDot}></Image>
        <Text>{list.name || "Test"}</Text>
    </View>
}

function HomeScreen()
{

    const [loadedLists, _, updateLoadedLists ] = store.useState("loadedLists")
    return <View style={styles.body}>
        <Text style={styles.title}>Task List</Text>
        <ScrollView style={styles.scroll}>
            {Object.entries(loadedLists).map(([listId, list]) => <ListItem list={list}>

            </ListItem>)}
        </ScrollView>
    </View>
}

export default HomeScreen;