import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Pressable, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

import { getJsonData, storeData } from './modules/storage.js';

import BottomBar from './components/BottomBar';
import CheckBox from './components/Checkbox.js';

const dataKey = "taskData:0.0"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  FlatList: {
    width: "100%",
    marginVertical: 30,
    justifyContent: "left",
    alignItems: "left",
    justifyContent: 'top',

  },

  itemContainer: {
    width: "100%",
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center"
  },

  item: {
    marginLeft: "4%",
    fontSize: "30%",
    textAlign: "left"
  },

  itemToggled: {
    marginLeft: "4%",
    fontSize: "30%",
    textAlign: "left",
    color: "#aaa"
  },

  addTaskScreen: {
    width: "75%",
    height: "50%",
    top: "25%",
    left: "12.5%",
    backgroundColor: "#eee",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: 'row'
  },

  taskInput: {
    marginLeft: "10%",
    marginRight: "10%",
    fontSize: "20%",
    flexShrink: 1,
    flexWrap: 'wrap',
    // flex: 1
  },
  taskAddButton: {
    fontSize: "20%",
    flex: 1
  }
});

function Item({ item, i, setChecked }) {
  return <View style={styles.itemContainer} key={i}>
    <Text style={item["toggle"] ? styles.itemToggled:styles.item}>{item.key} </Text>
    <CheckBox checked={item["toggle"]} setChecked={(value) => {
      setChecked(i, value)
    }} />
  </View>
}

function AddTaskScreen({task, setTask, setAddTaskOpen, addTask}) {
  return <View style={styles.addTaskScreen}>
    <TextInput
      style={styles.taskInput}
      placeholder='TaskDescription'
      value={task}
      onChangeText={setTask}
      multiline={true}
    />

    <Button title="Add" style={styles.taskAddButton} onPress={() => {
      if (task == "") { return }
      addTask(task);
      setAddTaskOpen(false)
    }} />
  </View>
}

export default function App() {
  const [data, setData] = useState([])

  const [task, setTask] = useState("")
  const [addTaskOpen, setAddTaskOpen] = useState(false)

  useEffect(() => {
    getJsonData(dataKey).then((d) => {
      setData(d || [])
      console.log(data)
    })
  }, [])

  useEffect(() => {
    setTask("")
  }, [addTaskOpen])

  useEffect(() => {
    console.log("Stored: ", data)
    storeData(dataKey, JSON.stringify(data)).then(() => { })
  }, [data])

  function addTask(task) {
    const d = JSON.parse(JSON.stringify(data))
    d.push({ key: task, toggle: false })
    setData(d)
  }

  function wipe() {
    setData([])
  }

  function clear()
  {
    const d = []
    data.map((value) => {
      if (!value.toggle)
        d.push(value)
    })
    setData(d)
  }

  function setChecked(i, value) {
    const d = JSON.parse(JSON.stringify(data))
    d[i]["toggle"] = value;
    setData(d)
  }

  return (
    <View style={styles.container}>
      <View style={styles.FlatList}>
        {data.map((item, i) => <Item item={item} i={i} setChecked={setChecked} key={i} />)}
      </View>

      {addTaskOpen && <AddTaskScreen setAddTaskOpen={setAddTaskOpen} addTask={addTask} setTask={setTask} task={task}/>}

      <BottomBar addTaskOpen={addTaskOpen} setAddTaskOpen={setAddTaskOpen} wipe={wipe} Clear={clear}/>
      <StatusBar style="auto" />
    </View>
  );
}
