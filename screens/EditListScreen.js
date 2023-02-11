import { StyleSheet, Text, View, FlatList, Pressable, Dimensions, TextInput, Image } from 'react-native';
import { useEffect, useState } from 'react';

import { store } from '../store.js';
import mainstyles from '../modules/mainstyles.js';

function EditListScreen()
{
    return <View style={styles.container}>
        <View></View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: mainstyles.backgroundColor,
    },

    
})

export default EditListScreen