import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

const styles = StyleSheet.create({
    markBackground: {
        width: 25,
        height: 25,
        backgroundColor: "#f00",
        borderRadius: "5%",
        right: "-40%",
        // top: "-25%"
        // flex: 1
    },
    checkboxContainer: {
        // backgroundColor: "blue",
        // flexDirection: "row-reverse",
        // zIndex: 0.5,
        // // hitSlop: 500,
        // flex: 1
        flex: 1,
        height: "100%",
        borderColor: "#000",
        border: "10%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },
    checkmark: {
        top: "15%",
        left: "15%",
        width: "70%",
        height: "70%",
    },

    bottomBarButton: {
        flex: 1,
        height: "100%",
        borderColor: "#000",
        border: "10%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: "#aaa",
    },
    buttonText:{
        fontSize: "40%"
    },
})

export default function CheckBox(props)
{
    const [pressed, setPressed ] = useState(false)

    // return <Pressable style={styles.checkboxContainer}
    // onPress={() => {
    //     console.log("Presses")
    //     // props.setChecked(!props.checked)
    //     setPressed(!pressed)
    //     }}>
    //     {/* <View style={styles.markBackground}>
    //         {pressed? <Image source={require("../images/checkmark.png")} style={styles.checkmark}></Image>: null}
    //         <View style={styles.checkmark}></View>
    //     </View> */}
    //     <Text>PRESSME</Text>
    // </Pressable>

    return <Pressable style={styles.bottomBarButton} onPress={() => console.log("test")}>
    <Text style={styles.buttonText}>Add</Text></Pressable>
}