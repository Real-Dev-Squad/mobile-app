import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ScreenViewContainer} from '../styles/GlobalStyle';

const HomeScreen = () => {
  const [btnStyle,setBtnStyle] = useState<string>("active")
  const [oooStatus,SetOOOStatus] = useState<boolean>(false)
  const changeStatus = () => {
    btnStyle==="active" ? setBtnStyle("idle"): setBtnStyle("active")
  }
  const changeoooStatus = () => oooStatus===false ? SetOOOStatus(true): SetOOOStatus(false)
  return (
    <View style={styles.container}>
      {oooStatus===false &&
      <View>
      <Text style={styles.heading}>{btnStyle==="active" ? "I am doing a task": "I am Idle"}</Text>
      <TouchableOpacity
        style={btnStyle==="idle"? styles.idleBtn: styles.activeButton}
        onPress={changeStatus}
      >
        <Text style={btnStyle==="idle" ? styles.idleBtnText: styles.activeBtnText}>{btnStyle==="active" ? "change status to idle": "change status to 'Active'"}</Text>
      </TouchableOpacity>
      </View>
      }
      {oooStatus===true &&
        <Text style={styles.heading}>I am OOO</Text>
      }
      <TouchableOpacity
        onPress={changeoooStatus}
      >
        <Text style={styles.oooBtn}>{oooStatus===false ? "Mark Yourself as OOO": "Mark Yourself as 'Active' again"}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  heading: {
    textAlign: "center",
    color: "#0034a5",
    fontSize: 35,
    fontWeight:"bold",
    marginBottom: 30,
  },
  activeButton: {
    userSelect: "none",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 40,
    paddingLeft: 40,
    textAlign: "center",
    borderWidth:2,
    borderRadius: 20,
    marginTop: 20,
    marginBottom:30,
    marginRight:"auto",
    marginLeft:"auto",
    borderColor:"#e49504"
  },
  idleBtn: {
    userSelect: "none",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 40,
    paddingLeft: 40,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "green",
    color: "green",
    borderRadius: 20,
    marginTop: 20,
    marginBottom:30,
    justifyContent:"center",
    marginRight:"auto",
    marginLeft:"auto"
  },
  activeBtnText: {
    color: "#e49504",
    fontSize: 20,
  },
  idleBtnText: {
    color: "green",
    fontSize: 20,
  },
  oooBtn: {
    textAlign: "center",
    color: "#0034a5",
    fontWeight: "500",
    fontSize:20,
  }
})
export default HomeScreen;
