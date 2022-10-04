import { StyleSheet, Text, View, FlatList, Button, Dimensions , TextInput, DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';

import TagSymbol from './TagSymbol';

// () => navigation.navigate('Settings')

function ListScreen({ navigation })
{
    const [ listName, setListName ] = useState("")
    const [ tags, setTags ] = useState({a: 1, b: 2})
    const [ listTags, setListTags ] = useState({})
    const [ errorMessage, setErrorMessage ] = useState("")

    function AddTag(tag)
    {
        console.log("Press")
        listTags[tag] = true
        setListTags(JSON.parse(JSON.stringify(listTags)))
    }

    function RemoveTag(tag)
    {
        delete  listTags[tag]
        setListTags(JSON.parse(JSON.stringify(listTags)))
    }

    useEffect(() => {
        console.log(listTags)
    }, [listTags])

    DeviceEventEmitter.addListener("event.data.tags", (newTags) => setTags(newTags))

    return <View style={styles.container}>
        <Text style={styles.listTitleLabel}>Title</Text>
        <TextInput
        style={styles.listTitle}
        text={listName}
        onChangeText={setListName}
        placeholder='Untitled'/>

        <View style={styles.TagCheckList}>
            <View style={[styles.IsolatedView, {width: "100%"}]}>
                {Object.entries(listTags).map((entry, i) => <View key={i} style={[styles.TagCheckContainer, 
                    {alignSelf: "flex-end", }]}>
                    <TagSymbol tag={entry[0]} color={tags[entry[0]].color} onpress={RemoveTag}/>
                </View>)}
            </View>
            <View style={styles.IsolatedView}>
                {Object.entries(tags).map((entry, i) => !listTags[entry[0]] && <View key={i} style={[styles.TagCheckContainer, {alignSelf: "flex-start"}]}>
                    <TagSymbol tag={entry[0]} color={entry[1].color} onpress={AddTag}/>
                </View>)}
            </View>
        </View>
        <Button title='Create' onPress={() => {
                if (listName == "")
                    return setErrorMessage("Please Input a list name")

                DeviceEventEmitter.emit("event.newList", listName, listTags)
                setErrorMessage("")
            }
            }/>
            <Text style={styles.CreateError}>{errorMessage}</Text>
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listTitleLabel: {
        fontSize: "20%",
        position: "absolute",
        color: "#aaa",
        top: "2%"
    },
    listTitle: {
        fontSize: "60%",
        position: "absolute",
        top: "5%"
    },
    TagCheckList: {
        width: "50%",
        backgroundColor: "grey",
        height: "50%"
    },
    IsolatedView: {
        flex: 1,
        top: 0,
        position: "absolute"
    },
    CreateError: {
        color: "red",
        fontSize: 15
    }
})

export default ListScreen