import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Dimensions , TextInput } from 'react-native';
import { useEffect, useState } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { store } from '../store.js';

import CheckBox from '../components/Checkbox.js';

const styles = StyleSheet.create({
    FlatList: {
        width: "100%",
        marginVertical: 30,
        justifyContent: "left",
        alignItems: "left",
        justifyContent: 'top',
        flex: 1
    
      },
    
      itemContainer: {
        justifyContent: "center",
        width: windowWidth
      },
    
      item: {
        marginLeft: "4%",
        fontSize: "30%",
        textAlign: "left",
        marginRight: "20%",
      },
    
      itemToggled: {
        marginLeft: "4%",
        fontSize: "30%",
        textAlign: "left",
        marginRight: "20%",
        color: "#aaa"
      },
})

function Item({ item, setChecked }) {
    return <View style={styles.itemContainer}>
      <Text style={item.item["toggle"] ? styles.itemToggled:styles.item}>{item.item.key} </Text>
      <CheckBox checked={item.item["toggle"]} setChecked={(value) => {
        setChecked(item.index, value)
      }} />
    </View>
  }

function TaskList()
{
  const [ lists, setLists ] = store.useState("lists")
  const [ tags, setTags ] = store.useState("tags")
  const [ tasks, setTasks ] = store.useState("lists")
  const [ data, setData ] = useState([])

  function setChecked()
  {

  }

    return <View style={styles.FlatList}>
        <FlatList 
            data={data} 
            renderItem={(item, i) => <Item item={item} setChecked={setChecked}/>} 
            keyExtractor={(item, index)=> index}>
        </FlatList>
    </View>
}

export default TaskList