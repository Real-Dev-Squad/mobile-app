import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerStyle: {
    height: 40,
    border: '1px solid black',
    width: 205,
    marginTop: 2,
  },
  dateIconStyle:{
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInputStyle:{
    marginLeft: 36,
    height: 30,
    border: 'none',
  }
});