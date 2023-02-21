import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, 
  Pressable, Dimensions, TextInput, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import mainstyles from '../modules/mainstyles.js';
import SimpleButton from '../components/SimpleButton.js';

import { store } from '../store.js';

import CheckBox from '../components/RadioButton';
import TagSymbol from '../components/TagSymbol.js';

const wrenchIcon = require("../images/wrench.png")

import { findCommonElement } from '../modules/utils.js';


function ListItem({ item, i }) {
  const [tasks, setTasks, updateTasks] = store.useState("tasks")
  const [ toggled, setToggled ] = useState(tasks[item] && tasks[item]["toggle"])

  function onToggle()
  {
    updateTasks(tasks => {
      if (!tasks[item]) return
      tasks[item]["toggle"] = !toggled
      setToggled(!toggled)
    })
  }

  useEffect(() => {
    if (tasks[item] && toggled != tasks[item]["toggle"])
      setToggled(tasks[item]["toggle"])
  }, [tasks[item]])
  
  return <Pressable style={styles.itemContainer} key={i} onPress={onToggle}>
    <CheckBox checked={toggled}/>
    <Text style={[styles.item, (tasks[item] && tasks[item]["toggle"]) ? styles.itemToggled : null]}>{item} </Text>
  </Pressable>
}

function ListFooter({listId}) {
  const [tasks, setTasks, updateTasks] = store.useState("tasks")
  const [lists, setLists] = store.useState("lists")
  const [inFocus, setInFocus] = useState(false)
  const [newTask, setNewTask] = useState("")
  const inputElement = useRef();

  function select() {
    inputElement.current.focus()
  }

  function End()
  {
    updateTasks(tasks => {
      if (newTask == "") return
      tasks[newTask] = {
        tags: lists[listId].tags,
        toggle: false
      }
    })
    setNewTask("")
    setInFocus(false)
  }

  return <Pressable style={styles.ListFooterComponent} onPress={select}>
    <View style={styles.itemContainer}>
      {inFocus && <CheckBox checked={false} setChecked={(value) => {}} />}
      <TextInput 
      text={newTask} 
      ref={inputElement} 
      onChangeText={setNewTask} 
      style={styles.item} 
      // onEndEditing={End}
      onFocus={() => setInFocus(true)}
      onBlur={End}
      />
    </View>
  </Pressable>
}

const Stack = createStackNavigator();

function TaskList({ route, navigation }) {
  const { listId } = route.params;
  const [lists, setLists] = store.useState("lists")
  const [tags, setTags] = store.useState("tags")
  const [tasks, setTasks, updateTasks] = store.useState("tasks")
  const [data, setData] = useState([])
  const [editListId, setEditListId ]  = store.useState("editList")
  // console.log(lists)
  // console.log(listId)

  useEffect(() => {
    const newData = []
    const list = lists[listId]
    Object.entries(tasks).forEach(([taskName, task]) => {
      if (findCommonElement(Object.keys(list.tags), Object.keys(task.tags)))
        newData.push(taskName)
    })
    setData(newData)
  }, [lists, tasks])

  return <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.listTitle}>{lists[listId].name}</Text>
    </View>
    <SimpleButton text="Edit" onPress={() => {setEditListId(listId); navigation.navigate("EditListScreen")}} style={{
      position: "absolute",
      right: mainstyles.buttonMargins,
      bottom: mainstyles.buttonMargins,
    }}/>
    <View style={styles.FlatList}>
      <FlatList
        data={data}
        renderItem={
          ({ item, i }) => <ListItem item={item} i={i}/>
        }
        ListFooterComponent={() => <ListFooter listId={listId} />}
        keyExtractor={(item, index) => index}/>
    </View>
  </View>
}

const styles = StyleSheet.create({
  FlatList: {
    width: "100%",
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "left",
    alignItems: "left",
    justifyContent: 'top',
    flex: 1,
    backgroundColor: mainstyles.backgroundColor

  },
  itemContainer: {
    // justifyContent: "center",
    flexDirection: "row",
    width: windowWidth * .98,
    marginLeft: "2%",
    marginBottom: "3%",
  },

  item: {
    fontSize: "20%",
    textAlign: "left",
    marginLeft: "2%",
    color: "#fff",
  },

  itemToggled: {
    color: "#aaa",
  },
  header: {
    // height: "15%",
    width: "100%",
    // backgroundColor: "#ddd"
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: mainstyles.backgroundColor,
    color: "#fff"
  },
  listTitle: {
    left: "5%",
    fontSize: "45%",
    marginTop: 10,
    color: mainstyles.infoColor
    // textAlign: "center"
  },
  tagDisplay: {
    flexDirection: "row",
    paddingLeft: 10,
    color: "#fff"
  },
  ListFooterComponent: {
    width: windowWidth,
    height: 5000,
    // backgroundColor: "red"
  },
  wrenchIcon: {
    width: windowHeight * .075,
    height: windowHeight * .075,
    position: "absolute",
    // top: "10%",
    top: -windowHeight * .05,
    left: "80%",
    // backgroundColor: "red"
  }
})

export default TaskList