import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

import { getJsonData, storeData } from './modules/storage.js';

import BottomBar from './components/BottomBar';

const dataKey = "taskData:0.0"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  FlatList: {
    marginVertical: 30,
    justifyContent: "left",
    alignItems: "left",
    // justifyContent: 'top',
  },

  item: {
    fontSize: "30%"
  }
});

export default function App() {
  const [data, setData ] = useState([])

  useEffect(() => {
    getJsonData(dataKey).then((d) => {
      setData(d || [])
      console.log(data)
    })
  }, [])

  useEffect(() => {
    console.log("Stored: ", data)
    storeData(dataKey, JSON.stringify(data)).then(() => {})
  }, [data])

  function addTask(task)
  {
    console.log("Add")
    const d = JSON.parse(JSON.stringify(data))
    d.push({key: task})
    setData(d)
  }

  function wipe()
  {
    setData([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.FlatList}>
        {data.map((item, i) => <Text key={i} style={styles.item}>{item.key}</Text>)}
      </View>

      <BottomBar addTask={addTask} wipe={wipe}/>
      <StatusBar style="auto" />
    </View>
  );
}
