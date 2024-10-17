import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    border: '2px solid black',
    padding: 30,
  },

  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'normal',
    color: 'blue',
    justifyContent: 'flex-start',
  },

  formchild: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  toggle: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglechild: {
    margin: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 6,
    marginTop: 12,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttoncontainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    justifyContent: 'flex-start',
  },
  input: {
    borderColor: 'skyBlue',
    borderwidth: 2,
    fontSize: 15,
    backgroundColor: 'lightgrey',
  },
});