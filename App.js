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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();

const listsKey = '@lists:0.2'
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

const defaultLists = {
  "testKey": {
    name: "test",
    tags: ["School"]
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
store.setState("loadedLists", defaultLists)
store.setState("newListTags", {})

export default function App() {
  const [ lists, setLists, updateLists ] = store.useState("lists")
  const [localLists, setLocalLists ] = useState([])

  useEffect(() => {
    const unsubscribe = store.getState("lists").subscribe(function(lists){
      console.log("Lists", lists)
      console.log("Setnewlists")
      setLocalLists(lists)
  })
  }, [])

  return (
<NavigationContainer>
  <DataManager name="lists"    datakey={listsKey}/>
  <DataManager name="tasks"    datakey={tasksKey}/>
  <DataManager name="settings" datakey={settingsKey}/>
  <DataManager name="tags"     datakey={tagsKey}/>
  <Stack.Navigator>
    <Stack.Screen name="Home" 
    component={HomeScreen} 
    options={{headerShown: false}}
    />
    <Stack.Screen name="Settings" component={SettingsScreen}/>
    {Object.entries(localLists || {}).map(([listId, list]) => <Stack.Screen 
          name={"List:"+listId} 
          component={TaskList} 
          initialParams={{ listId: listId }}
          key={"List:"+listId}
          />)
          }
    <Stack.Screen name="NewListScreen" component={NewListScreen}/>
  </Stack.Navigator>
</NavigationContainer>
  );
}
