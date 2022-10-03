import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Dimensions , TextInput } from 'react-native';
import { useEffect, useState } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import BottomBar from './components/BottomBar';
import TaskList from './components/TaskList.js';
import DataManager from './components/DataManager';
import { SettingsData } from './components/SettingsData';
import AddTaskScreen from './components/AddTaskScreen';

import SettingsScreen from './components/SettingsScreen';
import ListDataManager from './components/ListDataManager';


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

export default function App() {
  const [data, setData] = useState([])
  const [settings, setSettings] = useState([])
  const [ lists, setLists ] = useState({})



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
  //   </View>

<NavigationContainer>
  <ListDataManager lists={lists} setLists={setLists}/>
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */} 
  </Tab.Navigator>
</NavigationContainer>
  );
}
