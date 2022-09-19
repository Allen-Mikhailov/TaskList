import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , TextInput } from 'react-native';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    addTaskScreen: {
        width: "75%",
        height: "50%",
        top: "25%",
        left: "12.5%",
        backgroundColor: "#eee",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      },
    
      taskInput: {
        marginLeft: "10%",
        marginRight: "10%",
        fontSize: "20%",
        flexShrink: 1,
        flexWrap: 'wrap',
      },
      taskAddButton: {
        fontSize: "20%",
        flex: 1
      }
})

function AddTaskScreen({task, setTask, setAddTaskOpen, addTask}) {
    return <View style={styles.addTaskScreen}>
      <TextInput
        style={styles.taskInput}
        placeholder='TaskDescription'
        value={task}
        onChangeText={setTask}
        multiline={true}
      />
  
      <Button title="Add" style={styles.taskAddButton} onPress={() => {
        if (task == "") { return }
        addTask(task);
        setAddTaskOpen(false)
      }} />
    </View>
  }

export default AddTaskScreen