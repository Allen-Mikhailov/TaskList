import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    bottomBarContainer: {
        width: "100%",
        height: "9%",
        flex: 1,
        position: "absolute",
        flexDirection: "column-reverse"
    },
    bottomBar: {
        width: "100%",
        height: "100%",
        backgroundColor: "#aaa",
        flexDirection: "row"
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

    addTaskScreen: {
        width: "75%",
        height: "50%",
        top: "25%",
        left: "12.5%",
        backgroundColor: "#eee",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        // flexDirection: 'row'
    },

    taskInput: {
        marginLeft: "10%",
        marginRight: "10%",
        fontSize: "20%",
        flexShrink: 1,
        flexWrap: 'wrap',
        // flex: 1
    },
    taskAddButton: {
        fontSize: "20%",
        flex: 1
    }
})

export default function BottomBar(props)
{
    const [ task, setTask ] = useState("")
    const [taskOpen, setTaskOpen ] = useState(false)

    return <View style={styles.bottomBarContainer}>
        {taskOpen && <View style={styles.addTaskScreen}>
            <TextInput
            style={styles.taskInput} 
            placeholder='TaskDescription'
            value={task}
            onChangeText={setTask}
            multiline={true}
            />
            <Button title="Add" style={styles.taskAddButton} onPress={() => {
                if (task == "") {return}
                props.addTask(task); 
                setTaskOpen(false)
                }}/>
        </View>}


        <View style={styles.bottomBar}>
            <Pressable style={styles.bottomBarButton} onPress={() => setTaskOpen(!taskOpen)}>
                <Text style={styles.buttonText}>Add</Text></Pressable>
            <Pressable style={styles.bottomBarButton} onPress={props.Clear}><Text style={styles.buttonText}>Clear</Text></Pressable>
            <Pressable style={styles.bottomBarButton} onPress={props.wipe}><Text style={styles.buttonText}>Wipe</Text></Pressable>
        </View>
    </View>
}