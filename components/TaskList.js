import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, 
  Pressable, Dimensions, TextInput, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import EditListScreen from './EditListScreen.js';

import { store } from '../store.js';

import CheckBox from '../components/RadioButton';
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
  console.log(lists)
  console.log(listId)

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
      <Pressable onPress={() => navigation.navigate("EditList")}><Image style={styles.wrenchIcon} source={wrenchIcon}/></Pressable>
      <View style={styles.tagDisplay}>
        {Object.entries(lists[listId].tags).map(([tagName, tagD]) => {
          return <TagSymbol tag={tagName} key={tagName} color={tags[tagName].color} />
        })}
      </View>
    </View>
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

export default function TaskListScreen({ navigation, route })
{
  const [loadedLists, _, updateLoadedLists ] = store.useState("loadedLists")
  const { listId } = route.params;
  const [tasks, setTasks, updateTasks] = store.useState("tasks")
  const unsubscribe = navigation.addListener('blur', (e) => {
    updateTasks(tasks => {
      Object.keys(tasks).map(key => {
        if (tasks[key]["toggle"])
          delete tasks[key]
      })
    })
  });

  useEffect(() => {
    console.log("Load")
    updateLoadedLists(loadedLists => {
      loadedLists["Lists:"+listId] = true
    })
  }, [])

  return <Stack.Navigator>
    <Stack.Screen name="TaskList" component={TaskList} initialParams={{ listId: listId }} options={{headerShown:false}}/>
    <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="EditList" component={EditListScreen} initialParams={{ listId: listId }}/>
    </Stack.Group>
  </Stack.Navigator>
}