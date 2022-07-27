import { FloatingAction } from "react-native-floating-action";
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
  

const actions = [
    {
      text: "Assigned Goal",
      icon: require('../../assets/assign-user-solid.237x256.png'),
      buttonSize:50,
      name: "bt_assignedGoal",
      position: 1,
      color : '#492ed1' 
    },
    {
      text: "New Goal",
      icon: require("../../assets/target.256x256.png"),
      buttonSize:50,
      name: "bt_newGoal",
      position: 2,
      color : '#492ed1' 
    },
    {
      text: "To Do",
      icon: require("../../assets/task.201x256.png"),
      buttonSize:50,
      name: "bt_todo",
      position: 3,
      color : '#492ed1' 
    },
  ];
  

  export default function FloatingButton() {
    return (
        <View style={styles.float}>
        <FloatingAction
        actions={actions}
         color = '#492ed1' 
         position = 'right'
        />
      </View>
    )
  }

  const styles = StyleSheet.create({
    float :{
      marginTop: '120%'
    }
  })
