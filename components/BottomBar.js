import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Button, Image } from 'react-native';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    bottomBar: {
        position: "absolute",
        width: "100%",
        height: "7%",
        top: "93%",
        backgroundColor: "#fff",
        flexDirection: "row",
    },

    bottomBarButton: {
        flex: 1,
        height: "100%",
        borderColor: "#000",
        border: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText:{
        fontSize: "40%"
    },
    Icon: {
        width: "25%",
        height: "80%",
    }
})

export default function BottomBar({addTaskOpen, setAddTaskOpen, Clear, wipe})
{

    return <View style={styles.bottomBar}>
            <Pressable style={styles.bottomBarButton} 
                onPress={() => {console.log(addTaskOpen); setAddTaskOpen(!addTaskOpen)}}>
                <Image source={require("../images/plusIcon.png")} style={styles.Icon}/></Pressable>
            <Pressable style={styles.bottomBarButton} onPress={Clear}>
                <Image source={require("../images/clearIcon.png")} style={styles.Icon}/></Pressable>
            <Pressable style={styles.bottomBarButton} onPress={wipe}>
                <Image source={require("../images/wipeIcon.png")} style={styles.Icon}/></Pressable>
        </View>
}