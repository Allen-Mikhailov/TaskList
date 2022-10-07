import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, 
  Pressable, Dimensions, TextInput, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { store } from '../store.js';

import CheckBox from '../components/Checkbox.js';
import TagSymbol from './TagSymbol.js';

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
    // justifyContent: "center",
    flexDirection: "row",
    width: windowWidth * .98,
    marginLeft: "2%",
  },

  item: {
    fontSize: "30%",
    textAlign: "left",
    marginLeft: "2%",
  },

  itemToggled: {
    color: "#aaa",
  },
  header: {
    height: "15%",
    width: "100%",
    backgroundColor: "#ddd"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  listTitle: {
    left: "5%",
    fontSize: "45%",
    marginTop: 10
    // textAlign: "center"
  },
  tagDisplay: {
    flexDirection: "row",
    paddingLeft: 10
  },
  ListFooterComponent: {
    width: windowWidth,
    height: "250%",
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

const wrenchIcon = require("../images/wrench.png")

function findCommonElement(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        return true;
      }
    }
  }
  return false;
}

function ListItem({ item, i }) {
  const [tasks, setTasks, updateTasks] = store.useState("tasks")
  console.log(item, tasks[item])
  

  return <View style={styles.itemContainer} key={i}>
    <CheckBox checked={tasks[item] && tasks[item]["toggle"]} setChecked={(value) => {
      updateTasks(tasks => {
        tasks[item]["toggle"] = value
      })
    }} />
    <Text style={[styles.item, (tasks[item] && tasks[item]["toggle"]) ? styles.itemToggled : null]}>{item} </Text>
  </View>
}

function ListFooter({listName}) {
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
      tasks[newTask] = {
        tags: lists[listName].tags,
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

function TaskList({ route, navigation }) {
  const { listName } = route.params;
  const [lists, setLists] = store.useState("lists")
  const [tags, setTags] = store.useState("tags")
  const [tasks, setTasks, updateTasks] = store.useState("tasks")
  const [data, setData] = useState([])

  useEffect(() => {
    const newData = []
    const list = lists[listName]
    Object.entries(tasks).forEach(([taskName, task]) => {
      if (findCommonElement(Object.keys(list.tags), Object.keys(task.tags)))
        newData.push(taskName)
    })
    setData(newData)
  }, [lists, tasks])

  const unsubscribe = navigation.addListener('blur', (e) => {
    // Prevent default action
    updateTasks(tasks => {
      Object.keys(tasks).map(key => {
        if (tasks[key]["toggle"])
          delete tasks[key]
      })
    })
  });

  return <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.listTitle}>{listName}</Text>
      <Pressable><Image style={styles.wrenchIcon} source={wrenchIcon}/></Pressable>
      <View style={styles.tagDisplay}>
        {Object.entries(lists[listName].tags).map(([tagName, tagD]) => {
          return <TagSymbol tag={tagName} color={tags[tagName].color} />
        })}
      </View>
    </View>
    <View style={styles.FlatList}>
      <FlatList
        data={data}
        renderItem={
          ({ item, i }) => <ListItem item={item} i={i}/>
        }
        ListFooterComponent={() => <ListFooter listName={listName} />}
        keyExtractor={(item, index) => index}>
      </FlatList>
    </View>
  </View>
}

export default TaskList