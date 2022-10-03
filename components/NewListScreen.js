import { StyleSheet, Text, View, FlatList, Button, Dimensions , TextInput, DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';

import TagSymbol from './TagSymbol';

// () => navigation.navigate('Settings')

function ListScreen({ navigation })
{
    const [ listName, setListName ] = useState("")
    const [ tags, setTags ] = useState({a: 1, b: 2})

    DeviceEventEmitter.addListener("event.data.tags", (newTags) => setTags(newTags))

    return <View style={styles.container}>
        <TextInput
        style={styles.listTitle}
        text={listName}
        onChangeText={setListName}
        placeholder='Untitled'/>

        <View style={styles.TagCheckList}>
            {Object.entries(tags).map(entry => <View style={styles.TagCheckContainer}>
                <TagSymbol tag={entry[0]} color={entry[1].color}/>
            </View>)}
        </View>
        <Button title='Create' onPress={
            () => {

            }
            }/>
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listTitle: {
        fontSize: "60%",
        position: "absolute",
        top: "5%"
    },
    TagCheckList: {
        width: "50%",
        backgroundColor: "grey"
    },
    TagCheckContainer: {
        height: 30,
        fontSize: 20
    }
})

export default ListScreen