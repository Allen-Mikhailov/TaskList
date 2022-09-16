import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    bottomBar: {
        position: "absolute",
        width: "100%",
        height: "9%",
        top: "91%",
        backgroundColor: "#aaa",
        flexDirection: "row",
    },

    bottomBarButton: {
        flex: 1,
        height: "100%",
        borderColor: "#000",
        border: "10%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },
    buttonText:{
        fontSize: "40%"
    },
})

export default function BottomBar({addTaskOpen, setAddTaskOpen, Clear, wipe})
{

    return <View style={styles.bottomBar}>
            <Pressable style={styles.bottomBarButton} onPress={() => {console.log(addTaskOpen); setAddTaskOpen(!addTaskOpen)}}>
                <Text style={styles.buttonText}>Add</Text></Pressable>
            <Pressable style={styles.bottomBarButton} onPress={Clear}><Text style={styles.buttonText}>Clear</Text></Pressable>
            <Pressable style={styles.bottomBarButton} onPress={wipe}><Text style={styles.buttonText}>Wipe</Text></Pressable>
        </View>
}