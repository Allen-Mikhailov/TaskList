import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    bottomBarContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        position: "absolute",
        flexDirection: "column-reverse"
    },
    bottomBar: {
        width: "100%",
        height: "9%",
        backgroundColor: "#aaa",
        flexDirection: "row"
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

export default function BottomBar()
{
    return <View style={styles.bottomBarContainer}>



        <View style={styles.bottomBar}>
            <Pressable style={styles.bottomBarButton}><Text style={styles.buttonText}>Add</Text></Pressable>
            <Pressable style={styles.bottomBarButton}><Text style={styles.buttonText}>Clear</Text></Pressable>
            <Pressable style={styles.bottomBarButton}><Text style={styles.buttonText}>Wipe</Text></Pressable>
        </View>
    </View>
}