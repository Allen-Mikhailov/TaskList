import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Dimensions , TextInput } from 'react-native';
import { useEffect, useState } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { store } from '../store.js';

import CheckBox from '../components/Checkbox.js';
import TagSymbol from './TagSymbol.js';

const styles = StyleSheet.create({
    FlatList: {
        width: "100%",
        marginVertical: 30,
        justifyContent: "left",
        alignItems: "left",
        justifyContent: 'top',
        flex: 1
    
      },
    
      itemContainer: {
        justifyContent: "center",
        width: windowWidth
      },
    
      item: {
        marginLeft: "4%",
        fontSize: "30%",
        textAlign: "left",
        marginRight: "20%",
      },
    
      itemToggled: {
        marginLeft: "4%",
        fontSize: "30%",
        textAlign: "left",
        marginRight: "20%",
        color: "#aaa"
      },
      header: {
        height: "15%",
        width: "100%",
        backgroundColor: "#ddd"
      },
      container: {
        width: "100%",
        height: "100%"
      },
      listTitle: {
        fontSize: "50%",
        textAlign: "center"
      },
      tagDisplay: {
        flexDirection: "row",
        paddingLeft: 10
      }
})

function findCommonElement(array1, array2) {
  for(let i = 0; i < array1.length; i++) {
      for(let j = 0; j < array2.length; j++) {
          if(array1[i] === array2[j]) {
              return true;
          }
      }
  }
  return false;
}

function TaskList({ route })
{
  const { listName } = route.params;
  const [ lists, setLists ] = store.useState("lists")
  const [ tags, setTags ] = store.useState("tags")
  const [ tasks, setTasks ] = useState({
    HelloWorld: {
      "toggle": true,
      tags: {School: true}
    },
    HelloWorld3: {
      "toggle": true,
      tags: {}
    }
  })//store.useState("tasks")
  const [ data, setData ] = useState([])

  useEffect(() => {
    console.log(tasks)
    const newData = []
    const list = lists[listName]
    Object.entries(tasks).forEach(([taskName, task]) => {
      if (findCommonElement(Object.keys(list.tags), Object.keys(task.tags)))
        newData.push(taskName)
    })
    console.log(newData)
    setData(newData)
  }, [lists, tasks])

  function setChecked()
  {

  }

    return <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.listTitle}>{listName}</Text>
        <View style={styles.tagDisplay}>
          {Object.entries(lists[listName].tags).map(([tagName, tagD]) => {
            return <TagSymbol tag={tagName} color={tags[tagName].color}/>
          })}
        </View>
      </View>
      <View style={styles.FlatList}>
        <FlatList 
            data={data} 
            renderItem={({item, i}) => <View style={styles.itemContainer} key={i}>
            <Text style={tasks[item]["toggle"] ? styles.itemToggled:styles.item}>{item} </Text>
            <CheckBox checked={tasks[item]["toggle"]} setChecked={(value) => {
              setChecked(item, value)
            }} />
          </View>} 
            keyExtractor={(item, index)=> index}>
        </FlatList>
      </View>
    </View>
}

export default TaskList