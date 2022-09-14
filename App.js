import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
    // justifyContent: 'top',
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
  }
});

function Item({item, i, setChecked})
{
  return <View style={styles.itemContainer}>
    <Text key={i} style={styles.item}>{item.key}</Text>
    <CheckBox checked={item.checked} setChecked={(value) => {
      console.log("Press")
      setChecked(i, value)
      }}/>
  </View>
}

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
    d.push({key: task, toggle: false})
    setData(d)
  }

  function wipe()
  {
    setData([])
  }

  function setChecked(i, value)
  {
    const d = JSON.parse(JSON.stringify(data))
    d[i]["toggle"] = value;
    setData(d)
  }

  return (
    <View style={styles.container}>
      <View style={styles.FlatList}>
        {data.map((item, i) => <Item item={item} i={i} setChecked={setChecked}/>)}
      </View>

      <BottomBar addTask={addTask} wipe={wipe}/>
      <StatusBar style="auto" />
    </View>
  );
}
