import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, DeviceEventEmitter, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

import DataManager from './components/DataManager';
import { store } from './store';

import TaskList from './screens/TaskList.js';
import SettingsScreen from './screens/SettingsScreen';
import NewListScreen from './screens/NewListScreen.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen, HomeScreenHeader} from './screens/HomeScreen';

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
store.setState("lists", defaultLists);
store.setState("tags", defaultTags);
store.setState("newListTags", {})

export default function App() {
  const [ lists, setLists, updateLists ] = store.useState("lists")

  useEffect(() => {
    const unsubscribe = store.getState("lists").subscribe(function(lists){
      console.log("Lists", lists)
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
    {Object.entries(lists || {}).map(([listId, list]) => <Stack.Screen 
          name={"List:"+listId} 
          component={TaskList} 
          initialParams={{ listId: listId }}
          key={"List:"+listId}
          options={{
            headerTitle: (props) => <HomeScreenHeader {...props}/>
          }}
          />)
          }
    <Stack.Screen name="NewListScreen" component={NewListScreen}/>
  </Stack.Navigator>
</NavigationContainer>
  );
}
