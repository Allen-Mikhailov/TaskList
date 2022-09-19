import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Dimensions , TextInput } from 'react-native';
import { useEffect, useState } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import BottomBar from './components/BottomBar';
import TaskList from './components/TaskList.js';
import DataManager from './components/DataManager';
import AddTaskScreen from './components/AddTaskScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default function App() {
  const [data, setData] = useState([])

  const [task, setTask] = useState("")
  const [addTaskOpen, setAddTaskOpen] = useState(false)

  useEffect(() => {
    setTask("")
  }, [addTaskOpen])

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
      <DataManager/>
      <TaskList data={data} setChecked={setChecked}/>

      {addTaskOpen && <AddTaskScreen setAddTaskOpen={setAddTaskOpen} 
        addTask={addTask} setTask={setTask} task={task}/>}

      <BottomBar 
        addTaskOpen={addTaskOpen} 
        setAddTaskOpen={setAddTaskOpen}
        wipe={wipe} 
        Clear={clear}/>
      <StatusBar style="auto" />
    </View>
  );
}
