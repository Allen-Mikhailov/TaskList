import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , TextInput, ScrollView, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { store } from '../store.js';

// Images
const dotImg = require("../images/dot.png")
const settingsImg = require("../images/wrench.png")
const newListImg = require("../images/plus.png")

function ListItem({ listId, list, navigation })
{
    return <View style={styles.listFrame}>
        <Image style={styles.listDot} source={dotImg}></Image>
        <Pressable title={list.name} onPress={() => navigation.navigate("List:"+listId)} style={styles.listTitle}>
            <Text style={styles.listTitle}>{list.name || "Error: NoName :("}</Text>
        </Pressable>
    </View>
}

function SettingsButton({ navigation })
{
    return <Pressable style={styles.settingsButton} title=""
        onPress={() => navigation.navigate("Settings")}>
        <Image source={settingsImg} style={styles.fullImage}></Image>
    </Pressable>
}

function NewListButton({ navigation })
{
    return <Pressable style={styles.settingsButton} title=""
        onPress={() => navigation.navigate("NewListScreen")}>
        <Image source={newListImg} style={styles.fullImage}></Image>
    </Pressable>
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
        aspectRatio: 6,
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column"
    },

    listDot: {
        marginLeft: "5%",
        aspectRatio: 1,
        height: "25%",
        top: "37.5%",
    },

    listTitle: {
        fontSize: "25%",
        marginLeft: "10%",
        top: "-3%"
    },

    fullImage: {
        width: "100%",
        height: "100%",
    },

    settingsButton: {
        position: "absolute",
        width: "10%",
        aspectRatio: 1,
        right: 10,
        bottom: 10
    },

    newListButton: {
        position: "absolute",
        width: "10%",
        aspectRatio: 1,
        right: 10,
        top: 10
    }
})


export default HomeScreen;