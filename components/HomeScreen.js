import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , TextInput, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { store } from '../store.js';

// Images
const dotImg = require("../images/dot.png")
const settingsImg = require("../images/wrench.png")

function ListItem({ listId, list, navigation })
{
    return <View style={styles.listFrame}>
        <Image style={styles.listDot} source={dotImg}></Image>
        <Button title='' onPress={navigation.navigate("List:"+listId)}>
            <Text>{list.name || "Error: NoName :("}</Text>
        </Button>
    </View>
}

function SettingsButton({ navigation })
{
    return <Button style={styles.settingsButton}>
        <Image source={settingsImg} style={styles.fullImage}></Image>
    </Button>
}

function HomeScreen({ route, navigation })
{

    const [loadedLists, _, updateLoadedLists ] = store.useState("loadedLists")
    return <View style={styles.body}>
        <Text style={styles.title}>Task List</Text>
        <ScrollView style={styles.scroll}>
            {Object.entries(loadedLists).map(([listId, list]) => <ListItem 
                list={list} navigation={navigation} listId={listId}/>)}
        </ScrollView>
        <SettingsButton navigation={navigation}/>
    </View>
}

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
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column"
    },

    listDot: {
        aspectRatio: 1,
        height: "100%"
    },

    listTitle: {
        fontSize: "50%"
    },

    fullImage: {
        width: "100%",
        height: "100%",
    },

    settingsButton: {
        position: "absolute",
        width: "10%",
        aspectRatio: 1,
        right: "10px",
        bottom: "10px"
    }


})


export default HomeScreen;