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
import { store } from './store';

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

const listsKey = '@lists:0.1'
const tagsKey = '@tags:0.0'
const settingsKey = '@settings:0.0'
const tasksKey = '@tasks:0.1'

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

store.setState("tasks", {});
store.setState("settings", {});
store.setState("lists", {});
store.setState("tags", defaultTags);

export default function App() {
  const [ lists, setLists ] = store.useState("lists")

  DeviceEventEmitter.addListener("event.newList", (listName, tags) => {
    const newLists = JSON.parse(JSON.stringify(lists))
    newLists[listName] = {
      tags: tags
    }
    setLists(newLists)
  })

  return (
<NavigationContainer>
  <DataManager name="lists"    datakey={listsKey}/>
  <DataManager name="tasks"    datakey={tasksKey}/>
  <DataManager name="settings" datakey={settingsKey}/>
  <DataManager name="tags"     datakey={tagsKey}/>
  <Tab.Navigator tabBar={props => <View/>}>
    {Object.entries(lists).map(([listName, list]) => <Tab.Screen 
      name={"List:"+listName} 
      component={TaskList} 
      initialParams={{ listName: listName }}
      key={listName}
      />)}
    <Tab.Screen name="NewListScreen" component={NewListScreen}/>
    <Tab.Screen name="Settings"      component={SettingsScreen}/> 
  </Tab.Navigator>
</NavigationContainer>
  );
}
