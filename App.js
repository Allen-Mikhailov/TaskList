import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, DeviceEventEmitter, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

import DataManager from './components/DataManager';
import { store } from './store';

import TaskList from './components/TaskList.js';
import SettingsScreen from './components/SettingsScreen';
import NewListScreen from './components/NewListScreen.js';
import EditListScreen from './components/EditListScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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

store.setState("tasks", {
  HelloWorld: {
    "toggle": true,
    tags: {School: true}
  },
  HelloWorld3: {
    "toggle": true,
    tags: {}
  }
});
store.setState("settings", {});
store.setState("lists", {});
store.setState("tags", defaultTags);

export default function App() {
  const [ lists, setLists, updateLists ] = store.useState("lists")

  return (
<NavigationContainer>
  <DataManager name="lists"    datakey={listsKey}/>
  <DataManager name="tasks"    datakey={tasksKey}/>
  <DataManager name="settings" datakey={settingsKey}/>
  <DataManager name="tags"     datakey={tagsKey}/>
  <Tab.Navigator tabBar={props => <View/>}>
    <Tab.Screen name="Settings"      component={SettingsScreen}/>
    {Object.entries(lists).map(([listId, list]) => <Tab.Screen 
          name={"List:"+listId} 
          component={TaskList} 
          initialParams={{ listId: listId }}
          key={"List:"+listId}
          />)}
    <Tab.Screen name="NewListScreen" component={NewListScreen}/>
  </Tab.Navigator>
</NavigationContainer>
  );
}
