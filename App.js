import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Pressable } from 'react-native';
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
    // width: "100%",
    // marginVertical: 30,
    // justifyContent: "left",
    // alignItems: "left",
    // justifyContent: 'top',
    
  },

  bottomBarButton: {
    flex: 1,
    height: "100%",
    borderColor: "#000",
    border: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
},
buttonText:{
    fontSize: "40%"
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

  holdupButton: {
    fontSize: "300%",
  }
});

function Item({item, i, setChecked})
{
  return <View style={styles.itemContainer} key={i}>
    <Text style={styles.item}>{item.key}</Text>
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

  const [holdup, setHoldUp ] = useState("duaduwgduadgaudgawyd")

  return (
    <View style={styles.container}>
      <View style={styles.FlatList}>
      {/* <Item item={{key: "???", toggle: false}} i={0} setChecked={setChecked} key={0}/> */}
        {/* {data.map((item, i) => <Item item={item} i={i} setChecked={setChecked} key={i}/>)} */}
      </View>

      {/* <CheckBox /> */}
      <Pressable style={styles.bottomBarButton} onPress={() => console.log("WHYYYYYYYYYYYYYYY")}>
                <Text style={styles.buttonText}>Add</Text></Pressable>

      <BottomBar addTask={addTask} wipe={wipe}/>
      <StatusBar style="auto" />
    </View>
  );
}
