import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, DeviceEventEmitter, Button, Dimensions , TextInput  } from 'react-native';
import { useEffect, useState } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import BottomBar from './components/BottomBar';
import TaskList from './components/TaskList.js';
import DataManager from './components/DataManager';
import AddTaskScreen from './components/AddTaskScreen';

import SettingsScreen from './components/SettingsScreen';

import NewListScreen from './components/NewListScreen.js';
import global from './global';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

function range(int)
{
  const array = []
  for (let i = 0; i < int; i++)
    array.push(i)
  return array
}

const listsKey = '@lists:0.1'
const tagsKey = '@tags:0.0'
const settingsKey = '@settings:0.0'
const tasksKey = '@tasks:0.0'

const defaultTags = {
  School: {
    color: "blue"
  },
  Code: {
    color: "red"
  },
  Other: {
    color: "orange"
  }
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [settings, setSettings] = useState({})
  const [ lists, setLists ] = useState({})
  const [ tags, setTags ] = useState(defaultTags)

  DeviceEventEmitter.addListener("event.newList", (listName, tags) => {
    const newLists = JSON.parse(JSON.stringify(lists))
    newLists[listName] = {
      tags: tags
    }
    setLists(newLists)
  })

  return (
  //   <View style={styles.container}>
  //     <DataManager data={data} setData={setData}/>
  //     <SettingsData settings={settings} setSettings={setSettings}/>
      
  //     {/* <TaskList data={data} setChecked={setChecked}/>

  //     {addTaskOpen && <AddTaskScreen setAddTaskOpen={setAddTaskOpen} 
  //       addTask={addTask} setTask={setTask} task={task}/>} */}

  //     {/* <BottomBar 
  //       addTaskOpen={addTaskOpen} 
  //       setAddTaskOpen={setAddTaskOpen}
  //       wipe={wipe} 
  //       Clear={clear}/> */}
  //     <StatusBar style="auto" />
  //   </View>r

<NavigationContainer>
  <DataManager name="lists"    data={lists} setData={setLists} datakey={listsKey}/>
  <DataManager name="tasks"    data={tasks} setData={setTasks} datakey={tasksKey}/>
  <DataManager name="settings" data={settings} setData={setSettings} datakey={settingsKey}/>
  <DataManager name="tags"     data={tags} setData={setTags} datakey={tagsKey}/>
  <Tab.Navigator>
    <Tab.Screen name="NewListScreen" component={NewListScreen} />
    <Tab.Screen name="Settings"      component={SettingsScreen} /> 
  </Tab.Navigator>
</NavigationContainer>
  );
}
