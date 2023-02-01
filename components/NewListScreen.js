import { StyleSheet, Text, View, FlatList, Button, Dimensions , TextInput, DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { store } from '../store';
import { getNewId } from '../modules/keys';

import TagSymbol from './TagSymbol';

function ListScreen({ route, navigation })
{
    const [ listName, setListName ] = useState("")
    const [ tags, setTags ] = store.useState("tags")
    const [ lists, setLists, updateLists ] = store.useState("lists")
    const [ listTags, setListTags, updateListTags ] = store.useState("newListTags")
    const [ errorMessage, setErrorMessage ] = useState("")

    function AddTag(tag)
    {
        updateListTags(tags => {tags[tag] = true})
    }

    function RemoveTag(tag)
    {
        updateListTags(tags => {delete tags[tag]})
    }

    useEffect(() => {
        console.log(listTags)
    }, [listTags])

    return <View style={styles.container}>
        <TextInput
        style={styles.listTitle}
        text={listName}
        onChangeText={setListName}
        placeholder='Untitled'/>

        <View style={styles.TagCheckList}>
            <View style={[styles.IsolatedView, {width: "100%"}]}>
                {Object.entries(listTags).map((entry, i) => (
                <View key={i} style={[styles.TagCheckContainer, 
                    {alignSelf: "flex-end", }]}>
                    <TagSymbol tag={entry[0]} color={tags[entry[0]].color} onpress={RemoveTag}/>
                </View>
                ))}
            </View>
            <View style={styles.IsolatedView}>
                {Object.entries(tags).map((entry, i) => !listTags[entry[0]] && <View key={i} 
                style={[styles.TagCheckContainer, {alignSelf: "flex-start"}]}>
                    <TagSymbol tag={entry[0]} color={entry[1].color} onpress={AddTag}/>
                </View>)}
            </View>
        </View>
        <Button title='Create' onPress={() => {
                if (listName == "")
                    return setErrorMessage("Please Input a list name")

                updateLists(lists => {
                    const id = getNewId(lists)
                    console.log(id)
                    lists[id] = {
                        name: listName,
                        tags: listTags
                    }

                    console.log("Transfering", "List:"+id)
                    DeviceEventEmitter.emit("event.screenTransfer", "List:"+id)
                })
                navigation.navigate("NewList")
                setErrorMessage("")
            }
            }/>
            <Text style={styles.CreateError}>{errorMessage}</Text>
        
    </View>
}

const Stack = createStackNavigator();

function NewList({ route, navigation })
{
    return <View style={styles.container}>
        <Button title="Create New List" onPress={() => navigation.navigate("NewListModal")}/>
    </View>
}

export default function NewListScreen({navigation})
{
    const [loadedLists] = store.useState("loadedLists")
    const [screenTransfer, setScreenTransfer] = useState()

    function listLoadUpdate()
    {
        console.log("List Load Uodaye", loadedLists[screenTransfer])
        console.log("TransferLoad", loadedLists, screenTransfer)
        if (loadedLists[screenTransfer])
        {
            console.log("Navigated to", screenTransfer)
            setScreenTransfer("Null")
            navigation.navigate(screenTransfer)
        }
    }

    useEffect(() => {
        DeviceEventEmitter.addListener("event.screenTransfer", (screen) => {
            console.log("Transfer", screen)
            setScreenTransfer(screen)
        })

        const unsubscribe = store.getState("loadedLists").subscribe(listLoadUpdate)
    }, [])

    useEffect(listLoadUpdate, [loadedLists, screenTransfer])

    return <Stack.Navigator>
        <Stack.Screen name="NewList" component={NewList} options={{headerShown:false}}/>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="NewListModal" component={ListScreen}/>
        </Stack.Group>
    </Stack.Navigator>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ddd",
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